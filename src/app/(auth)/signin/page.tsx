'use client';

import React from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { TSignInSchema } from '@/types/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema } from '@/lib/validations/auth';

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TSignInSchema>({ resolver: zodResolver(signInSchema) });

  const handleSignUp = async (signUpData: TSignInSchema) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}:${process.env.NEXT_PUBLIC_API_PORT}/auth/signup`,
      {
        method: 'POST',
        body: JSON.stringify(signUpData),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (res.status === 201) {
      toast.success('User registered');
    } else {
      toast.error('Unable to register user please try again');
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

        <button
          type='submit'
          className='bg-slate-700 p-3 rounded-lg text text-white'
          aria-disabled={isSubmitting}
        >
          Sign Up
        </button>
      </form>

      <div className='flex gap-2 mt-5'>
        <p>Already have an account?</p>
        <Link href={`/api/auth/signin`}>
          <span className='text-blue-500'>Sign In</span>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
