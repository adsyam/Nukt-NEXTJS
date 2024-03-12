import { getMediaDetails } from "@/actions/media-details"
import MediaCardDetails from "@/components/cards/media-card-details"
import Comments from "@/components/comments"
import EpisodeList from "@/components/episode-list"
import SeasonList from "@/components/season-list"
import ServerButton from "@/components/server-button"
import VideoCard from "@/components/video-card"

export type WatchPageParams = {
  params: {
    mediaId: string
    mediaType: "tv" | "movie"
  }
}

const WatchPage = async ({ params }: WatchPageParams) => {
  const data = await getMediaDetails(params.mediaId, params.mediaType)

  return (
    <>
      <title>{`Nukt | ${data?.original_name || data?.title}`}</title>
      <section className="mt-16 container">
        <div className="space-y-1">
          <VideoCard />
          {data && (
            <MediaCardDetails data={data} mediaType={params.mediaType} />
          )}
        </div>
        <div className="space-y-3 mt-2 container">
          <ServerButton />
          {params.mediaType === "tv" && data && (
            <>
              <EpisodeList data={data?.seasons} />
              <SeasonList data={data?.seasons} />
            </>
          )}
          <Comments />
        </div>
      </section>
    </>
  )
}

export default WatchPage
