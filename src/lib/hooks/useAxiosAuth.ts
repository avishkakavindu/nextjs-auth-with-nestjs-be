'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';

import axiosInstance from '../api/axios';
import useRefreshToken from './useRefreshToken';

const useAxiosAuth = () => {
  const { data: session } = useSession();
  const refreshToken = useRefreshToken();

  useEffect(() => {
    /**
     * if `Authorization` header not present in request add it
     */
    const requestIntercept = axiosInstance.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${session?.accessToken}`;
        }

        return config;
      },
      (err) => {
        Promise.reject(new Error(err));
      }
    );

    /**
     * If response return `401` due to access token expiration
     * call refresh token endpoint and refresh the tokens
     */
    const responseIntercept = axiosInstance.interceptors.response.use(
      (res) => res,
      async (err) => {
        const prevReq = err.config;

        if (err.response.status === 401 && !prevReq) {
          prevReq.sent = true;

          // call refresh tokenn endpoint
          await refreshToken();
          // add new token to request
          prevReq.headers.Authorization = `Bearer ${session?.accessToken}`;
          return axiosInstance(prevReq);
        }

        return Promise.reject(new Error(err));
      }
    );

    // cleanup
    return () => {
      axiosInstance.interceptors.request.eject(requestIntercept);
      axiosInstance.interceptors.response.eject(responseIntercept);
    };
  }, [session]);

  return axiosInstance;
};

export default useAxiosAuth;
