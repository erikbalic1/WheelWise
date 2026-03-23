jest.mock('axios', () => ({
  create: jest.fn(() => ({
    interceptors: {
      request: {
        use: jest.fn()
      }
    }
  }))
}));

import axios from 'axios';
import '../../services/api';

describe('api service interceptors', () => {
  let mockUse;
  let requestInterceptor;

  beforeAll(() => {
    const axiosInstance = axios.create.mock.results[0].value;
    mockUse = axiosInstance.interceptors.request.use;
    requestInterceptor = mockUse.mock.calls[0][0];
  });

  beforeEach(() => {
    localStorage.clear();
  });

  test('adds Authorization header when token exists', async () => {
    localStorage.setItem('token', 'test-token');

    const result = await requestInterceptor({ headers: {} });

    expect(result.headers.Authorization).toBe('Bearer test-token');
  });

  test('does not add Authorization header when token is missing', async () => {
    const result = await requestInterceptor({ headers: {} });

    expect(result.headers.Authorization).toBeUndefined();
  });
});
