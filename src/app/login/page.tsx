'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoginState } from '@wix/sdk';
import Cookies from 'js-cookie';

// ---------------------Import Internes -----------------------------
import { useWixClient } from '@/hooks/useWixClient';

enum MODE {
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  RESET_PASSWORD = 'RESET_PASSWORD',
  EMAIL_VERIFICATION = 'EMAIL_VERIFICATION',
}

const Login = () => {
  // ---------------- Hooks -----------------------------

  const router = useRouter();
  const [mode, setMode] = useState(MODE.LOGIN);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [emailCode, setEmailCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const wixClient = useWixClient();

  // ---------------- Variables -----------------------------

  const formTitle =
    mode === MODE.LOGIN
      ? 'Connexion'
      : mode === MODE.REGISTER
      ? 'Inscription'
      : mode === MODE.RESET_PASSWORD
      ? 'Mot de passe oublié'
      : "Vérification de l'email";

  const buttonTitle =
    mode === MODE.LOGIN
      ? 'Se connecter'
      : mode === MODE.REGISTER
      ? "S'inscrire"
      : mode === MODE.RESET_PASSWORD
      ? 'Envoyer le lien'
      : "Valider l'email";

  const isLoggedIn = wixClient.auth.loggedIn();
  console.log(isLoggedIn);

  // ---------------- Functions -----------------------------

  if (isLoggedIn) {
    router.push('/');
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      let response;
      switch (mode) {
        case MODE.LOGIN:
          response = await wixClient.auth.login({
            email,
            password,
          });
          break;
        case MODE.REGISTER:
          response = await wixClient.auth.register({
            email,
            password,
            profile: { nickname: username },
          });
          break;
        case MODE.RESET_PASSWORD:
          response = await wixClient.auth.sendPasswordResetEmail(
            email,
            window.location.href
          );
          setMessage(
            'Email de réinitialisation envoyé. Veuillez vérifier votre boîte de réception.'
          );
          break;
        case MODE.EMAIL_VERIFICATION:
          response = await wixClient.auth.processVerification({
            verificationCode: emailCode,
          });
          break;
        default:
          break;
      }

      switch (response?.loginState) {
        case LoginState.SUCCESS:
          setMessage('Vous êtes connecté!');
          const tokens = await wixClient.auth.getMemberTokensForDirectLogin(
            response.data.sessionToken!
          );

          Cookies.set('refreshToken', JSON.stringify(tokens.refreshToken), {
            expires: 2,
          });
          wixClient.auth.setTokens(tokens);
          router.push('/');
          break;
        case LoginState.FAILURE:
          if (
            response.errorCode === 'invalidEmail' ||
            response.errorCode === 'invalidPassword'
          ) {
            setError('Email ou mot de passe incorrect!');
          } else if (response.errorCode === 'emailAlreadyExists') {
            setError('Cet email est déjà utilisé!');
          } else if (response.errorCode === 'resetPassword') {
            setError('Vous devez réinitialiser votre mot de passe!');
          } else {
            setError('Une erreur est survenue');
          }
        case LoginState.EMAIL_VERIFICATION_REQUIRED:
          setMode(MODE.EMAIL_VERIFICATION);
        case LoginState.OWNER_APPROVAL_REQUIRED:
          setMessage("Votre compte est en attente d'approbation");
        default:
          break;
      }
    } catch (error) {
      console.log(error);
      setError('Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
  };

  // ---------------- Return -----------------------------

  return (
    <div className="flex min-h-[90vh] items-center justify-center">
      <div className=" shadow-xl w-full max-w-sm ">
        <div className="bg-black relative mb-3 py-2">
          <h3 className="text-xl text-center !text-white">{formTitle}</h3>
          <div className="absolute -bottom-[8px] left-[calc(50%_-_10px)] w-0 h0 border-l-[10px] border-l-transparent border-t-[8px] border-t-black border-r-[10px] border-r-transparent " />
        </div>
        <form className="p-6" onSubmit={handleSubmit}>
          {mode === MODE.REGISTER ? (
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-primary font-semibold mb-2"
              >
                Utilisateur
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="border border-gray-300 bg-white w-full py-2 px-3 rounded-md"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          ) : null}
          {mode !== MODE.EMAIL_VERIFICATION ? (
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
                className="border border-gray-300 bg-white w-full py-2 px-3 rounded-md"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          ) : (
            <div className="mb-4">
              <label
                htmlFor="code"
                className="block text-primary font-semibold mb-2"
              >
                Code de vérification
              </label>
              <input
                type="text"
                id="emailCode"
                name="emailCode"
                className="border border-gray-300 bg-white w-full py-2 px-3 rounded-md"
                onChange={(e) => setEmailCode(e.target.value)}
              />
            </div>
          )}
          {mode === MODE.LOGIN || mode === MODE.REGISTER ? (
            <div className="mb-4">
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
                className="border border-gray-300 bg-white w-full py-2 px-3 rounded-md"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          ) : null}
          {mode === MODE.LOGIN && (
            <div
              className="mb-4 text-sm  text-gray-500 cursor-pointer hover:text-gray-800 underline"
              onClick={() => setMode(MODE.RESET_PASSWORD)}
            >
              Mot de passe oublié ?
            </div>
          )}

          <div className="flex flex-col gap-5">
            <button
              type="submit"
              className="h-10 text-secondray text-white bg-primary rounded-md text-lg cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? 'Chargement...' : buttonTitle}
            </button>

            {mode === MODE.LOGIN && (
              <div
                onClick={() => setMode(MODE.REGISTER)}
                className="text-gray-500  hover:text-gray-800 cursor-pointer underline"
              >
                Pas encore de compte?
              </div>
            )}
            {mode === MODE.REGISTER && (
              <div
                onClick={() => setMode(MODE.LOGIN)}
                className="text-gray-500  hover:text-gray-800 cursor-pointer underline"
              >
                Vous avez deja un compte?
              </div>
            )}
            {mode === MODE.RESET_PASSWORD && (
              <div
                onClick={() => setMode(MODE.LOGIN)}
                className="text-gray-500  hover:text-gray-800 cursor-pointer underline"
              >
                Retourner à la connexion
              </div>
            )}
          </div>
          {message && (
            <div className="mt-4">
              <p className="text-green-500 text-sm">{message}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
