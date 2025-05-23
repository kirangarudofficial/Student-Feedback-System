import React from 'react';
import Layout from '../components/common/Layout';
import FeedbackForm from '../components/feedback/FeedbackForm';

const SubmitFeedbackPage: React.FC = () => {
  return (
    <Layout title="Submit Feedback">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Submit Feedback</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Your feedback helps us improve our courses and teaching methods. Please take a moment to share your thoughts.
        </p>
        
        <FeedbackForm />
      </div>
    </Layout>
  );
};

export default SubmitFeedbackPage;