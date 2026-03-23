import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, useTheme } from '../../context/ThemeContext';

const ThemeProbe = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <span>theme: {theme}</span>
      <button onClick={toggleTheme}>toggle theme</button>
    </div>
  );
};

describe('ThemeContext', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  test('toggles theme and updates document attribute', async () => {
    render(
      <ThemeProvider>
        <ThemeProbe />
      </ThemeProvider>
    );

    expect(screen.getByText(/theme: light/i)).toBeInTheDocument();
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');

    await userEvent.click(screen.getByRole('button', { name: /toggle theme/i }));

    expect(screen.getByText(/theme: dark/i)).toBeInTheDocument();
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });
});
