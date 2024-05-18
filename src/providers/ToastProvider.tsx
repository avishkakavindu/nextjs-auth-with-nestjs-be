'use client';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

interface IToastProviderProps {
  children: React.ReactNode;
}

/**
 * Reference: https://dev.to/koyablue/how-to-use-react-toastify-with-app-router-447n
 * @param param0
 * @returns
 */
export default function ToastProvider({
  children,
}: Readonly<IToastProviderProps>) {
  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
}
