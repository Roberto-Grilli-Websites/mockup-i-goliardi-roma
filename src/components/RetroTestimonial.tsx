import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Quote, X } from 'lucide-react'

export interface Testimonial {
  name: string
  designation: string
  description: string
  stars: number
}

interface RetroTestimonialProps {
  items: Testimonial[]
  label: string
  heading: string
  headingAccent: string
  googleUrl: string
  googleLabel: string
}

function TestimonialCard({ t, index, onClose }: { t: Testimonial; index: number; onClose: () => void }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-dark-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => { setExpanded(false); onClose() }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-cream-100 rounded-2xl max-w-lg w-full p-8 relative"
              onClick={e => e.stopPropagation()}
            >
              <button onClick={() => { setExpanded(false); onClose() }}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-dark-700 flex items-center justify-center text-cream-100">
                <X className="w-4 h-4" />
              </button>
              <p className="text-dark-700/60 text-sm font-sans italic mb-1">{t.designation}</p>
              <p className="font-serif text-dark-700 text-xl italic mb-4">{t.name}</p>
              <Quote className="w-5 h-5 text-gold-600 mb-3" />
              <p className="font-sans text-dark-700/80 text-base leading-relaxed">{t.description}</p>
              <div className="flex mt-4 gap-1">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <span key={i} className="text-gold-500 text-sm">★</span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setExpanded(true)}
        whileHover={{ rotate: index % 2 === 0 ? 2 : -2, scale: 1.02 }}
        className="flex-shrink-0"
      >
        <div className="bg-gradient-to-b from-cream-100 to-cream-50 rounded-2xl h-[420px] w-72 md:w-80 overflow-hidden flex flex-col items-center justify-center relative shadow-md px-6 py-8">
          <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-gold-500/20 to-transparent" />
          {/* Stars */}
          <div className="flex gap-1 mb-4">
            {Array.from({ length: t.stars }).map((_, i) => (
              <span key={i} className="text-gold-500 text-lg">★</span>
            ))}
          </div>
          <Quote className="w-5 h-5 text-dark-700/40 mb-3" />
          <p className="font-serif text-dark-700/80 text-lg italic text-center leading-snug mb-5">
            {t.description.length > 120 ? `${t.description.slice(0, 120)}…` : t.description}
          </p>
          <p className="font-serif text-dark-700 text-xl italic text-center">{t.name}.</p>
          <p className="text-dark-700/50 text-sm font-sans italic text-center mt-1 underline underline-offset-4 decoration-1">
            {t.designation.length > 28 ? `${t.designation.slice(0, 28)}…` : t.designation}
          </p>
        </div>
      </motion.button>
    </>
  )
}

export function RetroTestimonial({ items, label, heading, headingAccent, googleUrl, googleLabel }: RetroTestimonialProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [canLeft, setCanLeft] = useState(false)
  const [canRight, setCanRight] = useState(true)

  const check = () => {
    if (!ref.current) return
    const { scrollLeft, scrollWidth, clientWidth } = ref.current
    setCanLeft(scrollLeft > 0)
    setCanRight(scrollLeft < scrollWidth - clientWidth - 1)
  }

  useEffect(() => { check() }, [])

  const scroll = (dir: 'left' | 'right') => {
    ref.current?.scrollBy({ left: dir === 'left' ? -320 : 320, behavior: 'smooth' })
  }

  return (
    <section id="recensioni" className="py-24 px-6 bg-dark-700">
      <div className="text-center mb-12">
        <p className="text-gold-500 text-xs tracking-widest2 uppercase font-sans mb-3">{label}</p>
        <h2 className="font-serif text-cream-100 text-4xl md:text-5xl">
          {heading} <span className="text-gold-500 italic">{headingAccent}</span>
        </h2>
        <a href={googleUrl} target="_blank" rel="noopener noreferrer"
          className="inline-block mt-4 text-gold-400 text-xs underline underline-offset-4 font-sans hover:text-gold-300 transition-colors">
          {googleLabel} →
        </a>
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div
          ref={ref}
          onScroll={check}
          className="flex gap-4 overflow-x-auto scrollbar-none py-4 px-1"
        >
          {items.map((t, i) => (
            <TestimonialCard key={i} t={t} index={i} onClose={() => {}} />
          ))}
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button disabled={!canLeft} onClick={() => scroll('left')}
            className="w-10 h-10 rounded-full bg-dark-600 flex items-center justify-center disabled:opacity-30 hover:bg-dark-500 transition-colors">
            <ArrowLeft className="w-5 h-5 text-cream-200" />
          </button>
          <button disabled={!canRight} onClick={() => scroll('right')}
            className="w-10 h-10 rounded-full bg-dark-600 flex items-center justify-center disabled:opacity-30 hover:bg-dark-500 transition-colors">
            <ArrowRight className="w-5 h-5 text-cream-200" />
          </button>
        </div>
      </div>
    </section>
  )
}
