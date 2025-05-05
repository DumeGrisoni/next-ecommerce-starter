'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

import destroySession from '@/actions/destroySession';
import { useAuth } from '@/context/authContext';

const Menu = ({ isDesktop }: { isDesktop: boolean }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const { isUserAuthenticated, user, setIsUserAuthenticated, setUser } =
    useAuth();

  const handleLogout = async () => {
    const { error, success } = await destroySession();
    if (error) {
      console.log(error);
      toast.error(error, {
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } else if (success) {
      setIsUserAuthenticated(false);
      setUser(null);
      router.push('/login');
    }
  };
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
                href={'/shop'}
                className="hover:bg-slate-700 p-2 rounded-md transition-all duration-300 ease-in-out"
              >
                Shop
              </Link>
              <Link
                onClick={() => setOpen(false)}
                href={'/ceals'}
                className="hover:bg-slate-700 p-2 rounded-md transition-all duration-300 ease-in-out"
              >
                Promos
              </Link>

              <Link
                onClick={() => setOpen(false)}
                href={'/cart'}
                className="hover:bg-slate-700 p-2 rounded-md transition-all duration-300 ease-in-out"
              >
                Panier(1)
              </Link>
              {isUserAuthenticated ? (
                <>
                  {user?.labels.includes('admin') ? (
                    <Link
                      onClick={() => setOpen(false)}
                      href={'/profile/admin'}
                      className="hover:bg-slate-700 p-2 rounded-md transition-all duration-300 ease-in-out"
                    >
                      Administration
                    </Link>
                  ) : (
                    <Link
                      onClick={() => setOpen(false)}
                      href={'/profile/user'}
                      className="hover:bg-slate-700 p-2 rounded-md transition-all duration-300 ease-in-out"
                    >
                      Profile
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="hover:bg-slate-700 p-2 rounded-md transition-all duration-300 ease-in-out"
                  >
                    Déconnexion
                  </button>
                </>
              ) : (
                <>
                  <Link onClick={() => setOpen(false)} href={'/login'}>
                    Connexion
                  </Link>
                </>
              )}
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
            href={'/Shop'}
            className="hover:bg-slate-200 p-2 rounded-md transition-all duration-300 ease-in-out"
          >
            Shop
          </Link>
          <Link
            href={'/Deals'}
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
