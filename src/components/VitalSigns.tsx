import React, { useState, useEffect } from 'react';
import { useMqtt, MQTT_TOPICS, type MaxSensorData, type MlxSensorData } from '../utils/mqtt';

/**
 * VitalSigns Component
 * 
 * This component communicates with ESP32 devices via MQTT to retrieve vital signs data.
 * 
 * MQTT Topics:
 * - Subscribe to MAX30102 sensor data (heart rate & SpO2): 'omsehat/omsapa/max_data'
 *   Format: { "heartRate": "126", "spo2": "99" }
 * 
 * - Subscribe to MLX90614 sensor data (temperature): 'omsehat/omsapa/mlx_data'
 *   Format: { "temp": "36.6" }
 * 
 * - Publish requests to ESP32: 'omsehat/omsapa/request'
 *   Format: { "request_sensor": "max" } or { "request_sensor": "mlx" }
 */
interface VitalSignsProps {
  onDataUpdate?: (data: { bpm?: string; spo2?: string; temp?: string }) => void;
}

const VitalSigns: React.FC<VitalSignsProps> = ({ onDataUpdate }) => {
  const [heartRate, setHeartRate] = useState<string>('--');
  const [spo2, setSpo2] = useState<string>('--');
  const [temperature, setTemperature] = useState<string>('--');
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<{ max: boolean; mlx: boolean }>({ max: false, mlx: false });
  const [error, setError] = useState<string | null>(null);
  
  const mqtt = useMqtt();

  const handleMaxData = (data: MaxSensorData) => {
    setHeartRate(data.heartRate);
    setSpo2(data.spo2);
    setIsLoading(prev => ({ ...prev, max: false }));
    
    if (onDataUpdate) {
      onDataUpdate({ bpm: data.heartRate, spo2: data.spo2 });
    }
  };

  const handleMlxData = (data: MlxSensorData) => {
    setTemperature(data.temp);
    setIsLoading(prev => ({ ...prev, mlx: false }));
    
    if (onDataUpdate) {
      onDataUpdate({ temp: data.temp });
    }
  };

  useEffect(() => {
    async function setupMqtt() {
      try {
        setError(null);
        const connected = await mqtt.connect();
        
        if (connected) {
          setIsConnected(true);
          await mqtt.subscribe(MQTT_TOPICS.MAX_DATA);
          await mqtt.subscribe(MQTT_TOPICS.MLX_DATA);
          
          // Add listeners for sensor data
          mqtt.addListener(MQTT_TOPICS.MAX_DATA, (data: unknown) => handleMaxData(data as MaxSensorData));
          mqtt.addListener(MQTT_TOPICS.MLX_DATA, (data: unknown) => handleMlxData(data as MlxSensorData));
        } else {
          setError('Failed to connect to MQTT broker');
        }
      } catch (err) {
        console.error('MQTT setup error:', err);
        setError('Error connecting to the sensor network');
      }
    }
    
    setupMqtt();
    
    // Cleanup
    return () => {
      mqtt.removeListener(MQTT_TOPICS.MAX_DATA, (data: unknown) => handleMaxData(data as MaxSensorData));
      mqtt.removeListener(MQTT_TOPICS.MLX_DATA, (data: unknown) => handleMlxData(data as MlxSensorData));
      mqtt.disconnect();
    };
  }, [mqtt, handleMaxData, handleMlxData]);

  const requestHeartRate = async () => {
    try {
      setIsLoading(prev => ({ ...prev, max: true }));
      await mqtt.requestSensorData('max');
    } catch (err) {
      console.error('Error requesting heart rate data:', err);
      setIsLoading(prev => ({ ...prev, max: false }));
      setError('Failed to request heart rate data');
    }
  };

  const requestTemperature = async () => {
    try {
      setIsLoading(prev => ({ ...prev, mlx: true }));
      await mqtt.requestSensorData('mlx');
    } catch (err) {
      console.error('Error requesting temperature data:', err);
      setIsLoading(prev => ({ ...prev, mlx: false }));
      setError('Failed to request temperature data');
    }
  };

  const requestAllVitals = async () => {
    try {
      setIsLoading({ max: true, mlx: true });
      await mqtt.requestSensorData('max');
      // Small delay between requests to avoid overwhelming the ESP32
      setTimeout(async () => {
        await mqtt.requestSensorData('mlx');
      }, 500);
    } catch (err) {
      console.error('Error requesting all vital signs:', err);
      setIsLoading({ max: false, mlx: false });
      setError('Failed to request vital signs');
    }
  };

  return (
    <div className="vital-signs-container p-6 bg-white rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Tanda Vital Pasien
          {!isConnected && <span className="text-sm ml-2 text-red-500">(Offline)</span>}
        </h2>
        <button
          onClick={requestAllVitals}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center"
          disabled={!isConnected || isLoading.max || isLoading.mlx}
        >
          {(isLoading.max || isLoading.mlx) ? (
            <>
              <span className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></span>
              Memuat...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
              Perbarui Semua
            </>
          )}
        </button>
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
          <div className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <span>{error}</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Heart Rate */}
        <div className="bg-gradient-to-r from-red-50 to-white p-5 rounded-xl border border-red-100 relative">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-red-600 text-xs font-semibold uppercase mb-1">Detak Jantung</div>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-gray-800">{heartRate}</span>
                <span className="text-sm text-gray-500 ml-2">BPM</span>
              </div>
              <div className="text-xs text-gray-500 mt-2">Normal: 60-100 BPM</div>
            </div>
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <button 
            onClick={requestHeartRate}
            className="absolute bottom-3 right-3 text-red-600 hover:text-red-700"
            disabled={!isConnected || isLoading.max}
          >
            {isLoading.max ? (
              <span className="animate-spin h-5 w-5 border-2 border-red-600 border-t-transparent rounded-full"></span>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>

        {/* SpO2 */}
        <div className="bg-gradient-to-r from-blue-50 to-white p-5 rounded-xl border border-blue-100 relative">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-blue-600 text-xs font-semibold uppercase mb-1">Saturasi Oksigen</div>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-gray-800">{spo2}</span>
                <span className="text-sm text-gray-500 ml-2">%</span>
              </div>
              <div className="text-xs text-gray-500 mt-2">Normal: 95-100 %</div>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <button 
            onClick={requestHeartRate}
            className="absolute bottom-3 right-3 text-blue-600 hover:text-blue-700"
            disabled={!isConnected || isLoading.max}
          >
            {isLoading.max ? (
              <span className="animate-spin h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full"></span>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>

        {/* Temperature */}
        <div className="bg-gradient-to-r from-amber-50 to-white p-5 rounded-xl border border-amber-100 relative">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-amber-600 text-xs font-semibold uppercase mb-1">Suhu Tubuh</div>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-gray-800">{temperature}</span>
                <span className="text-sm text-gray-500 ml-2">°C</span>
              </div>
              <div className="text-xs text-gray-500 mt-2">Normal: 36.1-37.2 °C</div>
            </div>
            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <button 
            onClick={requestTemperature}
            className="absolute bottom-3 right-3 text-amber-600 hover:text-amber-700"
            disabled={!isConnected || isLoading.mlx}
          >
            {isLoading.mlx ? (
              <span className="animate-spin h-5 w-5 border-2 border-amber-600 border-t-transparent rounded-full"></span>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div className="text-xs text-gray-500 mt-4">
        * Klik tombol refresh pada setiap parameter untuk mengambil data terbaru dari sensor
      </div>
    </div>
  );
};

export default VitalSigns;
