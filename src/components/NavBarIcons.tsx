'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

import CartModal from './CartModal';
import { useWixClient } from '@/hooks/useWixClient';
import { useCartStore } from '@/hooks/useCartStore';

const NavBarIcons = () => {
  const [isProfilOpen, setIsProfilOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const wixClient = useWixClient();
  const router = useRouter();
  const { cart, counter, getCart } = useCartStore();

  const isLoggedIn = wixClient.auth.loggedIn();

  const handleCart = () => {
    setIsProfilOpen(false);
    setIsCartOpen(!isCartOpen);
  };

  const handleProfile = () => {
    setIsCartOpen(false);
    if (!isLoggedIn) {
      setIsProfilOpen(false);
      router.push('/login');
    } else {
      setIsProfilOpen(!isProfilOpen);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    Cookies.remove('refreshToken');
    const { logoutUrl } = await wixClient.auth.logout(window.location.href);
    setIsLoading(false);
    setIsProfilOpen(false);
    router.push(logoutUrl);
  };

  useEffect(() => {
    getCart(wixClient);
  }, [wixClient, getCart]);

  return (
    <div className="flex items-center gap-4 xl:gap-6 relative">
      <Image
        src={'/profile.png'}
        width={22}
        height={22}
        alt={'profile'}
        className="cursor-pointer"
        onClick={handleProfile}
      />
      {isProfilOpen && (
        <div className="absolute w-max bg-white flex flex-col gap-4 z-20 top-12 left-0 text-sm p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] ">
          <h1 className="text-gray-500  text-center">{'Profil'}</h1>
          <div className="h-px bg-gray-200 w-full" />
          <div
            className=" hover:bg-gray-200 rounded-md p-2 cursor-pointer"
            onClick={handleLogout}
          >
            {isLoading ? 'Chargement...' : 'Déconnexion'}
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
        <div className="absolute -top-3 -right-3 md:-top-4 md:-right-4 md:w-6 md:h-6 w-4 h-4 bg-primary rounded-full text-white flex text-sm items-center justify-center">
          {counter}
        </div>
      </div>
      {isCartOpen && <CartModal />}
    </div>
  );
};

export default NavBarIcons;
