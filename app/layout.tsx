import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import TopNavBar from "./components/navigation/TopNavBar";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "GRIGO Entertainment - Dance with Passion",
  description: "Professional dance entertainment company offering lessons, choreography, and performances",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} antialiased`}
      >
        <TopNavBar />
        {children}
      </body>
    </html>
  );
}
