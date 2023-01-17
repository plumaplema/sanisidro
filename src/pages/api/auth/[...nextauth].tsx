import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from '../../../lib/prismadb'

const options: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        })
    ],
    session: {
        strategy: 'jwt',
        maxAge: 1000000
    },

    jwt: {
        // A secret to use for key generation (you should set this explicitly)
        secret: process.env.NEXTAUTH_SECRET,
    },
    debug: false,
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async signIn({ account, profile }) {
            const { email } = profile
            try {
                const user = await prisma.user.findFirst({
                    where: {
                        email: email
                    }
                })
                console.log(user)
                if (user.emailVerified) {
                    return true
                }
                return false

            } catch (e) {
                return false
            }
        },
    },

    theme: {
        colorScheme: "light", // "auto" | "dark" | "light"
        brandColor: "", // Hex color code
        logo: "http://pnhssanisidro.depedparanaquecity.com/wp-content/uploads/2021/05/School-Logo-2.png", // Absolute URL to image
        buttonText: "" // Hex color code
    },
    pages: {
        error: '/auth/error'
    },
    adapter: PrismaAdapter(prisma),
}

export default (req, res) => NextAuth(req, res, options)