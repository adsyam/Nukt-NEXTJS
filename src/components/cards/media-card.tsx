"use client"

import { getPopular, getTopRated, getTrending } from "@/actions"
import { MediaProps } from "@/actions/popular"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Category } from "../main"
import MediaSwitch from "./media-switch"

type MediaResult = {
  backdrop_path: string
  poster_path: string
  original_title: string
  title: string
  name: string
  id: number
  release_date: string
  first_air_date: string
  vote_average: number
}

type MediaCardProps = {
  page?: number
  category: Category
}

export type MediaType = "movie" | "tv"

export default function MediaCard({ page, category }: MediaCardProps) {
  const [media, setMedia] = useState<MediaType>("tv")
  const [data, setData] = useState<MediaProps | undefined>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      let data
      setIsLoading(true)
      if (category === "Popular") {
        data = await getPopular(media, page)
      } else if (category === "Trending") {
        data = await getTrending(media, page)
      } else if (category === "Top Rated") {
        data = await getTopRated(media, page)
      }
      setData(data)
      setIsLoading(false)
    }

    fetchData()
  }, [category, media, page])

  const MotionLink = motion(Link)
  const MotionImage = motion(Image)

  const cards = data?.results
    .filter((pop: MediaResult) => pop.backdrop_path && pop.poster_path)
    .map((pop: MediaResult, i) => {
      return (
        <motion.div
          key={i}
          whileHover={{ scale: 1.05 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 10,
          }}
        >
          <MotionLink
            initial={{ opacity: 0.2 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.05 }}
            href={
              media === "tv"
                ? `/watch/tv/${pop.id}?season=1&episode=1`
                : `/watch/movie/${pop.id}`
            }
          >
            <div className="space-y-1">
              <div className="relative">
                <MotionImage
                  whileHover={{ filter: "brightness(0.75)" }}
                  alt={pop.title || pop.name}
                  className="rounded w-full h-auto"
                  width={320}
                  height={480}
                  src={`https://image.tmdb.org/t/p/original/${pop.poster_path}`}
                />
                <p className="text-stone-200 absolute bottom-1 right-1 border border-black/40 bg-slate-700/30 px-2 rounded-lg">
                  {pop.vote_average.toFixed(1)}
                </p>
              </div>
              <div className="text-stone-300">
                <p className="text-md line-clamp-1">{pop.title || pop.name}</p>
                <p className="text-sm">
                  {(pop.release_date && pop.release_date.split("-")[0]) ||
                    (pop.first_air_date && pop.first_air_date.split("-")[0])}
                </p>
              </div>
            </div>
          </MotionLink>
        </motion.div>
      )
    })

  return (
    <div className="mx-20">
      <MediaSwitch media={media} setMedia={setMedia} category={category} />
      {isLoading ? (
        Array.from({ length: 16 }, (_, i) => {
          return <div key={i} className="h-[35vh]"></div>
        })
      ) : (
        <div className="grid grid-cols-8 gap-5 mb-12">{cards}</div>
      )}
    </div>
  )
}
