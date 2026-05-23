import type { Metadata } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hotel Nellore Royal | Premium Multi-Cuisine Dining & Online Ordering",
  description: "Experience royal taste at Hotel Nellore Royal. Order authentic Nellore specials, spicy Biryanis, unlimited Veg/Non-Veg Thalis, crispy Tiffins, Chinese, and Tandoori items online with instant WhatsApp checkout. Located on Nellore Highway Road.",
  keywords: "Hotel Nellore Royal, Nellore Restaurant, Nellore Biryani, Rajupalem Restaurant, Nellore Highway Food, Order Food Nellore, Unlimited Thali Nellore, Ragimudda Nellore, Fish Pulusu Nellore",
  openGraph: {
    title: "Hotel Nellore Royal | Multi-Cuisine A/C Restaurant",
    description: "Savor our legendary Unlimited Thalis, Natukodi Pulusu, and slow-cooked Dum Biryanis. Quick online ordering with direct WhatsApp integration.",
    images: [{ url: "./restaurant/media__1779443826967.jpg" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${outfit.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-dark-bg text-[#f5f5f7] selection:bg-gold-500 selection:text-dark-bg">
        {children}
      </body>
    </html>
  );
}
