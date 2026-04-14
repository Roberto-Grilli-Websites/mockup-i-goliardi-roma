import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'

interface AnimatedHeroTitleProps {
  words: string[]
  staticPrefix?: string
  className?: string
}

export function AnimatedHeroTitle({ words, staticPrefix, className }: AnimatedHeroTitleProps) {
  const [index, setIndex] = useState(0)
  const titles = useMemo(() => words, [words])

  useEffect(() => {
    const id = setTimeout(() => {
      setIndex(i => (i === titles.length - 1 ? 0 : i + 1))
    }, 2500)
    return () => clearTimeout(id)
  }, [index, titles])

  return (
    <h1 className={className}>
      {staticPrefix && <span className="block">{staticPrefix}</span>}
      <span className="relative flex justify-center overflow-hidden h-[1.2em]">
        &nbsp;
        {titles.map((t, i) => (
          <motion.span
            key={i}
            className="absolute font-semibold text-gold-500"
            initial={{ opacity: 0, y: 60 }}
            transition={{ type: 'spring', stiffness: 50 }}
            animate={
              index === i
                ? { y: 0, opacity: 1 }
                : { y: index > i ? -80 : 80, opacity: 0 }
            }
          >
            {t}
          </motion.span>
        ))}
      </span>
    </h1>
  )
}
