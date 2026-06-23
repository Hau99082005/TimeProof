import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TimeProof - Uy tín tạo nên giá trị.",
  description:
    "TimeProof cung cấp source code chất lượng, đồ án CNTT, website mẫu và giải pháp phần mềm chuyên nghiệp dành cho sinh viên và doanh nghiệp.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html
        lang="vi"
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
        suppressHydrationWarning
      >
        <body className="min-h-full flex flex-col">
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <AuthProvider>
              <TooltipProvider>
                <Header />
                <main className="flex-1">
                  {children}
                </main>
                <Footer />
                <Toaster />
              </TooltipProvider>
            </AuthProvider>
          </ThemeProvider>
        </body>
      </html>
  );
}
