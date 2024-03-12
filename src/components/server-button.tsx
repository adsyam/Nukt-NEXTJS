"use client"

import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { useParams, useSearchParams } from "next/navigation"
import { useQueryState } from "nuqs"
import { useMemo } from "react"

const ServerButton = () => {
  const [server, setServer] = useQueryState("server", {defaultValue: "1"})
  const { mediaId, mediaType } = useParams()
  const searchParams = useSearchParams()

  const serverIndex = searchParams.get("server")!
  const season = searchParams.get("season")!
  const episode = searchParams.get("episode")!

  const serverForSeries = useMemo(
    () => [
      `https://multiembed.mov/directstream.php?video_id=${mediaId}&tmdb=1&s=${season}&e=${episode}`,
      `https://moviesapi.club/tv/${mediaId}-${season}-${episode}`,
      `https://vidsrc.me/embed/tv?tmdb=${mediaId}&season=${season}&episode=${episode}`,
      `https://vidsrc.to/embed/tv/${mediaId}/${season}/${episode}/`,
      `https://www.2embed.cc/embedtv/${mediaId}&s=${season}&e=${episode}/`,
      `https://embed.smashystream.com/playere.php?tmdb=${mediaId}&season=${season}&episode=${episode}`,
    ],
    [episode, mediaId, season]
  )

  const serverForMovies = useMemo(
    () => [
      `https://multiembed.mov/directstream.php?video_id=${mediaId}&tmdb=1`,
      `https://moviesapi.club/movie/${mediaId}`,
      `https://vidsrc.me/embed/movie?tmdb=${mediaId}`,
      `https://vidsrc.to/embed/movie/${mediaId}/`,
      `https://www.2embed.cc/embed/${mediaId}/`,
      `https://embed.smashystream.com/playere.php?tmdb=${mediaId}`,
    ],
    [mediaId]
  )

  const serverClass =
    "border px-2 hover:scale-110 duration-200 rounded-md text-sm border-stone-50/30 hover:border-purple-500"

  return (
    <div className="space-x-2 px-2 py-2 rounded-md flex items-center bg-violet-900">
      <p className="flex items-center text-stone-300">
        SELECT SERVER
        <ChevronRight size={18} />
      </p>
      {mediaType === "tv"
        ? serverForSeries.map((_, i) => {
            return (
              <button
                key={i}
                onClick={() => setServer((i + 1).toString())}
                className={`${serverClass} ${
                  (i + 1).toString() === server
                    ? "bg-stone-200/20 text-stone-100 backdrop-blur-sm border-stone-50/70"
                    : ""
                }`}
              >
                {i + 1}
              </button>
            )
          })
        : serverForMovies.map((_, i) => {
            return (
              <button
                key={i}
                onClick={() => setServer((i + 1).toString())}
                className={`${serverClass} ${
                  (i + 1).toString() === server
                    ? "bg-stone-200/20 text-stone-100 backdrop-blur-sm border-stone-50/70"
                    : ""
                }`}
              >
                {i + 1}
              </button>
            )
          })}
    </div>
  )
}

export default ServerButton