import React from 'react';
import '../../styles/userprofile-animations.css';

interface LeaderboardUser {
  id: string;
  name: string;
  avatar: string;
  points: number;
  rank: number;
  isCurrentUser?: boolean;
}

interface LeaderboardProps {
  users: LeaderboardUser[];
  title?: string;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ 
  users, 
  title = "Leaderboard" 
}) => {
  return (
    <div className="bg-white rounded-xl shadow-xl p-6 om-card relative overflow-hidden transform transition-all duration-500 hover:shadow-2xl">
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 animate-gradient-x"></div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center relative">
          <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-1.5 h-6 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-full shadow-glow-yellow"></div>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center shadow-lg text-white mr-3 transform transition-transform hover:scale-110 hover:rotate-6 duration-300">
            <span className="text-xl">🏆</span>
          </div>
          <span className="bg-gradient-to-r from-yellow-600 to-yellow-400 bg-clip-text text-transparent animate-gradient-x">{title}</span>
        </h2>
        <button className="text-[#228BE6] hover:text-[#1c7ed6] text-sm font-medium transition-colors flex items-center group">
          <span className="relative group-hover:underline">Lihat Semua</span>
          <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      <div className="space-y-4">
        {users.map((user) => (
          <div 
            key={user.id}
            className={`leaderboard-item flex items-center p-4 rounded-xl border transform transition-all duration-300 hover:-translate-x-1 hover:shadow ${
              user.isCurrentUser 
                ? 'bg-gradient-to-r from-blue-50 to-white border-blue-200' 
                : 'bg-white border-gray-200 hover:bg-gray-50'
            } ${user.rank === 1 ? 'leaderboard-rank-1' : ''} 
               ${user.rank === 2 ? 'leaderboard-rank-2' : ''} 
               ${user.rank === 3 ? 'leaderboard-rank-3' : ''}`}
          >
            <div className="w-10 h-10 flex items-center justify-center font-bold text-gray-700">
              {user.rank === 1 && (
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 flex items-center justify-center shadow-md text-xl animate-pulse">
                  🥇
                </div>
              )}
              {user.rank === 2 && (
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center shadow-md text-xl transform transition-transform hover:scale-110 hover:rotate-6 duration-300">
                  🥈
                </div>
              )}
              {user.rank === 3 && (
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-yellow-600 to-yellow-800 flex items-center justify-center shadow-md text-xl transform transition-transform hover:scale-110 hover:rotate-6 duration-300">
                  🥉
                </div>
              )}
              {user.rank > 3 && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center shadow-md text-sm font-bold text-gray-700 transform transition-transform hover:scale-110 duration-300">
                  {user.rank}
                </div>
              )}
            </div>
            
            <div className="ml-4 flex-shrink-0 group">
              <div className={`w-12 h-12 rounded-full overflow-hidden shadow-md border-2 transform transition-all duration-300 group-hover:scale-105 ${
                user.rank === 1 ? 'border-yellow-400 group-hover:border-yellow-500' :
                user.rank === 2 ? 'border-gray-300 group-hover:border-gray-400' :
                user.rank === 3 ? 'border-yellow-700 group-hover:border-yellow-800' :
                user.isCurrentUser ? 'border-blue-400 group-hover:border-blue-500' : 'border-gray-200 group-hover:border-gray-300'
              }`}>
                <img 
                  src={user.avatar || 'https://via.placeholder.com/40'} 
                  alt={`${user.name}'s avatar`}
                  className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-300"
                />
              </div>
            </div>
            
            <div className="ml-4 flex-1">
              <p className={`font-medium ${
                user.rank === 1 ? 'text-yellow-700' :
                user.rank === 2 ? 'text-gray-700' :
                user.rank === 3 ? 'text-yellow-800' :
                user.isCurrentUser ? 'text-blue-700' : 'text-gray-800'
              }`}>
                {user.name} 
                {user.isCurrentUser && (
                  <span className="ml-2 inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 border border-blue-200">
                    Anda
                  </span>
                )}
              </p>
              <div className="flex items-center mt-1">
                <div className="flex-1 max-w-[120px]">
                  <div className="h-1.5 rounded-full bg-gray-100">
                    <div 
                      className={`h-full rounded-full ${
                        user.rank === 1 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' :
                        user.rank === 2 ? 'bg-gradient-to-r from-gray-400 to-gray-500' :
                        user.rank === 3 ? 'bg-gradient-to-r from-yellow-700 to-yellow-800' :
                        user.isCurrentUser ? 'bg-gradient-to-r from-blue-400 to-blue-500' : 'bg-gradient-to-r from-gray-400 to-gray-500'
                      }`}
                      style={{ width: `${(user.points / users[0].points) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <p className="ml-3 text-sm font-bold text-gray-700">
                  <span className={
                    user.rank === 1 ? 'text-yellow-600' :
                    user.rank === 2 ? 'text-gray-600' :
                    user.rank === 3 ? 'text-yellow-800' :
                    user.isCurrentUser ? 'text-blue-600' : 'text-gray-600'
                  }>{user.points.toLocaleString()}</span> points
                </p>
              </div>
            </div>
            
            <button className="ml-2 text-gray-400 hover:text-gray-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
            </button>
          </div>
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-[#228BE6] bg-blue-50 border border-blue-100 rounded-lg hover:bg-blue-100 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
          </svg>
          Tampilkan Lebih Banyak
        </button>
      </div>
    </div>
  );
};

export default Leaderboard;
