import type { Metadata } from "next";
import { Noto_Sans_TC } from "next/font/google";
import "./globals.css";
import "xp.css/dist/XP.css";
import { WindowProvider } from "./providers/window-providers";
import { Providers } from "./providers/chakra-providers";
import { NavStackProvider } from "./providers/navstack-providers";
import { ResultProvider } from "./providers/result-providers";
import { AddressProvider } from "./providers/address-providers";

const nstc = Noto_Sans_TC({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Googol",
  description: "Tugas TK4 Perolehan Informasi Fasilkom UI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={nstc.className}>
        <Providers>
          <NavStackProvider>
            <ResultProvider>
              <AddressProvider>
                <WindowProvider>{children}</WindowProvider>
              </AddressProvider>
            </ResultProvider>
          </NavStackProvider>
        </Providers>
      </body>
    </html>
  );
}
