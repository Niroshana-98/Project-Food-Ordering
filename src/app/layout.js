import {AppProvider} from "@/components/AppContext";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "../components/layout/Header";
import {Toaster} from "react-hot-toast";



const roboto = Roboto({ subsets: ["latin"],weight:["400","500","700"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    
    <html lang="en" className="scroll-smooth">
      <body className={'${roboto.className} bg-secondary'}>
        <main className="max-w-6xl mx-auto p-4">
          <AppProvider>
            <Toaster/>
            <Header />
            {children}
            <footer className="border-t p-8 text-center text-gray-200 mt-16">
              &copy; 2024 All Rights Reserved
            </footer>
          </AppProvider>
        </main> 
      </body>
    </html>
  );
}
