declare namespace NodeJS {
    interface ProcessEnv {
        DATABASE_URL: string
        FTP_HOST: string
        FTP_USER: string
        FTP_PASSWORD: string
        FTP_PORT: number
        NEXTAUTH_URL?: string
        NEXTAUTH_SECRET: string
    }
}