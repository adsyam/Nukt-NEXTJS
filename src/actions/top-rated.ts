"use server"

import { MediaProps } from "./popular"

export const getTopRated = async (
  mediaType: "movie" | "tv",
  page: number = 1
): Promise<MediaProps | undefined> => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/${mediaType}/top_rated?page=${page}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: process.env.NEXT_TMDB_TOKEN_AUTH!,
        },
        cache: "force-cache",
      }
    )

    return res.json()
  } catch (err) {
    console.error(err)
  }
}
