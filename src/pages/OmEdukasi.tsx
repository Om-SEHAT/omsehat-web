import { useState } from 'react';
import UserProfile from '@/components/OmEdukasi/UserProfile';
import Leaderboard from '@/components/OmEdukasi/Leaderboard';
import CourseCard from '@/components/OmEdukasi/CourseCard';
import Achievements from '@/components/OmEdukasi/Achievements';
import AIHealthAssistant from '@/components/OmEdukasi/AIHealthAssistant';
import PointsHistory from '@/components/OmEdukasi/PointsHistory';
import '@/styles/omedukasi.css';

const OmEdukasi = () => {
  const [activeTab, setActiveTab] = useState('courses');

  // Mock data for the user profile
  const userProfileData = {
    name: 'Anisa Putri',
    level: 5,
    points: 1250,
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    completedCourses: 8,
    totalCourses: 20
  };

  // Mock data for leaderboard
  const leaderboardData = [
    { id: '1', name: 'Budi Santoso', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', points: 2500, rank: 1 },
    { id: '2', name: 'Diana Putri', avatar: 'https://randomuser.me/api/portraits/women/32.jpg', points: 1980, rank: 2 },
    { id: '3', name: 'Fajar Wijaya', avatar: 'https://randomuser.me/api/portraits/men/45.jpg', points: 1650, rank: 3 },
    { id: '4', name: 'Anisa Putri', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', points: 1250, rank: 4, isCurrentUser: true },
    { id: '5', name: 'Rizky Ahmad', avatar: 'https://randomuser.me/api/portraits/men/22.jpg', points: 1100, rank: 5 }
  ];

  // Mock data for courses
  const coursesData = [
    {
      id: 'c1',
      title: 'Dasar-Dasar Nutrisi & Pola Makan Sehat',
      description: 'Mempelajari nutrisi esensial dan bagaimana menyusun pola makan sehat untuk kehidupan sehari-hari.',
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800',
      category: 'Nutrisi',
      duration: '4 jam',
      level: 'Beginner' as const,
      pointsReward: 100,
      progress: 75,
      instructor: 'Dr. Siti Nutrisionis'
    },
    {
      id: 'c2',
      title: 'Olahraga untuk Kesehatan Jantung',
      description: 'Panduan lengkap tentang jenis olahraga yang optimal untuk meningkatkan kesehatan jantung.',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800',
      category: 'Kardio',
      duration: '3 jam',
      level: 'Intermediate' as const,
      pointsReward: 150,
      progress: 30,
      instructor: 'Prof. Joko Kardiologis'
    },
    {
      id: 'c3',
      title: 'Manajemen Stres & Kesehatan Mental',
      description: 'Teknik praktis untuk mengelola stres dan menjaga kesehatan mental dalam kehidupan modern.',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800',
      category: 'Kesehatan Mental',
      duration: '5 jam',
      level: 'Beginner' as const,
      pointsReward: 120,
      progress: 0,
      instructor: 'Dr. Maya Psikologis'
    },
    {
      id: 'c4',
      title: 'Memahami Sistem Imun & Pencegahan Penyakit',
      description: 'Penjelasan komprehensif tentang cara kerja sistem imun dan strategi pencegahan penyakit.',
      image: 'https://images.unsplash.com/photo-1576671081837-49000212a370?auto=format&fit=crop&w=800',
      category: 'Imunologi',
      duration: '6 jam',
      level: 'Advanced' as const,
      pointsReward: 200,
      progress: 10,
      instructor: 'Prof. Ahmad Imunologis'
    },
    {
      id: 'c5',
      title: 'Pertolongan Pertama pada Keadaan Darurat',
      description: 'Panduan langkah demi langkah tentang pertolongan pertama untuk berbagai situasi darurat.',
      image: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=800',
      category: 'Pertolongan Pertama',
      duration: '3 jam',
      level: 'Intermediate' as const,
      pointsReward: 150,
      progress: 0,
      instructor: 'Dr. Ratna Praktisi'
    },
    {
      id: 'c6',
      title: 'Kesehatan Ibu & Anak',
      description: 'Informasi penting tentang kesehatan dan perawatan selama kehamilan hingga masa tumbuh kembang anak.',
      image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b24?auto=format&fit=crop&w=800',
      category: 'Maternal',
      duration: '8 jam',
      level: 'Beginner' as const,
      pointsReward: 180,
      progress: 0,
      instructor: 'Dr. Lina Obsgin'
    }
  ];

  // Mock data for achievements
  const achievementsData = [
    {
      id: 'a1',
      title: 'Pemula Belajar',
      description: 'Selesaikan 1 kursus kesehatan',
      icon: '🎓',
      earned: true,
      pointsReward: 50,
      earnedDate: '12 Mei 2023'
    },
    {
      id: 'a2',
      title: 'Ahli Nutrisi',
      description: 'Selesaikan 3 kursus tentang nutrisi',
      icon: '🥗',
      earned: true,
      pointsReward: 100,
      earnedDate: '20 Juni 2023'
    },
    {
      id: 'a3',
      title: 'Penguji Setia',
      description: 'Lulus 10 kuis dengan nilai di atas 80%',
      icon: '📝',
      earned: false,
      progress: 7,
      totalRequired: 10,
      pointsReward: 150
    },
    {
      id: 'a4',
      title: 'Pembelajar Konsisten',
      description: 'Login 7 hari berturut-turut',
      icon: '📅',
      earned: true,
      pointsReward: 75,
      earnedDate: '5 Juli 2023'
    },
    {
      id: 'a5',
      title: 'Pembaca Artikel',
      description: 'Baca 20 artikel kesehatan',
      icon: '📚',
      earned: false,
      progress: 14,
      totalRequired: 20,
      pointsReward: 100
    },
    {
      id: 'a6',
      title: 'Master Kesehatan',
      description: 'Selesaikan 15 kursus dari berbagai kategori',
      icon: '🏆',
      earned: false,
      progress: 8,
      totalRequired: 15,
      pointsReward: 300
    }
  ];

  // Mock data for points history
  const pointsHistoryData = [
    {
      id: 'p1',
      activity: 'Menyelesaikan kursus "Dasar-Dasar Nutrisi"',
      points: 100,
      date: '12 Juli 2023',
      isPositive: true,
      category: 'Course Completion' as const
    },
    {
      id: 'p2',
      activity: 'Mendapatkan achievement "Pemula Belajar"',
      points: 50,
      date: '12 Mei 2023',
      isPositive: true,
      category: 'Achievement' as const
    },
    {
      id: 'p3',
      activity: 'Lulus quiz "Sistem Imun Dasar" dengan nilai 90%',
      points: 25,
      date: '5 Juni 2023',
      isPositive: true,
      category: 'Quiz' as const
    },
    // {
    //   id: 'p4',
    //   activity: 'Login harian',
    //   points: 10,
    //   date: 'Hari ini',
    //   isPositive: true,
    //   category: 'Daily Login' as const
    // },
    {
      id: 'p5',
      activity: 'Berbagi artikel ke media sosial',
      points: 15,
      date: '2 Juli 2023',
      isPositive: true,
      category: 'Other' as const
    }
  ];

  return (
    <div className="min-h-screen bg-[#F1F3F5] pt-20 pb-16 om-edukasi-container">
      <div className="max-w-[1512px] mx-auto px-4 md:px-8">
        <div className="text-center mb-12 scale-in relative">
          <div className="absolute inset-0 flex justify-center items-center -z-10 opacity-10">
            <svg width="500" height="500" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#228BE6" strokeWidth="1" />
              <circle cx="50" cy="50" r="35" fill="none" stroke="#228BE6" strokeWidth="0.8" />
              <circle cx="50" cy="50" r="30" fill="none" stroke="#228BE6" strokeWidth="0.6" />
            </svg>
          </div>
          {/* <h1 className="text-5xl font-bold mb-6 relative inline-block">
            <span className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 bg-clip-text text-transparent">
              Om Edukasi
            </span>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-transparent rounded-full"></div>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Platform edukasi kesehatan terpercaya dengan konten berkualitas dari para ahli
          </p>
          <div className="flex justify-center gap-4 mt-6">
            <div className="flex items-center bg-white py-2 px-4 rounded-full shadow-md">
              <span className="mr-2 text-blue-500">🏆</span>
              <span className="text-sm font-medium">100+ Kursus</span>
            </div>
            <div className="flex items-center bg-white py-2 px-4 rounded-full shadow-md">
              <span className="mr-2 text-green-500">👨‍⚕️</span>
              <span className="text-sm font-medium">50+ Pengajar Ahli</span>
            </div>
            <div className="flex items-center bg-white py-2 px-4 rounded-full shadow-md">
              <span className="mr-2 text-yellow-500">⭐</span>
              <span className="text-sm font-medium">10,000+ Pengguna</span>
            </div>
          </div> */}
        </div>
        
        {/* User Profile Section */}
        <div className="mb-8 fade-in">
          <UserProfile {...userProfileData} />
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white rounded-xl shadow-lg mb-10 om-card overflow-hidden">
          <div className="flex overflow-x-auto py-1">
            <button 
              className={`px-8 py-5 font-medium text-lg flex-1 om-tab ${activeTab === 'courses' ? 'active text-[#228BE6] border-b-2 border-[#228BE6]' : 'text-gray-600 hover:text-gray-800'}`}
              onClick={() => setActiveTab('courses')}
            >
              <span className="mr-2 inline-flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100 text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
              </span>
              Kursus Kesehatan
            </button>
            <button 
              className={`px-8 py-5 font-medium text-lg flex-1 om-tab ${activeTab === 'achievements' ? 'active text-[#228BE6] border-b-2 border-[#228BE6]' : 'text-gray-600 hover:text-gray-800'}`}
              onClick={() => setActiveTab('achievements')}
            >
              <span className="mr-2 inline-flex items-center justify-center w-8 h-8 rounded-lg bg-yellow-100 text-yellow-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
              Achievements
            </button>
            <button 
              className={`px-8 py-5 font-medium text-lg flex-1 om-tab ${activeTab === 'ai-assistant' ? 'active text-[#228BE6] border-b-2 border-[#228BE6]' : 'text-gray-600 hover:text-gray-800'}`}
              onClick={() => setActiveTab('ai-assistant')}
            >
              <span className="mr-2 inline-flex items-center justify-center w-8 h-8 rounded-lg bg-purple-100 text-purple-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
              </span>
              AI Health Assistant
            </button>
            <button 
              className={`px-8 py-5 font-medium text-lg flex-1 om-tab ${activeTab === 'points' ? 'active text-[#228BE6] border-b-2 border-[#228BE6]' : 'text-gray-600 hover:text-gray-800'}`}
              onClick={() => setActiveTab('points')}
            >
              <span className="mr-2 inline-flex items-center justify-center w-8 h-8 rounded-lg bg-green-100 text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                </svg>
              </span>
              Points History
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column (Main Content) */}
          <div className="lg:col-span-2">
            {activeTab === 'courses' && (
              <div className="space-y-12 fade-in">
                <div className="courses-section ongoing-courses">
                  <div className="flex justify-between items-center mb-10">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center relative section-title">
                      <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-2 h-10 bg-gradient-to-b from-blue-500 via-blue-600 to-blue-700 rounded-full shadow-glow-blue"></div>
                      <div className="mr-4 text-blue-500 bg-blue-100 p-2.5 rounded-xl shadow-md icon-container flex items-center justify-center relative">
                        <span className="text-xl relative z-10">📘</span>
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-transparent rounded-xl opacity-60"></div>
                      </div>
                      <div>
                        <span className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 bg-clip-text text-transparent font-extrabold">
                          Kursus yang Sedang Berlangsung
                        </span>
                        <div className="h-1 w-3/4 bg-gradient-to-r from-blue-500 to-transparent rounded-full mt-1 opacity-70"></div>
                      </div>
                    </h2>
                    <div className="flex items-center text-sm text-[#228BE6] hover:text-[#1c7ed6] transition-all cursor-pointer group">
                      <span className="mr-2 bg-blue-50 p-2 rounded-full group-hover:bg-blue-100 transition-all shadow-sm group-hover:shadow-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </span>
                      <span className="font-medium group-hover:underline relative">
                        <span className="relative z-10">Semua Kursus Saya</span>
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 courses-grid">
                    {coursesData.filter(course => course.progress > 0).map((course, index) => (
                      <div key={course.id} className="course-wrapper" style={{animationDelay: `${index * 0.1}s`}}>
                        <CourseCard {...course} />
                        <div className="mt-3 flex justify-between items-center px-2">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2 shadow-sm">
                              <span className="text-blue-600 text-xs">⏱️</span>
                            </div>
                            <span className="text-xs text-gray-600">Terakhir akses: 2 jam lalu</span>
                          </div>
                          <div className="text-xs bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-full shadow-sm">
                            {course.progress}% selesai
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="courses-section recommended-courses">
                  <div className="flex justify-between items-center mb-10">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center relative section-title">
                      <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-2 h-10 bg-gradient-to-b from-green-500 via-green-600 to-green-700 rounded-full shadow-glow-green"></div>
                      <div className="mr-4 text-green-500 bg-green-100 p-2.5 rounded-xl shadow-md icon-container flex items-center justify-center relative">
                        <span className="text-xl relative z-10">🔍</span>
                        <div className="absolute inset-0 bg-gradient-to-br from-green-200 to-transparent rounded-xl opacity-60"></div>
                      </div>
                      <div>
                        <span className="bg-gradient-to-r from-green-700 via-green-600 to-green-500 bg-clip-text text-transparent font-extrabold">
                          Rekomendasi Kursus
                        </span>
                        <div className="h-1 w-3/4 bg-gradient-to-r from-green-500 to-transparent rounded-full mt-1 opacity-70"></div>
                      </div>
                    </h2>
                    <div className="flex items-center text-sm text-[#228BE6] hover:text-[#1c7ed6] transition-all cursor-pointer group">
                      <span className="mr-2 bg-blue-50 p-2 rounded-full group-hover:bg-blue-100 transition-all shadow-sm group-hover:shadow-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </span>
                      <span className="font-medium group-hover:underline relative">
                        <span className="relative z-10">Lihat Semua Kursus</span>
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 courses-grid">
                    {coursesData.filter(course => course.progress === 0).map((course, index) => (
                      <div key={course.id} className="course-wrapper" style={{animationDelay: `${index * 0.1}s`}}>
                        <CourseCard {...course} />
                        <div className="mt-3 flex justify-between items-center px-2">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-2 shadow-sm">
                              <span className="text-green-600 text-xs">⭐</span>
                            </div>
                            <span className="text-xs text-gray-600">Direkomendasikan untuk Anda</span>
                          </div>
                          <div className="text-xs bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full shadow-sm">
                            {course.pointsReward} poin
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'achievements' && (
              <Achievements achievements={achievementsData} />
            )}
            
            {activeTab === 'ai-assistant' && (
              <AIHealthAssistant />
            )}
            
            {activeTab === 'points' && (
              <PointsHistory transactions={pointsHistoryData} />
            )}
          </div>
          
          {/* Right Column (Sidebar) */}
          <div className="space-y-8">
            <Leaderboard users={leaderboardData} />
            
            <div className="bg-white rounded-lg shadow-lg p-6 om-card">
              <h2 className="text-xl font-semibold text-gray-800 mb-5 flex items-center">
                <span className="mr-2 text-blue-500">📚</span>
                Kategori Edukasi
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-blue-50 border border-blue-200 hover:transform hover:scale-[1.02] transition-transform cursor-pointer">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#228BE6] to-[#1976D2] rounded-lg flex items-center justify-center shadow-md">
                      <span className="text-white text-xl">🏃‍♂️</span>
                    </div>
                    <span className="ml-4 font-medium">Gaya Hidup Sehat</span>
                  </div>
                  <span className="text-sm bg-blue-500 text-white px-3 py-1.5 rounded-full shadow-sm">8 Kursus</span>
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 border border-gray-200 hover:transform hover:scale-[1.02] transition-transform cursor-pointer">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#9C27B0] to-[#6A1B9A] rounded-lg flex items-center justify-center shadow-md">
                      <span className="text-white text-xl">🧠</span>
                    </div>
                    <span className="ml-4 font-medium">Kesehatan Mental</span>
                  </div>
                  <span className="text-sm bg-purple-500 text-white px-3 py-1.5 rounded-full shadow-sm">6 Kursus</span>
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 border border-gray-200 hover:transform hover:scale-[1.02] transition-transform cursor-pointer">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#4CAF50] to-[#2E7D32] rounded-lg flex items-center justify-center shadow-md">
                      <span className="text-white text-xl">🦠</span>
                    </div>
                    <span className="ml-4 font-medium">Pencegahan Penyakit</span>
                  </div>
                  <span className="text-sm bg-green-500 text-white px-3 py-1.5 rounded-full shadow-sm">5 Kursus</span>
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 border border-gray-200 hover:transform hover:scale-[1.02] transition-transform cursor-pointer">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#FF9800] to-[#F57C00] rounded-lg flex items-center justify-center shadow-md">
                      <span className="text-white text-xl">👶</span>
                    </div>
                    <span className="ml-4 font-medium">Kesehatan Anak</span>
                  </div>
                  <span className="text-sm bg-orange-500 text-white px-3 py-1.5 rounded-full shadow-sm">4 Kursus</span>
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 border border-gray-200 hover:transform hover:scale-[1.02] transition-transform cursor-pointer">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#F44336] to-[#C62828] rounded-lg flex items-center justify-center shadow-md">
                      <span className="text-white text-xl">💊</span>
                    </div>
                    <span className="ml-4 font-medium">Obat & Suplemen</span>
                  </div>
                  <span className="text-sm bg-red-500 text-white px-3 py-1.5 rounded-full shadow-sm">3 Kursus</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 om-card">
              <h2 className="text-xl font-semibold text-gray-800 mb-5 flex items-center">
                <span className="mr-2 text-purple-500">🔔</span>
                Aktivitas Terbaru
              </h2>
              <div className="space-y-5">
                <div className="flex items-start gap-4 hover:bg-gray-50 p-3 rounded-lg transition-colors">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white shadow-md">
                    ✓
                  </div>
                  <div>
                    <p className="text-sm">
                      <span className="font-semibold text-gray-800">Rizky Ahmad</span> menyelesaikan kursus <span className="font-semibold text-blue-600">Pertolongan Pertama</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">2 jam yang lalu</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 hover:bg-gray-50 p-3 rounded-lg transition-colors">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 flex items-center justify-center text-white shadow-md">
                    ⭐
                  </div>
                  <div>
                    <p className="text-sm">
                      <span className="font-semibold text-gray-800">Diana Putri</span> mendapatkan <span className="font-semibold text-yellow-600">200 poin</span> dari quiz mingguan
                    </p>
                    <p className="text-xs text-gray-500 mt-1">4 jam yang lalu</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 hover:bg-gray-50 p-3 rounded-lg transition-colors">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white shadow-md">
                    🏆
                  </div>
                  <div>
                    <p className="text-sm">
                      <span className="font-semibold text-gray-800">Budi Santoso</span> mendapatkan achievement <span className="font-semibold text-blue-600">Master Kesehatan</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">1 hari yang lalu</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 hover:bg-gray-50 p-3 rounded-lg transition-colors">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white shadow-md">
                    📝
                  </div>
                  <div>
                    <p className="text-sm">
                      <span className="font-semibold text-gray-800">Anisa Putri</span> mendaftar kursus <span className="font-semibold text-purple-600">Manajemen Stres</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">2 hari yang lalu</p>
                  </div>
                </div>
                
                <div className="mt-4 text-center">
                  <button className="text-[#228BE6] hover:text-[#1c7ed6] font-medium text-sm transition-colors hover:underline flex items-center justify-center mx-auto">
                    <span>Lihat Semua Aktivitas</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OmEdukasi;
