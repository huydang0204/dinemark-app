import type { Metadata } from "next";
import Header from "@/app/components/header";
import "./globals.css";
import { Providers } from "./provider";

export const metadata: Metadata = {
  title: "DineMark",
  description: "Make your dining place today",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
