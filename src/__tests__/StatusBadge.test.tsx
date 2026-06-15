import StatusBadge from '@/components/StatusBadge';
import { render, screen } from '@testing-library/react';

describe('StatusBadge', () => {
  it('renders with correct status and styles', () => {
    render(<StatusBadge status="UP" />);
    const badge = screen.getByText('UP');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-emerald-50');
    expect(badge).toHaveClass('text-emerald-700');
  });
  it('renders with correct status and styles for DOWN', () => {
    render(<StatusBadge status="DOWN" />);
    const badge = screen.getByText('DOWN');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-red-50');
    expect(badge).toHaveClass('text-red-700');
  });
  it('renders with correct status and styles for PENDING', () => {
    render(<StatusBadge status="PENDING" />);
    const badge = screen.getByText('PENDING');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-amber-50');
    expect(badge).toHaveClass('text-amber-700');
  });

  it('renders with correct styles for unknown status', () => {
    render(<StatusBadge status={'UNKNOWN' as unknown as 'UP'} />);
    const badge = screen.getByText('UNKNOWN');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-slate-100');
    expect(badge).toHaveClass('text-slate-600');
  });

  it('renders with correct styles for lowercase status', () => {
    render(<StatusBadge status={'up' as unknown as 'UP'} />);
    const badge = screen.getByText('up');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-slate-100');
    expect(badge).toHaveClass('text-slate-600');
  });

  it('renders with correct styles for empty status', () => {
    const { container } = render(
      <StatusBadge status={'' as unknown as 'UP'} />
    );
    const badge = container.firstChild;
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-slate-100');
    expect(badge).toHaveClass('text-slate-600');
  });

  it('renders with correct styles for null status', () => {
    const { container } = render(
      <StatusBadge status={null as unknown as 'UP'} />
    );
    const badge = container.firstChild;
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-slate-100');
    expect(badge).toHaveClass('text-slate-600');
  });

  it('renders with correct styles for undefined status', () => {
    const { container } = render(
      <StatusBadge status={undefined as unknown as 'UP'} />
    );
    const badge = container.firstChild;
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-slate-100');
    expect(badge).toHaveClass('text-slate-600');
  });
});
