import React from 'react';
import '../../styles/userprofile-animations.css';

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  pointsReward: number;
  progress?: number;
  instructor?: string;
  onClick?: (id: string) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({
  id,
  title,
  description,
  image,
  category,
  duration,
  level,
  pointsReward,
  progress = 0,
  instructor,
  onClick
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick(id);
    }
  };

  const getLevelColors = (level: string) => {
    switch(level) {
      case 'Beginner':
        return 'from-green-500 to-green-600';
      case 'Intermediate':
        return 'from-yellow-500 to-yellow-600';
      case 'Advanced':
        return 'from-red-500 to-red-600';
      default:
        return 'from-blue-500 to-blue-600';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'Nutrisi': return '🥗';
      case 'Kardio': return '❤️';
      case 'Kesehatan Mental': return '🧠';
      case 'Imunologi': return '🦠';
      case 'Pertolongan Pertama': return '🚑';
      case 'Maternal': return '👶';
      default: return '📚';
    }
  };

  return (
    <div 
      className="course-card bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-500 hover:scale-[1.03] hover:translate-y-[-8px] hover:shadow-xl relative"
      onClick={handleClick}
    >
      {/* Top decorative border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
      
      <div className="relative overflow-hidden h-48 group">
        <img 
          src={image || 'https://via.placeholder.com/400x200'} 
          alt={title}
          className="course-image w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Points badge with animation */}
        <div className="absolute top-0 right-0 m-3 z-10 transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
          <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center shadow-xl point-badge">
            <span className="mr-1.5">⭐</span>
            <span className="whitespace-nowrap">{pointsReward} points</span>
          </span>
        </div>
        
        {/* Dark overlay with improved gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-70 pointer-events-none"></div>
        
        {/* Progress bar with animation */}
        {progress > 0 && (
          <div className="absolute bottom-0 left-0 right-0 py-2 px-4">
            <div className="flex justify-between items-center text-xs text-white mb-1">
              <span className="font-medium">Progress</span>
              <span className="font-bold">{progress}%</span>
            </div>
            <div className="progress-container bg-gray-700/70 h-3 rounded-full shadow-inner overflow-hidden backdrop-blur-sm">
              <div 
                className="progress-bar h-full rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 bg-size-200 animate-gradient-x"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}
        
        {/* Level badge with improved styling */}
        <div className="absolute top-0 left-0 m-3 transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-3deg]">
          <span className={`text-xs font-medium px-3 py-1.5 rounded-full shadow-md flex items-center space-x-1 bg-gradient-to-r ${getLevelColors(level)} text-white`}>
            {level === 'Beginner' && <span>🔰</span>}
            {level === 'Intermediate' && <span>📊</span>}
            {level === 'Advanced' && <span>🏆</span>}
            <span>{level}</span>
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <span className="text-xs font-medium text-[#228BE6] bg-blue-50 px-3 py-1.5 rounded-full shadow-sm border border-blue-100 flex items-center transform transition-transform hover:scale-105 hover:shadow">
            <span className="mr-1.5">{getCategoryIcon(category)}</span>
            {category}
          </span>
          <span className="flex items-center text-xs font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded-lg shadow-sm transform transition-transform hover:scale-105 hover:shadow">
            <span className="mr-1.5">⏱️</span>
            {duration}
          </span>
        </div>
        
        <h3 className="font-bold text-gray-800 text-xl mb-3 line-clamp-1 course-title group-hover:text-blue-600 transition-colors">{title}</h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
        
        {instructor && (
          <div className="flex items-center mt-4 pt-4 border-t border-gray-100">
            <div className="w-8 h-8 rounded-full overflow-hidden mr-3 bg-gray-200 flex-shrink-0">
              <img 
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(instructor)}&background=random`} 
                alt={instructor} 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-xs text-gray-500">Instructor</p>
              <p className="text-sm font-medium text-gray-800">{instructor}</p>
            </div>
            <div className="ml-auto">
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors flex items-center">
                Mulai
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
