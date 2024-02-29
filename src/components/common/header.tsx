"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { IoSearch } from "react-icons/io5"
import NuktLogo from "/public/NuktLogo.png"

export default function Header() {
  const MotionIoSearch = motion(IoSearch)

  return (
    <div className="text-stone-200 flex items-center justify-between pt-2 px-10 fixed top-0 z-50 w-full">
      <Link href={"/"} className="flex items-center gap-3">
        <Image
          src={NuktLogo}
          alt="Nukt Logo"
          height={40}
          width={40}
          className="rounded-full"
        />
        <p className="font-semibold">Nukt</p>
      </Link>
      <div className="relative flex items-center justify-end">
        <input
          placeholder="Search Movies, TV Series and more"
          className="bg-transparent border-2 border-stone-400 rounded-md min-w-96 outline-none px-3 py-1 text-sm"
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 10,
            duration: 1,
          }}
          className="absolute flex items-center "
        >
          <IoSearch className="text-[24px] cursor-pointer pr-2 text-stone-300" />
        </motion.button>
      </div>
      <div>
        <Image
          src={NuktLogo}
          alt="Nukt Logo"
          height={40}
          width={40}
          className="rounded-full"
        />
      </div>
    </div>
  )
}
