import { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react'

/**
 * Sound Manager Context & Provider
 * Handles subtle audio effects for the newspaper portfolio
 * Muted by default - user can enable via toggle
 */

const SoundContext = createContext(null)

// Sound effect URLs (using Web Audio API for generated sounds)
const SOUNDS = {
  click: { frequency: 800, duration: 0.05, type: 'square' },
  hover: { frequency: 1200, duration: 0.02, type: 'sine' },
  pageFlip: { frequency: 400, duration: 0.15, type: 'sawtooth' },
  typewriter: { frequency: 600, duration: 0.03, type: 'square' },
}

export function SoundProvider({ children }) {
  const [isMuted, setIsMuted] = useState(true) // Muted by default
  const audioContextRef = useRef(null)

  // Initialize AudioContext on first user interaction
  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)()
    }
    return audioContextRef.current
  }, [])

  // Play a generated sound effect
  const playSound = useCallback((soundName) => {
    if (isMuted) return

    const sound = SOUNDS[soundName]
    if (!sound) return

    try {
      const ctx = getAudioContext()

      // Create oscillator for the tone
      const oscillator = ctx.createOscillator()
      const gainNode = ctx.createGain()

      oscillator.type = sound.type
      oscillator.frequency.setValueAtTime(sound.frequency, ctx.currentTime)

      // Very subtle volume
      gainNode.gain.setValueAtTime(0.03, ctx.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + sound.duration)

      oscillator.connect(gainNode)
      gainNode.connect(ctx.destination)

      oscillator.start(ctx.currentTime)
      oscillator.stop(ctx.currentTime + sound.duration)
    } catch (e) {
      // Silently fail - audio is optional enhancement
      console.debug('Sound playback failed:', e)
    }
  }, [isMuted, getAudioContext])

  // Play paper rustle effect (white noise)
  const playPaperRustle = useCallback(() => {
    if (isMuted) return

    try {
      const ctx = getAudioContext()
      const bufferSize = ctx.sampleRate * 0.1 // 100ms of noise
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
      const data = buffer.getChannelData(0)

      // Generate white noise
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.5
      }

      const source = ctx.createBufferSource()
      const gainNode = ctx.createGain()
      const filter = ctx.createBiquadFilter()

      source.buffer = buffer

      // Low-pass filter for softer paper sound
      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(800, ctx.currentTime)

      // Very quiet
      gainNode.gain.setValueAtTime(0.015, ctx.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1)

      source.connect(filter)
      filter.connect(gainNode)
      gainNode.connect(ctx.destination)

      source.start(ctx.currentTime)
    } catch (e) {
      console.debug('Paper rustle failed:', e)
    }
  }, [isMuted, getAudioContext])

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev)
  }, [])

  // Store preference in localStorage
  useEffect(() => {
    const stored = localStorage.getItem('portfolio-sound-enabled')
    if (stored !== null) {
      setIsMuted(stored !== 'true')
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('portfolio-sound-enabled', (!isMuted).toString())
  }, [isMuted])

  return (
    <SoundContext.Provider value={{ isMuted, toggleMute, playSound, playPaperRustle }}>
      {children}
    </SoundContext.Provider>
  )
}

export function useSound() {
  const context = useContext(SoundContext)
  if (!context) {
    throw new Error('useSound must be used within a SoundProvider')
  }
  return context
}

/**
 * Sound Toggle Button Component
 * Floating button to enable/disable sound effects
 */
export function SoundToggle() {
  const { isMuted, toggleMute, getAudioContext } = useSound()

  const handleClick = () => {
    // If enabling sound, play a confirmation beep
    if (isMuted) {
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)()
        const oscillator = ctx.createOscillator()
        const gainNode = ctx.createGain()

        oscillator.type = 'sine'
        oscillator.frequency.setValueAtTime(880, ctx.currentTime) // A5 note

        gainNode.gain.setValueAtTime(0.1, ctx.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15)

        oscillator.connect(gainNode)
        gainNode.connect(ctx.destination)

        oscillator.start(ctx.currentTime)
        oscillator.stop(ctx.currentTime + 0.15)
      } catch (e) {
        // Ignore audio errors
      }
    }
    toggleMute()
  }

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-4 right-4 z-50 p-2 bg-paper border border-neutral-300 hover:border-neutral-400 transition-colors group"
      aria-label={isMuted ? 'Enable sound effects' : 'Disable sound effects'}
      title={isMuted ? 'Enable sound' : 'Mute sound'}
    >
      {isMuted ? (
        // Muted icon
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-neutral-400 group-hover:text-neutral-600"
        >
          <path d="M11 5L6 9H2v6h4l5 4V5z" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      ) : (
        // Sound on icon
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-neutral-600"
        >
          <path d="M11 5L6 9H2v6h4l5 4V5z" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
      )}
    </button>
  )
}

export default SoundProvider
