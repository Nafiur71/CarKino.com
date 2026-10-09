import { NextResponse } from 'next/server';
import { ALL_CARS, Car } from '@/data/mockData';

// Simulated in-memory database store for server-side API requests
const serverInventory: Car[] = [...ALL_CARS];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const make = searchParams.get('make');

  let results = [...serverInventory];

  if (status) {
    results = results.filter((c) => c.status === status);
  }

  if (make) {
    results = results.filter((c) => c.make.toLowerCase() === make.toLowerCase());
  }

  return NextResponse.json({
    success: true,
    count: results.length,
    data: results,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.make || !body.model || !body.price || !body.seller?.phone) {
      return NextResponse.json(
        { success: false, error: 'Make, model, price, and seller phone are required.' },
        { status: 400 }
      );
    }

    const newCar: Car = {
      id: `car-${Date.now()}`,
      make: body.make,
      model: body.model,
      year: parseInt(body.year) || 2022,
      price: parseFloat(body.price) || 30000,
      mileage: parseInt(body.mileage) || 15000,
      fuelType: body.fuelType || 'Petrol',
      transmission: body.transmission || 'Automatic',
      bodyType: body.bodyType || 'Sedan',
      color: body.color || 'White',
      location: body.location || 'Dubai, UAE',
      image: body.image || 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1000&q=80',
      featured: false,
      verifiedSeller: false,
      status: 'pending', // Starts as pending review per PRD LIST-7
      viewsCount: 0,
      inquiriesCount: 0,
      seller: {
        name: body.seller.name || 'Private Seller',
        type: body.seller.type || 'Private',
        rating: 5.0,
        phone: body.seller.phone,
        verified: true,
      },
    };

    serverInventory.unshift(newCar);

    return NextResponse.json({
      success: true,
      message: 'Listing created successfully and submitted for moderation review.',
      data: newCar,
    }, { status: 201 });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid JSON payload.' },
      { status: 400 }
    );
  }
}
