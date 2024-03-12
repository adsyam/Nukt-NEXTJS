"use client"

import { useTrailer } from "@/context/TrailerContext"
import { useEffect, useState } from "react"
import YouTube from "react-youtube"

const Trailer = () => {
  const { isTrailerOpen, openTrailer, dataResults } = useTrailer()

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (isTrailerOpen) {
      setTimeout(() => {
        setIsLoading(true)
      }, 2000)
    } else {
      setIsLoading(false)
    }
  }, [isTrailerOpen])

  return (
    <>
      {isTrailerOpen ? (
        <div
          className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm max-sm:p-5 sm:p-10"
          onClick={() => openTrailer(!isTrailerOpen)}
        >
          {dataResults?.map((video, i) => {
            return (
              <YouTube
                key={i}
                videoId={video.key}
                opts={{
                  height: "100%",
                  width: "100%",
                }}
                className="bg-black border-2 border-stone-400 rounded-lg overflow-hidden aspect-video max-xl:w-screen xl:w-full xl:h-full"
              />
            )
          })}
        </div>
      ) : null}
    </>
  )
}

export default Trailer