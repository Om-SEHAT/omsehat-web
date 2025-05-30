import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ChatMessage from './ChatMessage';
import '../styles/chat.css';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chat = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Initialize chat with welcome message when component mounts
  useEffect(() => {
    if (!sessionId) {
      navigate('/');
      return;
    }
    
    // Fetch initial message or use a default welcome
    setIsLoading(true);
    
    fetch(`https://apidev-triana.sportsnow.app/session/${sessionId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to initialize chat');
        }
        return response.json();
      })
      .then(data => {
        // Add welcome message
        if (data.reply) {
          const welcomeMessage: Message = {
            id: Date.now().toString(),
            text: data.reply,
            sender: 'bot',
            timestamp: new Date()
          };
          setMessages([welcomeMessage]);
        } else {
          // Fallback welcome message
          const welcomeMessage: Message = {
            id: Date.now().toString(),
            text: "Halo! Selamat datang di Om SAPA. Silakan pilih bahasa yang Anda inginkan:\na. Bahasa Indonesia\nb. English",
            sender: 'bot',
            timestamp: new Date()
          };
          setMessages([welcomeMessage]);
        }
      })
      .catch(error => {
        console.error('Error initializing chat:', error);
        // Add fallback message
        const errorMessage: Message = {
          id: Date.now().toString(),
          text: "Terjadi kesalahan saat memulai percakapan. Silakan coba lagi nanti.",
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages([errorMessage]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [sessionId, navigate]);
  
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !sessionId) return;
    
    // Add user message to chat
    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setNewMessage('');
    setIsLoading(true);
    
    try {
      // Send message to API
      const response = await fetch(`https://apidev-triana.sportsnow.app/session/${sessionId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ new_message: newMessage })
      });
      
      if (!response.ok) {
        throw new Error('Failed to send message');
      }
      
      const data = await response.json();
      
      // Add bot response to chat
      if (data.reply) {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: data.reply,
          sender: 'bot',
          timestamp: new Date()
        };
        
        setMessages(prevMessages => [...prevMessages, botMessage]);
      }
      
      // Handle special next_action if needed
      if (data.next_action && data.next_action !== "CONTINUE_CHAT") {
        // Handle different next actions as needed
        console.log('Next action:', data.next_action);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.",
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Om SAPA</h2>
        <p>AI Asisten Kesehatan</p>
      </div>
      
      <div className="messages-container">
        {messages.map(message => (
          <ChatMessage
            key={message.id}
            message={message.text}
            isUser={message.sender === 'user'}
            timestamp={message.timestamp}
          />
        ))}
        {isLoading && (
          <div className="message bot-message">
            <div className="message-content typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="message-input-container">
        <input
          type="text"
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ketik pesan Anda..."
          disabled={isLoading}
        />
        <button 
          className="send-button" 
          onClick={handleSendMessage}
          disabled={!newMessage.trim() || isLoading}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Chat;
