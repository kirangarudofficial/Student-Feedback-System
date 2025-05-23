import React, { useState, useEffect } from 'react';
import Layout from '../components/common/Layout';
import FeedbackList from '../components/feedback/FeedbackList';
import { Feedback } from '../types';
import { getAllFeedback } from '../services/api';
import { Search, Filter } from 'lucide-react';

const FeedbackPage: React.FC = () => {
  const [feedbackItems, setFeedbackItems] = useState<Feedback[]>([]);
  const [filteredItems, setFilteredItems] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  
  // Fetch feedback data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await getAllFeedback();
      
      if (response.success && response.data) {
        setFeedbackItems(response.data);
        setFilteredItems(response.data);
      } else {
        setError(response.error || 'Failed to fetch feedback');
      }
      
      setIsLoading(false);
    };
    
    fetchData();
  }, []);
  
  // Apply filters when search term or rating filter changes
  useEffect(() => {
    let filtered = [...feedbackItems];
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(item => 
        item.studentName.toLowerCase().includes(term) || 
        item.comments?.toLowerCase().includes(term)
      );
    }
    
    // Apply rating filter
    if (ratingFilter !== null) {
      filtered = filtered.filter(item => item.rating === ratingFilter);
    }
    
    setFilteredItems(filtered);
  }, [searchTerm, ratingFilter, feedbackItems]);
  
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
        }
      ];
      
      // Use timeout to simulate loading
      const timer = setTimeout(() => {
        setFeedbackItems(mockData);
        setFilteredItems(mockData);
        setIsLoading(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isLoading, feedbackItems.length]);
  
  const clearFilters = () => {
    setSearchTerm('');
    setRatingFilter(null);
  };
  
  return (
    <Layout title="All Feedback">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">All Feedback</h1>
          
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by student name or comments..."
                className="pl-10 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            
            <div className="flex items-center">
              <div className="mr-2">
                <Filter size={18} className="text-gray-500 dark:text-gray-400" />
              </div>
              <select
                value={ratingFilter === null ? '' : ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value === '' ? null : parseInt(e.target.value))}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
              
              {(searchTerm || ratingFilter !== null) && (
                <button
                  onClick={clearFilters}
                  className="ml-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
          
          <FeedbackList 
            feedbackItems={filteredItems} 
            isLoading={isLoading} 
            error={error} 
          />
          
          {!isLoading && !error && filteredItems.length === 0 && searchTerm && (
            <div className="text-center py-8">
              <p className="text-gray-600 dark:text-gray-400">
                No feedback entries match your search criteria.
              </p>
              <button
                onClick={clearFilters}
                className="mt-2 px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default FeedbackPage;