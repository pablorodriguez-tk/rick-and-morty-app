import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Providers from '../apollo/Provider';
import { GlobalContextProvider } from '@/context/store';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Rick and Morty App',
  description: 'Rick and Morty App',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <GlobalContextProvider>
        <Providers>
          <body className={inter.className}>{children}</body>
        </Providers>
      </GlobalContextProvider>
    </html>
  );
}
