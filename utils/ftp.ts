import { Client } from 'basic-ftp'

export const client = async (): Promise<Client> => {
    const ftpClient = new Client();
    ftpClient.ftp.verbose = false;
    try {
        await ftpClient.access({
            host: process.env.FTP_HOST,
            user: process.env.FTP_USER,
            password: process.env.FTP_PASSWORD,
            port: process.env.FTP_PORT,
        })
    }
    catch (err) {
        console.log(err)
    }
    // ftpClient.close()
    return ftpClient
}