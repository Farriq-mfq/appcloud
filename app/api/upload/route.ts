import { client } from "@/utils/ftp";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { Readable } from 'stream';
export async function POST(request: NextRequest) {
    try {
        const prisma = new PrismaClient()
        const ftp = await client()
        const data = await request.formData()
        const file: File | null = data.get('file') as unknown as File
        const name = data.get('name') as unknown as string
        if (!file) {
            return NextResponse.json({ success: false }, { status: 400 })
        }
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const readable = new Readable()
        readable._read = () => { }
        readable.push(buffer)
        readable.push(null)
        const response = await ftp.uploadFrom(readable, file.name)
        if (response.code === 226) await prisma.files.create({
            data: {
                name: file.name,
                directoryId: "2q3"
            }
        })
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (e) {
        return NextResponse.json({ success: false }, { status: 500 });
    }
}