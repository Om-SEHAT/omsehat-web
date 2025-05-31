import React from 'react';

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

  return (
    <div 
      className="course-card bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-500 hover:scale-[1.03] hover:translate-y-[-8px]"
      onClick={handleClick}
    >
      <div className="relative overflow-hidden h-48">
        <img 
          src={image || 'https://via.placeholder.com/400x200'} 
          alt={title}
          className="course-image w-full h-full object-cover transition-transform duration-700"
        />
        <div className="absolute top-0 right-0 m-3 z-10">
          <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center shadow-xl point-badge">
            <span className="mr-1.5">⭐</span>
            <span className="whitespace-nowrap">{pointsReward} points</span>
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-80 pointer-events-none"></div>
        {progress > 0 && (
          <div className="absolute bottom-0 left-0 right-0 py-2 px-4">
            <div className="flex justify-between items-center text-xs text-white mb-1">
              <span className="font-medium">Progress</span>
              <span className="font-bold">{progress}%</span>
            </div>
            <div className="progress-container bg-gray-700 h-3 rounded-full shadow-inner overflow-hidden">
              <div 
                className="progress-bar h-full rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}
        <div className="absolute top-0 left-0 m-3">
          <span className={`text-xs font-medium px-3 py-1.5 rounded-full shadow-md flex items-center space-x-1 ${
            level === 'Beginner' ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' : 
            level === 'Intermediate' ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white' : 
            'bg-gradient-to-r from-red-500 to-red-600 text-white'
          }`}>
            {level === 'Beginner' && <span>🔰</span>}
            {level === 'Intermediate' && <span>📊</span>}
            {level === 'Advanced' && <span>🏆</span>}
            <span>{level}</span>
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <span className="text-xs font-medium text-[#228BE6] bg-blue-50 px-3 py-1.5 rounded-full shadow-sm border border-blue-100 flex items-center">
            <span className="mr-1.5">{
              category === 'Nutrisi' ? '🥗' :
              category === 'Kardio' ? '❤️' :
              category === 'Kesehatan Mental' ? '🧠' :
              category === 'Imunologi' ? '🦠' :
              category === 'Pertolongan Pertama' ? '🚑' :
              category === 'Maternal' ? '👶' : '📚'
            }</span>
            {category}
          </span>
          <span className="flex items-center text-xs font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded-lg shadow-sm">
            <span className="mr-1.5">⏱️</span>
            {duration}
          </span>
        </div>
        
        <h3 className="font-bold text-gray-800 text-xl mb-3 line-clamp-1 course-title">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
        
        {instructor && (
          <div className="flex items-center pt-3 border-t border-gray-100">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2 text-blue-600 shadow-sm">
              👨‍⚕️
            </div>
            <div className="overflow-hidden">
              <span className="text-xs text-gray-500 block">Instruktur</span>
              <span className="text-sm font-medium text-gray-800 truncate block">{instructor}</span>
            </div>
          </div>
        )}
      </div>
      
      {progress === 0 && (
        <div className="px-6 pb-6 mt-[-10px]">
          <button className="w-full py-3 bg-gradient-to-r from-[#228BE6] to-[#1976D2] text-white rounded-xl font-medium hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:translate-y-[-3px] relative overflow-hidden group">
            <span className="relative z-10 flex items-center">
              <span className="mr-2">Mulai Belajar</span>
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></span>
          </button>
        </div>
      )}
      
      {progress > 0 && progress < 100 && (
        <div className="px-6 pb-6 mt-[-10px]">
          <button className="w-full py-3 bg-gradient-to-r from-[#228BE6] to-[#1976D2] text-white rounded-xl font-medium hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:translate-y-[-3px] relative overflow-hidden group">
            <span className="relative z-10 flex items-center">
              <span className="mr-2">Lanjutkan</span>
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></span>
          </button>
        </div>
      )}
      
      {progress === 100 && (
        <div className="px-6 pb-6 mt-[-10px]">
          <button className="w-full py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-medium hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:translate-y-[-3px] relative overflow-hidden group">
            <span className="relative z-10 flex items-center">
              <span className="mr-2">Selesai</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </span>
            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></span>
          </button>
        </div>
      )}
    </div>
  );
};

export default CourseCard;
