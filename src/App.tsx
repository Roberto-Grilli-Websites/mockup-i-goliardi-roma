// I Goliardi Roma — Ristorante Piemontese nel cuore di Roma
// 10 elementi estetici: AnimatedHeroTitle · AboutUsSection · ImageAutoSlider · ZoomParallax
//   MenuSection · RetroTestimonial · FlipCardBooking · FaqAccordion · InteractiveMap · RadialSocialMenu
// Toggle IT/EN · Google Maps animato · Menu completo 15 piatti · Overlay contrasto sempre visibile

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, MapPin, Instagram, Facebook, Globe } from 'lucide-react'

import { AnimatedHeroTitle } from './components/AnimatedHeroTitle'
import { AboutUsSection } from './components/AboutUsSection'
import { ImageAutoSlider } from './components/ImageAutoSlider'
import { ZoomParallax } from './components/ZoomParallax'
import { MenuSection, type Dish } from './components/MenuSection'
import { RetroTestimonial, type Testimonial } from './components/RetroTestimonial'
import { FlipCardBooking } from './components/FlipCardBooking'
import { FaqAccordion, type FaqItem } from './components/FaqAccordion'
import { InteractiveMap } from './components/InteractiveMap'
import { RadialSocialMenu } from './components/RadialSocialMenu'

// ─── IMMAGINI ATMOSFERICHE ────────────────────────────────────────────────────
const HERO_BG = "https://v3b.fal.media/files/b/0a963346/fMS0rA6jJwV3XugIa3JTE_SU3eeF2r.jpg"
const ABOUT_IMG = "https://v3b.fal.media/files/b/0a963346/Ghm9W1xmD8wJ9LTzJVXme_aWVX2Bn7.jpg"
const SLIDER_1 = "https://v3b.fal.media/files/b/0a963346/TxRK6_WXMdiutIdobgyhl_VpbrR1Za.jpg"
const SLIDER_2 = "https://v3b.fal.media/files/b/0a963346/MoTckl4l6odjW0K5M6-N4_9KSnXokF.jpg"
const SLIDER_3 = "https://v3b.fal.media/files/b/0a963346/SPOxGjK4w8f_9gZRCHhKz_Q8np8TmV.jpg"
const SLIDER_4 = "https://v3b.fal.media/files/b/0a963346/uAlcasJowaFGapVp2hq2D_vXpTkELm.jpg"
const SLIDER_5 = "https://v3b.fal.media/files/b/0a963346/QQnOvl9EzOj9Mls0oiInO_7bb08FrO.jpg"

// ─── FOTO PIATTI ─────────────────────────────────────────────────────────────
const BATTUTA_IMG = "https://v3b.fal.media/files/b/0a963346/nahLGBZjN83Pd1Bpkmctu_0mfw53ho.jpg"
const CARPACCIO_IMG = "https://v3b.fal.media/files/b/0a963346/CB2OZFQeViQAxgw_D8b0R_8TiyIFiI.jpg"
const VITEL_TONNE_IMG = "https://v3b.fal.media/files/b/0a963346/crPhM05cO1x8ITai6pEUq_zt6zbuIC.jpg"
const SACHER_IMG = "https://v3b.fal.media/files/b/0a963346/az30aD9BhO2XglH7T1EC0_KdjtGrpN.jpg"
const AGNELLO_IMG = "https://v3b.fal.media/files/b/0a963347/C-oe-WN4IhuZN6cOQm9xG_RypoGn0i.jpg"
const TAGLIERE_IMG = "https://v3b.fal.media/files/b/0a963346/5vkyUos76_STvcgwX9Ie__cPwQIZdB.jpg"
const GULASH_IMG = "https://v3b.fal.media/files/b/0a963346/ED8SNcMus6zYVmvMxY62G_ljVegYR0.jpg"
const PLIN_IMG = "https://v3b.fal.media/files/b/0a963346/ig7fMmHLR6CzRJj6bY1R6_2Tcc0XBd.jpg"
const TAJARIN_IMG = "https://v3b.fal.media/files/b/0a963346/nrtxm3-F7LojxkQ0Z5rX__HokCGXTh.jpg"
const PIZZICATI_IMG = "https://v3b.fal.media/files/b/0a963346/r0VoPsSyLV_HScZuvsL0j_zpSieRFB.jpg"
const RAVIOLI_IMG = "https://v3b.fal.media/files/b/0a963346/gnAX03dnZAn40uufgVdAO_HCREKuQX.jpg"
const TAGLIATA_IMG = "https://v3b.fal.media/files/b/0a963346/jiDC8cl2lZELTJ740e3p5_ASV9edOO.jpg"
const STINCO_IMG = "https://v3b.fal.media/files/b/0a963346/qsElvvd5DrTWPygc9Ibbl_RHREpO6t.jpg"
const COSTINE_IMG = "https://v3b.fal.media/files/b/0a963346/drS1GJoBTpG5kVWJVy-50_hwxwr1Ae.jpg"
const CUPOLA_IMG = "https://v3b.fal.media/files/b/0a963346/LtFMIjIamhm_3nn80Pucc_cOx1vnjm.jpg"
const PERSI_PIEN_IMG = "https://v3b.fal.media/files/b/0a963346/p9Sin5mkT2wwyQNDiPIcu_iLQW1FRM.jpg"

