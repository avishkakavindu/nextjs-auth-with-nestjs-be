import { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import { jwtDecode } from 'jwt-decode';
import { ITokenPayload } from '@/types/auth';
import { signIn } from '@/services/auth.services';

export const authOptions: NextAuthOptions = {
  secret: process.env.JWT_ACCESS_SECRET,
  providers: [
    // next auth will create signin page from following
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: ' Email Address',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Password',
        },
      },

      /**
       * Custom sign-in function to validate user credentials against your backend API.
       *
       * @param credentials - The login credentials (email and password) entered by the user.
       * @param req - The Next.js request object.
       * @returns A user object with token information if successful, null otherwise.
       */
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const { email, password } = credentials;

        const res = await signIn({ email, password });

        const tokens = await res.data;

        if (tokens) {
          return tokens;
        }
        return null;
      },
    }),
  ],
  /**
   * Callbacks are asynchronous functions you can use to control
   * what happens when an action is performed.
   */
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return { ...user, ...token };
      }
      return token;
    },

    async session({ token, session }) {
      // decode access token and add decoded data to session
      const decoded = jwtDecode<ITokenPayload>(token.accessToken);
      session.user = decoded;
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
