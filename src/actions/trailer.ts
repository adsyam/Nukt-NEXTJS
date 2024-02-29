"use server"

export type FetchTrailerProps = {
  results: {
    key: string
    type: "Trailer"
  }[]
}

export const getTrailer = async (
  mediaType: "movie" | "tv" | "people" | undefined,
  id: string
): Promise<FetchTrailerProps | undefined> => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/${mediaType}/${id}/videos`,
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
