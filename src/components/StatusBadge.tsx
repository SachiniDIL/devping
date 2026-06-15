import React from 'react';

type StatusBadgeProps = {
  status: 'UP' | 'DOWN' | 'PENDING';
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'UP':
        return {
          bg: 'bg-emerald-50',
          text: 'text-emerald-700',
          dot: 'bg-emerald-500',
        };
      case 'DOWN':
        return { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500' };
      case 'PENDING':
        return {
          bg: 'bg-amber-50',
          text: 'text-amber-700',
          dot: 'bg-amber-400',
        };
      default:
        return {
          bg: 'bg-slate-100',
          text: 'text-slate-600',
          dot: 'bg-slate-400',
        };
    }
  };

  const { bg, text, dot } = getStatusStyles();

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full shrink-0 ${bg} ${text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
      {status}
    </span>
  );
};

export default StatusBadge;
