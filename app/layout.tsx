import type { Metadata, Viewport } from 'next';
import { Inter, Sora } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/Providers';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600'],
});

const sora = Sora({
  variable: '--font-sora',
  subsets: ['latin'],
  display: 'swap',
  weight: ['600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'Bandung Apnea Community x Every Dive.id | Dive into the Blue',
  description:
    'Belajar freedive dari nol, panduan memilih perlengkapan, dan gabung komunitas Bandung Apnea Community (BAC) bareng Every Dive.id.',
  keywords: ['freediving', 'bandung', 'apnea', 'komunitas selam', 'gear freedive', 'bac'],
  authors: [{ name: 'Bandung Apnea Community x Every Dive.id' }],
  openGraph: {
    title: 'Bandung Apnea Community x Every Dive.id',
    description: 'Panduan freedive, gear guide, dan komunitas untuk anak muda. Dive into the blue.',
    type: 'website',
  },
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    title: 'BAC x Every Dive.id',
    statusBarStyle: 'black-translucent',
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#04152B',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" data-theme="dark" className={`${inter.variable} ${sora.variable}`}>
      <head>
        <meta name="color-scheme" content="dark light" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" href="/assets/icon-192.png" />
        <link rel="icon" type="image/webp" href="/assets/logo-everydive.webp" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
