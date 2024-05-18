import { z } from 'zod';

export const passwordSchema = z
  .string()
  .min(6, 'Password must be at least 6 characters long')
  .refine((password) => {
    const pattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/;
    return pattern.test(password);
  }, 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one symbol');

export const signUpSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  email: z.string({ required_error: 'First name is required' }).email(),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .refine((password) => {
      // Regex pattern to check for at least one letter, symbol, and number
      const pattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/;
      return pattern.test(password);
    }, 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one symbol'),
});
