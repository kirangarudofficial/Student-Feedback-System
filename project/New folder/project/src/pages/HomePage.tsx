import React from 'react';
import Layout from '../components/common/Layout';
import FeedbackForm from '../components/feedback/FeedbackForm';
import { ChevronRight } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-12">
          <div className="animate-fadeIn">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Student Feedback System
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
              Your voice matters! Share your thoughts and help us improve the learning experience.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 mt-0.5">
                  <ChevronRight size={16} />
                </div>
                <p className="ml-3 text-base text-gray-600 dark:text-gray-300">
                  <strong>Anonymous feedback</strong> - Your identity is protected
                </p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 mt-0.5">
                  <ChevronRight size={16} />
                </div>
                <p className="ml-3 text-base text-gray-600 dark:text-gray-300">
                  <strong>Easy to use</strong> - Simple form with rating system
                </p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 mt-0.5">
                  <ChevronRight size={16} />
                </div>
                <p className="ml-3 text-base text-gray-600 dark:text-gray-300">
                  <strong>Make an impact</strong> - Help improve courses and teaching methods
                </p>
              </div>
            </div>
            <div className="mt-8">
              <a
                href="/dashboard"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-150"
              >
                View Dashboard
              </a>
              <a
                href="/feedback"
                className="ml-4 inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-150"
              >
                View Feedback
              </a>
            </div>
          </div>
          
          <div className="lg:mt-0 mt-6">
            <FeedbackForm />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;