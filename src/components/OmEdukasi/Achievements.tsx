import React from 'react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  progress?: number;
  totalRequired?: number;
  pointsReward: number;
  earnedDate?: string;
}

interface AchievementsProps {
  achievements: Achievement[];
}

const Achievements: React.FC<AchievementsProps> = ({ achievements }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Your Achievements</h2>
        <button className="text-[#228BE6] hover:underline text-sm font-medium">
          View All
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map((achievement) => (
          <div 
            key={achievement.id}
            className={`relative border rounded-lg p-4 transition-all ${
              achievement.earned 
                ? 'bg-gradient-to-br from-blue-50 to-white border-blue-200 achievement-unlocked' 
                : 'bg-gray-50 border-gray-200 opacity-75'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`badge w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                achievement.earned ? 'bg-[#228BE6] text-white' : 'bg-gray-200 text-gray-400'
              }`}>
                {achievement.icon}
              </div>
              
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 mb-1">{achievement.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{achievement.description}</p>
                
                {achievement.progress !== undefined && achievement.totalRequired && (
                  <div className="mb-2">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Progress</span>
                      <span>{achievement.progress}/{achievement.totalRequired}</span>
                    </div>
                    <div className="progress-container">
                      <div 
                        className="progress-bar" 
                        style={{ width: `${(achievement.progress / achievement.totalRequired) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                
                <div className="flex justify-between items-center text-xs">
                  <span className="flex items-center text-yellow-600">
                    <span className="mr-1">⭐</span>
                    {achievement.pointsReward} points
                  </span>
                  
                  {achievement.earned && achievement.earnedDate && (
                    <span className="text-green-600 font-medium">
                      Earned on {achievement.earnedDate}
                    </span>
                  )}
                </div>
              </div>
              
              {achievement.earned && (
                <div className="absolute -top-2 -right-2 bg-green-500 text-white p-1 rounded-full">
                  ✓
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;
