import React from 'react';

type StatusBadgeProps = {
  status: 'UP' | 'DOWN' | 'PENDING';
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'UP':
        return 'bg-green-100';
      case 'DOWN':
        return 'bg-red-100';
      case 'PENDING':
        return 'bg-yellow-100';
      default:
        return 'bg-gray-100';
    }
  };

  const getStatusTextColor = () => {
    switch (status) {
      case 'UP':
        return 'text-green-700';
      case 'DOWN':
        return 'text-red-700';
      case 'PENDING':
        return 'text-yellow-700';
      default:
        return 'text-gray-700';
    }
  };

  return (
    <span
      className={`inline-block px-2 py-1 text-sm font-semibold ${getStatusTextColor()} rounded ${getStatusColor()}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
