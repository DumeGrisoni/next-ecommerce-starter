import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ToastContainer } from 'react-toastify';
import { WixClientContextProvider } from '@/context/wixContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NovaMarket - Ecommerce',
  description: 'Un site de vente en ligne avec Next.js et Wix',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <WixClientContextProvider>
          {/* <Navbar /> */}
          {children}
          <Footer />
          <ToastContainer />
        </WixClientContextProvider>
      </body>
    </html>
  );
}
