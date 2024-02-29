"use server"

export type MediaProps = {
  results: MediaResult[]
}

export type MediaResult = {
  backdrop_path: string
  poster_path: string
  original_title: string
  title: string
  name: string
  id: number
  release_date: string
  first_air_date: string
  vote_average: number
  media_type: "movie" | "tv" | "people"
  overview: string
  original_name: string
  genre_ids: string[]
}

export const getPopular = async (
  mediaType: "movie" | "tv",
  page: number = 1
): Promise<MediaProps | undefined> => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/${mediaType}/popular?page=${page}`,
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
