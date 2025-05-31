import React, { useState } from 'react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const AIHealthAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your AI Health Assistant. How can I help you with your health education today?',
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response after 1-2 seconds
    setTimeout(() => {
      // Mock AI response (in a real app, this would be an API call)
      const mockResponses = [
        "That's a great health question! Based on current medical knowledge, it's recommended to...",
        "According to health guidelines, it's important to remember that...",
        "I'd be happy to help with your health education! Here's what you should know about that topic...",
        "That's an interesting question about wellness. The current research suggests that...",
        "Thanks for asking about that health topic. Let me provide some educational information..."
      ];
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: mockResponses[Math.floor(Math.random() * mockResponses.length)],
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="ai-chat-container bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-[#228BE6] text-white p-4">
        <h2 className="text-xl font-semibold flex items-center">
          <span className="mr-2">🤖</span>
          AI Health Assistant
        </h2>
        <p className="text-sm text-blue-100">Ask any health-related questions to enhance your learning</p>
      </div>
      
      <div className="h-96 p-4 overflow-y-auto bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`max-w-[80%] mb-4 p-3 ${
              message.sender === 'user'
                ? 'user-message ml-auto bg-[#228BE6] text-white'
                : 'ai-message mr-auto bg-white border border-gray-200 text-gray-800'
            }`}
          >
            <p>{message.text}</p>
            <div 
              className={`text-xs mt-1 ${
                message.sender === 'user' ? 'text-blue-100' : 'text-gray-400'
              }`}
            >
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="ai-message mr-auto bg-white border border-gray-200 text-gray-800 max-w-[80%] mb-4 p-3">
            <div className="flex gap-1">
              <span className="animate-bounce">●</span>
              <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>●</span>
              <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>●</span>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#228BE6] resize-none"
            placeholder="Type your health question..."
            rows={2}
          />
          <button
            onClick={handleSend}
            className="bg-[#228BE6] hover:bg-[#1c7ed6] text-white p-3 rounded-lg transition-colors"
          >
            <span className="block transform rotate-90">➤</span>
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          This AI Assistant provides educational information only and is not a substitute for professional medical advice.
        </p>
      </div>
    </div>
  );
};

export default AIHealthAssistant;
