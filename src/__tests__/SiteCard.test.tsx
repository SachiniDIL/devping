import SiteCard from '@/components/SiteCard';
import { Site } from '@/lib/types';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('SiteCard', () => {
  const mockSite: Site = {
    id: '1',
    name: 'Test Site',
    url: 'https://testsite.com',
    status: 'UP',
    lastChecked: '2024-06-01T12:00:00Z',
    responseTime: 120,
  };

  it('renders site information correctly', () => {
    const onDelete = jest.fn();
    const onPing = jest.fn();
    render(<SiteCard site={mockSite} onDelete={onDelete} onPing={onPing} />);
    expect(screen.getByText('Test Site')).toBeInTheDocument();
    expect(screen.getByText('https://testsite.com')).toBeInTheDocument();
    expect(screen.getByText('Last checked:')).toBeInTheDocument();
    expect(screen.getByText('Response:').parentElement?.textContent).toBe(
      'Response: 120ms'
    );
  });

  it('calls onDelete when delete button is clicked', async () => {
    const onDelete = jest.fn();
    const onPing = jest.fn();
    render(<SiteCard site={mockSite} onDelete={onDelete} onPing={onPing} />);
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: /delete/i }));
    expect(onDelete).toHaveBeenCalledWith('1');
  });

  it('displays "Never" when lastChecked is null', () => {
    const siteWithoutLastChecked: Site = { ...mockSite, lastChecked: null };
    const onDelete = jest.fn();
    const onPing = jest.fn();
    render(
      <SiteCard
        site={siteWithoutLastChecked}
        onDelete={onDelete}
        onPing={onPing}
      />
    );
    expect(screen.getByText('Last checked:').parentElement?.textContent).toBe(
      'Last checked: Never'
    );
  });

  it('displays "—" when responseTime is null', () => {
    const siteWithoutResponseTime: Site = { ...mockSite, responseTime: null };
    const onDelete = jest.fn();
    const onPing = jest.fn();
    render(
      <SiteCard
        site={siteWithoutResponseTime}
        onDelete={onDelete}
        onPing={onPing}
      />
    );
    expect(screen.getByText('Response:').parentElement?.textContent).toBe(
      'Response: —'
    );
  });

  it('renders StatusBadge with correct status', () => {
    const onDelete = jest.fn();
    const onPing = jest.fn();
    render(<SiteCard site={mockSite} onDelete={onDelete} onPing={onPing} />);
    expect(screen.getByText('UP')).toBeInTheDocument();
  });

  it('calls onPing when ping button is clicked', async () => {
    const onDelete = jest.fn();
    const onPing = jest.fn();
    render(<SiteCard site={mockSite} onDelete={onDelete} onPing={onPing} />);
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: /ping/i }));
    expect(onPing).toHaveBeenCalledWith('1', 'https://testsite.com');
  });

  it('renders with correct styles', () => {
    const onDelete = jest.fn();
    const onPing = jest.fn();
    const { container } = render(
      <SiteCard site={mockSite} onDelete={onDelete} onPing={onPing} />
    );
    const card = container.firstChild;
    expect(card).toHaveClass('rounded-xl');
    expect(card).toHaveClass('p-5');
    expect(card).toHaveClass('flex');
    expect(card).toHaveClass('flex-col');
    expect(card).toHaveClass('gap-4');
    expect(card).toHaveClass('border');
    expect(card).toHaveClass('transition-shadow');
    expect(card).toHaveClass('hover:shadow-md');
  });
});
