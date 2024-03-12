import MediaCard from "@/components/cards/media-card"
import Carousel from "@/components/carousel/carousel"

export type MediaType = "movie" | "tv"
export type Category = "Popular" | "Trending" | "Top Rated"

const Home = () => {
  const category: Category[] = ["Trending", "Top Rated", "Popular"]

  const categoryType = category.map((type) => {
    return <MediaCard key={type} category={type} />
  })
  return (
    <>
      <Carousel />
      <div className="container md:px-20">{categoryType}</div>
    </>
  )
}

export default Home