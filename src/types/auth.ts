import { JwtPayload } from 'jwt-decode';
import { z } from 'zod';

import { signInSchema, signUpSchema } from '@/lib/validations/auth';

export interface ITokenPayload extends JwtPayload {
  id: string;
  email: string;
}

export type TSignUpSchema = z.infer<typeof signUpSchema>;
export type TSignInSchema = z.infer<typeof signInSchema>;
