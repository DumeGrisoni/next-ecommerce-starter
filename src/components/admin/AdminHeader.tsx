'use client';
import { useAuth } from '@/context/authContext';
import React from 'react';

const AdminHeader = () => {
  const { user } = useAuth();
  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <p>{user?.name}</p>
      <h1 className="text-3xl mb-14 md:mb-8">Tableau de bord</h1>
    </div>
  );
};

export default AdminHeader;
