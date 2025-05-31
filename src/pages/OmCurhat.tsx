import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// Mock data for chat history
const initialChatHistory = [
  { id: 1, title: "Coping with Work Stress", date: "29 Mei 2025", preview: "Saya merasa sangat tertekan dengan beban kerja yang tinggi..." },
  { id: 2, title: "Sleep Issues Discussion", date: "24 Mei 2025", preview: "Belakangan ini saya sulit tidur dan sering terbangun di malam hari..." },
  { id: 3, title: "Balancing Work & Family", date: "18 Mei 2025", preview: "Saya kesulitan menyeimbangkan waktu antara pekerjaan dan keluarga..." }
];

// Mock data for forum posts
const forumPosts = [
  {
    id: 1,
    author: "dr. Budi Santoso",
    authorRole: "Dokter Spesialis Paru",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    title: "Mengatasi Burnout di Tengah Pandemi",
    content: "Sebagai tenaga kesehatan, kita sering mengalami kelelahan fisik dan mental yang luar biasa, terutama selama pandemi. Beberapa strategi yang saya terapkan: membuat jadwal istirahat yang konsisten, meditasi 10 menit setiap pagi, dan batasi konsumsi berita negatif.",
    likes: 45,
    comments: 12,
    date: "3 hari yang lalu",
    tags: ["burnout", "kesehatan mental", "pandemi"]
  },
  {
    id: 2,
    author: "Maya Pratiwi",
    authorRole: "Perawat ICU",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    title: "Teknik Self-care untuk Perawat ICU",
    content: "Bekerja di ICU selama 5 tahun telah mengajarkan saya pentingnya self-care. Beberapa tips sederhana: luangkan waktu untuk hobi, bicara dengan psikolog secara rutin, dan gabung dengan grup support sesama tenaga kesehatan. Jangan lupa untuk makan dan istirahat dengan baik!",
    likes: 38,
    comments: 9,
    date: "5 hari yang lalu",
    tags: ["self-care", "perawat", "tips kesehatan"]
  }
];

// Mock data for support groups
const supportGroups = [
  {
    id: 1,
    name: "Tenaga Kesehatan Melawan Burnout",
    members: 128,
    avatar: "/feature-4.png",
    topics: ["Burnout", "Stres", "Work-Life Balance"],
    nextMeeting: "1 Juni 2025, 19:00 WIB"
  },
  {
    id: 2,
    name: "Komunitas Peduli Kesehatan Mental",
    members: 94,
    avatar: "/feature-3.png",
    topics: ["Anxiety", "Depression", "Self-care"],
    nextMeeting: "3 Juni 2025, 20:00 WIB"
  },
  {
    id: 3,
    name: "Diskusi Profesional Medis",
    members: 156,
    avatar: "/feature-2.png",
    topics: ["Praktik Klinik", "Edukasi Pasien", "Kolaborasi"],
    nextMeeting: "5 Juni 2025, 19:30 WIB"
  }
];

