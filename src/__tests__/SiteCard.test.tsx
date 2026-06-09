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
    render(<SiteCard site={mockSite} onDelete={onDelete} />);
    expect(screen.getByText('Test Site')).toBeInTheDocument();
    expect(screen.getByText('https://testsite.com')).toBeInTheDocument();
    expect(screen.getByText(/Last Checked:/)).toBeInTheDocument();
    expect(screen.getByText('Response Time: 120ms')).toBeInTheDocument();
  });

  it('calls onDelete when delete button is clicked', async () => {
    const onDelete = jest.fn();
    render(<SiteCard site={mockSite} onDelete={onDelete} />);
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: /delete/i }));
    expect(onDelete).toHaveBeenCalledWith('1');
  });

  it('displays "Never Checked" when lastChecked is null', () => {
    const siteWithoutLastChecked: Site = { ...mockSite, lastChecked: null };
    const onDelete = jest.fn();
    render(<SiteCard site={siteWithoutLastChecked} onDelete={onDelete} />);
    expect(screen.getByText('Last Checked: Never Checked')).toBeInTheDocument();
  });

  it('displays "-" when responseTime is null', () => {
    const siteWithoutResponseTime: Site = { ...mockSite, responseTime: null };
    const onDelete = jest.fn();
    render(<SiteCard site={siteWithoutResponseTime} onDelete={onDelete} />);
    expect(screen.getByText('Response Time: -')).toBeInTheDocument();
  });

  it('renders StatusBadge with correct status', () => {
    const onDelete = jest.fn();
    render(<SiteCard site={mockSite} onDelete={onDelete} />);
    expect(screen.getByText('UP')).toBeInTheDocument();
  });
});
