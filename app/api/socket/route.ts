import { NextResponse, NextRequest } from 'next/server'
import { Server } from 'socket.io';
export function GET(req: NextRequest) {
    const io: Server = new Server();
    return NextResponse.json({ message: "socket connected" });
}