import checkAuth from '@/actions/checkAuth';
import React from 'react';

const UserProfile = async () => {
  const { user } = await checkAuth();

  if (!user) return null;

  return <div>{user.name}</div>;
};

export default UserProfile;
