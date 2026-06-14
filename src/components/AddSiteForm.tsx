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
      className="max-w-md mx-auto p-4 bg-white rounded shadow"
    >
      {error && <p className="text-red-500">{error}</p>}
      <div className="mb-3 ">
        <label htmlFor="name" className="p-2 text-sm font-medium text-gray-700">
          Name:
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError('');
          }}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="url" className="p-2 text-sm font-medium text-gray-700">
          URL:
        </label>
        <input
          type="text"
          id="url"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            setError('');
          }}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add Site
      </button>
    </form>
  );
}
