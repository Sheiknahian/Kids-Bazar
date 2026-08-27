import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { users } from "../../users/route"
import bcrypt from 'bcrypt'
import Google from "next-auth/providers/google"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    Credentials({
        name: 'credentials',
        credentials: {
            email : {label: 'email', placeholder: 'enter your email', type: 'email'},
            password : {label: 'password', placeholder: 'enter your password', type: 'password'}
        },
        async authorize(credentials) {
            console.log(credentials);
            
            const user = await users.findOne({email: credentials.email})
            if (!user) {
                return null
            }
            const isMatch = await bcrypt.compare(credentials.password, user.hashedPassword)
            if (!isMatch) {
                return null
            }
            return {
                id: user._id.toString(),
                name: user.username,
                email: user.email,
                role: user.role
            }
        }
    }),
    Google({
        clientId: process.env.AUTH_GOOGLE_ID,
        clientSecret: process.env.AUTH_GOOGLE_SECRET,
    })
    // ...add more providers here
  ],
  callbacks: {
    async jwt({token, user}) {
        if (user) {
            token.id = user.id
            token.role = user.role
        }
        return token
    },
    async session({session, token}) {
        if (session.user) {
            session.user.id = token.id
            session.user.role = token.role
        }
        return session
    }
  }
}

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}