const request = require('supertest');
const app = require('../src/server');

describe('Backend API', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('GET / returns welcome payload', async () => {
    const response = await request(app).get('/');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Welcome to WheelWise API' });
  });

  test('POST /api/ai/recommend returns 400 for missing preferences', async () => {
    const response = await request(app).post('/api/ai/recommend').send({});

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });

  test('POST /api/ai/recommend returns Groq recommendations when model responds', async () => {
    process.env.GROQ_API_KEY = 'test-key';
    process.env.GROQ_MODEL = 'llama-3.1-8b-instant';

    const groqPayload = {
      choices: [
        {
          message: {
            content: JSON.stringify({
              summary: 'Top matches for your needs',
              recommendations: [
                { model: 'Toyota Corolla', reason: 'Reliable and efficient daily driver.' },
                { model: 'Honda Civic', reason: 'Great fuel economy and comfort.' },
                { model: 'Mazda 3', reason: 'Premium interior and responsive handling.' }
              ]
            })
          }
        }
      ]
    };

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => groqPayload
    });

    const response = await request(app)
      .post('/api/ai/recommend')
      .send({ preferences: 'Reliable city car under medium budget with good mpg' });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.source).toBe('groq');
    expect(response.body.recommendations).toHaveLength(3);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  test('POST /api/ai/recommend falls back if Groq request fails', async () => {
    process.env.GROQ_API_KEY = 'test-key';

    global.fetch = jest.fn().mockRejectedValue(new Error('network down'));

    const response = await request(app)
      .post('/api/ai/recommend')
      .send({ preferences: 'Family SUV for long trips and comfort' });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.source).toBe('fallback');
    expect(Array.isArray(response.body.recommendations)).toBe(true);
    expect(response.body.recommendations.length).toBeGreaterThan(0);
  });
});
