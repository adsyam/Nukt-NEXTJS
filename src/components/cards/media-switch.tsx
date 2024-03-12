"use client"

import { Category, MediaType } from "@/app/page"
import { motion } from "framer-motion"
import { Dispatch, SetStateAction } from "react"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa"

type MediaSwitchProps = {
  media: MediaType
  setMedia: Dispatch<SetStateAction<MediaType>>
  category: Category
  pageNumber: number | undefined
  setPageNumber: Dispatch<SetStateAction<number>>
}

const MediaSwitch = ({
  media,
  setMedia,
  category,
  pageNumber,
  setPageNumber,
}: MediaSwitchProps) => {
  return (
    <div className="flex justify-between gap-2 pb-4 items-center mt-12">
      <div className="flex gap-2 items-center">
        <span className="text-stone-200 text-2xl uppercase screen-360:text-xl font-normal screen-360:font-bold screen-576:font-normal">
          {category}
        </span>
        <div className="space-x-1">
          <motion.button
            whileTap={{ scale: 1.1 }}
            whileHover={{ scale: 1.1, color: "#9333EA" }}
            onClick={() => setMedia("tv")}
            className={`px-2 py-1 rounded-md text-stone-100 ${
              media === "tv" ? "bg-slate-300/20" : ""
            }`}
          >
            Series
          </motion.button>
          <motion.button
            whileTap={{ scale: 1.1 }}
            whileHover={{ scale: 1.1, color: "#9333EA" }}
            onClick={() => setMedia("movie")}
            className={`px-2 py-1 rounded-md text-stone-100 ${
              media === "movie" ? "bg-slate-300/20" : ""
            }`}
          >
            Movie
          </motion.button>
        </div>
      </div>
      <div className="text-stone-300 flex gap-2">
        <motion.button
          whileHover={{ scale: 1.1, color: "#7300FF" }}
          onClick={() => setPageNumber(pageNumber === 1 ? 1 : pageNumber! - 1)}
          className={`${pageNumber === 1 ? "cursor-not-allowed" : ""}`}
        >
          <FaAngleLeft />
        </motion.button>
        <span>{pageNumber}</span>
        <motion.button
          whileHover={{ scale: 1.1, color: "#7300FF" }}
          onClick={() => setPageNumber(pageNumber! + 1)}
        >
          <FaAngleRight />
        </motion.button>
      </div>
    </div>
  )
}

export default MediaSwitch