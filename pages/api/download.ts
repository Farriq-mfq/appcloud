import { client } from '@/utils/ftp';
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import fsExtra from 'fs-extra';
import { NextApiRequest, NextApiResponse } from 'next';
const prisma = new PrismaClient()
async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const ftp = client()
        const { file: searchFile } = req.query as { file: string };
        if (searchFile != null) {
            const file = await prisma.files.findUnique({
                where: {
                    id: searchFile
                }
            })
            if (file) {
                res.setHeader('Content-Type', 'application/octet-stream');
                res.setHeader('Content-Disposition', `attachment; filename=${file!.fileNameEnc}`)
                if (await fsExtra.exists(`dump/${file?.fileNameEnc}`)) {
                    const stream = fs.createReadStream(`dump/${file?.fileNameEnc}`);
                    stream.pipe(res);
                    stream.on('end', () => {
                        fsExtra.remove(`dump/${file?.fileNameEnc}`, (err) => {
                            if (err) return res.status(400).json({ message: "Terjadi kesalahan" })
                            res.end();
                        })
                    });
                } else {
                    const download = await (await ftp).downloadTo("dump" + `/${file!.fileNameEnc}`, file!.fileNameEnc)
                    if (download.code === 226) {
                        const stream = fs.createReadStream(`dump/${file?.fileNameEnc}`);
                        stream.pipe(res);
                        stream.on('end', () => {
                            fsExtra.remove(`dump/${file?.fileNameEnc}`, (err) => {
                                if (err) return res.status(400).json({ message: "Terjadi kesalahan" })
                                res.end();
                            })
                        });
                    } else {
                        return res.status(404).json({ message: "file not found" })
                    }
                }
            }
        } else {
            return res.status(404).json({ message: "file not found" })

        }

    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "internal server error" })
    }
}

export default handler