// ─── TRANSLATIONS ─────────────────────────────────────────────────────────────

const T = {
  it: {
    nav: {
      storia: 'La Storia',
      menu: 'Menu',
      recensioni: 'Recensioni',
      prenota: 'Prenota',
      contatti: 'Contatti',
    },
    hero: {
      badge: 'Roma · Via Sardegna 28 · Cucina Piemontese',
      title: 'I Goliardi Roma',
      words: ['Piemonte a Roma', 'Cucina autentica', 'Tartufo e Barolo', 'Dal cuore del Piemonte', 'Una vera tradizione'],
      cta1: 'Scopri il Menu',
      cta2: 'Prenota un Tavolo',
    },
    storia: {
      label: 'La nostra storia',
      heading: 'Una tradizione,',
      headingAccent: 'un viaggio.',
      p1: "Enrico ha portato il Piemonte nel cuore di Roma. Non una rivisitazione, non una fusione — la cucina piemontese vera, con i suoi ingredienti irripetibili: il tartufo bianco d'Alba, il Castelmagno DOP, i tajarin ai 40 tuorli, gli agnolotti plin fatti a mano ogni mattina.",
      p2: 'Difficile trovare a Roma un posto del genere. Qui si mangia come a Torino — e si beve come nelle migliori cantine del Piemonte.',
      stats: [
        { n: 'Via Veneto', label: 'Cuore di Roma' },
        { n: 'DOP · IGP', label: 'Solo eccellenze' },
        { n: 'Barolo', label: 'Carta dei vini' },
        { n: '100%', label: 'Cucina piemontese' },
      ],
      ctaText: 'Prenota ora',
    },
    slider: {
      label: 'Atmosfera & Sapori',
      heading: 'Ogni serata,',
      headingAccent: "un'esperienza",
    },
    parallax: {
      label: 'L\'ambiente',
      heading: 'Ambiente',
      headingAccent: 'riservato',
    },
    menu: {
      label: 'I nostri piatti',
      heading: 'Cucina Piemontese',
      headingAccent: 'Autentica',
      ctaText: 'Prenota il tuo tavolo',
      categories: {
        antipasti: 'Antipasti',
        primi: 'Primi',
        secondi: 'Secondi',
        dolci: 'Dolci',
      },
      filterLabels: { all: 'Tutti', gf: 'Gluten Free', veg: 'Vegetariano', vegan: 'Vegano' },
    },
    prenotazione: {
      label: 'Riserva il tuo tavolo',
      heading: 'Prenota',
      headingAccent: 'da noi',
      frontTitle: 'Riserva il tuo tavolo',
      frontDesc: 'Prenota comodamente online su TheFork o chiamaci direttamente. Consigliamo la prenotazione, specialmente nel weekend.',
      frontCtaText: 'Scegli come prenotare',
      backTitle: 'Come vuoi prenotare?',
      backDesc: 'Scegli il metodo che preferisci. La prenotazione è consigliata.',
      theForkLabel: 'Prenota su TheFork',
      phoneLabel: 'Chiama direttamente',
      backBtnText: 'Indietro',
    },
    faq: {
      label: 'Informazioni utili',
      heading: 'Tutto quello che',
      headingAccent: 'vuoi sapere',
      items: [
        {
          id: '1',
          q: 'Il coperto è incluso nel prezzo?',
          a: 'Il coperto è di €2,50 a persona e include tovagliato di qualità. Il pane è servito su richiesta e ha un costo di €3,50 per tavolo.',
        },
        {
          id: '2',
          q: 'I contorni sono inclusi nel secondo?',
          a: 'I contorni non sono inclusi nel prezzo del secondo piatto e vanno ordinati separatamente. Il personale vi informerà delle opzioni disponibili.',
        },
        {
          id: '3',
          q: 'È obbligatorio prenotare?',
          a: 'La prenotazione è fortemente consigliata, soprattutto nel weekend e nelle serate di punta. Potete prenotare su TheFork o chiamandoci direttamente.',
        },
        {
          id: '4',
          q: 'Il menu cambia spesso?',
          a: 'Alcuni piatti stagionali — come i piatti con tartufo — variano in base alla disponibilità. Se un prodotto non è disponibile, vi verrà comunicato prima dell\'ordinazione.',
        },
        {
          id: '5',
          q: 'Avete opzioni vegetariane?',
          a: 'Sì, abbiamo diverse opzioni vegetariane come il Tagliere di formaggi, la Sacher (dessert), il Ravioli Porro e Patate e la Cupola. Il personale potrà guidarvi.',
        },
        {
          id: '6',
          q: 'Come arrivare da Via Veneto?',
          a: 'Siamo in Via Sardegna 28, a meno di 5 minuti a piedi da Via Veneto. Metro Barberini è la fermata più vicina (circa 10 minuti a piedi). Parcheggio consigliato: Garage Via Sardegna.',
        },
      ] as FaqItem[],
    },
    contatti: {
      label: 'Vieni a trovarci',
      heading: 'Dove Siamo',
      address_label: 'Indirizzo',
      phone_label: 'Telefono',
      hours_label: 'Orari',
      note: 'Consigliamo la prenotazione, in particolare nel weekend.',
      ctaText: 'Chiama per prenotare',
      schedule: [
        { day: 'Lunedì', hours: '11:00–15:00 · 18:00–23:30' },
        { day: 'Martedì', hours: '18:00–23:30' },
        { day: 'Mercoledì–Venerdì', hours: '11:00–15:00 · 18:00–23:30' },
        { day: 'Sabato', hours: '11:00–15:00 · 18:00–23:30' },
        { day: 'Domenica', hours: '12:00–15:00 · 18:00–23:30' },
      ],
    },
    recensioni: {
      label: 'Cosa dicono di noi',
      heading: 'Le parole dei',
      headingAccent: 'nostri ospiti',
      googleLabel: 'Leggi tutte le recensioni su Google',
    },
    footer: {
      rights: `© ${new Date().getFullYear()} I Goliardi Roma · Via Sardegna 28, Roma`,
      address: 'Via Sardegna 28, 00187 Roma',
      phone: '+39 375 614 6292',
    },
  },
  en: {
    nav: {
      storia: 'Our Story',
      menu: 'Menu',
      recensioni: 'Reviews',
      prenota: 'Book',
      contatti: 'Contact',
    },
    hero: {
      badge: 'Rome · Via Sardegna 28 · Piedmontese Cuisine',
      title: 'I Goliardi Roma',
      words: ['Piedmont in Rome', 'Authentic cuisine', 'Truffle & Barolo', 'From the heart of Piedmont', 'A true tradition'],
      cta1: 'Explore the Menu',
      cta2: 'Book a Table',
    },
    storia: {
      label: 'Our story',
      heading: 'A tradition,',
      headingAccent: 'a journey.',
      p1: 'Enrico brought Piedmont to the heart of Rome. Not a fusion, not a reinterpretation — real Piedmontese cuisine with its irreplaceable ingredients: white truffle from Alba, Castelmagno DOP, hand-rolled tajarin pasta with 40 egg yolks, and agnolotti plin made fresh every morning.',
      p2: 'Hard to find a place like this in Rome. Here you eat like in Turin — and drink like in the finest Piedmontese cellars.',
      stats: [
        { n: 'Via Veneto', label: 'Heart of Rome' },
        { n: 'DOP · IGP', label: 'Only excellence' },
        { n: 'Barolo', label: 'Wine list' },
        { n: '100%', label: 'Piedmontese cuisine' },
      ],
      ctaText: 'Book now',
    },
    slider: {
      label: 'Atmosphere & Flavours',
      heading: 'Every evening,',
      headingAccent: 'an experience',
    },
    parallax: {
      label: 'The space',
      heading: 'A reserved',
      headingAccent: 'atmosphere',
    },
    menu: {
      label: 'Our dishes',
      heading: 'Piedmontese Cuisine',
      headingAccent: 'Authentic',
      ctaText: 'Book your table',
      categories: {
        antipasti: 'Starters',
        primi: 'First Courses',
        secondi: 'Main Courses',
        dolci: 'Desserts',
      },
      filterLabels: { all: 'All', gf: 'Gluten Free', veg: 'Vegetarian', vegan: 'Vegan' },
    },
    prenotazione: {
      label: 'Reserve your table',
      heading: 'Book',
      headingAccent: 'with us',
      frontTitle: 'Reserve your table',
      frontDesc: 'Book easily online on TheFork or call us directly. We recommend booking ahead, especially on weekends.',
      frontCtaText: 'Choose how to book',
      backTitle: 'How would you like to book?',
      backDesc: 'Choose your preferred method. Booking is recommended.',
      theForkLabel: 'Book on TheFork',
      phoneLabel: 'Call directly',
      backBtnText: 'Back',
    },
    faq: {
      label: 'Useful information',
      heading: 'Everything you',
      headingAccent: 'want to know',
      items: [
        {
          id: '1',
          q: 'Is the cover charge included in the price?',
          a: 'The cover charge is €2.50 per person and includes quality table linen. Bread is served on request and costs €3.50 per table.',
        },
        {
          id: '2',
          q: 'Are side dishes included with the main course?',
          a: 'Side dishes are not included in the price of the main course and must be ordered separately. The staff will inform you of the available options.',
        },
        {
          id: '3',
          q: 'Is booking required?',
          a: 'Reservations are strongly recommended, especially on weekends and busy evenings. You can book on TheFork or by calling us directly.',
        },
        {
          id: '4',
          q: 'Does the menu change often?',
          a: 'Some seasonal dishes — like truffle dishes — vary depending on availability. If a product is not available, you will be informed before ordering.',
        },
        {
          id: '5',
          q: 'Do you have vegetarian options?',
          a: 'Yes, we have several vegetarian options including the Cheese Board, Sacher dessert, Leek and Potato Ravioli, and Cupola dessert. Our staff can guide you.',
        },
        {
          id: '6',
          q: 'How to get here from Via Veneto?',
          a: 'We are at Via Sardegna 28, less than a 5-minute walk from Via Veneto. The nearest metro is Barberini (about 10 minutes on foot).',
        },
      ] as FaqItem[],
    },
    contatti: {
      label: 'Come visit us',
      heading: 'Find Us',
      address_label: 'Address',
      phone_label: 'Phone',
      hours_label: 'Opening hours',
      note: 'We recommend booking ahead, especially on weekends.',
      ctaText: 'Call to book',
      schedule: [
        { day: 'Monday', hours: '11:00–15:00 · 18:00–23:30' },
        { day: 'Tuesday', hours: '18:00–23:30' },
        { day: 'Wednesday–Friday', hours: '11:00–15:00 · 18:00–23:30' },
        { day: 'Saturday', hours: '11:00–15:00 · 18:00–23:30' },
        { day: 'Sunday', hours: '12:00–15:00 · 18:00–23:30' },
      ],
    },
    recensioni: {
      label: 'What our guests say',
      heading: 'Words from our',
      headingAccent: 'guests',
      googleLabel: 'Read all reviews on Google',
    },
    footer: {
      rights: `© ${new Date().getFullYear()} I Goliardi Roma · Via Sardegna 28, Rome`,
      address: 'Via Sardegna 28, 00187 Rome',
      phone: '+39 375 614 6292',
    },
  },
}

