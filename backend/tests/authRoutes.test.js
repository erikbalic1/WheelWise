const request = require('supertest');
const app = require('../src/server');

describe('Auth routes contract', () => {
  test('POST /api/auth/register validates required fields', async () => {
    const response = await request(app).post('/api/auth/register').send({});

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });

  test('POST /api/auth/login validates required fields', async () => {
    const response = await request(app).post('/api/auth/login').send({});

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });

  test('GET /api/auth/me is protected', async () => {
    const response = await request(app).get('/api/auth/me');

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
  });

  test('PUT /api/auth/profile is protected', async () => {
    const response = await request(app).put('/api/auth/profile').send({ name: 'Changed' });

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
  });

  test('POST /api/auth/mfa/setup is protected', async () => {
    const response = await request(app).post('/api/auth/mfa/setup').send({});

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
  });

  test('POST /api/auth/logout returns success', async () => {
    const response = await request(app).post('/api/auth/logout').send({});

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
});
