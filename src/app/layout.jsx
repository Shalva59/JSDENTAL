import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header/Page";
import Footer from "./components/Footer/Page";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] });




export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