// ─── DATI ────────────────────────────────────────────────────────────────────

const DISHES: Dish[] = [
  { id: 'battuta', name: 'Battuta all\'antica', desc: 'Carne cruda di vitella piemontese battuta al coltello con capperi e crostini', price: '€20', category: 'antipasti', tags: ['gf'], img: BATTUTA_IMG, emoji: '🥩' },
  { id: 'carpaccio', name: 'Il Carpaccio', desc: "Vitella piemontese, crema di Grana Padano, tartufo d'Alba", price: '€22', category: 'antipasti', tags: ['gf'], img: CARPACCIO_IMG, emoji: '🍖' },
  { id: 'vitel', name: 'Vitel Tonnè', desc: 'Girello al punto rosa, maionese insaporita con acciughe, tonno e capperi', price: '€19', category: 'antipasti', tags: ['gf'], img: VITEL_TONNE_IMG, emoji: '🐟' },
  { id: 'sacher', name: 'Sacher Goliarda', desc: 'Rivisitazione goliardica della Sacher con albicocche P.A.T. di Cuneo', price: '€14', category: 'antipasti', tags: ['veg'], img: SACHER_IMG, emoji: '🍫' },
  { id: 'agnello', name: 'L\'Agnello', desc: 'Costolette di agnello in crosta di erbe aromatiche', price: '€26', category: 'antipasti', tags: ['gf'], img: AGNELLO_IMG, emoji: '🍗' },
  { id: 'tagliere', name: 'Tagliere Gustoso', desc: 'Gran assortimento di formaggi piemontesi con salse home made — Castelmagno, Toma, Robiola', price: '€20', category: 'antipasti', tags: ['veg', 'gf'], img: TAGLIERE_IMG, emoji: '🧀' },
  { id: 'gulash', name: 'Gulash Piemontese', desc: 'Bocconcini di vitella piemontese stufati con la ricetta Goliardi, su crostone di pane rustico', price: '€16', category: 'antipasti', tags: [], img: GULASH_IMG, emoji: '🍲' },
  { id: 'plin', name: 'Plin al Sugo d\'Arrosto', desc: 'Tradizionali agnolotti ripieni ai tre arrosti, conditi con il fondo di cottura', price: '€16', category: 'primi', tags: [], img: PLIN_IMG, emoji: '🍝' },
  { id: 'tajarin', name: 'Tajarin', desc: 'Tajarin ai 40 tuorli, spadellati con ragù espresso alla salsiccia bovina di Bra, sfumata all\'Arneis DOCG', price: '€18', category: 'primi', tags: [], img: TAJARIN_IMG, emoji: '🍜' },
  { id: 'pizzicati', name: 'Pizzicati al Taleggio', desc: 'Tradizionali agnolotti ripieni al Taleggio saltati con guanciale DOP e crema di nocciola IGP', price: '€14', category: 'primi', tags: [], img: PIZZICATI_IMG, emoji: '🍝' },
  { id: 'ravioli', name: 'Ravioli Porro e Patate', desc: 'Ravioli ripieni di porro e patate con crema di Bra DOP e julienne di prosciutto', price: '€13', category: 'primi', tags: [], img: RAVIOLI_IMG, emoji: '🥟' },
  { id: 'tagliata', name: 'Tagliata di Vitello', desc: 'Tagliata di vitella piemontese, al punto di cottura desiderato, con olio EVO', price: '€25', category: 'secondi', tags: ['gf'], img: TAGLIATA_IMG, emoji: '🥩' },
  { id: 'stinco', name: 'Stinco al Forno', desc: 'Stinco di maiale arrosto con salsa di senape e cavolo alla tradizione piemontese', price: '€18', category: 'secondi', tags: ['gf'], img: STINCO_IMG, emoji: '🍖' },
  { id: 'costine', name: 'Costine di Maiale BBQ', desc: 'Costine di maiale glassate con salsa BBQ, servite con patatine fritte', price: '€15', category: 'secondi', tags: [], img: COSTINE_IMG, emoji: '🍖' },
  { id: 'cupola', name: 'Cupola', desc: 'Semifreddo al cioccolato fondente con cuore di zabaione al Moscato d\'Asti DOCG e glassa al cioccolato', price: '€13', category: 'dolci', tags: ['veg'], img: CUPOLA_IMG, emoji: '🍮' },
  { id: 'persi', name: 'Persi Pien', desc: 'Tipico dolce piemontese: pesche con amaretto, biscotto sbriciolato e nocciola piemontese IGP', price: '€14', category: 'dolci', tags: ['veg'], img: PERSI_PIEN_IMG, emoji: '🍑' },
]

