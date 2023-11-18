import { client } from '@/utils/ftp';
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const prisma = new PrismaClient()
        const ftp = client()
        const { file: searchFile } = req.query as { file: string };
        if (searchFile != null) {
            const file = await prisma.files.findUnique({
                where: {
                    id: searchFile
                }
            })
            if (file) {
                const download = await (await ftp).downloadTo("dump" + `/${file!.fileNameEnc}`, file!.fileNameEnc)
                if (download.code === 226) {
                    res.setHeader('Content-Type', 'application/octet-stream');
                    res.setHeader('Content-Disposition', `attachment; filename=${file!.fileNameEnc}`)
                    const stream = fs.createReadStream(`dump/${file?.fileNameEnc}`);
                    stream.pipe(res);
                    stream.on('end', () => {
                        fs.unlink(`dump/${file?.fileNameEnc}`, () => { })
                        res.end();
                    });
                } else {
                    return res.status(404).json({ message: "file not found" })
                }
            } else {
                return res.status(404).json({ message: "file not found" })

            }
        } else {
            return res.status(404).json({ message: "file not found" })
        }
    } catch (e) {
        return res.status(500).json({ message: "internal server error" })
    }
}

export default handler
