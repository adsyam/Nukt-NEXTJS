"use client"

import { MessageSquareWarning, ThumbsUp } from "lucide-react"
import Image from "next/image"
import { useQueryState } from "nuqs"
import { useState } from "react"

type FilterProps = "best" | "newest" | "oldest"

const Comments = () => {
  const [filter, setFilter] = useQueryState("filter", {
    defaultValue: "best",
  })

  const [like, setLike] = useState<number>(0)

  return (
    <section className="border-2 border-stone-900 rounded-md p-10 bg-black/30 space-y-2 max-sm:p-5">
      <span className="font-semibold text-lg">Leave a comment</span>
      <div className="flex max-sm:flex-col max-sm:gap-2 justify-between items-center p-5 rounded-md bg-stone-900">
        <div className="">
          <span className="font-semibold text-stone-300">
            Nukt Community Policy
          </span>
          <span className="text-sm text-stone-400">
            No spoilers even with spoiler tags. Be nice and friendly!
          </span>
          <span className="text-sm text-stone-400">
            Please read our Comment Policy before commenting.
          </span>
        </div>
        <button className="hover:scale-110 rounded-md bg-stone-950 duration-0 px-10 py-2 text-stone-300 active:bg-stone-900 active:ring-2 active:ring-stone-500">
          Got it
        </button>
      </div>
      <div className="space-y-2 mb-2">
        <span className="border-b-2 border-stone-700"># Comments</span>
        <div className="flex gap-2">
          <Image
            width={30}
            height={30}
            src={""}
            alt=""
            className="rounded-md border-2 border-stone-700 h-9 w-9 "
          />
          <textarea
            placeholder="Join the discussion..."
            className="outline-none p-5 rounded-md border-2 border-stone-700 bg-stone-900 w-full h-20"
          />
        </div>
      </div>
      <div className="text-end space-x-2 *:relative *:duration-200">
        <button
          className={`${
            filter === "best"
              ? "after:absolute after:bottom-[-1px] after:left-0 after:right-0 after:h-1 after:bg-stone-500 after:rounded-md"
              : ""
          }`}
          onClick={() => setFilter("best")}
        >
          Best
        </button>
        <button
          className={`${
            filter === "newest"
              ? "after:absolute after:bottom-[-1px] after:left-0 after:right-0 after:h-1 after:bg-stone-500 after:rounded-md"
              : ""
          }`}
          onClick={() => setFilter("newest")}
        >
          Newest
        </button>
        <button
          className={`${
            filter === "oldest"
              ? "after:absolute after:bottom-[-1px] after:left-0 after:right-0 after:h-1 after:bg-stone-500 after:rounded-md"
              : ""
          }`}
          onClick={() => setFilter("oldest")}
        >
          Oldest
        </button>
      </div>
      <div className="flex gap-2">
        <Image
          width={30}
          height={30}
          src={""}
          alt=""
          className="rounded-md border-2 border-stone-700 h-9 w-9 "
        />
        <div className="w-full">
          <div className="flex justify-between" title="report comment">
            <span className="text-stone-400 font-semibold">name</span>
            <MessageSquareWarning
              size={20}
              className="cursor-help hover:scale-110 duration-200"
            />
          </div>
          <span className="text-sm text-stone-500">date ago</span>
          <span>comment</span>
          <div className="flex gap-2 text-stone-400">
            <span className="flex gap-2 items-center">
              <span>{like}</span>
              <ThumbsUp
                size={16}
                className="hover:scale-110 cursor-pointer"
                onClick={() => setLike(like + 1)}
              />
            </span>
            <button>Reply</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Comments
