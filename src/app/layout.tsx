import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthWrapper from '@/components/AuthWrapper';
import { ToastContainer } from 'react-toastify';

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
    <AuthWrapper>
      <html lang="fr">
        <body className={inter.className}>
          <Navbar />
          {children}
          <Footer />
          <ToastContainer />
        </body>
      </html>
    </AuthWrapper>
  );
}
