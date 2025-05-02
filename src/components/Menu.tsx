'use client';
import { useAuth } from '@/context/authContext';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

const Menu = ({ isDesktop }: { isDesktop: boolean }) => {
  const [open, setOpen] = useState(false);

  const { isUserAuthenticated } = useAuth();
  return (
    <>
      {!isDesktop ? (
        <div>
          <Image
            src={'/menu.png'}
            alt={'menu'}
            width={28}
            height={28}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
          {open && (
            <div className="absolute bg-black text-xl z-10 flex flex-col gap-8 items-center justify-center text-white left-0 top-20 w-full h-[calc(100vh-80px)]">
              <Link href={'/'}>Home</Link>
              <Link href={'/Shop'}>Shop</Link>
              <Link href={'/Deals'}>Deals</Link>
              {isUserAuthenticated ? (
                <Link href={'/Profile'}>Profile</Link>
              ) : (
                <Link href={'/Logout'}>Logout</Link>
              )}

              <Link href={'/Cart'}>Cart(1)</Link>
            </div>
          )}
        </div>
      ) : (
        <div className="hidden xl:flex gap-4">
          <Link href={'/'}>Home</Link>
          <Link href={'/Shop'}>Shop</Link>
          <Link href={'/Deals'}>Deals</Link>
          {isUserAuthenticated ? (
            <Link href={'/Profile'}>Profile</Link>
          ) : (
            <Link href={'/Logout'}>Logout</Link>
          )}
          <Link href={'/Cart'}>Cart(1)</Link>
        </div>
      )}
    </>
  );
};

export default Menu;
