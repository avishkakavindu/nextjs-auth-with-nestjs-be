'use client';

import React from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema } from '@/lib/validations/auth';
import { toast } from 'react-toastify';

type TSignUpSchema = z.infer<typeof signUpSchema>;

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TSignUpSchema>({ resolver: zodResolver(signUpSchema) });

  const handleSignUp = async (signUpData: TSignUpSchema) => {
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
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>

      <form
        onSubmit={handleSubmit(handleSignUp)}
        className='flex flex-col form gap-4'
        noValidate
      >
        <div className='flex flex-col'>
          <input
            {...register('firstName', { required: 'First name is required' })}
            type='text'
            placeholder='First Name'
            className='input bg-slate-100'
          />

          {errors?.firstName && (
            <div className='ml-auto'>
              <span className='error'>{errors.firstName?.message}</span>
            </div>
          )}
        </div>

        <div className='flex flex-col'>
          <input
            {...register('lastName')}
            type='text'
            placeholder='Last Name'
            className='input bg-slate-100'
          />

          {errors?.lastName && (
            <div className='ml-auto'>
              <span className='error'>{errors.lastName?.message}</span>
            </div>
          )}
        </div>

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
