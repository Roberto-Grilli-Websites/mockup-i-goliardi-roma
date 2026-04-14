import { useState } from 'react'
import { motion } from 'framer-motion'
import { CalendarDays, ExternalLink } from 'lucide-react'

interface FlipCardBookingProps {
  label: string
  heading: string
  headingAccent: string
  frontTitle: string
  frontDesc: string
  frontCtaText: string
  backTitle: string
  backDesc: string
  theForkUrl: string
  theForkLabel: string
  phoneLabel: string
  phone: string
  backBtnText: string
}

export function FlipCardBooking({
  label, heading, headingAccent,
  frontTitle, frontDesc, frontCtaText,
  backTitle, backDesc, theForkUrl, theForkLabel, phoneLabel, phone, backBtnText,
}: FlipCardBookingProps) {
  const [flipped, setFlipped] = useState(false)

  return (
    <section id="prenota" className="py-24 px-6 bg-cream-100">
      <div className="text-center mb-14">
        <p className="text-gold-600 text-xs tracking-widest2 uppercase font-sans mb-3">{label}</p>
        <h2 className="font-serif text-dark-700 text-4xl md:text-5xl">
          {heading} <span className="text-gold-600 italic">{headingAccent}</span>
        </h2>
      </div>

      <div className="flex justify-center">
        <div className="perspective-1000" style={{ width: 340, height: 420 }}>
          <motion.div
            className="relative w-full h-full"
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Front */}
            <div className="absolute inset-0 backface-hidden bg-dark-700 rounded-2xl shadow-xl flex flex-col items-center justify-center p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-gold-500/10 flex items-center justify-center mb-6">
                <CalendarDays className="w-8 h-8 text-gold-500" />
              </div>
              <h3 className="font-serif text-cream-100 text-2xl mb-3">{frontTitle}</h3>
              <p className="text-cream-300/60 text-sm font-sans leading-relaxed mb-8">{frontDesc}</p>
              <button
                onClick={() => setFlipped(true)}
                className="bg-gold-500 hover:bg-gold-400 text-dark-900 px-6 py-3 rounded-lg font-sans font-medium text-sm tracking-wide transition-colors"
              >
                {frontCtaText}
              </button>
            </div>

            {/* Back */}
            <div
              className="absolute inset-0 backface-hidden bg-dark-700 rounded-2xl shadow-xl flex flex-col justify-center p-8"
              style={{ transform: 'rotateY(180deg)' }}
            >
              <h3 className="font-serif text-cream-100 text-xl mb-2">{backTitle}</h3>
              <p className="text-cream-300/60 text-sm font-sans mb-6 leading-relaxed">{backDesc}</p>

              <div className="space-y-3">
                <a
                  href={theForkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full bg-gold-500 hover:bg-gold-400 text-dark-900 px-5 py-3 rounded-lg font-sans font-medium text-sm transition-colors"
                >
                  <span>{theForkLabel}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
                <a
                  href={`tel:${phone.replace(/\s/g, '')}`}
                  className="flex items-center justify-between w-full border border-gold-500/40 text-cream-100 hover:border-gold-500 px-5 py-3 rounded-lg font-sans text-sm transition-colors"
                >
                  <span>{phoneLabel}</span>
                  <span className="text-gold-400">{phone}</span>
                </a>
              </div>

              <button
                onClick={() => setFlipped(false)}
                className="mt-6 text-cream-300/50 hover:text-cream-300 text-xs font-sans transition-colors"
              >
                ← {backBtnText}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
