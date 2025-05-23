import React from 'react';
import { Star } from 'lucide-react';

interface RatingInputProps {
  value: number;
  onChange: (value: number) => void;
  max?: number;
}

const RatingInput: React.FC<RatingInputProps> = ({ value, onChange, max = 5 }) => {
  return (
    <div className="flex items-center space-x-1">
      {[...Array(max)].map((_, index) => {
        const starValue = index + 1;
        
        return (
          <button
            key={index}
            type="button"
            onClick={() => onChange(starValue)}
            className={`transition-all duration-150 ${
              starValue <= value 
                ? 'text-yellow-400 hover:text-yellow-500' 
                : 'text-gray-300 dark:text-gray-600 hover:text-gray-400 dark:hover:text-gray-500'
            }`}
            aria-label={`Rate ${starValue} out of ${max}`}
          >
            <Star 
              size={28} 
              fill={starValue <= value ? "currentColor" : "none"}
            />
          </button>
        );
      })}
    </div>
  );
};

export default RatingInput;