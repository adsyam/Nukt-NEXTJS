import Image, { StaticImageData } from "next/image"

type LogoProps = {
  imgData: StaticImageData
  imgAlt: string
}

export default function Logo(props: LogoProps) {
  return (
    <div>
      <Image width={40} height={40} src={props.imgData} alt={props.imgAlt} />
    </div>
  )
}
