import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/context/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Abhi Surya Nugroho | Fullstack Developer Portfolio",
  description: "Portfolio website of Abhi Surya Nugroho - Fullstack Developer specializing in React JS, React Native, MySQL, and SQL Server. Code with intention, design with compassion.",
  keywords: ["Abhi Surya Nugroho", "Fullstack Developer", "React JS", "React Native", "Portfolio", "Web Developer"],
  authors: [{ name: "Abhi Surya Nugroho" }],
  creator: "Abhi Surya Nugroho",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Abhi Surya Nugroho | Fullstack Developer",
    description: "Fullstack Developer Portfolio - React JS, React Native, MySQL, SQL Server",
    siteName: "Abhi Surya Nugroho Portfolio",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
