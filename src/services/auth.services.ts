import { TSignInSchema } from '@/types/auth';
import axiosInstance from '@/lib/api/axios';
import { PATHS } from './paths';

export const signIn = (signInData: TSignInSchema) => {
  return axiosInstance.post(PATHS.AUTH.SIGNIN, signInData);
};

export const refreshTokens = (refreshToken: string | undefined) => {
  return axiosInstance.get(PATHS.AUTH.REFRESH_TOKEN, {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });
};
