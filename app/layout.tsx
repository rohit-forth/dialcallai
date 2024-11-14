import { auth } from '@/auth';
import Providers from '@/components/layout/providers';
import { Toaster } from '@/components/ui/sonner';
import type { Metadata } from 'next';
import { Rubik } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import './globals.css';

export const metadata: Metadata = {
  title: 'DAIL AI',
  description: 'Basic dashboard with Next.js and Shadcn'
};

const rubik = Rubik({
  subsets: ['latin'],
  weight: ['400', '500','600', '700'],  
  display: 'swap'
});

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <html
      lang="en"
      className={`${rubik.className}`}
      suppressHydrationWarning={true}
    >
      <body className={'overflow-hidden'}>
        <NextTopLoader showSpinner={false} />
        <Providers session={session}>
          <Toaster />
          {children}
        </Providers>
      </body>
    </html>
  );
}
