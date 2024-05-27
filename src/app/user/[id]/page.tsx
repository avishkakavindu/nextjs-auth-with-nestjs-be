import React from 'react';

import useAxiosAuth from '@/lib/hooks/useAxiosAuth';

interface IUserProps {
  params: {
    id: string;
  };
}

const UserPage = async (props: IUserProps) => {
  const { params } = props;

  const axiosInstance = useAxiosAuth();

  const res = await axiosInstance.get(`/users/${params?.id}`);
  let user = null;

  if (res?.data) {
    user = res.data;
  } else {
    return <div>User not found</div>;
  }

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
