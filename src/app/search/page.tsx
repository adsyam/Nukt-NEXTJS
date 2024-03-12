"use client"

import { getSearch } from "@/actions"
import { SearchResults } from "@/actions/search"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"

const Search = () => {
  const searchParams = useSearchParams()
  const term = searchParams.get("term")!

  let mediaType: "tv" | "movie" = "tv"

  const [data, setData] = useState<SearchResults[]>()

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSearch(mediaType, term)
      setData(data?.results)
    }

    fetchData()
  }, [mediaType, term])

  return <div className="text-white">{term}</div>
}

const SearchPage = () => {
  return (
    <Suspense>
      <Search />
    </Suspense>
  )
}

export default SearchPage
