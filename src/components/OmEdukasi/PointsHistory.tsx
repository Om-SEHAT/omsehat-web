import React from 'react';

interface PointTransaction {
  id: string;
  activity: string;
  points: number;
  date: string;
  isPositive: boolean;
  category: 'Course Completion' | 'Quiz' | 'Daily Login' | 'Achievement' | 'Other';
}

interface PointsHistoryProps {
  transactions: PointTransaction[];
}

const PointsHistory: React.FC<PointsHistoryProps> = ({ transactions }) => {
  // Calculate total points
  const totalPoints = transactions.reduce((sum, transaction) => {
    return sum + (transaction.isPositive ? transaction.points : -transaction.points);
  }, 0);

  // Category icons
  const categoryIcons = {
    'Course Completion': '📚',
    'Quiz': '✏️',
    'Daily Login': '📅',
    'Achievement': '🏆',
    'Other': '⭐'
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Points History</h2>
        <div className="flex items-center bg-yellow-100 text-yellow-800 px-3 py-1 rounded-lg">
          <span className="mr-2">⭐</span>
          <span className="font-bold">{totalPoints} Total Points</span>
        </div>
      </div>
      
      <div className="space-y-3">
        {transactions.map((transaction) => (
          <div 
            key={transaction.id}
            className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-xl">
              {categoryIcons[transaction.category]}
            </div>
            
            <div className="ml-4 flex-1">
              <p className="font-medium text-gray-800">{transaction.activity}</p>
              <p className="text-xs text-gray-500">{transaction.date} • {transaction.category}</p>
            </div>
            
            <div className={`font-bold ${transaction.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {transaction.isPositive ? '+' : '-'}{transaction.points}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-center">
        <button className="text-[#228BE6] hover:underline text-sm font-medium">
          View Complete History
        </button>
      </div>
    </div>
  );
};

export default PointsHistory;
