
import { Inter as FontSans, Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import "../globals.css";
import TopNavBar from "@/components/Layouts/TopNavBar";
import { Sidebar } from "../_components/sidebar";


const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({children}) {
  return (
    <html lang="en">
        <body
          className={cn(
            "min-h-screen bg-background overflow-hidden font-sans antialiased",
            inter.className,
          )}
        >
          <div className="flex h-screen  w-full bg-muted/40">
            <Sidebar />
            <div className="h-screen flex flex-col w-full">
              <TopNavBar />
              <div className="flex-1 relative   overflow-y-scroll h-full">
                {children}
              </div>
            </div>
          </div>
        </body>
    </html>
  );
}
