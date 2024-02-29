"use client"

import { useTrailer } from "@/context/TrailerContext"
import YouTube from "react-youtube"

export default function Trailer() {
  const { isTrailerOpen, openTrailer, dataResults } = useTrailer()

  return (
    <>
      {isTrailerOpen ? (
        <div
          className="text-white fixed text-4xl inset-0 z-50 flex justify-center items-center backdrop-blur-sm"
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
                className="border-2 border-stone-400 rounded-lg overflow-hidden h-1/2 w-2/4"
              />
            )
          })}
        </div>
      ) : null}
    </>
  )
}
