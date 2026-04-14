'use client'

import { useScroll, useTransform, motion } from 'framer-motion'
import { useRef } from 'react'

interface ZoomParallaxProps {
  images: string[]
  heading?: string
  headingAccent?: string
  label?: string
}

export function ZoomParallax({ images, heading, headingAccent, label }: ZoomParallaxProps) {
  const container = useRef(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  })

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4])
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5])
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6])
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8])
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9])
  const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9]

  const positions = [
    '',
    '[&>div]:!-top-[30vh] [&>div]:!left-[5vw] [&>div]:!h-[30vh] [&>div]:!w-[35vw]',
    '[&>div]:!-top-[10vh] [&>div]:!-left-[25vw] [&>div]:!h-[45vh] [&>div]:!w-[20vw]',
    '[&>div]:!left-[27.5vw] [&>div]:!h-[25vh] [&>div]:!w-[25vw]',
    '[&>div]:!top-[27.5vh] [&>div]:!left-[5vw] [&>div]:!h-[25vh] [&>div]:!w-[20vw]',
    '[&>div]:!top-[27.5vh] [&>div]:!-left-[22.5vw] [&>div]:!h-[25vh] [&>div]:!w-[30vw]',
    '[&>div]:!top-[22.5vh] [&>div]:!left-[25vw] [&>div]:!h-[15vh] [&>div]:!w-[15vw]',
  ]

  return (
    <section className="bg-dark-900">
      {(label || heading) && (
        <div className="text-center pt-20 pb-8 px-6">
          {label && <p className="text-gold-500 text-xs tracking-widest2 uppercase font-sans mb-3">{label}</p>}
          {heading && (
            <h2 className="font-serif text-cream-100 text-4xl md:text-5xl">
              {heading} {headingAccent && <span className="text-gold-500 italic">{headingAccent}</span>}
            </h2>
          )}
        </div>
      )}
      <div ref={container} className="relative h-[300vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          {images.slice(0, 7).map((src, index) => {
            const scale = scales[index % scales.length]
            return (
              <motion.div
                key={index}
                style={{ scale }}
                className={`absolute top-0 flex h-full w-full items-center justify-center ${positions[index] || ''}`}
              >
                <div className="relative h-[25vh] w-[25vw] overflow-hidden rounded-sm bg-dark-600">
                  {src ? (
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-dark-600 to-dark-500 flex items-center justify-center">
                      <span className="text-gold-500/20 text-3xl font-serif">G</span>
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
