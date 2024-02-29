import Carousel from "@/components/carousel/carousel"
import Main from "@/components/main"

export default function Home() {
  return (
    <>
      <Carousel />
      <div className="container m-auto p-4">
        <Main />
      </div>
    </>
  )
}
