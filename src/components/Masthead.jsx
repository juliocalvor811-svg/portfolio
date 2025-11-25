import Ornament from './ui/Ornament'
import { useSound } from './ui/SoundManager'

const sections = [
  { id: 'front', label: 'Front Page' },
  { id: 'works', label: 'Selected Works' },
  { id: 'about', label: 'The Developer' },
  { id: 'contact', label: 'Classifieds' },
]

function Masthead({ activeSection, onSectionChange }) {
  const { playSound, playPaperRustle } = useSound()
  const now = new Date()

  // Format date: TUESDAY, NOVEMBER 25, 2025
  const today = now.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).toUpperCase()

  // Calculate volume and issue number based on date
  // Volume = years since 2024 (starting at 1)
  // Issue = days since Jan 1, 2024
  const startDate = new Date('2024-01-01')
  const daysSinceStart = Math.floor((now - startDate) / (1000 * 60 * 60 * 24))
  const volume = now.getFullYear() - 2023 // Vol. I in 2024, Vol. II in 2025, etc.
  const issueNumber = daysSinceStart + 1

  // Convert volume to Roman numerals
  const toRoman = (num) => {
    const romanNumerals = [
      ['M', 1000], ['CM', 900], ['D', 500], ['CD', 400],
      ['C', 100], ['XC', 90], ['L', 50], ['XL', 40],
      ['X', 10], ['IX', 9], ['V', 5], ['IV', 4], ['I', 1]
    ]
    let result = ''
    for (const [letter, value] of romanNumerals) {
      while (num >= value) {
        result += letter
        num -= value
      }
    }
    return result
  }

  const volumeRoman = toRoman(volume)

  return (
    <header className="px-4 sm:px-6 md:px-8 pt-4 sm:pt-6 pb-4 border-b-2 border-neutral-600">
      {/* Top meta line */}
      <div className="flex justify-between items-center text-[9px] sm:text-[10px] tracking-widest text-neutral-500 mb-3 sm:mb-4">
        <span className="hidden sm:inline">VOL. {volumeRoman} · NO. {issueNumber.toLocaleString()}</span>
        <span className="sm:hidden">VOL. {volumeRoman}</span>
        <span className="hidden md:inline absolute left-1/2 -translate-x-1/2">LATE EDITION</span>
        <span className="text-right">
          <span className="hidden sm:inline">TORONTO, </span>
          {today}
        </span>
      </div>
      
      {/* Top ornament */}
      <Ornament />
      
      {/* Main title - NYT Style - Click to go HOME */}
      <div className="text-center py-4 sm:py-6 parallax-element" data-speed="0.08">
        <h1
          className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance px-2 sm:px-0 cursor-pointer hover:opacity-70 transition-opacity duration-200"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            letterSpacing: '0.01em',
            fontWeight: 900,
            lineHeight: '1.1'
          }}
          onClick={() => {
            playPaperRustle()
            onSectionChange('front')
          }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onSectionChange('front')}
        >
          THE JULIO CALVO TIMES
        </h1>
        <p 
          className="text-[10px] sm:text-xs md:text-sm tracking-[0.2em] sm:tracking-[0.3em] text-neutral-500 mt-2 sm:mt-3 uppercase"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          "All the Code That's Fit to Ship"
        </p>
      </div>
      
      {/* Bottom ornament */}
      <Ornament />
      
      {/* Navigation */}
      <nav className="flex justify-center flex-wrap gap-2 sm:gap-4 md:gap-8 mt-3 sm:mt-4 pt-3 border-t border-neutral-200">
        {sections.map(section => (
          <button
            key={section.id}
            onClick={() => {
              playSound('click')
              playPaperRustle()
              onSectionChange(section.id)
            }}
            className={`relative text-[9px] sm:text-[10px] md:text-xs tracking-wider sm:tracking-widest pb-1 sm:pb-2 transition-colors duration-200 group ${
              activeSection === section.id
                ? 'text-neutral-900 font-bold'
                : 'text-neutral-500 hover:text-neutral-800'
            }`}
          >
            {section.label.toUpperCase()}
            {/* Animated underline */}
            <span
              className={`absolute bottom-0 left-1/2 h-[2px] bg-neutral-900 transition-all duration-300 ease-out ${
                activeSection === section.id
                  ? 'w-full -translate-x-1/2'
                  : 'w-0 -translate-x-1/2 group-hover:w-full'
              }`}
            />
          </button>
        ))}
      </nav>
    </header>
  )
}

export default Masthead
