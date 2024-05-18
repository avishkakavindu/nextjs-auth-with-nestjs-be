'use client';

import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

interface IProviderProps {
  children: ReactNode;
}

const Providers = ({ children }: IProviderProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default Providers;
