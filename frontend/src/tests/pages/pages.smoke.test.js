import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from '../utils/renderWithProviders';
import Home from '../../pages/Home/Home';
import About from '../../pages/About/About';
import Contact from '../../pages/Contact/Contact';
import Auth from '../../pages/Auth/Auth';
import MfaLogin from '../../pages/Auth/MfaLogin';
import BuyCars from '../../pages/BuyCars/BuyCars';
import CarDetail from '../../pages/CarDetail/CarDetail';
import SellCars from '../../pages/SellCars/SellCars';
import Profile from '../../pages/Profile/Profile';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const mockNavigate = jest.fn();
const mockLocation = { state: { email: 'test@example.com', password: 'secret123' } };

jest.mock('react-router-dom', () => ({
  Link: ({ children, to }) => <a href={to}>{children}</a>,
  NavLink: ({ children, to }) => <a href={to}>{children}</a>,
  useNavigate: () => mockNavigate,
  useParams: () => ({ id: 'car-1' }),
  useLocation: () => mockLocation
}), { virtual: true });

jest.mock('../../services/api', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn()
}));

jest.mock('../../context/AuthContext', () => ({
  useAuth: jest.fn()
}));

describe('Pages smoke coverage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useAuth.mockReturnValue({
      user: {
        name: 'Test User',
        email: 'test@example.com',
        createdAt: new Date().toISOString(),
        provider: 'local',
        mfaEnabled: false,
        avatar: ''
      },
      isAuthenticated: true,
      logout: jest.fn(),
      login: jest.fn().mockResolvedValue({ success: true }),
      register: jest.fn().mockResolvedValue({ success: true }),
      updateUser: jest.fn()
    });

    api.get.mockImplementation((url) => {
      if (url === '/filter-options') {
        return Promise.resolve({
          data: {
            success: true,
            data: {
              brands: ['Audi'],
              bodyTypes: ['Sedan'],
              fuelTypes: ['Gas'],
              colors: ['Black'],
              transmissions: ['Automatic']
            }
          }
        });
      }

      if (url === '/cars') {
        return Promise.resolve({
          data: {
            success: true,
            data: [],
            pagination: {
              total: 0,
              pages: 0
            }
          }
        });
      }

      if (url.startsWith('/cars/')) {
        return Promise.resolve({
          data: {
            success: true,
            data: {
              _id: 'car-1',
              brand: 'Audi',
              model: 'A4',
              year: 2021,
              price: 27000,
              bodyType: 'Sedan',
              fuelType: 'Gas',
              transmission: 'Automatic',
              kilometers: 45000,
              power: 190,
              color: 'Black',
              location: 'Budapest',
              description: 'Well maintained car.',
              features: ['ABS', 'Air Conditioning'],
              images: ['/uploads/car-1.jpg']
            }
          }
        });
      }

      return Promise.resolve({ data: { success: true } });
    });
  });

  test('renders Home page', () => {
    renderWithProviders(<Home />);
    expect(screen.getByText(/Find Your Perfect Car/i)).toBeInTheDocument();
  });

  test('renders About page', () => {
    renderWithProviders(<About />);
    expect(screen.getByText(/About WheelWise/i)).toBeInTheDocument();
  });

  test('renders Contact page', () => {
    renderWithProviders(<Contact />);
    expect(screen.getByText(/Contact Us/i)).toBeInTheDocument();
  });

  test('renders Auth page', () => {
    renderWithProviders(<Auth />);
    expect(screen.getByText(/Welcome Back/i)).toBeInTheDocument();
  });

  test('renders MFA page', () => {
    renderWithProviders(<MfaLogin />);
    expect(screen.getByText(/MFA Verification/i)).toBeInTheDocument();
  });

  test('renders BuyCars page and performs initial fetches', async () => {
    renderWithProviders(<BuyCars />);
    expect(screen.getByText(/Browse Cars/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith('/filter-options');
      expect(api.get).toHaveBeenCalledWith('/cars', expect.any(Object));
    });
  });

  test('renders CarDetail page with loaded car', async () => {
    renderWithProviders(<CarDetail />);

    expect(await screen.findByText(/Audi A4/i)).toBeInTheDocument();
    expect(screen.getByText(/Well maintained car/i)).toBeInTheDocument();
  });

  test('renders SellCars page', () => {
    renderWithProviders(<SellCars />);
    expect(screen.getByText(/Sell Your Car/i)).toBeInTheDocument();
  });

  test('renders Profile page', () => {
    renderWithProviders(<Profile />);
    expect(screen.getByText(/Test User/i)).toBeInTheDocument();
    expect(screen.getByText(/MFA Security/i)).toBeInTheDocument();
  });
});
