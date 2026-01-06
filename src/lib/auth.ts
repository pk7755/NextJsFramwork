import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import connectDb from "./db"
import User from "../model/user.model"
import bcrypt from "bcryptjs"
import Google from "next-auth/providers/google"

const authOptons:NextAuthOptions = {
    
    providers:[
        CredentialsProvider({
            name: "credentials",
            credentials:{
                email: {label:'Email',type:'text'},
                password: {label:'Password', type:'password'}
            },
            async authorize(credentials, req) {
                let email = credentials?.email
                let password = credentials?.password
                if(!email || !password) {
                    throw new Error('Email or Password is Not Found.')
                }
                await connectDb()
                let user = await User.findOne({email})
                if(!user) {
                    throw new Error('User Not Found.')
                }

                let isMatch = await bcrypt.compare(password, user.password)
                if(!isMatch) {
                    throw new Error('Incorrect Paasword.')
                }
                return {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    image: user.image
                }
            },
        }),
        Google({
            clientId:process.env.GOOGLE_CLIENT_ID!,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET!
        })

    ],
    callbacks: {
        // filled all details of user into token
        async jwt({token, user}) {
            if(user) {
                token.id = user.id,
                token.name = user.name,
                token.email = user.email,
                token.image = user.image
            }
            return token   
        },
        // now we need to pass all details of user into sesstion using token

        session({session, token}) {
            if(session.user) {
                session.user.id = token.id as string
                session.user.name = token.name,
                session.user.email = token.email,
                session.user.image = token.image as string
            }
            return session
        },
        // for google provider
        async signIn({account, user}) {
            if(account?.provider=="google") {
                await connectDb()
                let existUser = await User.findOne({email:user?.email})
                if(!existUser) {
                    let esixtUser = await User.create({
                        name:user.name,
                        email:user?.email
                    })
                }

                user.id = existUser._id as string
            }
            return true
        }


    },
    session: {
        strategy:'jwt',
        maxAge:30*24*60*60*1000

    },
    pages: {
        signIn:'/login',
        error:'/login'

    },
    secret: process.env.NEXT_AUTH_SECRET

}

export default authOptons