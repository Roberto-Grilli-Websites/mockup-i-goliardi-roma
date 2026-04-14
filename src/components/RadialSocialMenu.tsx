import { useEffect, useState } from 'react'
import { Instagram, Facebook, ExternalLink } from 'lucide-react'

interface SocialLink { icon: React.ReactNode; href: string; label: string }

interface RadialSocialMenuProps {
  links: SocialLink[]
}

export function RadialSocialMenu({ links }: RadialSocialMenuProps) {
  const [angle, setAngle] = useState(0)
  const radius = 80

  useEffect(() => {
    let raf: number
    const animate = () => {
      setAngle(a => a + 0.004)
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div className="relative w-48 h-48 flex items-center justify-center mx-auto">
      {/* Center */}
      <div className="relative z-10 w-14 h-14 rounded-full bg-gold-500 flex items-center justify-center shadow-lg">
        <span className="font-serif text-dark-900 text-lg font-bold">G</span>
      </div>
      {/* Orbit ring */}
      <div
        className="absolute rounded-full border border-dashed border-gold-500/20"
        style={{ width: radius * 2, height: radius * 2 }}
      />
      {/* Icons */}
      {links.map((link, i) => {
        const a = (i / links.length) * 2 * Math.PI + angle
        const x = radius * Math.cos(a)
        const y = radius * Math.sin(a)
        return (
          <a
            key={i}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className="absolute w-10 h-10 rounded-full bg-dark-700 border border-gold-500/20 flex items-center justify-center hover:bg-dark-600 hover:border-gold-500/50 transition-colors shadow"
            style={{ transform: `translate(${x}px, ${y}px)` }}
          >
            {link.icon}
          </a>
        )
      })}
    </div>
  )
}
