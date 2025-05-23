import React from 'react';
import { Clock, User, BookOpen, UserCheck } from 'lucide-react';
import { Feedback } from '../../types';

interface FeedbackCardProps {
  feedback: Feedback;
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({ feedback }) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  // Map courseId to course name
  const getCourseNameById = (id: string) => {
    const courses: Record<string, string> = {
      'cs101': 'CS101 - Introduction to Computer Science',
      'cs201': 'CS201 - Data Structures',
      'cs301': 'CS301 - Algorithms',
      'math101': 'MATH101 - Calculus I',
      'eng101': 'ENG101 - English Composition'
    };
    
    return courses[id] || id;
  };
  
  // Map instructorId to instructor name
  const getInstructorNameById = (id: string) => {
    const instructors: Record<string, string> = {
      'ins001': 'Dr. John Smith',
      'ins002': 'Prof. Jane Doe',
      'ins003': 'Dr. Robert Johnson',
      'ins004': 'Prof. Sarah Williams',
      'ins005': 'Dr. Michael Brown'
    };
    
    return instructors[id] || id;
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {feedback.studentName}
        </h3>
        <div className="flex items-center">
          {[...Array(5)].map((_, index) => (
            <svg
              key={index}
              className={`w-5 h-5 ${
                index < feedback.rating 
                  ? 'text-yellow-400' 
                  : 'text-gray-300 dark:text-gray-600'
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </div>
      
      <div className="space-y-3 mb-4">
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <BookOpen size={16} className="mr-2" />
          <span>{getCourseNameById(feedback.courseId)}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <UserCheck size={16} className="mr-2" />
          <span>{getInstructorNameById(feedback.instructorId)}</span>
        </div>
        
        {feedback.createdAt && (
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Clock size={16} className="mr-2" />
            <span>{formatDate(feedback.createdAt)}</span>
          </div>
        )}
      </div>
      
      {feedback.comments && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
            {feedback.comments}
          </p>
        </div>
      )}
    </div>
  );
};

export default FeedbackCard;