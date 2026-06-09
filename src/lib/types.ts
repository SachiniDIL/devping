export interface Site {
  id: string;
  name: string;
  url: string;
  status: 'UP' | 'DOWN' | 'PENDING';
  lastChecked: string | null;
  responseTime: number | null;
}
