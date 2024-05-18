import React from 'react';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';

interface IUserProps {
  params: {
    id: string;
  };
}

const UserPage = async (props: IUserProps) => {
  const { params } = props;

  const session = await getServerSession(authOptions);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}:${process.env.NEXT_PUBLIC_API_PORT}/users/${params?.id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.accessToken}`,
      },
    }
  );
  const user = await res.json();

  return (
    <div className='flex justify-center items-center h-screen bg-gray-100'>
      <div className='w-full max-w-sm p-6 bg-white rounded shadow-lg'>
        <h1 className='text-2xl font-bold mb-4 text-center text-black'>
          Profile
        </h1>
        <div className='space-y-4 text-black'>
          <div>
            <strong>First Name:</strong> {user.firstName}
          </div>
          <div>
            <strong>LastName:</strong> {user.lastName}
          </div>

          <div>
            <strong>Email:</strong> {user.email}
          </div>
          {/* <button
              className='bg-slate-700 p-3 w-full rounded-lg text text-white'
              onClick={handleEdit}
            >
              Edit Profile
            </button> */}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
