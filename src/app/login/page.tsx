'use client';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

// ---------------------Import Internes -----------------------------

import { useAuth } from '@/context/authContext';
import createSession from '@/actions/createSession';
import { useFormState } from 'react-dom';

const Login = () => {
  // ---------------- Hooks -----------------------------

  const [state, formAction, isPending] = useFormState(createSession, undefined);
  const { setIsUserAuthenticated } = useAuth();
  const router = useRouter();

  // ---------------- use Effect -----------------------------
  useEffect(() => {
    if (state) {
      if (state.error) {
        toast.error(state.error, {
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
      if (state.succes) {
        toast.success('Connexion reussie', {
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        setIsUserAuthenticated(true);
        router.push('/');
      }
    }
  }, [state, router, setIsUserAuthenticated]);

  // ---------------- Return -----------------------------

  return (
    <div className="flex min-h-[90vh] items-center justify-center">
      <div className="bg-tertiary shadow-xl w-full max-w-sm ">
        <div className="bg-accent relative mb-3 py-2">
          <h3 className="text-xl text-center !text-white">Connexion</h3>
          <div className="absolute -bottom-[8px] left-[calc(50%_-_10px)] w-0 h0 border-l-[10px] border-l-transparent border-t-[8px] border-t-accent border-r-[10px] border-r-transparent " />
        </div>
        <form className="p-6" action={formAction}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-primary font-semibold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="border border-gray-300 bg-white w-full py-2 px-3"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-primary font-semibold mb-2"
            >
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="border border-gray-300 bg-white w-full py-2 px-3"
            />
          </div>

          <div className="flex flex-col gap-5">
            <button
              disabled={isPending}
              type="submit"
              className="h-10 text-secondray text-white bg-primary rounded-md text-lg"
            >
              Connexion
            </button>

            <p>
              Pas encore de compte?
              <Link href="/register" className="text-accent font-semibold">
                {' '}
                S&apos;inscrire
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
