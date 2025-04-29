'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

const Menu = () => {
  const [open, setOpen] = useState(false);

  return (
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
          <Link href={'/Logout'}>Logout</Link>
          <Link href={'/Cart'}>Cart(1)</Link>
        </div>
      )}
    </div>
  );
};

export default Menu;
