import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

export interface Dish {
  id: string
  name: string
  desc: string
  price: string
  category: string
  tags?: string[]
  img: string
  emoji?: string
}

interface MenuSectionProps {
  label: string
  heading: string
  headingAccent: string
  dishes: Dish[]
  categories: Record<string, string>
  ctaText: string
  onCtaClick: () => void
  filterLabels: { all: string; gf: string; veg: string; vegan: string }
}

export function MenuSection({ label, heading, headingAccent, dishes, categories, ctaText, onCtaClick, filterLabels }: MenuSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [activeDiet, setActiveDiet] = useState<string>('all')
  const [lightboxDish, setLightboxDish] = useState<Dish | null>(null)

  const filtered = dishes.filter(d => {
    const catOk = activeCategory === 'all' || d.category === activeCategory
    const dietOk = activeDiet === 'all' || (d.tags || []).includes(activeDiet)
    return catOk && dietOk
  })

  return (
    <section id="menu" className="py-24 px-6 bg-dark-800">
      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-gold-500 text-xs tracking-widest2 uppercase font-sans mb-3">{label}</p>
        <h2 className="font-serif text-cream-100 text-4xl md:text-5xl">
          {heading} <span className="text-gold-500 italic">{headingAccent}</span>
        </h2>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-4 py-2 rounded-full text-xs tracking-widest uppercase font-sans transition-colors ${
            activeCategory === 'all'
              ? 'bg-gold-500 text-dark-900'
              : 'border border-gold-500/30 text-cream-300 hover:border-gold-500/60'
          }`}
        >
          {filterLabels.all}
        </button>
        {Object.entries(categories).map(([key, val]) => (
          <button
            key={key}
            onClick={() => setActiveCategory(key)}
            className={`px-4 py-2 rounded-full text-xs tracking-widest uppercase font-sans transition-colors ${
              activeCategory === key
                ? 'bg-gold-500 text-dark-900'
                : 'border border-gold-500/30 text-cream-300 hover:border-gold-500/60'
            }`}
          >
            {val}
          </button>
        ))}
      </div>

      {/* Diet filters */}
      <div className="flex justify-center gap-2 mb-12">
        {[
          { key: 'all', label: 'Tutti' },
          { key: 'gf', label: filterLabels.gf },
          { key: 'veg', label: filterLabels.veg },
          { key: 'vegan', label: filterLabels.vegan },
        ].map(f => (
          <button
            key={f.key}
            onClick={() => setActiveDiet(f.key)}
            className={`px-3 py-1.5 rounded-full text-xs font-sans transition-colors ${
              activeDiet === f.key
                ? 'bg-dark-600 text-gold-400 border border-gold-500/50'
                : 'text-cream-300/50 hover:text-cream-300/80'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        <AnimatePresence mode="popLayout">
          {filtered.map(dish => (
            <motion.div
              key={dish.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              onClick={() => setLightboxDish(dish)}
              className="cursor-pointer group bg-dark-700 rounded-xl overflow-hidden shadow-lg hover:shadow-gold-500/10 hover:shadow-xl transition-shadow"
            >
              {/* Image */}
              <div className="relative h-48 bg-dark-600 overflow-hidden">
                {dish.img ? (
                  <img
                    src={dish.img}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-dark-600 to-dark-500 flex items-center justify-center">
                    <span className="text-gold-500/30 text-4xl">{dish.emoji || '🍽'}</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/70 via-transparent to-transparent" />
                {/* Price always visible */}
                <div className="absolute bottom-2 right-3">
                  <span className="text-gold-400 font-serif font-semibold text-lg">{dish.price}</span>
                </div>
                {/* Diet tags */}
                {dish.tags && dish.tags.length > 0 && (
                  <div className="absolute top-2 left-2 flex gap-1">
                    {dish.tags.map(t => (
                      <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-dark-900/70 text-gold-400 uppercase font-sans tracking-wide">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              {/* Info */}
              <div className="p-4">
                <h3 className="font-serif text-cream-100 text-base mb-1 group-hover:text-gold-400 transition-colors">{dish.name}</h3>
                <p className="text-cream-300/60 text-xs font-sans leading-relaxed line-clamp-2">{dish.desc}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* CTA */}
      <div className="text-center mt-14">
        <button
          onClick={onCtaClick}
          className="bg-gold-500 hover:bg-gold-400 text-dark-900 px-8 py-4 rounded-lg font-sans font-medium tracking-wide transition-colors"
        >
          {ctaText}
        </button>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxDish && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-dark-900/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setLightboxDish(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-dark-700 rounded-2xl overflow-hidden max-w-lg w-full shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative h-72 bg-dark-600">
                {lightboxDish.img ? (
                  <img src={lightboxDish.img} alt={lightboxDish.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-dark-600 to-dark-500 flex items-center justify-center">
                    <span className="text-gold-500/30 text-6xl">{lightboxDish.emoji || '🍽'}</span>
                  </div>
                )}
                <button
                  onClick={() => setLightboxDish(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-dark-900/70 flex items-center justify-center text-cream-100 hover:bg-dark-900"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-serif text-cream-100 text-2xl">{lightboxDish.name}</h3>
                  <span className="text-gold-500 font-serif text-2xl font-semibold">{lightboxDish.price}</span>
                </div>
                <p className="text-cream-300/70 text-sm font-sans leading-relaxed">{lightboxDish.desc}</p>
                {lightboxDish.tags && lightboxDish.tags.length > 0 && (
                  <div className="flex gap-2 mt-4">
                    {lightboxDish.tags.map(t => (
                      <span key={t} className="text-xs px-2 py-1 rounded-full border border-gold-500/40 text-gold-400 uppercase font-sans tracking-wide">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
