"use server"

export type MediaDetails = {
  adult: boolean
  title: string
  backdrop_path: string
  poster_path: string
  first_air_date: string
  genres: {
    id: number
    name: string
  }[]
  id: number
  in_production: boolean
  languages: string[]
  number_of_episodes: number
  number_of_seasons: number
  origin_country: string[]
  original_name: string
  overview: string
  seasons: Season[]
  vote_average: number
}

export type Season = {
  air_date: string
  episode_count: number
  poster_path: string
  season_number: number
  vote_average: number
}

export const getMediaDetails = async (
  id: string,
  mediaType: "tv" | "movie"
): Promise<MediaDetails | undefined> => {
  try {
    const res = await fetch(`https://api.themoviedb.org/3/${mediaType}/${id}`, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: process.env.NEXT_TMDB_TOKEN_AUTH!,
      },
      cache: "force-cache",
    })

    return res.json()
  } catch (err) {
    console.error(err)
  }
}
