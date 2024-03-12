import Header from "@/components/common/header"
import Trailer from "@/components/modal/trailer"
import { TrailerProvider } from "@/context/TrailerContext"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import NextTopLoader from "nextjs-toploader"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Nukt",
  description: "A free streaming application",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <NextTopLoader
          color="#FF7F50"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="#FF7F50"
        />
        <Header />
        <div>
          <TrailerProvider>
            <div className="text-stone-200 font-figtree">{children}</div>
            <Trailer />
          </TrailerProvider>
        </div>
      </body>
    </html>
  )
}
