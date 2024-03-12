"use server"

export type SearchProps = {
  results: SearchResults[]
}

export type SearchResults = {
  poster_path: string
  id: number
  original_name: string
  original_title: string
  name: string
  title: string
  overview: string
  first_air_date: string
  release_date: string
  vote_average: number
}

export const getSearch = async (
  mediaType: "tv" | "movie",
  term: string,
  page: number = 1
): Promise<SearchProps | undefined> => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/${mediaType}?query=${term}&page=${page}`,
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
