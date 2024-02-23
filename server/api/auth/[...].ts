import {NuxtAuthHandler} from '#auth'
import GoogleProvider from 'next-auth/providers/google'
// import FacebookProvider from 'next-auth/providers/facebook'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios from 'axios'

const config = useRuntimeConfig()

const getToken = async (data: any) => {
  const res = await axios.post(`${config.public.API_ROOT + config.public.API_PREFIX}/provider-callback`, data)
  if (res.status === 200) {
    return res.data
  }
}

export default NuxtAuthHandler({
  secret: config.public.AUTH_SECRET + '',
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request'
  },
  callbacks: {
    signIn: async ({ user, account, profile }) => {
      if (account?.provider === 'google') {
        const googleUser = {
          provider: account.provider,
          id_token: account.id_token
        }
        // account.access_token = await getToken(googleUser)
        const { user: userData, access_token } = await getToken(googleUser)
        account.access_token = access_token
        // Set the user in the session
        // this?.$auth?.setUser(userData)
        user = { ...userData }
        return user

        // return true
      }

      if (account?.provider === 'credentials') {
        return true
      }
      return false
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.subscribed = user ? (user as any).subscribed || true : false
        token.user = user
      }
      return Promise.resolve(token)
    },
    session: async ({ session, token, user }) => {
      ;(session as any).subscribed = (token as any).subscribed
      ;(session as any).user = token.user

      return Promise.resolve(session)
    }
  },
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    GoogleProvider.default({
      clientId: config.public.GOOGLE_CLIENT_ID,
      clientSecret: config.public.GOOGLE_CLIENT_SECRET
    }),
    // FacebookProvider.default({
    //   clientId: config.public.FACEBOOK_CLIENT_ID,
    //   clientSecret: config.public.FACEBOOK_CLIENT_SECRET
    // }),
    // @ts-expect-error
    CredentialsProvider.default({
      name: 'Credentials',
      credentials: {},
      authorize: async (credentials: any) => {
        const res = await axios.post(`${config.public.API_ROOT + config.public.API_PREFIX}/login`, {
          email: credentials.email,
          password: credentials.password
        })
        if (res.status === 200) {
          return res.data.user
        } else {
          return null
        }
      }
    })
  ],
  session: {
    strategy: 'jwt'
  }
})
