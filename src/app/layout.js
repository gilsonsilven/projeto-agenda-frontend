import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import InfoProvider from "@/components/InfoProvider.jsx";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Agenda Pessoal",
  description: "",
};

export default function RootLayout({ children }) {


  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <InfoProvider>
          {children}
        </InfoProvider>
      </body>
    </html>
  );
}
