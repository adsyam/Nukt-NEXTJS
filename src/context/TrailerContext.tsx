"use client"

import { FetchTrailerProps, getTrailer } from "@/actions/trailer"
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"

type TrailerProps = {
  isTrailerOpen: boolean
  openTrailer: (isOpen: boolean) => void
  mediaType: "movie" | "tv" | "people" | undefined
  setMediaType: Dispatch<SetStateAction<"movie" | "tv" | "people" | undefined>>
  id: string
  setId: Dispatch<SetStateAction<string>>
  dataResults: FetchTrailerProps["results"] | undefined
}

type ProviderProps = {
  children: React.ReactNode
}

const TrailerDefault: TrailerProps = {
  isTrailerOpen: false,
  openTrailer: () => {},
  mediaType: "tv",
  setMediaType: () => {},
  id: "",
  setId: () => {},
  dataResults: [{ key: "", type: "Trailer" }],
}

const TrailerContext = createContext<TrailerProps>(TrailerDefault)

export const useTrailer = () => {
  return useContext(TrailerContext)
}

export const TrailerProvider = ({ children }: ProviderProps) => {
  const [isTrailerOpen, setIsTrailerOpen] = useState(false)
  const [mediaType, setMediaType] = useState<
    TrailerProps["mediaType"] | undefined
  >()
  const [id, setId] = useState<TrailerProps["id"]>("")
  const [data, setData] = useState<FetchTrailerProps>()

  const openTrailer = (isOpen: boolean) => {
    setIsTrailerOpen(isOpen)
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTrailer(mediaType, id)
      setData(data)
    }

    fetchData()
  }, [id, mediaType])

  const dataResults = data?.results
    ?.filter((video) => video.type === "Trailer")
    .slice(0, 1)

  const value = {
    isTrailerOpen,
    openTrailer,
    mediaType,
    setMediaType,
    id,
    setId,
    dataResults,
  }

  return (
    <>
      <TrailerContext.Provider value={value}>
        {children}
      </TrailerContext.Provider>
    </>
  )
}
