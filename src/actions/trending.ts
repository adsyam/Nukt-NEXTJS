"use server"

import { MediaProps } from "./popular"

export const getTrending = async (
  mediaType: "movie" | "tv",
  page: number = 1
): Promise<MediaProps | undefined> => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/trending/${mediaType}/day?page=${page}`,
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

export const getAllTrending = async (
  page: number = 1
): Promise<MediaProps | undefined> => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/trending/all/day?page=${page}&language=en-US`,
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
