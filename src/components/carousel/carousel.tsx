"use client"

import { getAllTrending } from "@/actions"
import { MediaProps } from "@/actions/popular"
import { motion } from "framer-motion"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import GenreList from "./genreList"

import { useTrailer } from "@/context/TrailerContext"
import Link from "next/link"
import { FaStar } from "react-icons/fa"
import "swiper/css"
import "swiper/css/effect-fade"

export default function Carousel() {
  const [data, setData] = useState<MediaProps | undefined>()
  const [isLoading, setIsLoading] = useState(true)
  const { isTrailerOpen, openTrailer, setMediaType, setId } = useTrailer()

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const data = await getAllTrending()
      setData(data)
      setIsLoading(false)
    }

    fetchData()
  }, [])

  const toggleTrailer = (mediaType: "movie" | "tv" | "people", id: string) => {
    openTrailer(!isTrailerOpen)

    setMediaType(mediaType)
    setId(id)
  }

  const carouselContent = (
    <>
      {isLoading
        ? Array.from({ length: 1 }, (_, i) => {
            return <div key={i} className="w-[1920px] h-[1080px]"></div>
          })
        : data?.results
            .filter(
              (slide) => slide.media_type !== "people" && slide.backdrop_path
            )
            .map((slide, i) => {
              return (
                <SwiperSlide
                  key={i}
                  className="text-white text-center relative"
                >
                  <div className="flex w-full h-full justify-center items-center">
                    <Image
                      src={`https://image.tmdb.org/t/p/original/${slide.backdrop_path}`}
                      width={1920}
                      height={1080}
                      alt={slide.original_name || slide.original_title}
                      className="w-full h-[500px] brightness-50 object-cover object-top"
                    />
                  </div>
                  <div className="absolute z-50 m-10 bottom-0 text-start w-1/2 space-y-2">
                    <h1 className="text-5xl font-bold">
                      {slide.name || slide.title}
                    </h1>
                    <div className="flex gap-2">
                      <h3>
                        {(slide.release_date &&
                          slide.release_date.split("-")[0]) ||
                          (slide.first_air_date &&
                            slide.first_air_date.split("-")[0])}
                      </h3>
                      <div className="flex items-center gap-[1px]">
                        <FaStar className="pb-[2px]" />
                        <h3>{slide.vote_average.toFixed(1)}</h3>
                      </div>
                    </div>
                    <h2 className="line-clamp-3">{slide.overview}</h2>
                    <h3 className="flex gap-2 uppercase">
                      <h3>{slide.media_type}</h3>
                      <div className="flex gap-2 flex-wrap">
                        {slide.genre_ids.map((genre, i) => {
                          return (
                            <div
                              key={i}
                              className="font-medium px-2 rounded bg-slate-200/30 text-stone-100"
                            >
                              <GenreList
                                genreIds={genre}
                                mediaType={slide.media_type}
                              />
                            </div>
                          )
                        })}
                      </div>
                    </h3>

                    <div className="space-x-2 flex items-center">
                      <motion.div whileHover={{ scale: 1.05 }}>
                        <Link
                          href={
                            slide.media_type === "tv"
                              ? `/watch/${slide.media_type}/${slide.id}?season=1&episode=1`
                              : `/watch/${slide.media_type}/${slide.id}`
                          }
                          className="border px-5 py-3 rounded-md font-semibold"
                        >
                          WATCH NOW
                        </Link>
                      </motion.div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="border px-5 py-3 rounded-md font-semibold"
                        onClick={() =>
                          toggleTrailer(slide.media_type, slide.id.toString())
                        }
                      >
                        WATCH TRAILER
                      </motion.button>
                    </div>
                  </div>
                </SwiperSlide>
              )
            })}
    </>
  )

  return (
    <div className="text-white">
      <Swiper
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        effect="fade"
        modules={[Navigation, Autoplay, Pagination]}
        className=""
      >
        {carouselContent}
      </Swiper>
    </div>
  )
}
