import Image, { StaticImageData } from "next/image"

type LogoProps = {
  imgData: StaticImageData
  imgAlt: string
}

export default function Logo(props: LogoProps) {
  return (
    <div>
      <Image width={30} height={30} src={props.imgData} alt={props.imgAlt} />
    </div>
  )
}
