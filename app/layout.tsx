import type { Metadata } from "next";
import "./globals.css";
import { Themes } from "@/misc/theme";
import { ThemeProvider } from "@/provider/ThemeProvider";
import { ViewTransitions } from "next-view-transitions";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { DM_Serif_Display } from "next/font/google"

const font = DM_Serif_Display({
  weight: "400",
  display: "swap",
  variable: '--font-dm',
})


const APP_NAME = "DocuPro";
const APP_DEFAULT_TITLE = "DocuPro";
const APP_TITLE_TEMPLATE = "DocuPro";
const APP_DESCRIPTION =
  "📚 Past exam papers at your fingertips.";
const PRODUCTION_URL = "https://docu-pro.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NODE_ENV === "production"
      ? PRODUCTION_URL
      : "http://localhost:0243"
  ),
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    images: [
      {
        url: "/docupro.png",
        width: 1280,
        height: 640,
        alt: APP_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    images: ["/docupro.png"],
  },
  // icons: {
  //   icon: [
  //     {
  //       url: "/icons/android-icon-192x192.png",
  //       sizes: "192x192",
  //       type: "image/png",
  //     },
  //   ],
  //   apple: [
  //     {
  //       url: "/icons/maskable_icon_x192.png",
  //       sizes: "192x192",
  //       type: "image/png",
  //     },
  //   ],
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
    <html
      lang="en"
      className={`dark ${font.variable} h-screen bg-light-background-normal dark:bg-dark-background-normal ${GeistSans.variable} ${GeistMono.variable}`}
    >
      <ThemeProvider>
        <meta
          name="theme-color"
          media="(prefers-color-scheme: dark)"
          content={Themes.dark.background.normal}
        />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: light)"
          content={Themes.light.background.normal}
        />

        <meta name="theme-color" content={Themes.dark.background.normal} />

        <body>{children}</body>
      </ThemeProvider>
    </html>
    </ViewTransitions>
  );
}
