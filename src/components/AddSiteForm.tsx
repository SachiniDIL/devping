'use client';

import { useState } from 'react';

type AddSiteFormProps = {
  onSubmit: (name: string, url: string) => void;
};

export default function AddSiteForm({ onSubmit }: AddSiteFormProps) {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedUrl = url.trim();
    if (!trimmedName || !trimmedUrl) {
      setError('Please fill in all fields.');
      return;
    }
    try {
      new URL(trimmedUrl);
    } catch {
      setError('Please enter a valid URL.');
      return;
    }
    onSubmit(trimmedName, trimmedUrl);
    setName('');
    setUrl('');
    setError('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl p-5 border"
      style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
    >
      {error && (
        <div className="mb-4 flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          <span>⚠</span>
          <span>{error}</span>
        </div>
      )}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <label
            htmlFor="name"
            className="block text-xs font-medium mb-1.5"
            style={{ color: 'var(--muted)' }}
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            placeholder="My API"
            onChange={(e) => {
              setName(e.target.value);
              setError('');
            }}
            className="w-full rounded-lg px-3 py-2 text-sm border outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            style={{
              background: 'var(--background)',
              borderColor: 'var(--border)',
              color: 'var(--foreground)',
            }}
          />
        </div>
        <div className="flex-[2]">
          <label
            htmlFor="url"
            className="block text-xs font-medium mb-1.5"
            style={{ color: 'var(--muted)' }}
          >
            URL
          </label>
          <input
            type="text"
            id="url"
            value={url}
            placeholder="https://example.com"
            onChange={(e) => {
              setUrl(e.target.value);
              setError('');
            }}
            className="w-full rounded-lg px-3 py-2 text-sm border outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            style={{
              background: 'var(--background)',
              borderColor: 'var(--border)',
              color: 'var(--foreground)',
            }}
          />
        </div>
        <div className="flex items-end">
          <button
            type="submit"
            className="w-full sm:w-auto px-5 py-2 text-sm font-medium bg-blue-500 text-white rounded-lg hover:bg-blue-600 active:bg-blue-700 transition-colors"
          >
            Add Site
          </button>
        </div>
      </div>
    </form>
  );
}
