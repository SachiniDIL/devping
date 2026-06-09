import fs from 'fs';
import path from 'path';
import { Site } from './types';

const dataPath = path.join(process.cwd(), 'data', 'sites.json');

export function getSites(): Site[] {
  const rawData = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(rawData);
}

export function addSite(name: string, url: string): Site {
  const newSite: Site = {
    id: crypto.randomUUID(),
    name,
    url,
    status: 'PENDING',
    lastChecked: null,
    responseTime: null,
  };
  const sites = getSites();
  sites.push(newSite);
  fs.writeFileSync(dataPath, JSON.stringify(sites, null, 2));
  return newSite;
}

export function deleteSite(id: string): void {
  const sites = getSites();
  const index = sites.findIndex((site) => site.id === id);
  if (index !== -1) {
    sites.splice(index, 1);
    fs.writeFileSync(dataPath, JSON.stringify(sites, null, 2));
  }
}

export function updateSiteStatus(
  id: string,
  status: 'UP' | 'DOWN' | 'PENDING',
  responseTime?: number
): void {
  const sites = getSites();
  const site = sites.find((site) => site.id === id);
  if (site) {
    site.status = status;
    site.lastChecked = new Date().toISOString();
    if (responseTime !== undefined) {
      site.responseTime = responseTime;
    }
    fs.writeFileSync(dataPath, JSON.stringify(sites, null, 2));
  }
}
