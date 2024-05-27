'use client';

import React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';

import { TSignInSchema } from '@/types/auth';
import { signInSchema } from '@/lib/validations/auth';

interface ISignInProps {
  searchParams: Record<'callbackUrl' | 'error', string>;
}

const SignUp = (props: ISignInProps) => {
  const { error, callbackUrl = '/dashboard' } = props.searchParams ?? {};

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TSignInSchema>({ resolver: zodResolver(signInSchema) });

  const handleSignUp = async (signInData: TSignInSchema) => {
    const res = await signIn('credentials', {
      ...signInData,
      redirect: false,
      callbackUrl: callbackUrl,
    });

    if (res?.ok) {
      router.push('/dashboard');
    } else {
      toast.error('Authentication failed');
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto text-black'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>

      <form
        onSubmit={handleSubmit(handleSignUp)}
        className='flex flex-col form gap-4'
        noValidate
      >
        <div className='flex flex-col'>
          <input
            {...register('email')}
            type='email'
            placeholder='Email'
            className='input bg-slate-100'
          />

          {errors?.email && (
            <div className='ml-auto'>
              <span className='error'>{errors.email?.message}</span>
            </div>
          )}
        </div>

        <div className='flex flex-col'>
          <input
            {...register('password')}
            type='password'
            placeholder='Password'
            className='input bg-slate-100'
          />

          {errors?.password && (
            <div className='ml-auto'>
              <span className='error'>{errors.password?.message}</span>
            </div>
          )}
        </div>

        {error && (
          <div className='flex flex-col'>
            <p className='text-red-500'>Authentication failed</p>
          </div>
        )}

        <button
          type='submit'
          className='bg-slate-700 p-3 rounded-lg text text-white'
          aria-disabled={isSubmitting}
        >
          Sign In
        </button>
      </form>

      <div className='flex gap-2 mt-5'>
        <p>Doesn't have an account?</p>
        <Link href={`/signup`}>
          <span className='text-blue-500'>Sign Up</span>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
