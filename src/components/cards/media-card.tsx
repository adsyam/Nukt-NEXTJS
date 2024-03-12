"use client"

import { getPopular, getTopRated, getTrending } from "@/actions"
import { MediaProps, MediaResult } from "@/actions/popular"
import { Category } from "@/app/page"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import CardPreview from "../modal/card-preview"
import MediaSwitch from "./media-switch"

type MediaCardProps = {
  category: Category
}

export type ShowPreviewProps = {
  [id: number]: boolean
}

export type MediaType = "movie" | "tv"

const MediaCard = ({ category }: MediaCardProps) => {
  const [media, setMedia] = useState<MediaType>("tv")
  const [data, setData] = useState<MediaProps | undefined>()
  const [isLoading, setIsLoading] = useState(true)
  const [isShowPreview, setIsShowPreview] = useState<ShowPreviewProps>({
    0: false,
  })
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

  const imgHover = (isHovered: boolean, id: number) => {
    setIsShowPreview({ [id]: isHovered })
  }

  const cards = data?.results
    .filter((pop: MediaResult) => pop.backdrop_path && pop.poster_path)
    .map((pop: MediaResult) => {
      return (
        <motion.div
          key={pop.id}
          className="relative"
          onMouseEnter={() => imgHover(true, pop.id)}
          onMouseLeave={() => imgHover(false, pop.id)}
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
                ? `/watch/tv/${pop.id}?server=1&season=1&episode=1&filter=best`
                : `/watch/movie/${pop.id}?server=1&filter=best`
            }
          >
            <div className="space-y-1 flex flex-col">
              <div className="relative">
                <MotionImage
                  alt={pop.title || pop.name}
                  className="rounded w-full h-auto object-cover"
                  width={320}
                  height={480}
                  src={`https://image.tmdb.org/t/p/original/${pop.poster_path}`}
                />
                <span className="absolute bottom-1 right-1 bg-stone-700/30 px-2 rounded-lg backdrop-blur-sm">
                  {pop.vote_average.toFixed(1)}
                </span>
              </div>
              <div className="flex flex-col">
                <p className="line-clamp-1">{pop.title || pop.name}</p>
                <p className="text-stone-400 text-xs">
                  {(pop.release_date && pop.release_date.split("-")[0]) ||
                    (pop.first_air_date && pop.first_air_date.split("-")[0])}
                </p>
              </div>
            </div>
          </MotionLink>
          <CardPreview
            isShowPreview={isShowPreview[pop.id]}
            cardData={pop}
            mediaType={media}
            mediaId={pop.id}
          />
        </motion.div>
      )
    })

  const cardGrids =
    "grid gap-5 mb-12 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-8"

  return (
    <>
      <MediaSwitch
        media={media}
        setMedia={setMedia}
        category={category}
        setPageNumber={setPageNumber}
        pageNumber={pageNumber}
      />
      {isLoading ? (
        <div className="grid gap-5 place-items-center grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7">
          {Array.from({ length: 20 }, (_, i) => {
            return (
              <div
                key={i}
                className="h-[30dvh] w-full rounded-md animate-pulse bg-stone-400/30"
              ></div>
            )
          })}
        </div>
      ) : (
        <div className="grid gap-5 mb-12 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7">
          {cards}
        </div>
      )}
    </>
  )
}

export default MediaCard