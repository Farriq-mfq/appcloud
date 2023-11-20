import { client } from "@/utils/ftp";
import { PrismaClient } from "@prisma/client";
import { IncomingForm } from 'formidable';
import fs from 'fs';
import { NextApiRequest, NextApiResponse } from "next";
import { Readable } from 'stream';
import { v4 as uuidv4 } from 'uuid';

export const config = {
    api: {
        bodyParser: false,
    },
};

const prisma = new PrismaClient()
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const form = new IncomingForm({
            keepExtensions: true, multiples: false,
            maxFileSize: Infinity,
            maxFieldsSize: Infinity,
        });
        const ftp = await client()
        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.error('Error parsing form:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            const file = files.file![0];
            const dirID = uuidv4()
            if (!file) {
                return res.status(404).json({ success: false })
            }
            const acceptedContentTypes: string[] = [
                "application/zip",
                "application/x-rar-compressed",
                "application/x-zip-compressed"
            ];
            const mimeType = file.mimetype
            if (!acceptedContentTypes.includes(mimeType!)) return res.status(400).json({ message: "file not allowed" });
            const fileBuffer: Buffer = fs.readFileSync(file.filepath);
            const bytes = fileBuffer.buffer
            const buffer = Buffer.from(bytes)
            const readable = new Readable()
            readable._read = () => { }
            readable.push(buffer)
            readable.push(null)
            const ext = file.originalFilename!.split('.').pop()
            ftp.trackProgress(info => {
                console.log("File", info.name)
                console.log("Type", info.type)
                console.log("Transferred", info.bytes)
                console.log("Transferred Overall", info.bytesOverall)
            })
            const fileNameEnc = `${dirID}.${ext}`
            const response = await ftp.uploadFrom(readable, fileNameEnc)
            if (response.code === 226) await prisma.files.create({
                data: {
                    name: file.originalFilename!,
                    fileNameEnc,
                    size: file.size
                }
            })
            return res.status(200).json({ success: true, message: response.message });
        })

    } catch (e) {
        return res.status(500).json({ success: false });
    }
}