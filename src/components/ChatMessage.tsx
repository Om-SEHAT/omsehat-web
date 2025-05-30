import React from 'react';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isUser, timestamp }) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`message ${isUser ? 'user-message' : 'bot-message'}`}>
      <div className="message-content">
        {message.split('\n').map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
      <span className="message-time">{formatTime(timestamp)}</span>
    </div>
  );
};

export default ChatMessage;
