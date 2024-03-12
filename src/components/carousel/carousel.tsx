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
import { MotionLink } from "@/lib/framer"
import { FaStar } from "react-icons/fa"
import "swiper/css"
import "swiper/css/effect-fade"

const Carousel = () =>{
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
            return <div key={i} className="w-full h-[75dvh]"></div>
          })
        : data?.results
            .filter(
              (slide) => slide.media_type !== "people" && slide.backdrop_path
            )
            .map((slide, i) => {
              return (
                <SwiperSlide key={i}>
                  <Image
                    src={`https://image.tmdb.org/t/p/original/${slide.backdrop_path}`}
                    width={1920}
                    height={1080}
                    priority={true}
                    alt={slide.original_name || slide.original_title}
                    className="w-full h-[75dvh] brightness-50 object-cover object-top"
                  />
                  <section className="absolute z-50 bottom-0 right-0 left-0 space-y-2 container p-5">
                    <h1 className="font-bold xl:w-[80%] flex">
                      {slide.name || slide.title}
                    </h1>
                    <div className="flex gap-2 text-stone-300">
                      <span>
                        {(slide.release_date &&
                          slide.release_date.split("-")[0]) ||
                          (slide.first_air_date &&
                            slide.first_air_date.split("-")[0])}
                      </span>
                      <span className="flex items-center gap-[1px]">
                        <FaStar className="pb-[2px]" />
                        <span>{slide.vote_average.toFixed(1)}</span>
                      </span>
                    </div>
                    <h5 className="line-clamp-3 text-stone-300 xl:w-[80%]">
                      {slide.overview}
                    </h5>
                    <div className="flex gap-2 uppercase">
                      <span>{slide.media_type}</span>
                      <div className="flex gap-2 flex-wrap">
                        {slide.genre_ids.map((genre, i) => {
                          return (
                            <div
                              key={i}
                              className="font-medium px-2 rounded bg-stone-400/40 backdrop-blur-sm text-base"
                            >
                              <GenreList
                                genreIds={genre}
                                mediaType={slide.media_type}
                              />
                            </div>
                          )
                        })}
                      </div>
                    </div>
                    <div className="flex gap-2 text-xs *:border-2 *:border-stone-400 *:px-5 *:py-3 *:rounded-md *:font-medium *:text-stone-300 *:backdrop-blur-sm">
                      <MotionLink
                        whileHover={{ scale: 1.05 }}
                        href={
                          slide.media_type === "tv"
                            ? `/watch/${slide.media_type}/${slide.id}?season=1&episode=1&filter=best`
                            : `/watch/${slide.media_type}/${slide.id}?filter=best`
                        }
                      >
                        WATCH NOW
                      </MotionLink>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        onClick={() =>
                          toggleTrailer(slide.media_type, slide.id.toString())
                        }
                      >
                        WATCH TRAILER
                      </motion.button>
                    </div>
                  </section>
                </SwiperSlide>
              )
            })}
    </>
  )

  return (
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
  )
}


export default Carousel