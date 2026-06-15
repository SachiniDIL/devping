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
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      <header
        className="border-b"
        style={{ borderColor: 'var(--border)', background: 'var(--card)' }}
      >
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center gap-3">
          <span className="text-2xl">📡</span>
          <div>
            <h1
              className="text-xl font-bold leading-none"
              style={{ color: 'var(--foreground)' }}
            >
              DevPing
            </h1>
            <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>
              Site uptime monitor
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2
            className="text-sm font-semibold uppercase tracking-wider mb-4"
            style={{ color: 'var(--muted)' }}
          >
            Add a site
          </h2>
          <AddSiteForm
            onSubmit={(name, url) => addMutation.mutate({ name, url })}
          />
        </div>

        <div>
          <h2
            className="text-sm font-semibold uppercase tracking-wider mb-4"
            style={{ color: 'var(--muted)' }}
          >
            Monitored Sites
            {sites.length > 0 && (
              <span
                className="ml-2 font-normal normal-case text-xs px-2 py-0.5 rounded-full"
                style={{ background: 'var(--border)', color: 'var(--muted)' }}
              >
                {sites.length}
              </span>
            )}
          </h2>
          {isLoading && (
            <div
              className="flex items-center gap-2 py-8 justify-center"
              style={{ color: 'var(--muted)' }}
            >
              <span className="inline-block w-4 h-4 border-2 rounded-full border-current border-t-transparent animate-spin" />
              <span className="text-sm">Loading sites…</span>
            </div>
          )}
          {!isLoading && sites.length === 0 && (
            <div
              className="text-center py-16 rounded-xl border-2 border-dashed"
              style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}
            >
              <p className="text-sm">
                No sites yet. Add one above to start monitoring.
              </p>
            </div>
          )}
          <div className="flex flex-col gap-3">
            {sites.map((site: Site) => (
              <SiteCard
                key={site.id}
                site={site}
                onDelete={(id) => deleteMutation.mutate(id)}
                onPing={(id, url) => pingMutation.mutate({ id, url })}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
