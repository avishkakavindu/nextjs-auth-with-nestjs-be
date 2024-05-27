'use client';

import { useSession } from 'next-auth/react';

import { refreshTokens } from '@/services/auth.services';

const useRefreshToken = () => {
  const { data: session } = useSession();

  const refreshToken = async () => {
    const res = await refreshTokens(session?.refreshToken);

    if (session && res?.data) {
      const { accessToken, refreshToken } = res.data;
      // add new tokens to session
      session.accessToken = accessToken;
      session.refreshToken = refreshToken;
    }
  };

  return refreshToken;
};

export default useRefreshToken;
