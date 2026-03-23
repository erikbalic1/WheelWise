jest.mock('../src/models/Car', () => ({
  find: jest.fn(),
  countDocuments: jest.fn(),
  distinct: jest.fn()
}));

const request = require('supertest');
const Car = require('../src/models/Car');
const app = require('../src/server');

describe('Car routes contract', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('GET /api/filter-options returns aggregated filter options', async () => {
    Car.distinct.mockImplementation(async (field) => {
      const map = {
        brand: ['BMW', 'Audi'],
        color: ['Black', 'White'],
        bodyType: ['SUV', 'Sedan'],
        fuelType: ['Gas', 'Hybrid'],
        transmission: ['Automatic', 'Manual']
      };
      return map[field] || [];
    });

    const response = await request(app).get('/api/filter-options');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.brands).toEqual(['Audi', 'BMW']);
  });

  test('GET /api/cars returns paginated list', async () => {
    const chain = {
      sort: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      select: jest.fn().mockResolvedValue([
        {
          _id: 'car-1',
          brand: 'Audi',
          model: 'A4',
          status: 'available'
        }
      ])
    };

    Car.find.mockReturnValue(chain);
    Car.countDocuments.mockResolvedValue(1);

    const response = await request(app).get('/api/cars');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveLength(1);
    expect(response.body.pagination.total).toBe(1);
  });

  test('GET /api/my-cars is protected', async () => {
    const response = await request(app).get('/api/my-cars');

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
  });
});
