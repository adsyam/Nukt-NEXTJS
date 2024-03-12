"use client"

import { MediaDetails } from "@/actions/media-details"
import Image from "next/image"
import { useState } from "react"
import { FaStar } from "react-icons/fa"
import GenreList from "../carousel/genreList"

type MediaDetailsProps = {
  data: MediaDetails
  mediaType: "tv" | "movie"
}

const MediaCardDetails = ({ data, mediaType }: MediaDetailsProps) => {
  const [isClamped, setIsClamped] = useState(true)

  return (
    <div className="text-stone-300 p-4 w-full grid grid-cols-3 gap-2">
      <Image
        src={`https://image.tmdb.org/t/p/original/${data.poster_path}`}
        alt={data.original_name || data.title}
        width={200}
        height={200}
        className="rounded-md border border-stone-50/20 m-auto w-full mb-4 backdrop-blur-md col-span-1 max-xs:hidden "
      />
      <div className="flex flex-col gap-1 max-xs:col-span-3">
        <p className="text-purple-500 text-2xl font-medium">
          {data.original_name || data.title}
        </p>
        <div className="flex gap-1">
          <p>{data.first_air_date && data.first_air_date.split("-")[0]}</p>
          <p className="flex items-center gap-[0.5px]">
            <FaStar className="pb-[2px]" />
            <span>{data.vote_average.toFixed(1)}</span>
          </p>
        </div>
        <div className="overflow-hidden">
          <p
            className={`text-sm rounded-md ${isClamped ? "line-clamp-3" : ""}`}
          >
            {data.overview}
          </p>
          <button
            onClick={() => setIsClamped(!isClamped)}
            className="text-sm hover:scale-105 duration-150 w-fit"
          >
            READ MORE
          </button>
          <p className="flex flex-wrap gap-2">
            {data.genres.map((genre) => {
              return (
                <div key={genre.id} className="px-2 rounded-md bg-stone-50/10">
                  <GenreList
                    genreIds={genre.id.toString()}
                    mediaType={mediaType}
                  />
                </div>
              )
            })}
          </p>
        </div>
      </div>
    </div>
  )
}

export default MediaCardDetails
