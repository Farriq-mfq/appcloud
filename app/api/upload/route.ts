import { client } from "@/utils/ftp";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { Readable } from 'stream';
import { v4 as uuidv4 } from 'uuid';
export async function POST(request: NextRequest) {
    try {
        const prisma = new PrismaClient()
        const ftp = await client()
        const data = await request.formData()
        const file: File | null = data.get('file') as unknown as File
        const dirID = uuidv4()
        if (!file) {
            return NextResponse.json({ success: false }, { status: 400 })
        }
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const readable = new Readable()
        readable._read = () => { }
        readable.push(buffer)
        readable.push(null)
        const ext = file.name.split('.').pop()
        ftp.trackProgress(info => {
            console.log("File", info.name)
            console.log("Type", info.type)
            console.log("Transferred", info.bytes)
            console.log("Transferred Overall", info.bytesOverall)
        })
        const response = await ftp.uploadFrom(readable, `${dirID}.${ext}`)
        if (response.code === 226) await prisma.files.create({
            data: {
                name: file.name,
            }
        })
        ftp.trackProgress()
        return NextResponse.json({ success: true, message: response.message }, { status: 200 });
    } catch (e) {
        console.log(e);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}