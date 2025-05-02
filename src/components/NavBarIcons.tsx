'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import CartModal from './CartModal';
import { useAuth } from '@/context/authContext';

const NavBarIcons = () => {
  const { user, isUserAuthenticated } = useAuth();

  const [isProfilOpen, setIsProfilOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const router = useRouter();

  const handleCart = () => {
    setIsProfilOpen(false);
    setIsCartOpen(!isCartOpen);
  };

  const handleProfile = () => {
    setIsCartOpen(false);
    setIsProfilOpen(!isProfilOpen);
  };

  const handleLogout = () => {
    setIsCartOpen(false);
    setIsProfilOpen(false);
  };

  return (
    <div className="flex items-center gap-4 xl:gap-6 relative">
      <Image
        src={'/profile.png'}
        width={22}
        height={22}
        alt={'profile'}
        className="cursor-pointer"
        onClick={() => {
          isUserAuthenticated ? handleProfile() : router.push('/login');
        }}
      />
      {isProfilOpen && (
        <div className="absolute w-max bg-white flex flex-col gap-4 z-20 top-12 left-0 text-sm p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] ">
          <h1 className="text-gray-500 text-sm">{user?.name}</h1>
          <div className="h-px bg-gray-200 w-full" />
          {user?.labels.includes('admin') ? (
            <Link
              href={'/profile/admin'}
              className=" hover:bg-gray-200 p-2 rounded-md"
            >
              Administration
            </Link>
          ) : (
            <Link
              href={'/profile/user'}
              className=" hover:bg-gray-200 p-2 rounded-md"
            >
              Profile
            </Link>
          )}
          <div
            className=" hover:bg-gray-200 rounded-md p-2 cursor-pointer"
            onClick={handleLogout}
          >
            Déconnexion
          </div>
        </div>
      )}
      <Image
        src={'/notification.png'}
        width={22}
        height={22}
        alt={'notification'}
        className="cursor-pointer"
      />
      <div className="cursor-pointer">
        <Image
          src={'/cart.png'}
          width={22}
          height={22}
          alt={'cart'}
          onClick={() => handleCart()}
        />
        <div className="absolute -top-4 -right-4 w-6 h-6 bg-primary rounded-full text-white flex text-sm items-center justify-center">
          2
        </div>
      </div>
      {isCartOpen && <CartModal />}
    </div>
  );
};

export default NavBarIcons;
