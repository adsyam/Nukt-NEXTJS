import { easeOut, motion, useTime, useTransform } from "framer-motion"

export default function MediaCardLoader() {
  const time = useTime()
  const pulseOpacity = useTransform(time, [-100, 0, 100, 200], [0, 1, 1, 0], {
    ease: easeOut,
  })

  return (
    <motion.div
      style={{ opacity: pulseOpacity }}
      className="text-stone-300 font-bold text-xl"
    >
      Loading...
    </motion.div>
  )
}
