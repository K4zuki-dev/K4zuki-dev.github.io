'use client'
import "./globals.css";
import { Kanit } from "next/font/google";
import { useState } from "react";
import { useEffect } from "react";

import Footer from "@/Components/Footer/Footer";
import Header from "@/Components/Header/Header";

const font = Kanit({ weight: "600", subsets: ["latin"] });

export const metadata = {
  title: "My Portfolia",
  description: "Explore our ambitions",
  innerWidth: "device-width",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  return (
    <html lang="en">
      <body className={font.className}>
      <Header toggleTheme={toggleTheme} />

{children}
<Footer />
      </body>
    </html>
  );
}
