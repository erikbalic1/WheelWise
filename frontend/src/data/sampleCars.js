// Sample car data for demonstration
export const sampleCars = [
  {
    id: 1,
    brand: 'BMW',
    model: '320i',
    year: 2020,
    price: 28500,
    bodyType: 'Sedan',
    color: 'Black',
    fuelType: 'Gas',
    kilometers: 45000,
    images: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
      'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800',
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800'
    ],
    description: 'Well-maintained BMW 320i with full service history.',
    features: ['Leather seats', 'Navigation', 'Bluetooth', 'Backup camera'],
    transmission: 'Automatic',
    power: 184,
    location: 'Budapest, Hungary'
  },
  {
    id: 2,
    brand: 'Audi',
    model: 'A4',
    year: 2019,
    price: 26000,
    bodyType: 'Sedan',
    color: 'White',
    fuelType: 'Diesel',
    kilometers: 62000,
    images: [
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800',
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f1f10?w=800'
    ],
    description: 'Efficient Audi A4 Diesel with excellent fuel economy.',
    features: ['LED headlights', 'Cruise control', 'Parking sensors'],
    transmission: 'Automatic',
    power: 150,
    location: 'Debrecen, Hungary'
  },
  {
    id: 3,
    brand: 'Tesla',
    model: 'Model 3',
    year: 2021,
    price: 42000,
    bodyType: 'Sedan',
    color: 'Blue',
    fuelType: 'Electric',
    kilometers: 28000,
    images: [
      'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800',
      'https://images.unsplash.com/photo-1617886322207-61826orse27f6?w=800'
    ],
    description: 'Tesla Model 3 with autopilot and premium interior.',
    features: ['Autopilot', 'Premium sound system', 'Glass roof'],
    transmission: 'Automatic',
    power: 283,
    location: 'Budapest, Hungary'
  },
  {
    id: 4,
    brand: 'Mercedes',
    model: 'C-Class',
    year: 2018,
    price: 24500,
    bodyType: 'Sedan',
    color: 'Silver',
    fuelType: 'Gas',
    kilometers: 72000,
    images: [
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800',
      'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800'
    ],
    description: 'Elegant Mercedes C-Class with premium features.',
    features: ['Sunroof', 'Heated seats', 'AMG styling'],
    transmission: 'Automatic',
    power: 204,
    location: 'Szeged, Hungary'
  },
  {
    id: 5,
    brand: 'Toyota',
    model: 'RAV4',
    year: 2021,
    price: 32000,
    bodyType: 'SUV',
    color: 'Red',
    fuelType: 'Hybrid',
    kilometers: 35000,
    images: [
      'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800',
      'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800'
    ],
    description: 'Reliable Toyota RAV4 Hybrid with AWD.',
    features: ['AWD', 'Safety Sense', 'Apple CarPlay'],
    transmission: 'CVT',
    power: 219,
    location: 'Pécs, Hungary'
  },
  {
    id: 6,
    brand: 'Volkswagen',
    model: 'Golf',
    year: 2020,
    price: 22000,
    bodyType: 'Hatchback',
    color: 'Gray',
    fuelType: 'Gas',
    kilometers: 48000,
    images: [
      'https://images.unsplash.com/photo-1622353219448-46a009f0d44f?w=800',
      'https://images.unsplash.com/photo-1612825173281-9a19b2f5b7d8?w=800'
    ],
    description: 'Compact and efficient VW Golf, perfect for city driving.',
    features: ['Digital cockpit', 'Lane assist', 'Adaptive cruise'],
    transmission: 'Manual',
    power: 150,
    location: 'Győr, Hungary'
  },
  {
    id: 7,
    brand: 'Honda',
    model: 'Civic',
    year: 2019,
    price: 21000,
    bodyType: 'Sedan',
    color: 'White',
    fuelType: 'Gas',
    kilometers: 55000,
    images: [
      'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800'
    ],
    description: 'Reliable Honda Civic with excellent fuel economy.',
    features: ['Honda Sensing', 'Sunroof', 'Alloy wheels'],
    transmission: 'CVT',
    power: 158,
    location: 'Miskolc, Hungary'
  },
  {
    id: 8,
    brand: 'Ford',
    model: 'Mustang',
    year: 2020,
    price: 38000,
    bodyType: 'Coupe',
    color: 'Yellow',
    fuelType: 'Gas',
    kilometers: 22000,
    images: [
      'https://images.unsplash.com/photo-1584345604476-8ec5f5c665a2?w=800',
      'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800'
    ],
    description: 'Iconic Ford Mustang with powerful V8 engine.',
    features: ['Performance package', 'Premium audio', 'Sport seats'],
    transmission: 'Manual',
    power: 450,
    location: 'Budapest, Hungary'
  }
];

export const brands = ['All', 'Audi', 'BMW', 'Ford', 'Honda', 'Mercedes', 'Tesla', 'Toyota', 'Volkswagen'];
export const bodyTypes = ['All', 'Sedan', 'SUV', 'Hatchback', 'Coupe', 'Wagon', 'Convertible'];
export const fuelTypes = ['All', 'Gas', 'Diesel', 'Hybrid', 'Electric'];
export const colors = ['All', 'Black', 'White', 'Silver', 'Gray', 'Red', 'Blue', 'Yellow', 'Green'];
