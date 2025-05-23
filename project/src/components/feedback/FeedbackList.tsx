import React from 'react';
import { Feedback } from '../../types';
import FeedbackCard from './FeedbackCard';

interface FeedbackListProps {
  feedbackItems: Feedback[];
  isLoading?: boolean;
  error?: string | null;
}

const FeedbackList: React.FC<FeedbackListProps> = ({ 
  feedbackItems, 
  isLoading = false,
  error = null
}) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">Loading feedback...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/30 p-6 rounded-lg">
        <p className="text-red-700 dark:text-red-300">{error}</p>
        <button 
          className="mt-2 px-4 py-2 bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-200 rounded-md hover:bg-red-200 dark:hover:bg-red-700 transition-colors duration-150"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }
  
  if (feedbackItems.length === 0) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800/50 p-8 rounded-lg text-center">
        <p className="text-gray-600 dark:text-gray-400">No feedback entries found.</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {feedbackItems.map((feedback, index) => (
        <FeedbackCard key={feedback._id || index} feedback={feedback} />
      ))}
    </div>
  );
};

export default FeedbackList;