import "./globals.css";
import { Kanit } from "next/font/google";
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

  return (
    <html lang="en">
      <body className={font.className}>
        {children}
      </body>
    </html>
  );
}
