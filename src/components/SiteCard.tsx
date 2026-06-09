'use client';

import { Site } from '@/lib/types';
import React from 'react';
import StatusBadge from './StatusBadge';

type SiteCardProps = {
  site: Site;
  onDelete: (id: string) => void;
};

const SiteCard: React.FC<SiteCardProps> = ({ site, onDelete }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold mb-2">{site.name}</h2>
          <p className="text-gray-600 mb-4">{site.url}</p>
        </div>
        <StatusBadge status={site.status} />
      </div>

      <div className="mb-4 text-sm">
        <p className="text-gray-600">
          Last Checked:{' '}
          {site.lastChecked
            ? new Date(site.lastChecked).toLocaleString()
            : 'Never Checked'}
        </p>
        <p className="text-gray-600">
          Response Time: {site.responseTime ? `${site.responseTime}ms` : '-'}
        </p>
      </div>

      <button
        onClick={() => onDelete(site.id)}
        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
      >
        Delete
      </button>
    </div>
  );
};

export default SiteCard;
