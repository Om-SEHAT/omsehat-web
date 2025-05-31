/**
 * MQTT utility for communicating with IoT devices
 */
import mqtt from 'mqtt';

// MQTT Broker Configuration
const MQTT_BROKER_URL = import.meta.env.VITE_MQTT_BROKER_URL || 'mqtt://broker.emqx.io:1883';
const MQTT_CLIENT_ID = `omsehat_web_${Math.random().toString(16).substring(2, 10)}`;

// Topics
export const MQTT_TOPICS = {
  // Subscribe topics
  MAX_DATA: 'omsehat/omsapa/max_data', // Heart rate and SpO2 data from MAX30102 sensor
  MLX_DATA: 'omsehat/omsapa/mlx_data', // Temperature data from MLX90614 sensor
  
  // Publish topics
  REQUEST: 'omsehat/omsapa/request', // Request specific sensor data
};

// Data interfaces
/**
 * Data received from the MAX30102 sensor
 * Expected JSON format:
 * {
 *   "heartRate": "126",  // Heart rate in BPM
 *   "spo2": "99"         // Blood oxygen saturation in percentage
 * }
 */
export interface MaxSensorData {
  heartRate: string;
  spo2: string;
}

/**
 * Data received from the MLX90614 sensor
 * Expected JSON format:
 * {
 *   "temp": "36.6"  // Body temperature in Celsius
 * }
 */
export interface MlxSensorData {
  temp: string;
}

/**
 * Request format to trigger a sensor reading
 * {
 *   "request_sensor": "max" | "mlx"  // "max" for heart rate/SpO2, "mlx" for temperature
 * }
 */
export interface SensorRequest {
  request_sensor: 'max' | 'mlx';
}

/**
 * MQTT client singleton
 */
class MqttClient {
  private client: mqtt.MqttClient | null = null;
  private connected: boolean = false;
  private listeners: Map<string, ((data: unknown) => void)[]> = new Map();

  /**
   * Connect to MQTT broker
   */
  connect(): Promise<boolean> {
    return new Promise((resolve) => {
      if (this.connected && this.client) {
        resolve(true);
        return;
      }

      this.client = mqtt.connect(MQTT_BROKER_URL, {
        clientId: MQTT_CLIENT_ID,
        clean: true,
        connectTimeout: 4000,
        reconnectPeriod: 1000,
      });

      this.client.on('connect', () => {
        console.log('Connected to MQTT broker');
        this.connected = true;
        resolve(true);
      });

      this.client.on('error', (err) => {
        console.error('MQTT connection error:', err);
        this.connected = false;
        resolve(false);
      });

      this.client.on('message', (topic, message) => {
        try {
          const parsedMessage = JSON.parse(message.toString());
          
          // Call all listeners for this topic
          const topicListeners = this.listeners.get(topic);
          if (topicListeners) {
            topicListeners.forEach(callback => callback(parsedMessage));
          }
        } catch (error) {
          console.error('Error parsing MQTT message:', error);
        }
      });
    });
  }

  /**
   * Disconnect from MQTT broker
   */
  disconnect(): void {
    if (this.client) {
      this.client.end();
      this.connected = false;
      this.listeners.clear();
      console.log('Disconnected from MQTT broker');
    }
  }

  /**
   * Subscribe to a topic
   */
  subscribe(topic: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.client || !this.connected) {
        reject(new Error('MQTT client not connected'));
        return;
      }

      this.client.subscribe(topic, (err) => {
        if (err) {
          console.error(`Error subscribing to ${topic}:`, err);
          reject(err);
          return;
        }
        console.log(`Subscribed to ${topic}`);
        resolve();
      });
    });
  }

  /**
   * Publish a message to a topic
   */
  publish(topic: string, message: unknown): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.client || !this.connected) {
        reject(new Error('MQTT client not connected'));
        return;
      }

      try {
        const messageString = typeof message === 'object'
          ? JSON.stringify(message)
          : (message !== undefined ? message.toString() : '');

        this.client.publish(topic, messageString, (err) => {
          if (err) {
            console.error(`Error publishing to ${topic}:`, err);
            reject(err);
            return;
          }
          console.log(`Published to ${topic}: ${messageString}`);
          resolve();
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Add a listener for a specific topic
   */
  addListener(topic: string, callback: (data: unknown) => void): void {
    if (!this.listeners.has(topic)) {
      this.listeners.set(topic, []);
    }
    
    const topicListeners = this.listeners.get(topic);
    if (topicListeners) {
      topicListeners.push(callback);
    }
  }

  /**
   * Remove a listener for a specific topic
   */
  removeListener(topic: string, callback: (data: unknown) => void): void {
    const topicListeners = this.listeners.get(topic);
    if (topicListeners) {
      const index = topicListeners.indexOf(callback);
      if (index !== -1) {
        topicListeners.splice(index, 1);
      }
    }
  }

  /**
   * Request data from a specific sensor
   */
  requestSensorData(sensor: 'max' | 'mlx'): Promise<void> {
    const request: SensorRequest = {
      request_sensor: sensor
    };
    
    return this.publish(MQTT_TOPICS.REQUEST, request);
  }
}

// Export singleton instance
export const mqttClient = new MqttClient();

/**
 * Custom hook for using MQTT in components
 */
export const useMqtt = () => {
  return {
    connect: mqttClient.connect.bind(mqttClient),
    disconnect: mqttClient.disconnect.bind(mqttClient),
    subscribe: mqttClient.subscribe.bind(mqttClient),
    publish: mqttClient.publish.bind(mqttClient),
    addListener: mqttClient.addListener.bind(mqttClient),
    removeListener: mqttClient.removeListener.bind(mqttClient),
    requestSensorData: mqttClient.requestSensorData.bind(mqttClient),
  };
};

export default mqttClient;
