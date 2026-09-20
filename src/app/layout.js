import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/context/ThemeContext";
import SmoothScroll from "@/components/providers/SmoothScroll";

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
    <html lang="en" suppressHydrationWarning>
      {/* Menyetel kelas dark sebelum React sempat jalan. Tanpa ini halaman berkedip
          terang sesaat di mode gelap, karena provider-nya sengaja mulai dari terang agar
          cocok dengan hasil render server. Ditulis tanpa <head> karena App Router
          menyusun head-nya sendiri. */}
      <script
        dangerouslySetInnerHTML={{
          __html: `try{var t=localStorage.getItem('theme');var d=t?t==='dark':matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark')}catch(e){}`
        }}
      />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
