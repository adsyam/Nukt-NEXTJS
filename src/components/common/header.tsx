"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { KeyboardEventHandler, useEffect, useRef, useState } from "react"
import { IoSearch } from "react-icons/io5"
import NuktLogo from "/public/NuktLogo.png"

const Header =()=> {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [width, setWidth] = useState<number>()
  const [isOpenSearch, setIsOpenSearch] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    setWidth(window.innerWidth)
  }, [])

  const router = useRouter()
  const dropDownRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLDivElement>(null)

  const MotionImage = motion(Image)

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        isOpen === true &&
        dropDownRef.current &&
        !dropDownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener("click", handleClick)

    return () => document.removeEventListener("click", handleClick)
  }, [isOpen])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        isOpenSearch === true &&
        searchRef.current &&
        !searchRef.current.contains(e.target as Node)
      ) {
        setIsOpenSearch(false)
      }
    }
    document.addEventListener("click", handleClick)

    return () => document.removeEventListener("click", handleClick)
  }, [isOpenSearch])

  const handleSearch = (isOpen: boolean) => {
    if (searchTerm !== "") {
      router.push(`/search?term=${searchTerm}`)
    }
    setSearchTerm("")
  }

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      setSearchTerm(e.currentTarget.value)
      if (searchTerm !== "") {
        router.push(`/search?term=${searchTerm}`)
        setSearchTerm("")
      }
    }
  }

  const headerComp = (
    <div className="container">
      <div className="flex items-center justify-between">
        <Link
          href={"/"}
          className="flex items-center gap-2"
          onClick={() => setIsOpenSearch(false)}
        >
          <Image
            src={NuktLogo}
            alt="Nukt Logo"
            height={40}
            width={40}
            className="rounded-full"
            priority={true}
          />
          <p className="font-semibold">Nukt</p>
        </Link>

        <div
          className={`flex items-center justify-end relative ${
            !isOpenSearch && width! <= 640 ? "hidden" : ""
          }`} // Hide search input when isOpenSearch is false and less than 640px
          ref={searchRef}
        >
          <input
            placeholder="Search"
            className={`bg-transparent border-2 border-stone-500 rounded-md outline-none px-3 py-[0.1rem] ${
              width! <= 640 ? "w-[90%]" : "min-w-[400px]"
            }`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 10,
              duration: 1,
            }}
            className="absolute"
            onClick={() => handleSearch(true)}
          >
            <IoSearch
              className={` cursor-pointer pr-2 text-stone-300 ${
                width! <= 640 ? "text-3xl" : "text-2xl"
              }`}
            />
          </motion.button>
        </div>

        <div className="flex items-center">
          {width! <= 640 &&
            !isOpenSearch && ( // width is less than 640 and isOpenSearch is false
              <motion.button
                whileHover={{ scale: 1.1 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 10,
                  duration: 1,
                }}
                className="flex items-center"
                onClick={() => setIsOpenSearch(true)}
              >
                <IoSearch className="cursor-pointer pr-2 text-stone-300 text-3xl" />
              </motion.button>
            )}
          <div className="relative" ref={dropDownRef}>
            <MotionImage
              src={NuktLogo}
              alt="Nukt Logo"
              height={40}
              width={40}
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-full"
              whileTap={{ scale: 0.5 }}
              transition={{ type: "spring", duration: 0.7 }}
            />
            <div
              className={`border-2 fixed right-4 mt-1 p-3 rounded-md border-white/30 bg-slate-800/60 backdrop-blur-sm ${
                isOpen ? "" : "hidden"
              }`}
            >
              <div>ACCOUNT</div>
              <div>ACCOUNT</div>
              <div>ACCOUNT</div>
              <div>ACCOUNT</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <section
      className={`fixed top-0 right-0 left-0 z-50 w-full ${
        isScrolled ? "border-b border-stone-500 backdrop-blur" : ""
      }`}
    >
      {headerComp}
    </section>
  )
}

export default Header