'use client';

import { createClient, OAuthStrategy } from '@wix/sdk';
import { products, collections } from '@wix/stores';
import { redirects } from '@wix/redirects';
import { currentCart } from '@wix/ecom';
import Cookies from 'js-cookie';
import { createContext } from 'react';

const refreshToken = JSON.parse(Cookies.get('refreshToken') || '{}');

export const wixClient = createClient({
  modules: {
    products,
    collections,
    currentCart,
    redirects,
  },
  auth: OAuthStrategy({
    clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID! as string,
    tokens: {
      refreshToken,
      accessToken: { value: '', expiresAt: 0 },
    },
  }),
});

export type WixClient = typeof wixClient;

export const WixClientContext = createContext<WixClient>(wixClient);

export const WixClientContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <WixClientContext.Provider value={wixClient}>
      {children}
    </WixClientContext.Provider>
  );
};
