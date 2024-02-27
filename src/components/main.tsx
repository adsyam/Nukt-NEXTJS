"use client"

import MediaCard from "./cards/media-card"

export type MediaType = "movie" | "tv"
export type Category = "Popular" | "Trending" | "Top Rated"

export default function MainPage() {
  const category: Category[] = ["Popular", "Trending", "Top Rated"]

  const categoryType = category.map((type) => {
    return <MediaCard key={type} category={type} />
  })

  return <div>{categoryType}</div>
}
