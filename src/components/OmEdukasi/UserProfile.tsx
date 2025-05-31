import React, { useState, useEffect } from 'react';
import '../../styles/userprofile-animations.css';

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
  
  // Animation for points counter
  const [animatedPoints, setAnimatedPoints] = useState(0);
  
  useEffect(() => {
    const duration = 1500; // 1.5 seconds
    const interval = 20; // Update every 20ms
    const steps = duration / interval;
    const increment = points / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= points) {
        current = points;
        clearInterval(timer);
      }
      setAnimatedPoints(Math.floor(current));
    }, interval);
    
    return () => clearInterval(timer);
  }, [points]);

  return (
    <div className="bg-white rounded-xl shadow-xl p-7 flex flex-col md:flex-row items-center gap-7 om-card relative overflow-hidden transition-all duration-500 hover:shadow-2xl transform hover:-translate-y-1">
      {/* Animated gradient top border */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-x"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-3 right-3 flex space-x-2">
        <div className="bg-blue-50 text-blue-700 rounded-lg px-3 py-1.5 text-sm font-medium shadow-sm flex items-center transform transition-transform hover:scale-105">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
          <span className="text-xs">Last active: Today</span>
        </div>
      </div>
      
      {/* User avatar with enhanced effects */}
      <div className="relative user-avatar-container group">
        <div className="avatar-glow absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-20 blur-lg transform scale-110 group-hover:scale-125 group-hover:opacity-30 transition-all duration-700"></div>
        <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-[#228BE6] shadow-xl relative z-10 group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <img 
            src={avatar || 'https://via.placeholder.com/100'} 
            alt={`${name}'s avatar`}
            className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
          />
        </div>
        
        {/* Level badge with pulse effect */}
        <div className="absolute -bottom-2 -right-2 bg-gradient-to-br from-[#228BE6] to-[#1976D2] text-white text-sm font-bold rounded-full w-10 h-10 flex items-center justify-center shadow-xl border-2 border-white z-20 level-badge group-hover:animate-pulse">
          {level}
        </div>
        
        {/* Achievement badge with spin effect on hover */}
        <div className="absolute -top-2 -left-2 bg-gradient-to-br from-yellow-400 to-yellow-600 text-white text-sm font-bold rounded-full w-10 h-10 flex items-center justify-center shadow-xl border-2 border-white z-20 group-hover:rotate-12 transition-transform duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      
      <div className="flex-1 text-center md:text-left">
        <h2 className="text-2xl font-bold text-gray-800 mb-1 flex items-center flex-wrap gap-2">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-blue-700 to-gray-800">{name}</span>
          <span className="bg-gradient-to-r from-green-400 to-green-600 text-white text-xs rounded-full px-3 py-1 inline-flex items-center shadow-sm transform transition-transform hover:scale-105">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Aktif
          </span>
        </h2>
        
        <p className="text-gray-600 mb-3 flex items-center flex-wrap gap-2">
          <span className="badge badge-primary py-1 px-2 text-xs font-bold bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-md shadow-sm">
            Level {level}
          </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-medium animate-gradient-x">
            Health Enthusiast
          </span>
          <span className="text-xs text-gray-500">·</span>
          <span className="text-xs text-gray-500">Bergabung sejak 2 bulan lalu</span>
        </p>
        
        <div className="flex flex-wrap items-center gap-4 mb-6">
          {/* Points with animated counter */}
          <div className="flex items-center gap-2 badge py-2 px-4 shadow-md bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-200 rounded-lg transform transition-transform hover:scale-105">
            <div className="w-6 h-6 rounded-full bg-yellow-200 flex items-center justify-center">
              <span className="text-yellow-600 text-xs">⭐</span>
            </div>
            <span className="font-semibold text-sm text-yellow-700">{animatedPoints.toLocaleString()} Points</span>
          </div>
          
          {/* Courses badge */}
          <div className="flex items-center gap-2 badge py-2 px-4 shadow-md bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-lg transform transition-transform hover:scale-105">
            <div className="w-6 h-6 rounded-full bg-green-200 flex items-center justify-center">
              <span className="text-green-600 text-xs">📚</span>
            </div>
            <span className="font-semibold text-sm text-green-700">{completedCourses}/{totalCourses} Courses</span>
          </div>
          
          {/* Achievements badge */}
          <div className="flex items-center gap-2 badge py-2 px-4 shadow-md bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg transform transition-transform hover:scale-105">
            <div className="w-6 h-6 rounded-full bg-blue-200 flex items-center justify-center">
              <span className="text-blue-600 text-xs">🏆</span>
            </div>
            <span className="font-semibold text-sm text-blue-700">5 Achievements</span>
          </div>
        </div>
        
        {/* Progress bar with improved styling */}
        <div className="progress-container h-5 rounded-full bg-gray-100 overflow-hidden shadow-inner">
          <div 
            className="progress-bar h-full rounded-full relative bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 transition-all duration-1000 ease-out"
            style={{ width: `${progressPercentage}%` }}
            aria-valuenow={progressPercentage}
            aria-valuemin={0}
            aria-valuemax={100}
            role="progressbar"
            aria-label="Course completion progress"
          >
            <div className="absolute inset-0 bg-white/20 rounded-full overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
            </div>
            <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold drop-shadow-md">
              {progressPercentage.toFixed(0)}%
            </span>
          </div>
        </div>
        
        <div className="flex justify-between text-xs text-gray-500 mt-2 px-1">
          <span>Progres Pembelajaran</span>
          <span className="font-medium">{completedCourses} dari {totalCourses} kursus</span>
        </div>
      </div>
      
      <div className="flex flex-col gap-3 mt-4 md:mt-0">
        <button className="om-button om-button-primary transition-all duration-300 py-3 px-5 rounded-xl flex items-center justify-center hover:translate-y-[-3px] hover:shadow-lg group bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
          <span>Lihat Profil</span>
          <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity rounded-xl"></span>
        </button>
        
        <button className="om-button om-button-secondary transition-all duration-300 py-3 px-5 rounded-xl flex items-center justify-center hover:translate-y-[-3px] hover:shadow-lg group border border-blue-200 bg-white text-blue-700 hover:bg-blue-50">
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
