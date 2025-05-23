import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, color }) => {
  // Map color string to Tailwind classes
  const getColorClasses = (colorName: string) => {
    const colorMap: Record<string, { bg: string, text: string, iconBg: string }> = {
      blue: {
        bg: 'bg-blue-50 dark:bg-blue-900/20',
        text: 'text-blue-700 dark:text-blue-300',
        iconBg: 'bg-blue-100 dark:bg-blue-800'
      },
      green: {
        bg: 'bg-green-50 dark:bg-green-900/20',
        text: 'text-green-700 dark:text-green-300',
        iconBg: 'bg-green-100 dark:bg-green-800'
      },
      amber: {
        bg: 'bg-amber-50 dark:bg-amber-900/20',
        text: 'text-amber-700 dark:text-amber-300',
        iconBg: 'bg-amber-100 dark:bg-amber-800'
      },
      purple: {
        bg: 'bg-purple-50 dark:bg-purple-900/20',
        text: 'text-purple-700 dark:text-purple-300',
        iconBg: 'bg-purple-100 dark:bg-purple-800'
      },
      pink: {
        bg: 'bg-pink-50 dark:bg-pink-900/20',
        text: 'text-pink-700 dark:text-pink-300',
        iconBg: 'bg-pink-100 dark:bg-pink-800'
      }
    };
    
    return colorMap[colorName] || colorMap.blue;
  };
  
  const colorClasses = getColorClasses(color);
  
  return (
    <div className={`rounded-lg p-6 ${colorClasses.bg} transition-all duration-200 hover:shadow-md`}>
      <div className="flex items-center">
        <div className={`p-3 rounded-full ${colorClasses.iconBg} mr-4`}>
          <Icon size={24} className={colorClasses.text} />
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
          <p className={`text-2xl font-semibold ${colorClasses.text}`}>{value}</p>
        </div>
      </div>
    </div>
  );
};

export default StatCard;