const TESTIMONIALS: Testimonial[] = [
  { name: 'Angela M.', designation: 'Roma', description: 'Semplicemente eccezionale! Vale la pena fermarsi a godere un momento conviviale… dal servizio all\'ambiente curato nel dettaglio! La qualità delle materie prime è davvero ricercata: genuino, saporito ma delicato!', stars: 5 },
  { name: 'Alessandro G.', designation: 'Roma', description: 'Un\'esperienza assolutamente positiva sia come location ma soprattutto per il cibo. Anche se in dirittura d\'arrivo con la stagione del Tartufo Bianco, non mi sono sottratto a delle ottime chicche con Tartufo e Castelmagno. Assolutamente consigliato. Ottima carta dei vini.', stars: 5 },
  { name: 'Giancarlo T.', designation: 'Roma', description: 'Ottima cena gustata in ambiente curato e con un servizio impeccabile. I piatti sono ben presentati e preparati in modo perfetto. Sono stati molto apprezzati i plin, dal sapore intenso e al tempo stesso delicato.', stars: 5 },
  { name: 'Thomas C.', designation: 'Roma', description: 'Bella esperienza. Materie prime ottime e abbinamenti perfetti. Ambiente tranquillo e riservato. Servizio attento e molto gentile. Ottima cantina. Vera cucina piemontese. Consigliatissimo.', stars: 5 },
  { name: 'Daniele P.', designation: 'Roma', description: 'Carpaccio, Vitello tonnato, Agnolotti, Quaglia, Filetto — tutto squisito. Cameriere simpatico e competente. Il vino di accompagnamento ottimo. Serata indimenticabile. Mi sono sentito a Torino pur essendo a Roma.', stars: 5 },
  { name: 'Simona C.', designation: 'Roma', description: 'Ho voluto provare e sono rimasta entusiasta. Lo staff da subito gentilissimo e competente. Ho assaggiato i Gobbi: una rivelazione come piatto, un\'esplosione di gusto. Per chi non conosce la cucina piemontese, lo consiglio vivamente.', stars: 5 },
]

