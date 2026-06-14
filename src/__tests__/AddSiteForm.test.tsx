import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddSiteForm from '../components/AddSiteForm';

describe('AddSiteForm', () => {
  it('renders the form correctly', () => {
    render(<AddSiteForm onSubmit={() => {}} />);
    expect(screen.getByLabelText(/Name:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/URL:/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Add Site/i })
    ).toBeInTheDocument();
  });

  it('shows an error message when fields are empty', async () => {
    const user = userEvent.setup();
    render(<AddSiteForm onSubmit={() => {}} />);
    await user.click(screen.getByRole('button', { name: /Add Site/i }));
    expect(screen.getByText(/Please fill in all fields./i)).toBeInTheDocument();
  });

  it('calls onSubmit with correct values', async () => {
    const user = userEvent.setup();
    const mockOnSubmit = jest.fn();
    render(<AddSiteForm onSubmit={mockOnSubmit} />);
    await user.type(screen.getByLabelText(/Name:/i), 'Test Site');
    await user.type(screen.getByLabelText(/URL:/i), 'https://testsite.com');
    await user.click(screen.getByRole('button', { name: /Add Site/i }));
    expect(mockOnSubmit).toHaveBeenCalledWith(
      'Test Site',
      'https://testsite.com'
    );
  });

  it('does not call onSubmit when fields are empty', async () => {
    const user = userEvent.setup();
    const mockOnSubmit = jest.fn();
    render(<AddSiteForm onSubmit={mockOnSubmit} />);
    await user.click(screen.getByRole('button', { name: /Add Site/i }));
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('resets error message when user starts typing', async () => {
    const user = userEvent.setup();
    render(<AddSiteForm onSubmit={() => {}} />);
    await user.click(screen.getByRole('button', { name: /Add Site/i }));
    expect(screen.getByText(/Please fill in all fields./i)).toBeInTheDocument();
    await user.type(screen.getByLabelText(/Name:/i), 'Test Site');
    expect(
      screen.queryByText(/Please fill in all fields./i)
    ).not.toBeInTheDocument();
  });

  it('resets error message when user starts typing in URL field', async () => {
    const user = userEvent.setup();
    render(<AddSiteForm onSubmit={() => {}} />);
    await user.click(screen.getByRole('button', { name: /Add Site/i }));
    expect(screen.getByText(/Please fill in all fields./i)).toBeInTheDocument();
    await user.type(screen.getByLabelText(/URL:/i), 'https://testsite.com');
    expect(
      screen.queryByText(/Please fill in all fields./i)
    ).not.toBeInTheDocument();
  });

  it('allows user to correct errors and submit', async () => {
    const user = userEvent.setup();
    const mockOnSubmit = jest.fn();
    render(<AddSiteForm onSubmit={mockOnSubmit} />);
    await user.click(screen.getByRole('button', { name: /Add Site/i }));
    expect(screen.getByText(/Please fill in all fields./i)).toBeInTheDocument();
    await user.type(screen.getByLabelText(/Name:/i), 'Test Site');
    await user.type(screen.getByLabelText(/URL:/i), 'https://testsite.com');
    await user.click(screen.getByRole('button', { name: /Add Site/i }));
    expect(mockOnSubmit).toHaveBeenCalledWith(
      'Test Site',
      'https://testsite.com'
    );
  });

  it('does not show error message after successful submission', async () => {
    const user = userEvent.setup();
    const mockOnSubmit = jest.fn();
    render(<AddSiteForm onSubmit={mockOnSubmit} />);
    await user.type(screen.getByLabelText(/Name:/i), 'Test Site');
    await user.type(screen.getByLabelText(/URL:/i), 'https://testsite.com');
    await user.click(screen.getByRole('button', { name: /Add Site/i }));
    expect(
      screen.queryByText(/Please fill in all fields./i)
    ).not.toBeInTheDocument();
  });

  it('does not call onSubmit when only name is filled', async () => {
    const user = userEvent.setup();
    const mockOnSubmit = jest.fn();
    render(<AddSiteForm onSubmit={mockOnSubmit} />);
    await user.type(screen.getByLabelText(/Name:/i), 'Test Site');
    await user.click(screen.getByRole('button', { name: /Add Site/i }));
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('does not call onSubmit when only URL is filled', async () => {
    const user = userEvent.setup();
    const mockOnSubmit = jest.fn();
    render(<AddSiteForm onSubmit={mockOnSubmit} />);
    await user.type(screen.getByLabelText(/URL:/i), 'https://testsite.com');
    await user.click(screen.getByRole('button', { name: /Add Site/i }));
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('trims input values before submitting', async () => {
    const user = userEvent.setup();
    const mockOnSubmit = jest.fn();
    render(<AddSiteForm onSubmit={mockOnSubmit} />);
    await user.type(screen.getByLabelText(/Name:/i), '  Test Site  ');
    await user.type(screen.getByLabelText(/URL:/i), '  https://testsite.com  ');
    await user.click(screen.getByRole('button', { name: /Add Site/i }));
    expect(mockOnSubmit).toHaveBeenCalledWith(
      'Test Site',
      'https://testsite.com'
    );
  });

  it('does not submit when URL is invalid', async () => {
    const user = userEvent.setup();
    const mockOnSubmit = jest.fn();
    render(<AddSiteForm onSubmit={mockOnSubmit} />);
    await user.type(screen.getByLabelText(/Name:/i), 'Test Site');
    await user.type(screen.getByLabelText(/URL:/i), 'invalid-url');
    await user.click(screen.getByRole('button', { name: /Add Site/i }));
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('shows error message when URL is invalid', async () => {
    const user = userEvent.setup();
    render(<AddSiteForm onSubmit={() => {}} />);
    await user.type(screen.getByLabelText(/Name:/i), 'Test Site');
    await user.type(screen.getByLabelText(/URL:/i), 'invalid-url');
    await user.click(screen.getByRole('button', { name: /Add Site/i }));
    expect(screen.getByText(/Please enter a valid URL./i)).toBeInTheDocument();
  });

  it('allows user to correct invalid URL and submit', async () => {
    const user = userEvent.setup();
    const mockOnSubmit = jest.fn();
    render(<AddSiteForm onSubmit={mockOnSubmit} />);
    await user.type(screen.getByLabelText(/Name:/i), 'Test Site');
    await user.type(screen.getByLabelText(/URL:/i), 'invalid-url');
    await user.click(screen.getByRole('button', { name: /Add Site/i }));
    expect(screen.getByText(/Please enter a valid URL./i)).toBeInTheDocument();
    await user.clear(screen.getByLabelText(/URL:/i));
    await user.type(screen.getByLabelText(/URL:/i), 'https://testsite.com');
    await user.click(screen.getByRole('button', { name: /Add Site/i }));
    expect(mockOnSubmit).toHaveBeenCalledWith(
      'Test Site',
      'https://testsite.com'
    );
  });
});
