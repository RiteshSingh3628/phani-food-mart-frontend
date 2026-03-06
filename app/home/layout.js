import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/nav/NavBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Phani Food Mart",
  description:
    "Curated global indulgences — imported chocolates, exotic drinks, and artisanal snacks.",
};

export default function HomeLayout({ children }) {
  return (
    <>

      <nav className="w-full border-b bg-background sticky top-0 z-50">
        <Navbar />
      </nav>
      {children}
    </>
  );
}
