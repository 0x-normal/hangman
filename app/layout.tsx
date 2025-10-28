import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hangman Game - MiniApp",
  description: "Classic word guessing game with multiple difficulty levels",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}