const SLIDER_IMAGES = [SLIDER_1, SLIDER_2, SLIDER_3, SLIDER_4, SLIDER_5]
const PARALLAX_IMAGES = [HERO_BG, SLIDER_1, SLIDER_2, SLIDER_3, SLIDER_4, SLIDER_5, ABOUT_IMG]

const MAP_EMBED = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2969.5234!2d12.4897!3d41.9084!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132f6054a1e5c5e9%3A0x12345!2sVia+Sardegna+28%2C+00187+Roma!5e0!3m2!1sit!2sit!4v1"
const THEFORK_URL = "https://www.thefork.it/ristorante/i-goliardi-roma-r736004"
const GOOGLE_REVIEWS_URL = "https://www.google.com/maps/place/I+Goliardi+Roma"
const PHONE = "+39 375 614 6292"

// ─── APP ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [lang, setLang] = useState<'it' | 'en'>('it')
  const [menuOpen, setMenuOpen] = useState(false)
  const t = T[lang]

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-cream-100 font-sans">
      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-dark-900/95 backdrop-blur-sm border-b border-gold-500/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => scrollTo('hero')} className="font-serif text-cream-100 text-lg tracking-wide">
            I <span className="text-gold-500">Goliardi</span> Roma
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {(['storia', 'menu', 'recensioni', 'contatti'] as const).map(k => (
              <button
                key={k}
                onClick={() => scrollTo(k)}
                className="text-cream-300/70 hover:text-gold-400 text-xs tracking-widest uppercase font-sans transition-colors"
              >
                {t.nav[k]}
              </button>
            ))}
          </div>

          {/* Right: lang + CTA */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLang(l => l === 'it' ? 'en' : 'it')}
              className="text-cream-300/50 hover:text-gold-400 text-xs tracking-widest uppercase font-sans transition-colors"
            >
              {lang === 'it' ? 'EN' : 'IT'}
            </button>
            <button
              onClick={() => scrollTo('prenota')}
              className="hidden md:block bg-gold-500 hover:bg-gold-400 text-dark-900 px-4 py-2 rounded-lg text-xs font-sans font-medium tracking-wide transition-colors"
            >
              {t.nav.prenota}
            </button>
            <button
              onClick={() => setMenuOpen(v => !v)}
              className="md:hidden text-cream-100"
              aria-label="Menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gold-500/10 bg-dark-900 overflow-hidden"
            >
              <div className="px-6 py-4 flex flex-col gap-4">
                {(['storia', 'menu', 'recensioni', 'contatti'] as const).map(k => (
                  <button
                    key={k}
                    onClick={() => scrollTo(k)}
                    className="text-cream-300/70 hover:text-gold-400 text-xs tracking-widest uppercase font-sans text-left transition-colors"
                  >
                    {t.nav[k]}
                  </button>
                ))}
                <button
                  onClick={() => scrollTo('prenota')}
                  className="bg-gold-500 text-dark-900 px-4 py-2.5 rounded-lg text-xs font-sans font-medium tracking-wide text-center"
                >
                  {t.nav.prenota}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── HERO ── */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* BG */}
        {HERO_BG ? (
          <img src={HERO_BG} alt="" className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-700" />
        )}
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-dark-900/50 to-dark-900/30" />

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-gold-400 text-xs tracking-widest2 uppercase font-sans mb-6"
          >
            {t.hero.badge}
          </motion.p>

          <AnimatedHeroTitle
            words={t.hero.words}
            staticPrefix={t.hero.title}
            className="font-serif text-cream-100 text-5xl md:text-7xl lg:text-8xl leading-tight mb-8"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={() => scrollTo('menu')}
              className="bg-gold-500 hover:bg-gold-400 text-dark-900 px-8 py-4 rounded-lg font-sans font-medium tracking-wide transition-colors"
            >
              {t.hero.cta1}
            </button>
            <button
              onClick={() => scrollTo('prenota')}
              className="border border-cream-200/40 hover:border-gold-500/60 text-cream-100 hover:text-gold-400 px-8 py-4 rounded-lg font-sans font-medium tracking-wide transition-colors"
            >
              {t.hero.cta2}
            </button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-px h-12 bg-gradient-to-b from-gold-500/60 to-transparent mx-auto" />
        </motion.div>
      </section>

      {/* ── STORIA / ABOUT ── */}
      <AboutUsSection
        label={t.storia.label}
        heading={t.storia.heading}
        headingAccent={t.storia.headingAccent}
        p1={t.storia.p1}
        p2={t.storia.p2}
        stats={t.storia.stats}
        imgSrc={ABOUT_IMG}
        ctaText={t.storia.ctaText}
        onCtaClick={() => scrollTo('prenota')}
      />

      {/* ── AUTOSLIDER ── */}
      <ImageAutoSlider
        images={SLIDER_IMAGES}
        label={t.slider.label}
        heading={t.slider.heading}
        headingAccent={t.slider.headingAccent}
      />

      {/* ── ZOOM PARALLAX ── */}
      <ZoomParallax
        images={PARALLAX_IMAGES}
        label={t.parallax.label}
        heading={t.parallax.heading}
        headingAccent={t.parallax.headingAccent}
      />

      {/* ── MENU ── */}
      <MenuSection
        label={t.menu.label}
        heading={t.menu.heading}
        headingAccent={t.menu.headingAccent}
        dishes={DISHES}
        categories={t.menu.categories}
        ctaText={t.menu.ctaText}
        onCtaClick={() => scrollTo('prenota')}
        filterLabels={t.menu.filterLabels}
      />

      {/* ── PRENOTAZIONE ── */}
      <FlipCardBooking
        label={t.prenotazione.label}
        heading={t.prenotazione.heading}
        headingAccent={t.prenotazione.headingAccent}
        frontTitle={t.prenotazione.frontTitle}
        frontDesc={t.prenotazione.frontDesc}
        frontCtaText={t.prenotazione.frontCtaText}
        backTitle={t.prenotazione.backTitle}
        backDesc={t.prenotazione.backDesc}
        theForkUrl={THEFORK_URL}
        theForkLabel={t.prenotazione.theForkLabel}
        phoneLabel={t.prenotazione.phoneLabel}
        phone={PHONE}
        backBtnText={t.prenotazione.backBtnText}
      />

      {/* ── FAQ ── */}
      <FaqAccordion
        label={t.faq.label}
        heading={t.faq.heading}
        headingAccent={t.faq.headingAccent}
        items={t.faq.items}
      />

      {/* ── RECENSIONI ── */}
      <RetroTestimonial
        items={TESTIMONIALS}
        label={t.recensioni.label}
        heading={t.recensioni.heading}
        headingAccent={t.recensioni.headingAccent}
        googleUrl={GOOGLE_REVIEWS_URL}
        googleLabel={t.recensioni.googleLabel}
      />

      {/* ── CONTATTI + MAPPA ── */}
      <InteractiveMap
        label={t.contatti.label}
        heading={t.contatti.heading}
        address="Via Sardegna, 28 — 00187 Roma"
        phone={PHONE}
        schedule={t.contatti.schedule}
        mapEmbedUrl={MAP_EMBED}
        ctaText={t.contatti.ctaText}
        phone_label={t.contatti.phone_label}
        hours_label={t.contatti.hours_label}
        address_label={t.contatti.address_label}
        note={t.contatti.note}
      />

      {/* ── FOOTER ── */}
      <footer className="bg-dark-900 py-16 px-6 border-t border-gold-500/10">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-10">
          {/* Logo */}
          <div className="text-center">
            <p className="font-serif text-cream-100 text-2xl mb-1">
              I <span className="text-gold-500">Goliardi</span> Roma
            </p>
            <p className="text-cream-300/40 text-xs font-sans tracking-widest uppercase">
              Ristorante Piemontese
            </p>
          </div>

          {/* Radial social */}
          <RadialSocialMenu
            links={[
              { icon: <Instagram className="w-4 h-4 text-gold-400" />, href: 'https://www.instagram.com/igoliardiroma/', label: 'Instagram' },
              { icon: <Facebook className="w-4 h-4 text-gold-400" />, href: 'https://www.facebook.com/IGoliardiRoma/', label: 'Facebook' },
              { icon: <MapPin className="w-4 h-4 text-gold-400" />, href: GOOGLE_REVIEWS_URL, label: 'Google Maps' },
              { icon: <Globe className="w-4 h-4 text-gold-400" />, href: 'https://goliardiroma.it', label: 'Sito ufficiale' },
            ]}
          />

          {/* Info */}
          <div className="text-center space-y-1">
            <p className="text-cream-300/60 text-xs font-sans">{t.footer.address}</p>
            <a href={`tel:${PHONE.replace(/\s/g, '')}`} className="text-cream-300/60 hover:text-gold-400 text-xs font-sans transition-colors block">
              {PHONE}
            </a>
          </div>

          <p className="text-cream-300/30 text-xs font-sans">{t.footer.rights}</p>
        </div>
      </footer>
    </div>
  )
}
