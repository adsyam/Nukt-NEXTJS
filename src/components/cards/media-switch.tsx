"use client"

import { motion } from "framer-motion"
import { Dispatch, SetStateAction } from "react"
import { Category, MediaType } from "../main"

type MediaSwitchProps = {
  media: MediaType
  setMedia: Dispatch<SetStateAction<MediaType>>
  category: Category
}

export default function MediaSwitch({
  media,
  setMedia,
  category,
}: MediaSwitchProps) {
  return (
    <div className="text-stone-400 flex gap-2 pb-4 items-center">
      <h1 className="text-stone-200 text-2xl uppercase">{category}</h1>
      <div className="space-x-1">
        <motion.button
          whileTap={{ scale: 1.1 }}
          whileHover={{ scale: 1.1 }}
          onClick={() => setMedia("tv")}
          className={`px-2 py-1 rounded-md text-stone-100 ${
            media === "tv" ? "bg-slate-300/20" : null
          }`}
        >
          Series
        </motion.button>
        <motion.button
          whileTap={{ scale: 1.1 }}
          whileHover={{ scale: 1.1 }}
          onClick={() => setMedia("movie")}
          className={`px-2 py-1 rounded-md text-stone-100 ${
            media === "movie" ? "bg-slate-300/20" : null
          }`}
        >
          Movie
        </motion.button>
      </div>
    </div>
  )
}
