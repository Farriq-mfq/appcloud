
import { PrismaClient } from "@prisma/client"
import { compare } from "bcrypt"
import { AuthOptions } from "next-auth"
import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"
const prisma = new PrismaClient()
export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            // @ts-ignore
            authorize: async (credentials: { username: string, password: string }, req: any) => {
                try {
                    const user = await prisma.users.findUnique({
                        where: {
                            username: credentials.username
                        }
                    })
                    if (!user) throw new Error("Invalid username or password");

                    const checkPassword = await compare(credentials.password, user.password)

                    if (!checkPassword) throw new Error("Invalid username or password");

                    return user;
                } catch (e) {
                    return null;
                }
            }
        }),
    ],

    pages: {
        signIn: "/auth/login"
    }
}
export default NextAuth(authOptions)