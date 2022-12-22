import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb"
import GoogleProvider from 'next-auth/providers/google'

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
            if (account.provider === "google") {
                return profile.email.endsWith("@deped.gov.ph")
            }
            return false // Do different verification for other providers that don't have `email_verified`
        },
    },
    theme: {
        colorScheme: "light", // "auto" | "dark" | "light"
        brandColor: "", // Hex color code
        logo: "", // Absolute URL to image
        buttonText: "" // Hex color code
    },
   //adapter: MongoDBAdapter(clientPromise),
}

export default (req, res) => NextAuth(req, res, options)
