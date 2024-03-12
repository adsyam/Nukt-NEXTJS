"use client"

import { bouncy } from "ldrs"
// import "ldrs/bouncy"
import { useParams, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"

const VideoCard = () => {
  const searchParams = useSearchParams()
  const season = searchParams.get("season")
  const episode = searchParams.get("episode")
  const { mediaId, mediaType } = useParams()

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

  let serverIndex = searchParams.get("server")

  const [server, setServer] = useState<string>()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    const loadServer = () => {
      setServer(
        mediaType === "tv"
          ? serverForSeries[Number(serverIndex) - 1]
          : serverForMovies[Number(serverIndex) - 1]
      )
    }
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
    loadServer()
  }, [mediaType, serverForMovies, serverForSeries, serverIndex])

  bouncy.register("l-bouncy")

  return (
    <>
      {isLoading ? (
        <div className="border-2 border-stone-50/30 rounded-md aspect-video bg-black flex items-center justify-center w-full h-full">
          <l-bouncy size="45" speed="1.75" color="white"></l-bouncy>
        </div>
      ) : (
        <iframe
          src={server}
          height={1080}
          width={1920}
          allowFullScreen
          className="border-2 border-stone-50/30 rounded-md aspect-video bg-black outline-none w-full h-full"
        />
      )}
    </>
  )
}

export default VideoCard
