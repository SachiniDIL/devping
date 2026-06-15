'use client';

import { Site } from '@/lib/types';
import React from 'react';
import StatusBadge from './StatusBadge';

type SiteCardProps = {
  site: Site;
  onDelete: (id: string) => void;
  onPing: (id: string, url: string) => void;
};

const SiteCard: React.FC<SiteCardProps> = ({ site, onDelete, onPing }) => {
  return (
    <div
      className="rounded-xl p-5 flex flex-col gap-4 border transition-shadow hover:shadow-md"
      style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2
            className="text-base font-semibold leading-tight truncate"
            style={{ color: 'var(--foreground)' }}
          >
            {site.name}
          </h2>
          <p
            className="text-sm mt-0.5 truncate"
            style={{ color: 'var(--muted)' }}
          >
            {site.url}
          </p>
        </div>
        <StatusBadge status={site.status} />
      </div>

      <div
        className="flex items-center gap-6 text-xs"
        style={{ color: 'var(--muted)' }}
      >
        <span>
          <span className="font-medium">Last checked: </span>
          {site.lastChecked
            ? new Date(site.lastChecked).toLocaleString()
            : 'Never'}
        </span>
        <span>
          <span className="font-medium">Response: </span>
          {site.responseTime ? `${site.responseTime}ms` : '—'}
        </span>
      </div>

      <div className="flex items-center gap-2 pt-1">
        <button
          onClick={() => onPing(site.id, site.url)}
          className="flex-1 text-sm font-medium px-3 py-1.5 rounded-lg bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 transition-colors"
        >
          Ping
        </button>
        <button
          onClick={() => onDelete(site.id)}
          className="text-sm font-medium px-3 py-1.5 rounded-lg border hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
          style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default SiteCard;
