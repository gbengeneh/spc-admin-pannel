import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner"
import "@/styles/globals.css";
import { ThemeProvider } from "@/providers/theme-provider";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SPC COLLECTIBLES",
  description: "an e-commerce website where you shop all your needs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem = {true}
            disableTransitionOnChange
            
          >
        <main>{children}</main>
        <Toaster richColors/>
        </ThemeProvider>
      </body>
    </html>
  );
}
