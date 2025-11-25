import { useState, useEffect } from 'react'

/**
 * Loading Screen Component
 * Newspaper-style loading animation with typewriter effect
 */
function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [currentLine, setCurrentLine] = useState(0)
  const [isExiting, setIsExiting] = useState(false)

  const loadingLines = [
    'LOADING PRESS...',
    'SETTING TYPE...',
    'INKING ROLLERS...',
    'PRINTING EDITION...',
  ]

  useEffect(() => {
    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 2
      })
    }, 30)

    // Typewriter line progression
    const lineInterval = setInterval(() => {
      setCurrentLine(prev => {
        if (prev >= loadingLines.length - 1) {
          clearInterval(lineInterval)
          return prev
        }
        return prev + 1
      })
    }, 400)

    return () => {
      clearInterval(progressInterval)
      clearInterval(lineInterval)
    }
  }, [])

  useEffect(() => {
    if (progress >= 100) {
      // Start exit animation
      setTimeout(() => {
        setIsExiting(true)
      }, 300)

      // Complete and unmount
      setTimeout(() => {
        onComplete?.()
      }, 800)
    }
  }, [progress, onComplete])

  return (
    <div
      className={`fixed inset-0 z-[10000] bg-paper flex items-center justify-center transition-opacity duration-500 ${
        isExiting ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Grain overlay on loading screen too */}
      <div className="grain-overlay" aria-hidden="true" />

      <div className="text-center px-6 max-w-md relative z-10">
        {/* Mini Masthead */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-8 bg-neutral-300" />
            <span className="text-[9px] tracking-[0.3em] text-neutral-400 uppercase">
              Loading
            </span>
            <span className="h-px w-8 bg-neutral-300" />
          </div>

          <h1
            className="text-2xl sm:text-3xl font-bold tracking-tight"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 900,
            }}
          >
            THE JULIO CALVO TIMES
          </h1>

          <p
            className="text-[10px] tracking-[0.2em] text-neutral-500 mt-2 uppercase"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Preparing Today's Edition
          </p>
        </div>

        {/* Typewriter Status Lines */}
        <div className="space-y-1 mb-6 h-24">
          {loadingLines.map((line, index) => (
            <p
              key={line}
              className={`text-xs tracking-widest font-mono transition-all duration-300 ${
                index <= currentLine
                  ? 'opacity-100 text-neutral-700'
                  : 'opacity-0 text-neutral-400'
              } ${index === currentLine ? 'animate-pulse' : ''}`}
            >
              {index < currentLine ? (
                <span className="text-green-700">[DONE]</span>
              ) : index === currentLine ? (
                <span className="text-neutral-500">[....]</span>
              ) : (
                <span className="text-neutral-300">[----]</span>
              )}{' '}
              {line}
            </p>
          ))}
        </div>

        {/* Progress Bar - Dotted newspaper style */}
        <div className="relative">
          <div className="h-1 bg-neutral-200 overflow-hidden">
            <div
              className="h-full bg-neutral-800 transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Progress percentage */}
          <p className="text-[10px] tracking-widest text-neutral-500 mt-2 font-mono">
            {progress}% COMPLETE
          </p>
        </div>

        {/* Decorative elements */}
        <div className="mt-8 flex items-center justify-center gap-2">
          <span className="text-neutral-300">&#9830;</span>
          <span className="text-neutral-300">&#9830;</span>
          <span className="text-neutral-300">&#9830;</span>
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen
