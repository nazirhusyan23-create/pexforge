import "./globals.css";
import Script from "next/script";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  metadataBase: new URL("https://pexforge.vercel.app"),
  title: {
    default: "PixForge — Free Online Image Tools (Compress, Resize, Crop, Convert)",
    template: "%s | PixForge"
  },
  description:
    "Free online image tools: compress, resize, crop, convert, rotate, watermark, remove background and upscale images — all in your browser, no upload to any server, 100% private and free forever.",
  keywords: [
    "compress image",
    "resize image",
    "crop image",
    "convert image to jpg",
    "remove background online",
    "upscale image online",
    "free image tools",
    "image editor online"
  ],
  openGraph: {
    title: "PixForge — Free Online Image Tools",
    description:
      "Compress, resize, crop, convert, watermark, remove background and upscale images for free, right in your browser.",
    url: "https://pexforge.vercel.app",
    siteName: "PixForge",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "PixForge — Free Online Image Tools",
    description: "Compress, resize, crop, convert and enhance images for free, right in your browser."
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Search Console verification */}
        <meta name="google-site-verification" content="9bSXV0oYwCNz4T_QT4-FbvCW3bJShIEgX8HZMbep9Co" />

        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2006445566626425"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
