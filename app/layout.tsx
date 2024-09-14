import Header from "@/app/components/header";
import "./globals.css";
import { Providers } from './provider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}