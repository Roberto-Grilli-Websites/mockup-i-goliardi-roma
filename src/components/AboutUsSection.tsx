import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform, useSpring } from 'framer-motion'
import { Wheat, Wine, ChefHat, Leaf, Star, UtensilsCrossed } from 'lucide-react'

interface Stat { n: string; label: string }
interface AboutUsSectionProps {
  label: string
  heading: string
  headingAccent: string
  p1: string
  p2: string
  stats: Stat[]
  imgSrc: string
  ctaText: string
  onCtaClick: () => void
}

const pillars = [
  {
    icon: <Wheat className="w-5 h-5" />,
    title: 'Materie Prime',
    desc: 'Tartufo bianco, Castelmagno DOP, nocciola IGP: ingredienti che parlano da soli.',
    side: 'left',
  },
  {
    icon: <Wine className="w-5 h-5" />,
    title: 'Carta dei Vini',
    desc: "Barolo, Barbaresco, Arneis DOCG, Moscato d'Asti. Il meglio del Piemonte in calice.",
    side: 'left',
  },
  {
    icon: <ChefHat className="w-5 h-5" />,
    title: 'Cucina Artigianale',
    desc: 'Plin fatti a mano, tajarin ai 40 tuorli, pasta tirata ogni giorno in casa.',
    side: 'left',
  },
  {
    icon: <Leaf className="w-5 h-5" />,
    title: 'Stagionalità',
    desc: 'Il menu cambia con la stagione. Il tartufo arriva quando è il momento giusto.',
    side: 'right',
  },
  {
    icon: <Star className="w-5 h-5" />,
    title: 'Accoglienza',
    desc: 'Enrico accoglie ogni ospite come si fa in casa propria: con calore e discrezione.',
    side: 'right',
  },
  {
    icon: <UtensilsCrossed className="w-5 h-5" />,
    title: 'Tradizione Piemontese',
    desc: 'Unico ristorante piemontese autentico nel cuore di Roma, vicino a Via Veneto.',
    side: 'right',
  },
]

function StatCounter({ n, label }: Stat) {
  return (
    <div className="text-center group">
      <div className="text-3xl md:text-4xl font-serif font-semibold text-gold-500 mb-1">{n}</div>
      <div className="text-cream-300/70 text-xs tracking-widest uppercase font-sans">{label}</div>
      <div className="w-8 h-px bg-gold-600 mt-2 mx-auto group-hover:w-16 transition-all duration-300" />
    </div>
  )
}

export function AboutUsSection({ label, heading, headingAccent, p1, p2, stats, imgSrc, ctaText, onCtaClick }: AboutUsSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: false, amount: 0.1 })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -40])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 40])

  return (
    <section id="storia" ref={ref} className="py-24 px-6 bg-cream-100 overflow-hidden relative">
      <motion.div className="absolute top-20 left-8 w-56 h-56 rounded-full bg-gold-500/5 blur-3xl" style={{ y: y1 }} />
      <motion.div className="absolute bottom-20 right-8 w-72 h-72 rounded-full bg-dark-700/5 blur-3xl" style={{ y: y2 }} />

      <motion.div
        className="container mx-auto max-w-6xl relative z-10"
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } } }}
      >
        {/* Header */}
        <motion.div
          className="flex flex-col items-center mb-6"
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
        >
          <p className="text-gold-600 text-xs tracking-widest2 uppercase font-sans mb-3">{label}</p>
          <h2 className="font-serif text-dark-700 text-4xl md:text-5xl font-light text-center">
            {heading} <span className="italic text-gold-600">{headingAccent}</span>
          </h2>
          <motion.div
            className="w-0 h-px bg-gold-500 mt-4"
            animate={inView ? { width: 80 } : { width: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>

        <motion.p
          className="text-center max-w-2xl mx-auto mb-16 text-dark-600/80 font-sans text-base leading-relaxed"
          variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
        >
          {p1}
        </motion.p>

        {/* 3-col layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Left pillars */}
          <div className="space-y-12">
            {pillars.filter(p => p.side === 'left').map((p, i) => (
              <motion.div
                key={i}
                className="flex flex-col group"
                variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: i * 0.1 } } }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-gold-600 bg-gold-500/10 p-2.5 rounded-lg group-hover:bg-gold-500/20 transition-colors">
                    {p.icon}
                  </div>
                  <h3 className="font-serif text-dark-700 text-lg group-hover:text-gold-600 transition-colors">{p.title}</h3>
                </div>
                <p className="text-dark-600/70 text-sm leading-relaxed pl-11 font-sans">{p.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Center image */}
          <div className="flex justify-center items-center order-first md:order-none mb-6 md:mb-0">
            <motion.div
              className="relative w-full max-w-xs"
              variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.8, delay: 0.2 } } }}
            >
              <div className="rounded-lg overflow-hidden shadow-2xl aspect-[3/4] bg-dark-600">
                {imgSrc ? (
                  <img src={imgSrc} alt="La cucina de I Goliardi" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-b from-dark-600 to-dark-700 flex items-center justify-center">
                    <span className="text-gold-500/30 text-6xl font-serif">G</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 to-transparent" />
              </div>
              <div className="absolute inset-0 border-2 border-gold-500/30 rounded-lg -m-2 z-[-1]" />
              <motion.div className="absolute -top-4 -right-6 w-14 h-14 rounded-full bg-gold-500/10" style={{ y: y1 }} />
              <motion.div className="absolute -bottom-6 -left-8 w-20 h-20 rounded-full bg-dark-700/10" style={{ y: y2 }} />
            </motion.div>
          </div>

          {/* Right pillars */}
          <div className="space-y-12">
            {pillars.filter(p => p.side === 'right').map((p, i) => (
              <motion.div
                key={i}
                className="flex flex-col group"
                variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: i * 0.1 } } }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-gold-600 bg-gold-500/10 p-2.5 rounded-lg group-hover:bg-gold-500/20 transition-colors">
                    {p.icon}
                  </div>
                  <h3 className="font-serif text-dark-700 text-lg group-hover:text-gold-600 transition-colors">{p.title}</h3>
                </div>
                <p className="text-dark-600/70 text-sm leading-relaxed pl-11 font-sans">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <motion.div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-t border-b border-gold-500/20"
          variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.3 } } }}
        >
          {stats.map((s, i) => <StatCounter key={i} {...s} />)}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-12 bg-dark-700 text-cream-100 px-8 py-8 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6"
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.4 } } }}
        >
          <div>
            <p className="font-serif text-xl mb-1">{p2}</p>
            <p className="text-cream-300/60 text-sm font-sans">Via Sardegna 28, Roma · +39 375 614 6292</p>
          </div>
          <button
            onClick={onCtaClick}
            className="bg-gold-500 hover:bg-gold-400 text-dark-900 px-6 py-3 rounded-lg font-sans font-medium text-sm tracking-wide transition-colors whitespace-nowrap"
          >
            {ctaText}
          </button>
        </motion.div>
      </motion.div>
    </section>
  )
}
