import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Connect to Go gRPC Backend API (e.g., localhost:50051)
    // Note: You can use @grpc/grpc-js here like I showed you earlier
    
    // For now, let's pretend we're talking to Go
    const goResponse = await fetch('http://localhost:8080/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await goResponse.json();

    if (goResponse.ok) {
      // Create session, set cookies, etc.
      return NextResponse.json({ success: true, user: data.user });
    } else {
      return NextResponse.json({ message: data.error || 'Invalid credentials' }, { status: 401 });
    }
  } catch (error) {
    // If Go backend is not running, let's simulate for now or return error
    return NextResponse.json({ message: 'Go backend not reachable' }, { status: 500 });
  }
}
