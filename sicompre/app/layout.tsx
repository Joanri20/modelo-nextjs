import { montserrat } from './ui/fonts';
import './ui/global.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.className}antialiased`}>
        <h1>Layout Principal</h1>
        {children}
      </body>
    </html>
  );
}
