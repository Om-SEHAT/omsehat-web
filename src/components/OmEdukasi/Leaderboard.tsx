import React from 'react';

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
    <div className="bg-white rounded-xl shadow-xl p-6 om-card relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600"></div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center relative">
          <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-1.5 h-6 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-full shadow-glow-yellow"></div>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center shadow-lg text-white mr-3">
            <span className="text-xl">🏆</span>
          </div>
          <span className="bg-gradient-to-r from-yellow-600 to-yellow-400 bg-clip-text text-transparent">{title}</span>
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
            className={`leaderboard-item flex items-center p-4 rounded-xl border ${
              user.isCurrentUser 
                ? 'bg-blue-50 border-blue-200' 
                : 'bg-white border-gray-200 hover:bg-gray-50'
            } ${user.rank === 1 ? 'leaderboard-rank-1' : ''} 
               ${user.rank === 2 ? 'leaderboard-rank-2' : ''} 
               ${user.rank === 3 ? 'leaderboard-rank-3' : ''}`}
          >
            <div className="w-10 h-10 flex items-center justify-center font-bold text-gray-700">
              {user.rank === 1 && (
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 flex items-center justify-center shadow-md text-xl animate-pulse-subtle">
                  🥇
                </div>
              )}
              {user.rank === 2 && (
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center shadow-md text-xl">
                  🥈
                </div>
              )}
              {user.rank === 3 && (
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-yellow-600 to-yellow-800 flex items-center justify-center shadow-md text-xl">
                  🥉
                </div>
              )}
              {user.rank > 3 && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center shadow-md text-sm font-bold text-gray-700">
                  {user.rank}
                </div>
              )}
            </div>
            
            <div className="ml-4 flex-shrink-0">
              <div className={`w-12 h-12 rounded-full overflow-hidden shadow-md border-2 ${
                user.rank === 1 ? 'border-yellow-400' :
                user.rank === 2 ? 'border-gray-300' :
                user.rank === 3 ? 'border-yellow-700' :
                user.isCurrentUser ? 'border-blue-400' : 'border-gray-200'
              }`}>
                <img 
                  src={user.avatar || 'https://via.placeholder.com/40'} 
                  alt={`${user.name}'s avatar`}
                  className="w-full h-full object-cover transition-transform hover:scale-110 duration-300"
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
              <div className="w-full h-1 rounded-full bg-gray-100 mt-1">
                <div 
                  className={`h-full rounded-full ${
                    user.rank === 1 ? 'bg-gradient-to-r from-yellow-500 to-yellow-300' :
                    user.rank === 2 ? 'bg-gradient-to-r from-gray-400 to-gray-300' :
                    user.rank === 3 ? 'bg-gradient-to-r from-yellow-700 to-yellow-600' :
                    'bg-gradient-to-r from-blue-500 to-blue-300'
                  }`}
                  style={{ width: `${(user.points / users[0].points) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div className="flex items-center">
              <span className={`badge py-2 px-4 flex items-center shadow-md ${
                user.rank === 1 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white' :
                user.rank === 2 ? 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800' :
                user.rank === 3 ? 'bg-gradient-to-r from-yellow-600 to-yellow-700 text-white' :
                'bg-white text-gray-700'
              }`}>
                <span className={`mr-1.5 ${user.rank <= 3 ? 'text-white' : 'text-yellow-500'}`}>⭐</span>
                <span className={`font-bold ${user.rank <= 3 && user.rank !== 2 ? 'text-white' : 'text-gray-700'}`}>
                  {user.points.toLocaleString()}
                </span>
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <button className="om-button py-2 px-6 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px] flex items-center mx-auto">
          <span className="mr-2">Lihat Ranking Saya</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Leaderboard;
