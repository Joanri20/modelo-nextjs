import { montserrat } from './ui/fonts';
import './ui/global.css';
import { Toaster } from 'react-hot-toast';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Sicompre Dashboard',
    default: 'Sicompre Dashboard',
  },
  description: 'Software de administración y gestión de compras',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.className}antialiased`}>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
