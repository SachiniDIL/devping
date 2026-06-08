import { addSite, getSites } from '@/lib/store';
import { NextResponse } from 'next/server';

export async function GET() {
  let sites;
  try {
    sites = getSites();
  } catch (error) {
    console.error('Error fetching sites:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sites' },
      { status: 500 }
    );
  }

  return NextResponse.json(sites);
}

export async function POST(request: Request) {
  try {
    const { name, url } = await request.json();
    if (!name || !url) {
      return NextResponse.json(
        { error: 'Name and URL are required' },
        { status: 400 }
      );
    }
    const newSite = addSite(name, url);
    return NextResponse.json(newSite, { status: 201 });
  } catch (error) {
    console.error('Error adding site:', error);
    return NextResponse.json({ error: 'Failed to add site' }, { status: 500 });
  }
}
