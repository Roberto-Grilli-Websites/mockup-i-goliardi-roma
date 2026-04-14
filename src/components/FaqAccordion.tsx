import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import { motion } from 'framer-motion'

export interface FaqItem {
  id: string
  q: string
  a: string
}

interface FaqAccordionProps {
  label: string
  heading: string
  headingAccent: string
  items: FaqItem[]
}

export function FaqAccordion({ label, heading, headingAccent, items }: FaqAccordionProps) {
  return (
    <section className="py-24 px-6 bg-cream-200">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-gold-600 text-xs tracking-widest2 uppercase font-sans mb-3">{label}</p>
          <h2 className="font-serif text-dark-700 text-4xl md:text-5xl">
            {heading} <span className="text-gold-600 italic">{headingAccent}</span>
          </h2>
        </div>

        <AccordionPrimitive.Root type="single" collapsible className="w-full space-y-1">
          {items.map(item => (
            <AccordionPrimitive.Item
              key={item.id}
              value={item.id}
              className="border-b border-dark-700/15 py-1"
            >
              <AccordionPrimitive.Header className="flex">
                <AccordionPrimitive.Trigger
                  className="flex flex-1 items-center justify-between py-4 text-left font-sans font-medium text-dark-700 text-sm tracking-wide hover:text-gold-600 transition-colors [&[data-state=open]>svg]:rotate-180 group"
                >
                  {item.q}
                  <ChevronDownIcon
                    className="w-4 h-4 text-gold-600 shrink-0 transition-transform duration-200 ml-4"
                    aria-hidden
                  />
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>
              <AccordionPrimitive.Content className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <div className="pb-4 pt-0 text-dark-600/70 font-sans leading-relaxed text-sm">
                  {item.a}
                </div>
              </AccordionPrimitive.Content>
            </AccordionPrimitive.Item>
          ))}
        </AccordionPrimitive.Root>
      </div>
    </section>
  )
}
