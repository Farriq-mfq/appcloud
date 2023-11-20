import { client } from "@/utils/ftp";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
const prisma = new PrismaClient()
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "DELETE") {
        try {
            const ftp = await client()
            const { id } = req.query as { id: string }
            const file = await prisma.files.findUnique({ where: { id } })
            if (!file) return res.status(404).json({ message: "file not found" })
            const deleteFtpFile = await ftp.remove(file?.fileNameEnc)
            if (deleteFtpFile.code === 250) {
                await prisma.files.delete({ where: { id } })
                return res.json({ message: "success" })
            } else {
                return res.status(400).json({ message: "failed to remove file" })
            }
        } catch (e) {
            return res.status(500).json({ message: "internal server error" })
        }
    }
}