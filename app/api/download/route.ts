import { client } from '@/utils/ftp'
import { NextResponse, NextRequest } from 'next/server'
export async function GET(request: NextRequest) {
    // const ftp = client()
    const body = request    
    console.log(body)
    // await (await ftp).downloadTo('','')
    return NextResponse.json({ name: 's' }) 
} 