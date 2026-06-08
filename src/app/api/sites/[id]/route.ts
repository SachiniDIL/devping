import { deleteSite } from '@/lib/store';
import { NextResponse } from 'next/server';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    deleteSite(id);
    return NextResponse.json(
      { message: 'Site deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting site:', error);
    return NextResponse.json(
      { error: 'Failed to delete site' },
      { status: 500 }
    );
  }
}
