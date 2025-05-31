import React from 'react';

interface UserProfileProps {
  name: string;
  level: number;
  points: number;
  avatar: string;
  completedCourses: number;
  totalCourses: number;
}

const UserProfile: React.FC<UserProfileProps> = ({
  name,
  level,
  points,
  avatar,
  completedCourses,
  totalCourses
}) => {
  // Calculate progress percentage
  const progressPercentage = (completedCourses / totalCourses) * 100;

  return (
    <div className="bg-white rounded-xl shadow-xl p-7 flex flex-col md:flex-row items-center gap-7 om-card relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
      <div className="absolute top-0 right-0 p-3">
        <div className="bg-blue-50 text-blue-700 rounded-lg px-3 py-1.5 text-sm font-medium shadow-sm flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      
      <div className="relative user-avatar-container">
        <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-[#228BE6] shadow-xl relative z-10">
          <img 
            src={avatar || 'https://via.placeholder.com/100'} 
            alt={`${name}'s avatar`}
            className="w-full h-full object-cover transition-transform hover:scale-110 duration-500"
          />
        </div>
        <div className="absolute -bottom-2 -right-2 bg-gradient-to-br from-[#228BE6] to-[#1976D2] text-white text-sm font-bold rounded-full w-10 h-10 flex items-center justify-center shadow-xl border-2 border-white z-20 level-badge">
          {level}
        </div>
        <div className="absolute -top-2 -left-2 bg-gradient-to-br from-yellow-400 to-yellow-600 text-white text-sm font-bold rounded-full w-10 h-10 flex items-center justify-center shadow-xl border-2 border-white z-20">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      
      <div className="flex-1 text-center md:text-left">
        <h2 className="text-2xl font-bold text-gray-800 mb-1 flex items-center">
          {name}
          <span className="ml-2 bg-gradient-to-r from-green-400 to-green-600 text-white text-xs rounded-full px-3 py-1 inline-flex items-center shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Aktif
          </span>
        </h2>
        <p className="text-gray-600 mb-3 flex items-center">
          <span className="mr-2 badge badge-primary py-1 px-2 text-xs font-bold">Level {level}</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-medium">Health Enthusiast</span>
        </p>
        
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <div className="flex items-center gap-2 badge py-2 px-4 shadow-md">
            <div className="w-5 h-5 rounded-full bg-yellow-100 flex items-center justify-center">
              <span className="text-yellow-500 text-xs">⭐</span>
            </div>
            <span className="font-semibold text-sm">{points.toLocaleString()} Points</span>
          </div>
          <div className="flex items-center gap-2 badge py-2 px-4 shadow-md">
            <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
              <span className="text-green-500 text-xs">📚</span>
            </div>
            <span className="font-semibold text-sm">{completedCourses}/{totalCourses} Courses</span>
          </div>
          <div className="flex items-center gap-2 badge py-2 px-4 shadow-md">
            <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-500 text-xs">🏆</span>
            </div>
            <span className="font-semibold text-sm">5 Achievements</span>
          </div>
        </div>
        
        <div className="progress-container h-4 rounded-full bg-gray-100">
          <div 
            className="progress-bar h-full rounded-full relative"
            style={{ width: `${progressPercentage}%` }}
            aria-valuenow={progressPercentage}
            aria-valuemin={0}
            aria-valuemax={100}
            role="progressbar"
            aria-label="Course completion progress"
          >
            <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
              {progressPercentage.toFixed(0)}%
            </span>
          </div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1.5">
          <span>Progres Pembelajaran</span>
          <span>{completedCourses} dari {totalCourses} kursus</span>
        </div>
      </div>
      
      <div className="flex flex-col gap-3 mt-4 md:mt-0">
        <button className="om-button om-button-primary transition-all duration-300 py-3 px-5 rounded-xl flex items-center justify-center hover:translate-y-[-3px] group">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
          <span>Lihat Profil</span>
          <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></span>
        </button>
        <button className="om-button om-button-secondary transition-all duration-300 py-3 px-5 rounded-xl flex items-center justify-center hover:translate-y-[-3px]">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
          </svg>
          <span>Bagikan Progres</span>
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
