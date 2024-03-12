"use client"

import { Season } from "@/actions/media-details"
import { useSearchParams } from "next/navigation"
import { useQueryState } from "nuqs"

type EpisodeListProps = {
  data: Season[]
}

const EpisodeList = ({ data }: EpisodeListProps) => {
  const [episode, setEpisode] = useQueryState("episode")
  const searchParams = useSearchParams()
  const season = searchParams.get("season")!

  return (
    <>
      <p className="px-2 py-1 text-center rounded-md bg-violet-900 text-stone-300">
        Choose an episode!
      </p>
      <div className="grid grid-cols-7 sm:grid-cols-8 md:grid-cols-9 lg:grid-cols-10 xl:grid-cols-11 2xl:grid-cols-12 w-full gap-2 items-center text-center">
        {data &&
          data
            .filter((episodeProps) => episodeProps.season_number !== 0)
            .map((episodeProps, i) => {
              return (
                <>
                  {Number(season) === episodeProps.season_number &&
                    Array.from(
                      { length: episodeProps.episode_count },
                      (_, i) => {
                        return (
                          <button
                            key={i}
                            onClick={() => setEpisode((i + 1).toString())}
                            className={`flex items-center justify-center border border-stone-50/10 px-2 py-1 hover:scale-110 hover:border-purple-500 duration-200 rounded-md text-sm ${
                              i + 1 === Number(episode)
                                ? "bg-stone-200/10 text-stone-100 border-purple-700/70"
                                : ""
                            }`}
                          >
                            {i + 1}
                          </button>
                        )
                      }
                    )}
                </>
              )
            })}
      </div>
    </>
  )
}

export default EpisodeList
