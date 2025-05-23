import React, { useMemo } from 'react';
import { Feedback } from '../../types';

interface RatingDistributionProps {
  feedbackItems: Feedback[];
}

const RatingDistribution: React.FC<RatingDistributionProps> = ({ feedbackItems }) => {
  // Calculate rating distribution
  const distribution = useMemo(() => {
    const counts = [0, 0, 0, 0, 0]; // For ratings 1-5
    
    feedbackItems.forEach(item => {
      if (item.rating >= 1 && item.rating <= 5) {
        counts[item.rating - 1]++;
      }
    });
    
    const total = counts.reduce((sum, count) => sum + count, 0);
    
    // Calculate percentages and prepare data
    return counts.map((count, index) => ({
      rating: index + 1,
      count,
      percentage: total > 0 ? Math.round((count / total) * 100) : 0
    }));
  }, [feedbackItems]);
  
  // Calculate average rating
  const averageRating = useMemo(() => {
    if (feedbackItems.length === 0) return 0;
    
    const sum = feedbackItems.reduce((total, item) => total + item.rating, 0);
    return (sum / feedbackItems.length).toFixed(1);
  }, [feedbackItems]);
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Rating Distribution</h2>
        <div className="flex items-center">
          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{averageRating}</span>
          <div className="ml-2 text-yellow-400">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
            ({feedbackItems.length} {feedbackItems.length === 1 ? 'rating' : 'ratings'})
          </span>
        </div>
      </div>
      
      <div className="space-y-4">
        {distribution.map((item, index) => (
          <div key={index} className="flex items-center">
            <div className="w-10 text-sm text-gray-600 dark:text-gray-400 text-right mr-2">
              {item.rating} ★
            </div>
            <div className="flex-1 h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-yellow-400"
                style={{ width: `${item.percentage}%` }}
              ></div>
            </div>
            <div className="w-14 text-sm text-gray-600 dark:text-gray-400 text-right ml-2">
              {item.percentage}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingDistribution;