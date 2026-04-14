interface ImageAutoSliderProps {
  images: string[]
  label?: string
  heading?: string
  headingAccent?: string
}

export function ImageAutoSlider({ images, label, heading, headingAccent }: ImageAutoSliderProps) {
  const doubled = [...images, ...images]

  return (
    <section className="py-20 bg-dark-700 overflow-hidden">
      {(label || heading) && (
        <div className="text-center mb-12 px-6">
          {label && (
            <p className="text-gold-500 text-xs tracking-widest2 uppercase font-sans mb-3">{label}</p>
          )}
          {heading && (
            <h2 className="font-serif text-cream-100 text-4xl md:text-5xl">
              {heading}{' '}
              {headingAccent && <span className="text-gold-500 italic">{headingAccent}</span>}
            </h2>
          )}
        </div>
      )}
      <div
        className="relative w-full"
        style={{
          maskImage: 'linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)',
        }}
      >
        <div className="flex gap-4 w-max animate-scroll-left">
          {doubled.map((src, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-72 h-52 md:w-96 md:h-64 rounded-xl overflow-hidden shadow-xl bg-dark-600"
            >
              {src ? (
                <img src={src} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-dark-600 to-dark-500 flex items-center justify-center">
                  <span className="text-gold-500/30 text-4xl font-serif">G</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
