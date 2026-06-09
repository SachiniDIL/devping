import StatusBadge from '@/components/StatusBadge';
import { render, screen } from '@testing-library/react';

describe('StatusBadge', () => {
  it('renders with correct status and styles', () => {
    render(<StatusBadge status="UP" />);
    const badge = screen.getByText('UP');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-green-100');
    expect(badge).toHaveClass('text-green-700');
  });
  it('renders with correct status and styles for DOWN', () => {
    render(<StatusBadge status="DOWN" />);
    const badge = screen.getByText('DOWN');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-red-100');
    expect(badge).toHaveClass('text-red-700');
  });
  it('renders with correct status and styles for PENDING', () => {
    render(<StatusBadge status="PENDING" />);
    const badge = screen.getByText('PENDING');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-yellow-100');
    expect(badge).toHaveClass('text-yellow-700');
  });
});
