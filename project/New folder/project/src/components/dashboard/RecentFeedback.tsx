import React from 'react';
import { Feedback } from '../../types';
import FeedbackCard from '../feedback/FeedbackCard';

interface RecentFeedbackProps {
  feedbackItems: Feedback[];
  limit?: number;
}

const RecentFeedback: React.FC<RecentFeedbackProps> = ({ feedbackItems, limit = 3 }) => {
  // Sort feedback by date (most recent first) and limit the number
  const recentItems = [...feedbackItems]
    .sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA;
    })
    .slice(0, limit);
  
  if (feedbackItems.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Feedback</h2>
        <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-md text-center">
          <p className="text-gray-600 dark:text-gray-400">No feedback available yet.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Feedback</h2>
      <div className="space-y-4">
        {recentItems.map((feedback, index) => (
          <div 
            key={feedback._id || index}
            className={index < recentItems.length - 1 ? "pb-4 border-b border-gray-200 dark:border-gray-700" : ""}
          >
            <FeedbackCard feedback={feedback} />
          </div>
        ))}
      </div>
      {feedbackItems.length > limit && (
        <div className="mt-4 text-center">
          <a 
            href="/feedback"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
          >
            View all feedback
          </a>
        </div>
      )}
    </div>
  );
};

export default RecentFeedback;