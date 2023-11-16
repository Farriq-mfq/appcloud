import { Client } from 'basic-ftp'

export const client = async (): Promise<Client> => {
    const ftpClient = new Client();
    ftpClient.ftp.verbose = true;
    try {
        await ftpClient.access({
            host: "172.25.49.55",
            user: "farriq",
            password: "farriq",
            port: 21,
        })
    }
    catch (err) {
        console.log(err)
    }
    // ftpClient.close()
    return ftpClient
}