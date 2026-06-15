'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import AddSiteForm from '@/components/AddSiteForm';
import { Site } from '@/lib/types';
import SiteCard from '@/components/SiteCard';

export default function Home() {
  const queryClient = useQueryClient();

  const { data: sites = [], isLoading } = useQuery({
    queryKey: ['sites'],
    queryFn: () => fetch('/api/sites').then((res) => res.json()),
    refetchInterval: 30000,
  });

  const addMutation = useMutation({
    mutationFn: (data: { name: string; url: string }) =>
      fetch('/api/sites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then((res) => res.json()),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['sites'] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/sites/${id}`, {
        method: 'DELETE',
      }),
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ['sites'] });
      const previousSites = queryClient.getQueryData<Site[]>(['sites']);
      queryClient.setQueryData<Site[]>(['sites'], (old) =>
        old ? old.filter((site) => site.id !== id) : []
      );
      return { previousSites };
    },
    onError: (err, id, context) => {
      if (context?.previousSites) {
        queryClient.setQueryData<Site[]>(['sites'], context.previousSites);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['sites'] });
    },
  });

  const pingMutation = useMutation({
    mutationFn: (data: { id: string; url: string }) =>
      fetch(`/api/ping`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then((res) => res.json()),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['sites'] }),
  });

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">DevPing</h1>
      <AddSiteForm
        onSubmit={(name, url) => addMutation.mutate({ name, url })}
      />
      {isLoading && <p className="mt-6 text-gray-500">Loading...</p>}
      <div className="mt-6 flex flex-col gap-4">
        {sites.map((site: Site) => (
          <SiteCard
            key={site.id}
            site={site}
            onDelete={(id) => deleteMutation.mutate(id)}
            onPing={(id, url) => pingMutation.mutate({ id, url })}
          />
        ))}
      </div>
    </main>
  );
}
