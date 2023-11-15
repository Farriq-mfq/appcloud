import { NextResponse } from "next/server";
export async function POST() {
    console.log('hallo there')
    return NextResponse.json({ message: "Hello World" }, { status: 200 });
}