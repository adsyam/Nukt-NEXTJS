"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useQueryState } from "nuqs"

type SeasonListProps = {
  data: {
    air_date: string
    episode_count: number
    poster_path: string
    season_number: number
    vote_average: number
  }[]
}

const SeasonList = ({ data }: SeasonListProps) => {
  const [season, setSeason] = useQueryState("season")

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      {data &&
        data
          .filter((seasonProps) => seasonProps.season_number !== 0)
          .map((seasonProps, i) => {
            return (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 10,
                }}
                className={`rounded-lg overflow-hidden border-2 border-stone-50/30 ${
                  Number(season) === seasonProps.season_number
                    ? "border-3 border-stone-50/60"
                    : ""
                }`}
              >
                <button
                  onClick={() =>
                    setSeason(seasonProps.season_number.toString())
                  }
                >
                  <div className="relative">
                    {seasonProps.poster_path !== null && (
                      <Image
                        alt={`season ${seasonProps.season_number}`}
                        className="rounded w-full h-auto object-cover"
                        width={320}
                        height={480}
                        src={`https://image.tmdb.org/t/p/original/${seasonProps.poster_path}`}
                      />
                    )}
                    {seasonProps.air_date !== null && (
                      <p className="text-stone-200 absolute bottom-1 right-1 bg-stone-400/10 px-2 backdrop-blur-sm rounded-md">
                        {seasonProps.air_date.split("-")[0]}
                      </p>
                    )}
                  </div>
                </button>
              </motion.div>
            )
          })}
    </div>
  )
}

export default SeasonList
