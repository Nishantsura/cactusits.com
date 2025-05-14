import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import Navbar from "@/components/Navbar";
import MainFooter from "@/components/ui/main-footer";
import { Providers } from "@/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const helvetica = localFont({
  src: [
    {
      path: "../fonts/helvetica-255/Helvetica.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/helvetica-255/Helvetica.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../fonts/helvetica-255/Helvetica.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/helvetica-255/Helvetica-Bold.ttf",
      weight: "700",
      style: "bold",
    },
  ],
  variable: "--font-helvetica",
});

export const metadata = {
  metadataBase: new URL("https://cactus-ai.vercel.app/"),
  title: {
    default: "Cactus",
    template: "%s | Cactus",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${helvetica.variable} antialiased flex flex-col justify-center items-center tracking-tight`}
      >
        <Providers>
          <div className="flex flex-col min-h-screen w-full">
            <Navbar />
            <main className="flex-1 w-full">{children}</main>
            <MainFooter />
          </div>
        </Providers>
      </body>
    </html>
  );
}
