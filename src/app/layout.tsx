import Header from "@/components/common/header"
import Trailer from "@/components/modal/trailer"
import { TrailerProvider } from "@/context/TrailerContext"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
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
      <body className={`${inter.className} relative`}>
        <Header />
        <div>
          <TrailerProvider>
            <div>{children}</div>
            <Trailer />
          </TrailerProvider>
        </div>
      </body>
    </html>
  )
}
