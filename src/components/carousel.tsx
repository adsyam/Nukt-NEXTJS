"use client"

import { getAllTrending } from "@/actions"
import { MediaProps } from "@/actions/popular"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/effect-fade"

export default function Carousel() {
  const [data, setData] = useState<MediaProps | undefined>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const data = await getAllTrending()
      setData(data)
      setIsLoading(false)
    }

    fetchData()
  }, [])

  return (
    <div className="text-white">
      <Swiper
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        effect="fade"
        modules={[Navigation, Autoplay, Pagination]}
        className=""
      >
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
                  <SwiperSlide key={i} className="text-white text-center">
                    <div className="flex w-full h-full justify-center items-center">
                      <Image
                        src={`https://image.tmdb.org/t/p/original/${slide.backdrop_path}
                  `}
                        width={1920}
                        height={1080}
                        alt={slide.original_name || slide.original_title}
                        className="w-full h-[70vh] brightness-50 object-cover object-top"
                      />
                    </div>
                    <p>{slide.original_name || slide.original_title}</p>
                  </SwiperSlide>
                )
              })}
      </Swiper>
    </div>
  )
}
