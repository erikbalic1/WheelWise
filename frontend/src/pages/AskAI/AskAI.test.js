import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AskAI from './AskAI';
import { LanguageProvider } from '../../context/LanguageContext';
import api from '../../services/api';

jest.mock('../../services/api', () => ({
  post: jest.fn()
}));

const renderAskAi = () =>
  render(
    <LanguageProvider>
      <AskAI />
    </LanguageProvider>
  );

describe('AskAI page', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('submits preferences and renders recommendation response', async () => {
    api.post.mockResolvedValue({
      data: {
        summary: 'Top model matches for your preferences.',
        recommendations: [
          { model: 'Toyota Corolla', reason: 'Reliable and low running costs.' },
          { model: 'Honda Civic', reason: 'Comfortable with efficient engines.' }
        ]
      }
    });

    renderAskAi();

    const input = screen.getByPlaceholderText(/type your question here/i);
    await userEvent.type(input, 'I need a reliable city car');
    await userEvent.click(screen.getByRole('button', { name: /send/i }));

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith('/ai/recommend', {
        preferences: 'I need a reliable city car'
      });
    });

    expect(await screen.findByText(/Top model matches for your preferences/i)).toBeInTheDocument();
    expect(await screen.findByText(/Toyota Corolla/i)).toBeInTheDocument();
  });

  test('shows API error message when recommendation fails', async () => {
    api.post.mockRejectedValue({
      response: {
        data: {
          message: 'Failed to generate car advice'
        }
      }
    });

    renderAskAi();

    const input = screen.getByPlaceholderText(/type your question here/i);
    await userEvent.type(input, 'Looking for an SUV');
    await userEvent.click(screen.getByRole('button', { name: /send/i }));

    expect(await screen.findByText(/Failed to generate car advice/i)).toBeInTheDocument();
  });
});
