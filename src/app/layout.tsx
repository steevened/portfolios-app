import ClientProviders from "@/components/client-providers";
import Menu from "@/components/menu";
import Navbar from "@/components/navbar";
import { NextAuthSessionProvider } from "@/components/session-provider";
import { getServerAuthSession } from "@/lib/auth";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Showcase",
  description:
    "The Showcase is a platform for developers to showcase their work and connect with other developers.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  return (
    <html lang="en">
      <body className={`${inter.className} overflow-x-hidden `}>
        <NextAuthSessionProvider session={session}>
          <ClientProviders>
            <div className="sticky top-0 z-10">
              <Navbar />
            </div>

            <div className="flex flex-col-reverse md:flex-row h-full">
              <div className="p-2.5 sticky bottom-0 bg-background/95 backdrop-blur-lg z-10 w-full border-t md:border-t-0 md:border-r md:w-min  justify-center flex md:h-[calc(100svh-57px)] md:top-[57px] ">
                <Menu />
              </div>
              <div className="w-full min-h-[calc(100svh-60px)]  grid h-full ">
                {children}
              </div>
            </div>
          </ClientProviders>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
