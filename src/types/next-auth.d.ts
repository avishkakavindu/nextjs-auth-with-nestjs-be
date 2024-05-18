import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';
import { ITokenPayload } from './auth';

declare module 'next-auth' {
  interface Session {
    user: ITokenPayload;
    accessToken: string;
    refreshToken: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string;
    refreshToken: string;
  }
}
