'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import CartModal from './CartModal';

const NavBarIcons = () => {
  const [isProfilOpen, setIsProfilOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const router = useRouter();

  const isLoggedIn = false;

  const handleButton = (id: string) => {
    if (!isLoggedIn) {
      router.push('/login');
    }

    if (id === 'profile') {
      setIsCartOpen(false);
      setIsProfilOpen(!isProfilOpen);
    }
    if (id === 'cart') {
      setIsProfilOpen(false);
      setIsCartOpen(!isCartOpen);
    }
  };

  return (
    <div className="flex items-center gap-4 xl:gap-6 relative">
      <Image
        src={'/profile.png'}
        width={22}
        height={22}
        alt={'profile'}
        className="cursor-pointer"
        onClick={() => handleButton('profile')}
      />
      {isProfilOpen && (
        <div className="absolute z-20 top-12 left-0 text-sm p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] ">
          <Link href={'/Profile'}>Profile</Link>
          <div className="mt-2 cursor-pointer">Logout</div>
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
          onClick={() => handleButton('cart')}
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
