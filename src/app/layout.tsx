import "./globals.css";

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
      <body>
        {children}
      </body>
    </html>
  );
}
