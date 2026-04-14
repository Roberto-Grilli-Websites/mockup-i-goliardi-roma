import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Phone, Clock, ExternalLink } from 'lucide-react'

interface Schedule { day: string; hours: string }
interface InteractiveMapProps {
  label: string
  heading: string
  address: string
  phone: string
  schedule: Schedule[]
  mapEmbedUrl: string
  ctaText: string
  phone_label: string
  hours_label: string
  address_label: string
  note: string
}

export function InteractiveMap({
  label, heading, address, phone, schedule, mapEmbedUrl,
  ctaText, phone_label, hours_label, address_label, note,
}: InteractiveMapProps) {
  const [mapExpanded, setMapExpanded] = useState(false)

  return (
    <section id="contatti" className="py-24 px-6 bg-dark-800">
      <div className="text-center mb-14">
        <p className="text-gold-500 text-xs tracking-widest2 uppercase font-sans mb-3">{label}</p>
        <h2 className="font-serif text-cream-100 text-4xl md:text-5xl">{heading}</h2>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Info */}
        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-gold-500" />
              <span className="text-gold-500 text-xs tracking-widest uppercase font-sans">{address_label}</span>
            </div>
            <p className="text-cream-100 font-sans text-base">{address}</p>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Phone className="w-4 h-4 text-gold-500" />
              <span className="text-gold-500 text-xs tracking-widest uppercase font-sans">{phone_label}</span>
            </div>
            <a href={`tel:${phone.replace(/\s/g, '')}`} className="text-cream-100 font-sans text-base hover:text-gold-400 transition-colors">
              {phone}
            </a>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-gold-500" />
              <span className="text-gold-500 text-xs tracking-widest uppercase font-sans">{hours_label}</span>
            </div>
            <div className="space-y-2">
              {schedule.map((s, i) => (
                <div key={i} className="flex justify-between text-sm font-sans">
                  <span className="text-cream-300/60">{s.day}</span>
                  <span className="text-cream-100">{s.hours}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-cream-300/50 text-xs font-sans italic">{note}</p>
          <a
            href={`tel:${phone.replace(/\s/g, '')}`}
            className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-dark-900 px-6 py-3 rounded-lg font-sans font-medium text-sm tracking-wide transition-colors"
          >
            <Phone className="w-4 h-4" />
            {ctaText}
          </a>
        </div>

        {/* Map */}
        <motion.div
          className="relative cursor-pointer overflow-hidden rounded-xl bg-dark-600 shadow-xl"
          animate={{ height: mapExpanded ? 420 : 220 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          onClick={() => setMapExpanded(v => !v)}
        >
          <motion.div
            className="w-full h-full"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <iframe
              title="Mappa I Goliardi Roma"
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: mapExpanded ? 420 : 220 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
          <AnimatePresence>
            {!mapExpanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-dark-900/70 backdrop-blur-sm text-cream-100 text-xs font-sans px-3 py-1.5 rounded-full flex items-center gap-1.5"
              >
                <ExternalLink className="w-3 h-3" />
                Clicca per espandere
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
