export const setSeriesServer = (
  mediaId: string,
  season?: string,
  episode?: string,
  serverIndex?: number
): string => {
  const serverList = [
    `https://multiembed.mov/directstream.php?video_id=${mediaId}&tmdb=1&s=${season}&e=${episode}`,
    `https://moviesapi.club/tv/${mediaId}-${season}-${episode}`,
    `https://vidsrc.me/embed/tv?tmdb=${mediaId}&season=${season}&episode=${episode}`,
    `https://vidsrc.to/embed/tv/${mediaId}/${season}/${episode}/`,
    `https://www.2embed.cc/embedtv/${mediaId}&s=${season}&e=${episode}/`,
    `https://embed.smashystream.com/playere.php?tmdb=${mediaId}&season=${season}&episode=${episode}`,
  ]

  return serverList[serverIndex!]
}

export const setMovieServer = (
  mediaId: string,
  serverIndex: number
): string => {
  const serverList = [
    `https://multiembed.mov/directstream.php?video_id=${mediaId}&tmdb=1`,
    `https://moviesapi.club/movie/${mediaId}`,
    `https://vidsrc.me/embed/movie?tmdb=${mediaId}`,
    `https://vidsrc.to/embed/movie/${mediaId}/`,
    `https://www.2embed.cc/embed/${mediaId}/`,
    `https://embed.smashystream.com/playere.php?tmdb=${mediaId}`,
  ]

  return serverList[serverIndex]
}
