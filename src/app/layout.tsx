
import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import ClientProvider from "../ClientProvider";
import Navbar from "../component/Navbar";
import UserContext from "../context/UserContext";


export const metadata: Metadata = {
  title: "NoteApp",
  description: "This is my first full stack project in NextJs",
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClientProvider>
          <UserContext>
            <Navbar />
            {children}
          </UserContext>
        </ClientProvider>
      </body>
    </html>
  );
}
