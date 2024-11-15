import React from 'react';
import { format } from 'date-fns';
import { PriorityType, StatusType, Issue } from '@/types/types';
import { Clock, Calendar } from 'lucide-react';

const getStatusStyles = (status: StatusType) => {
  switch (status) {
    case 'OPEN':
      return 'bg-blue-100 text-blue-700 font-semibold';
    case 'IN_PROGRESS':
      return 'bg-yellow-100 text-yellow-700 font-semibold';
    case 'IN_REVIEW':
      return 'bg-purple-100 text-purple-700 font-semibold';
    case 'CLOSED':
      return 'bg-green-100 text-green-700 font-semibold line-through';
    default:
      return 'bg-gray-100 text-gray-700 font-semibold';
  }
};

const getPriorityBgStyles = (priority: PriorityType) => {
  switch (priority) {
    case 'LOW':
      return 'border-green-300'; // Light green for low-priority tasks
    case 'MEDIUM':
      return 'border-yellow-300'; // Light yellow for medium-priority tasks
    case 'HIGH':
      return 'border-orange-300'; // Light orange for high-priority tasks
    case 'URGENT':
      return 'border-red-300'; // Light red for urgent tasks
    default:
      return 'border-gray-300'; // Default light gray for unknown priority
  }
};

const getPriorityStyles = (priority: PriorityType) => {
  switch (priority) {
    case 'LOW':
      return 'text-green-700 font-light';
    case 'MEDIUM':
      return 'text-yellow-700 font-semibold';
    case 'HIGH':
      return 'text-orange-700 font-semibold';
    case 'URGENT':
      return 'text-red-800 font-bold uppercase';
    default:
      return 'text-gray-700 font-light';
  }
};

const IssueCard = ({ issue }: { issue: Issue }) => {
  return (
    <div className={`shadow-lg rounded-lg p-5 mb-4 border-t-2 bg-white text-sm h-64 flex flex-col justify-between ${getPriorityBgStyles(issue.priority)}`}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-gray-800 truncate">{issue.title}</h3>
        <h4>{issue.id}</h4>
        <span className={`text-xs px-2 py-0.5 rounded ${getStatusStyles(issue.status)}`}>
          {issue.status.replace('_', ' ')}
        </span>
      </div>

      <p className="text-gray-600 mb-3 line-clamp-2 overflow-hidden">{issue.description}</p>

      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
        <div className="flex items-center">
          <span className="font-semibold text-gray-700">Assignee:</span>
          <span className="ml-1 text-gray-800 truncate">{issue.assigneeId}</span>
        </div>
        <div className="flex items-center">
          <span className="font-semibold text-gray-700">Type:</span>
          <span className="ml-1 text-gray-800 truncate">{issue.type}</span>
        </div>
        <div className="flex items-center">
          <span className="font-semibold text-gray-700">Priority:</span>
          <span className={`ml-1 px-2 py-0.5 rounded ${getPriorityStyles(issue.priority)}`}>
            {issue.priority}
          </span>
        </div>
        <div className="flex items-center">
          <span className="font-semibold text-gray-700">Project ID:</span>
          <span className="ml-1 text-gray-800 truncate">{issue.projectId}</span>
        </div>
      </div>

      <div className="mt-2 text-gray-500 text-xs flex items-center justify-between">
        <div className="flex items-center">
          <Calendar size={14} className="mr-1 text-gray-500" />
          <span>{format(new Date(issue.createdAt), 'yyyy-MM-dd')}</span>
        </div>
        <div className="flex items-center">
          <Clock size={14} className="mr-1 text-gray-500" />
          <span>{format(new Date(issue.updatedAt), 'yyyy-MM-dd')}</span>
        </div>
      </div>
    </div>
  );
};

export default IssueCard;