// Mock data for resources
const resources = [
  {
    id: 1,
    title: "Panduan Pengelolaan Stres untuk Tenaga Kesehatan",
    type: "PDF",
    icon: "📄",
    downloads: 367
  },
  {
    id: 2,
    title: "Meditasi Singkat untuk Ketenangan di Tempat Kerja",
    type: "Audio",
    icon: "🎧",
    downloads: 289
  },
  {
    id: 3,
    title: "Webinar: Mencegah Burnout pada Tenaga Kesehatan",
    type: "Video",
    icon: "🎬",
    downloads: 412
  }
];

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const OmCurhat = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'forum' | 'groups' | 'resources'>('chat');
  const [chatHistory, setChatHistory] = useState(initialChatHistory);
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedChat) {
      // Initialize chat with welcome message from AI when a chat is selected
      setMessages([
        {
          id: '1',
          text: "Halo, saya OmBot, asisten AI yang siap membantu Anda dengan masalah kesehatan mental dan stres kerja. Bagaimana perasaan Anda hari ini?",
          sender: 'bot',
          timestamp: new Date()
        }
      ]);
    }
  }, [selectedChat]);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setNewMessage('');
    setIsLoading(true);
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      // Mock AI response based on message content
      let botResponse = "";
      const lowercaseMsg = newMessage.toLowerCase();
      
      if (lowercaseMsg.includes('stress') || lowercaseMsg.includes('stres') || lowercaseMsg.includes('tertekan')) {
        botResponse = "Stres adalah respons alami tubuh terhadap tekanan. Beberapa teknik yang dapat membantu mengurangi stres: meditasi pernapasan dalam, olahraga ringan, istirahat yang cukup, dan berbagi perasaan dengan orang yang Anda percaya. Apakah Anda ingin saya menjelaskan salah satu teknik tersebut lebih detail?";
      } else if (lowercaseMsg.includes('burnout') || lowercaseMsg.includes('kelelahan') || lowercaseMsg.includes('lelah')) {
        botResponse = "Burnout adalah kondisi kelelahan fisik dan mental yang disebabkan oleh stres kronis, terutama terkait pekerjaan. Gejala umum meliputi kelelahan ekstrem, sinisme, dan perasaan tidak efektif. Penting untuk mengambil langkah seperti mencari dukungan profesional, membatasi beban kerja, dan memprioritaskan self-care. Apakah Anda mengalami gejala burnout?";
      } else if (lowercaseMsg.includes('tidur') || lowercaseMsg.includes('insomnia') || lowercaseMsg.includes('sulit tidur')) {
        botResponse = "Gangguan tidur sering terkait dengan stres dan kecemasan. Cobalah rutinitas tidur yang konsisten, batasi kafein dan penggunaan gawai sebelum tidur, dan ciptakan lingkungan tidur yang nyaman. Teknik relaksasi seperti meditasi juga dapat membantu. Jika masalah berlanjut, pertimbangkan untuk berkonsultasi dengan profesional kesehatan.";
      } else if (lowercaseMsg.includes('cemas') || lowercaseMsg.includes('anxiety') || lowercaseMsg.includes('khawatir')) {
        botResponse = "Kecemasan adalah perasaan wajar yang dapat menjadi berlebihan dalam situasi tertentu. Teknik pernapasan dalam, mindfulness, dan terapi kognitif perilaku dapat membantu mengelola kecemasan. Penting juga untuk mengidentifikasi pemicu kecemasan Anda. Apakah Anda ingin berbagi lebih detail tentang apa yang membuat Anda cemas?";
      } else {
        botResponse = "Terima kasih telah berbagi. Sebagai tenaga kesehatan, penting untuk memprioritaskan kesehatan mental Anda juga. Apakah ada aspek spesifik dari kesehatan mental atau manajemen stres yang ingin Anda diskusikan lebih lanjut?";
      }
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, botMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const startNewChat = () => {
    const newChat = {
      id: Date.now(),
      title: "Percakapan Baru",
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
      preview: "Belum ada pesan"
    };
    
    setChatHistory([newChat, ...chatHistory]);
    setSelectedChat(newChat.id);
    setMessages([
      {
        id: '1',
        text: "Halo, saya OmBot, asisten AI yang siap membantu Anda dengan masalah kesehatan mental dan stres kerja. Bagaimana perasaan Anda hari ini?",
        sender: 'bot',
        timestamp: new Date()
      }
    ]);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-[#F1F3F5] pt-20 pb-16">
      <div className="max-w-[1512px] mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <div className="inline-block mb-4 bg-purple-100 p-2 rounded-xl shadow-md">
            <span className="text-3xl">💬</span>
          </div>
          <h1 className="text-5xl font-bold mb-6 relative inline-block">
            <span className="bg-gradient-to-r from-purple-700 via-purple-600 to-purple-500 bg-clip-text text-transparent">
              Om Curhat
            </span>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-transparent rounded-full"></div>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Platform untuk berbagi pengalaman, mendapatkan dukungan, dan mengurangi stres bagi tenaga kesehatan dan masyarakat umum
          </p>
          
          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <div className="bg-gradient-to-r from-purple-500 to-purple-700 text-white px-6 py-3 rounded-lg shadow-lg transform transition-transform hover:scale-105">
              <div className="flex items-center">
                <span className="text-2xl mr-3">🧠</span>
                <div className="text-left">
                  <div className="font-bold">Kesehatan Mental</div>
                  <div className="text-sm text-purple-100">Dukungan dan edukasi</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-lg shadow-lg transform transition-transform hover:scale-105">
              <div className="flex items-center">
                <span className="text-2xl mr-3">🤖</span>
                <div className="text-left">
                  <div className="font-bold">AI Assistant</div>
                  <div className="text-sm text-blue-100">Bantuan 24/7</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-500 to-green-700 text-white px-6 py-3 rounded-lg shadow-lg transform transition-transform hover:scale-105">
              <div className="flex items-center">
                <span className="text-2xl mr-3">👥</span>
                <div className="text-left">
                  <div className="font-bold">Komunitas</div>
                  <div className="text-sm text-green-100">Support group aktif</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-8 overflow-hidden">
          <div className="flex overflow-x-auto">
            <button 
              className={`px-8 py-5 font-medium text-lg flex-1 transition-all ${activeTab === 'chat' ? 'bg-gradient-to-r from-purple-50 to-white text-purple-700 border-b-2 border-purple-500' : 'text-gray-600 hover:text-gray-800'}`}
              onClick={() => setActiveTab('chat')}
            >
              <span className="mr-2 inline-flex items-center justify-center w-8 h-8 rounded-lg bg-purple-100 text-purple-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                </svg>
              </span>
              AI Konseling
            </button>
            <button 
              className={`px-8 py-5 font-medium text-lg flex-1 transition-all ${activeTab === 'forum' ? 'bg-gradient-to-r from-purple-50 to-white text-purple-700 border-b-2 border-purple-500' : 'text-gray-600 hover:text-gray-800'}`}
              onClick={() => setActiveTab('forum')}
            >
              <span className="mr-2 inline-flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100 text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                  <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                </svg>
              </span>
              Forum Diskusi
            </button>
            <button 
              className={`px-8 py-5 font-medium text-lg flex-1 transition-all ${activeTab === 'groups' ? 'bg-gradient-to-r from-purple-50 to-white text-purple-700 border-b-2 border-purple-500' : 'text-gray-600 hover:text-gray-800'}`}
              onClick={() => setActiveTab('groups')}
            >
              <span className="mr-2 inline-flex items-center justify-center w-8 h-8 rounded-lg bg-green-100 text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
              </span>
              Support Groups
            </button>
            <button 
              className={`px-8 py-5 font-medium text-lg flex-1 transition-all ${activeTab === 'resources' ? 'bg-gradient-to-r from-purple-50 to-white text-purple-700 border-b-2 border-purple-500' : 'text-gray-600 hover:text-gray-800'}`}
              onClick={() => setActiveTab('resources')}
            >
              <span className="mr-2 inline-flex items-center justify-center w-8 h-8 rounded-lg bg-yellow-100 text-yellow-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                </svg>
              </span>
              Sumber Daya
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* AI Chat Section */}
          {activeTab === 'chat' && (
            <>
              {/* Chat History Sidebar */}
              <div className="bg-white rounded-xl shadow-lg p-4 lg:col-span-1 overflow-hidden">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">Riwayat Percakapan</h2>
                  <button 
                    onClick={startNewChat}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Baru
                  </button>
                </div>
                
                <div className="space-y-2 overflow-y-auto max-h-[500px] pr-2">
                  {chatHistory.map(chat => (
                    <div 
                      key={chat.id}
                      onClick={() => setSelectedChat(chat.id)}
                      className={`p-3 rounded-lg cursor-pointer transition-all ${
                        selectedChat === chat.id 
                          ? 'bg-purple-100 border-l-4 border-purple-500' 
                          : 'hover:bg-gray-100 border-l-4 border-transparent'
                      }`}
                    >
                      <h3 className={`font-medium text-sm mb-1 truncate ${selectedChat === chat.id ? 'text-purple-700' : 'text-gray-800'}`}>
                        {chat.title}
                      </h3>
                      <p className="text-xs text-gray-500 truncate">{chat.preview}</p>
                      <p className="text-xs text-gray-400 mt-1">{chat.date}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Chat Window */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden lg:col-span-3">
                {selectedChat ? (
                  <div className="flex flex-col h-[600px]">
                    <div className="p-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white">
                      <h2 className="text-lg font-semibold">AI Kesehatan Mental Assistant</h2>
                      <p className="text-sm text-purple-100">Diskusi rahasia dan aman tentang masalah kesehatan mental Anda</p>
                    </div>
                    
                    <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                      <div className="space-y-4">
                        {messages.map(message => (
                          <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-3/4 p-3 rounded-lg ${
                              message.sender === 'user' 
                                ? 'bg-purple-600 text-white rounded-tr-none' 
                                : 'bg-white text-gray-800 shadow-md rounded-tl-none'
                            }`}>
                              <div className="whitespace-pre-wrap">{message.text}</div>
                              <div className={`text-right mt-1 text-xs ${message.sender === 'user' ? 'text-purple-200' : 'text-gray-500'}`}>
                                {formatTime(message.timestamp)}
                              </div>
                            </div>
                          </div>
                        ))}
                        {isLoading && (
                          <div className="flex justify-start">
                            <div className="bg-white p-3 rounded-lg shadow-md rounded-tl-none">
                              <div className="flex space-x-2">
                                <div className="w-2 h-2 rounded-full bg-purple-600 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                <div className="w-2 h-2 rounded-full bg-purple-600 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                <div className="w-2 h-2 rounded-full bg-purple-600 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                              </div>
                            </div>
                          </div>
                        )}
                        <div ref={messagesEndRef} />
                      </div>
                    </div>
                    
                    <div className="p-4 border-t border-gray-200 bg-white">
                      <div className="flex items-center">
                        <input
                          type="text"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyDown={handleKeyDown}
                          placeholder="Tulis pesan Anda..."
                          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          disabled={isLoading}
                        />
                        <button
                          onClick={handleSendMessage}
                          disabled={!newMessage.trim() || isLoading}
                          className={`ml-2 rounded-full p-2 ${
                            !newMessage.trim() || isLoading
                              ? 'bg-purple-300 cursor-not-allowed'
                              : 'bg-purple-600 hover:bg-purple-700'
                          } text-white`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                        </button>
                      </div>
                      <p className="mt-2 text-xs text-gray-500 text-center">
                        AI Kesehatan Mental adalah asisten virtual dan bukan pengganti konseling profesional. 
                        <Link to="#" className="text-purple-600 hover:underline ml-1">
                          Dapatkan bantuan profesional
                        </Link>
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="h-[600px] flex flex-col items-center justify-center text-center p-8">
                    <div className="mb-4 w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Mulai Percakapan</h3>
                    <p className="text-gray-600 mb-6 max-w-md">
                      Diskusikan masalah kesehatan mental, stres kerja, atau burnout dengan AI Assistant kami untuk mendapatkan dukungan
                    </p>
                    <button 
                      onClick={startNewChat}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                      Mulai Percakapan Baru
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
          
          {/* Forum Section */}
          {activeTab === 'forum' && (
            <div className="lg:col-span-4">
              <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold text-gray-800">Forum Diskusi Tenaga Kesehatan</h2>
                  <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Buat Postingan
                  </button>
                </div>
                
                <div className="mb-6">
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Cari di forum..." 
                      className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {forumPosts.map(post => (
                    <div key={post.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-4 mb-4">
                        <img src={post.avatar} alt={post.author} className="w-12 h-12 rounded-full object-cover" />
                        <div>
                          <h3 className="font-semibold text-lg text-gray-800">{post.author}</h3>
                          <p className="text-sm text-gray-500">{post.authorRole}</p>
                          <p className="text-xs text-gray-400 mt-1">{post.date}</p>
                        </div>
                      </div>
                      
                      <h4 className="text-xl font-semibold text-gray-800 mb-3">{post.title}</h4>
                      <p className="text-gray-600 mb-4">{post.content}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag, index) => (
                          <span key={index} className="bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex gap-4 pt-4 border-t border-gray-100">
                        <button className="flex items-center gap-2 text-gray-500 hover:text-purple-600 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                          </svg>
                          <span>{post.likes} Suka</span>
                        </button>
                        <button className="flex items-center gap-2 text-gray-500 hover:text-purple-600 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
                          </svg>
                          <span>{post.comments} Komentar</span>
                        </button>
                        <button className="flex items-center gap-2 text-gray-500 hover:text-purple-600 transition-colors ml-auto">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                          </svg>
                          <span>Bagikan</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 text-center">
                  <button className="text-purple-600 hover:text-purple-800 font-medium">
                    Lihat postingan lainnya
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Support Groups Section */}
          {activeTab === 'groups' && (
            <div className="lg:col-span-4">
              <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold text-gray-800">Support Groups</h2>
                  <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                    </svg>
                    Buat Grup Baru
                  </button>
                </div>
                
                <p className="text-gray-600 mb-8">
                  Bergabung dengan grup dukungan online untuk berbagi pengalaman dan mendapatkan dukungan dari sesama tenaga kesehatan
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {supportGroups.map(group => (
                    <div key={group.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-4 mb-4">
                        <img src={group.avatar} alt={group.name} className="w-12 h-12 rounded-lg object-cover" />
                        <div>
                          <h3 className="font-semibold text-gray-800">{group.name}</h3>
                          <p className="text-sm text-gray-500">{group.members} anggota</p>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Topik Diskusi:</h4>
                        <div className="flex flex-wrap gap-2">
                          {group.topics.map((topic, index) => (
                            <span key={index} className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-1">Pertemuan Berikutnya:</h4>
                        <p className="text-gray-600 text-sm">{group.nextMeeting}</p>
                      </div>
                      
                      <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200">
                        Gabung Grup
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Resources Section */}
          {activeTab === 'resources' && (
            <div className="lg:col-span-4">
              <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold text-gray-800">Sumber Daya</h2>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Cari sumber daya..." 
                      className="border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-8">
                  Akses sumber daya untuk membantu mengatasi stres, burnout, dan masalah kesehatan mental lainnya
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {resources.map(resource => (
                    <div key={resource.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 text-yellow-700 text-2xl mb-4 mx-auto">
                        {resource.icon}
                      </div>
                      <h3 className="font-semibold text-gray-800 text-center mb-2">{resource.title}</h3>
                      <div className="flex justify-between items-center">
                        <span className="bg-yellow-100 text-yellow-700 text-xs px-3 py-1 rounded-full">
                          {resource.type}
                        </span>
                        <span className="text-sm text-gray-500">{resource.downloads} unduhan</span>
                      </div>
                      <button className="w-full mt-4 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        Unduh
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Butuh Bantuan Segera?</h3>
                  <p className="text-gray-600 mb-4">
                    Jika Anda atau seseorang yang Anda kenal sedang mengalami krisis kesehatan mental, segera hubungi:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-yellow-100">
                      <h4 className="font-semibold text-gray-800 mb-1">Hotline Kesehatan Mental Nasional</h4>
                      <p className="text-gray-600 mb-2">Layanan 24/7 untuk krisis kesehatan mental</p>
                      <a href="tel:119" className="text-yellow-600 font-bold text-lg">119</a>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-yellow-100">
                      <h4 className="font-semibold text-gray-800 mb-1">Layanan Konseling Darurat</h4>
                      <p className="text-gray-600 mb-2">Bantuan psikologis segera</p>
                      <a href="mailto:help@omsehat.id" className="text-yellow-600 font-medium">help@omsehat.id</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Statistics and CTA Section */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl shadow-lg p-8 text-white mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">5,000+</div>
              <div className="text-purple-200">Pengguna Aktif</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-purple-200">Support Groups</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-purple-200">AI Support</div>
            </div>
          </div>
          
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Anda Tidak Sendirian</h2>
            <p className="text-purple-100 mb-6">
              Bergabunglah dengan komunitas Om Curhat untuk mendapatkan dukungan, berbagi pengalaman, dan mengakses sumber daya untuk kesehatan mental yang lebih baik
            </p>
            <button className="bg-white text-purple-700 hover:bg-purple-100 px-6 py-3 rounded-lg font-bold transition-colors duration-200 shadow-lg">
              Mulai Perjalanan Kesehatan Mental Anda
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OmCurhat;
