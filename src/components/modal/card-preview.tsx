"use client"

import { MediaResult } from "@/actions/popular"
import GenreList from "../carousel/genreList"

type CardPreviewProps = {
  isShowPreview: boolean
  cardData: MediaResult
  mediaType: MediaResult["media_type"]
}

export default function CardPreview({
  isShowPreview,
  cardData,
  mediaType,
}: CardPreviewProps) {
  return (
    <div
      className={`text-white absolute z-50 w-[250px] h-fit right-[-255px] top-5 border-2 border-white/30 bg-slate-800/70 backdrop-blur-sm p-3 rounded-md ${
        isShowPreview ? "" : "hidden"
      }`}
    >
      <h1 className="m text-purple-500">{cardData.title || cardData.name}</h1>
      <h2 className="line-clamp-3 text-sm">{cardData.overview}</h2>
      <div className="flex gap-2 flex-wrap pt-1">
        {cardData.genre_ids.map((genre, i) => {
          return (
            <div
              key={i}
              className="font-medium px-2 rounded bg-slate-200/30 text-stone-100"
            >
              <GenreList genreIds={genre} mediaType={mediaType} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
