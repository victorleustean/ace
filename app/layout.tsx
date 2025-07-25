import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { Toaster } from "@/components/ui/sonner"
import { ExitModal } from "@/components/modals/exit-modal";




const font = Nunito({
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      
    <html lang="ro">
      <body className={`${font.className} antialiased`}>
        <Toaster />
        <ExitModal />
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
