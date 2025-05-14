'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Menu = ({ isDesktop }: { isDesktop: boolean }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      {!isDesktop ? (
        <div>
          <Image
            src={'/menu.png'}
            alt={'menu'}
            width={20}
            height={20}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />

          {open && (
            <div className="absolute bg-black text-white left-0 top-20 w-full h-[calc(100vh-80px)] flex flex-col items-center justify-center gap-6 text-xl  z-20">
              <Link
                onClick={() => setOpen(false)}
                href={'/'}
                className="hover:bg-slate-700 p-2 rounded-md transition-all duration-300 ease-in-out"
              >
                Accueil
              </Link>
              <Link
                onClick={() => setOpen(false)}
                href={'/list'}
                className="hover:bg-slate-700 p-2 rounded-md transition-all duration-300 ease-in-out"
              >
                Shop
              </Link>
              <Link
                onClick={() => setOpen(false)}
                href={'/deals'}
                className="hover:bg-slate-700 p-2 rounded-md transition-all duration-300 ease-in-out"
              >
                Promos
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className="hidden lg:flex w-full items-center justify-center gap-4">
          <Link
            href={'/'}
            className="hover:bg-slate-200 p-2 rounded-md transition-all duration-300 ease-in-out"
          >
            Accueil
          </Link>
          <Link
            href={'/list'}
            className="hover:bg-slate-200 p-2 rounded-md transition-all duration-300 ease-in-out"
          >
            Shop
          </Link>
          <Link
            href={'/deals'}
            className="hover:bg-slate-200 p-2 rounded-md transition-all duration-300 ease-in-out"
          >
            Promos
          </Link>
        </div>
      )}
    </>
  );
};

export default Menu;
