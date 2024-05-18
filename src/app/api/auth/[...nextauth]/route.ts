import { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
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

      // sign in function
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const { email, password } = credentials;

        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const port = process.env.NEXT_PUBLIC_API_PORT;

        // TODO
        const res = await fetch(`${baseUrl}:${port}/auth/signin`, {
          method: 'POST',
          body: JSON.stringify({ email, password }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        // authentication failed
        if (res.status !== 201) {
          console.log(res.statusText);
          return null;
        }

        const tokens = await res.json();
        return tokens;
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
