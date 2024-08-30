import './globals.css';
import './theme-config.css';
import '@radix-ui/themes/styles.css';
import {Container, Theme} from '@radix-ui/themes';
import {Inter} from 'next/font/google';

import type {Metadata} from 'next'
import Navbar from "@/app/components/Navbar";
import AuthProvider from "@/app/components/AuthProvider";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <AuthProvider>
          <Theme appearance="light" accentColor="violet">
            <Navbar/>
            <main className="p-5">
              <Container>{children}</Container>
            </main>
          </Theme>
        </AuthProvider>
      </body>
    </html>
  )
}
