import ClearLocalStorageButton from "./components/atoms/ClearLocalStorageButton";
import FooterButton from "./components/atoms/FooterButton";
import NewExcuseButton from "./components/atoms/NewExcuseButton";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Dev Excuses",
  description: "Generate dev excuses to make you wait",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex h-screen bg-gray-900 text-gray-100">
          <div className="flex-1 flex flex-col">
            <header className="bg-gray-800 p-4 border-b border-gray-700 flex items-center justify-between">
              <a href="/">
                <h1 className="text-xl font-semibold">Dev excuses</h1>
              </a>
              <NewExcuseButton />
            </header>
            {children}
            <footer className="bg-gray-800 p-4 border-t border-gray-700">
              <FooterButton
                text="Get lost"
                className="font-mono text-sm bg-transparent hover:bg-transparent hover:font-bold"
                url="/lost"
              />
              <ClearLocalStorageButton />
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}
