import React, { useState, useEffect } from 'react';
import Layout from '../components/common/Layout';
import StatCard from '../components/dashboard/StatCard';
import RatingDistribution from '../components/dashboard/RatingDistribution';
import RecentFeedback from '../components/dashboard/RecentFeedback';
import { Feedback } from '../types';
import { getAllFeedback } from '../services/api';
import { Users, BookOpen, Star, MessageSquare } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const [feedbackItems, setFeedbackItems] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch feedback data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await getAllFeedback();
      
      if (response.success && response.data) {
        setFeedbackItems(response.data);
      } else {
        setError(response.error || 'Failed to fetch feedback');
      }
      
      setIsLoading(false);
    };
    
    fetchData();
  }, []);
  
  // For demo purposes - mock data if API fails or while loading
  useEffect(() => {
    if (isLoading && feedbackItems.length === 0) {
      // This is just for demo/development purposes
      const mockData: Feedback[] = [
        {
          _id: '1',
          studentName: 'Alex Johnson',
          courseId: 'cs101',
          instructorId: 'ins001',
          rating: 5,
          comments: 'Excellent course! The professor was very knowledgeable and explained concepts clearly.',
          createdAt: new Date().toISOString()
        },
        {
          _id: '2',
          studentName: 'Sarah Williams',
          courseId: 'math101',
          instructorId: 'ins004',
          rating: 4,
          comments: 'Good course overall. Some topics were rushed but the materials were helpful.',
          createdAt: new Date(Date.now() - 86400000).toISOString() // 1 day ago
        },
        {
          _id: '3',
          studentName: 'Michael Brown',
          courseId: 'cs201',
          instructorId: 'ins002',
          rating: 3,
          comments: 'Average course. The assignments were challenging but sometimes unclear.',
          createdAt: new Date(Date.now() - 172800000).toISOString() // 2 days ago
        },
        {
          _id: '4',
          studentName: 'Emily Davis',
          courseId: 'eng101',
          instructorId: 'ins005',
          rating: 5,
          comments: 'One of the best courses I\'ve taken. The discussions were engaging and thought-provoking.',
          createdAt: new Date(Date.now() - 259200000).toISOString() // 3 days ago
        },
        {
          _id: '5',
          studentName: 'David Miller',
          courseId: 'cs301',
          instructorId: 'ins003',
          rating: 2,
          comments: 'The course content was good but the teaching pace was too fast for most students to follow.',
          createdAt: new Date(Date.now() - 345600000).toISOString() // 4 days ago
        }
      ];
      
      // Use timeout to simulate loading
      const timer = setTimeout(() => {
        setFeedbackItems(mockData);
        setIsLoading(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isLoading, feedbackItems.length]);
  
  // Calculate stats
  const totalFeedback = feedbackItems.length;
  
  const uniqueStudents = new Set(
    feedbackItems.map(item => item.studentName)
  ).size;
  
  const uniqueCourses = new Set(
    feedbackItems.map(item => item.courseId)
  ).size;
  
  const averageRating = feedbackItems.length > 0
    ? (feedbackItems.reduce((sum, item) => sum + item.rating, 0) / feedbackItems.length).toFixed(1)
    : '0.0';
  
  if (isLoading) {
    return (
      <Layout title="Dashboard">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }
  
  if (error) {
    return (
      <Layout title="Dashboard">
        <div className="bg-red-50 dark:bg-red-900/30 p-6 rounded-lg">
          <p className="text-red-700 dark:text-red-300">{error}</p>
          <button 
            className="mt-2 px-4 py-2 bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-200 rounded-md hover:bg-red-200 dark:hover:bg-red-700 transition-colors duration-150"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout title="Dashboard">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Dashboard</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Total Feedback" 
            value={totalFeedback} 
            icon={MessageSquare} 
            color="blue" 
          />
          <StatCard 
            title="Unique Students" 
            value={uniqueStudents} 
            icon={Users} 
            color="green" 
          />
          <StatCard 
            title="Courses Reviewed" 
            value={uniqueCourses} 
            icon={BookOpen} 
            color="amber" 
          />
          <StatCard 
            title="Average Rating" 
            value={`${averageRating}/5`} 
            icon={Star} 
            color="purple" 
          />
        </div>
        
        {/* Charts and Recent Feedback */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <RatingDistribution feedbackItems={feedbackItems} />
          <RecentFeedback feedbackItems={feedbackItems} />
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;