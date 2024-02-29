"use client"

import { getPopular, getTopRated, getTrending } from "@/actions"
import { MediaProps, MediaResult } from "@/actions/popular"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Category } from "../main"
import CardPreview from "../modal/card-preview"
import MediaSwitch from "./media-switch"

type MediaCardProps = {
  category: Category
}

export type ShowPreviewProps = {
  [id: number]: boolean
}

export type MediaType = "movie" | "tv"

export default function MediaCard({ category }: MediaCardProps) {
  const [media, setMedia] = useState<MediaType>("tv")
  const [data, setData] = useState<MediaProps | undefined>()
  const [isLoading, setIsLoading] = useState(true)
  const [isShowPreview, setIsShowPreview] = useState<ShowPreviewProps>({})
  const [pageNumber, setPageNumber] = useState(1)

  useEffect(() => {
    const fetchData = async () => {
      let data
      setIsLoading(true)
      if (category === "Popular") {
        data = await getPopular(media, pageNumber)
      } else if (category === "Trending") {
        data = await getTrending(media, pageNumber)
      } else if (category === "Top Rated") {
        data = await getTopRated(media, pageNumber)
      }
      setData(data)
      setIsLoading(false)
    }

    fetchData()
  }, [category, media, pageNumber])

  const MotionLink = motion(Link)
  const MotionImage = motion(Image)

  const imageHover = (isHovered: boolean, id: number) => {
    setIsShowPreview({ [id]: isHovered })
  }

  const cards = data?.results
    .filter((pop: MediaResult) => pop.backdrop_path && pop.poster_path)
    .map((pop: MediaResult, i) => {
      return (
        <div key={pop.id} className="relative">
          <motion.div
            onMouseEnter={() => imageHover(true, pop.id)}
            onMouseLeave={() => imageHover(false, pop.id)}
            whileHover={{ scale: 1.05 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 10,
            }}
          >
            <MotionLink
              href={
                media === "tv"
                  ? `/watch/tv/${pop.id}?season=1&episode=1`
                  : `/watch/movie/${pop.id}`
              }
            >
              <div className="space-y-1">
                <div className="relative">
                  <MotionImage
                    // whileHover={{ filter: "brightness(0.75)" }}
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
                  <p className="text-md line-clamp-1">
                    {pop.title || pop.name}
                  </p>
                  <p className="text-sm">
                    {(pop.release_date && pop.release_date.split("-")[0]) ||
                      (pop.first_air_date && pop.first_air_date.split("-")[0])}
                  </p>
                </div>
              </div>
            </MotionLink>
          </motion.div>
          <CardPreview
            isShowPreview={isShowPreview[pop.id]}
            cardData={pop}
            mediaType={media}
          />
        </div>
      )
    })

  return (
    <div className="mx-20">
      <MediaSwitch
        media={media}
        setMedia={setMedia}
        category={category}
        setPageNumber={setPageNumber}
        pageNumber={pageNumber}
      />
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
