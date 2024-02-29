"use client"

import { useParams, useSearchParams } from "next/navigation"
import { useState } from "react"

type WatchParams = {
  params: {
    mediaId: string
    mediaType: 'tv' | 'movie'
  }
}

export default function WatchPage({ params }: WatchParams) {
  const searchParams = useSearchParams()

  const season = searchParams.get("season")
  const episode = searchParams.get("episode")

  const serverForSeries = [
    `https://multiembed.mov/directstream.php?video_id=${params.mediaId}&tmdb=1&s=${season}&e=${episode}`,
    `https://vidsrc.me/embed/tv?tmdb=${params.mediaId}&season=${season}&episode=${episode}`,
    `https://vidsrc.to/embed/tv/${params.mediaId}/${season}/${episode}/`,
    `https://2embed.org/series.php?id=${params.mediaId}/${season}/${episode}/`,
    `https://www.2embed.cc/embedtv/${params.mediaId}&s=${season}&e=${episode}/`,
  ]

  const serverForMovies = [
    `https://multiembed.mov/directstream.php?video_id=${params.mediaId}&tmdb=1`,
    `https://vidsrc.me/embed/movie?tmdb=${params.mediaId}`,
    `https://vidsrc.to/embed/movie/${params.mediaId}/`,
    `https://2embed.org/series.php?id=${params.mediaId}/`,
    `https://www.2embed.cc/embed/${params.mediaId}/`,
  ]

  const [server, setServer] = useState<string>(
    params.mediaType === "tv" ? serverForSeries[0] : serverForMovies[0]
  )

  return (
    <div className="text-stone-400">
      <div>{params.mediaId}</div>
      <iframe src={server} height={500} width={1000} allowFullScreen />
      {params.mediaType === "tv"
        ? serverForSeries.map((server, i) => {
            return (
              <button
                key={i}
                onClick={() => setServer(server)}
                className="border px-2 rounded hover:scale-105 duration-200"
              >
                SERVER {i + 1}
              </button>
            )
          })
        : serverForMovies.map((server, i) => {
            return (
              <button
                key={i}
                onClick={() => setServer(server)}
                className="border px-2 rounded hover:scale-105 duration-200"
              >
                SERVER {i + 1}
              </button>
            )
          })}
    </div>
  )
}
