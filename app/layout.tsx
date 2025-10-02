import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import TopNavBar from "./components/navigation/TopNavBar";
import { LanguageProvider } from "./contexts/LanguageContext";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "그리고 엔터테인먼트 - GRIGO entertainment",
  description: "그리고 엔터테인먼트는 댄서, 안무가 섭외, 안무제작, 뮤직비디오 제작, 광고를 진행하고 있으며, 한 곳에서 머물러 있는 것이 아닌 가치를 찾아 새로운 길로 나아가는 마인드를 목표로 가지고 있습니다.",
  keywords: "댄서, 안무가, 섭외, 안무제작, 뮤직비디오, 광고, 그리고엔터테인먼트, GRIGO",
  authors: [{ name: "그리고 엔터테인먼트" }],
  creator: "그리고 엔터테인먼트",
  publisher: "그리고 엔터테인먼트",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://grigoent.co.kr'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "그리고 엔터테인먼트 - GRIGO entertainment",
    description: "그리고 엔터테인먼트는 댄서, 안무가 섭외, 안무제작, 뮤직비디오 제작, 광고를 진행하고 있으며, 한 곳에서 머물러 있는 것이 아닌 가치를 찾아 새로운 길로 나아가는 마인드를 목표로 가지고 있습니다.",
    url: 'https://grigoent.co.kr',
    siteName: '그리고 엔터테인먼트',
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "그리고 엔터테인먼트 - GRIGO entertainment",
    description: "그리고 엔터테인먼트는 댄서, 안무가 섭외, 안무제작, 뮤직비디오 제작, 광고를 진행하고 있으며, 한 곳에서 머물러 있는 것이 아닌 가치를 찾아 새로운 길로 나아가는 마인드를 목표로 가지고 있습니다.",
  },
  other: {
    'naver-site-verification': '6917ca265e4f4b3282568bb521b06d1cf3980588',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="overflow-x-hidden bg-primary">
      <body
        className={`${roboto.variable} antialiased overflow-x-hidden`}
      >
        <LanguageProvider>
          <TopNavBar />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
