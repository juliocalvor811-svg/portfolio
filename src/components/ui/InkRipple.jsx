import { useState, useCallback } from 'react'

/**
 * Ink Ripple Effect Component
 * Creates a newspaper ink splash effect on click
 */
function InkRipple({ children, className = '', color = 'rgba(26, 26, 26, 0.25)' }) {
  const [ripples, setRipples] = useState([])

  const handleClick = useCallback((e) => {
    // Get position relative to the clicked element
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const size = Math.max(rect.width, rect.height) * 2.5

    const newRipple = {
      id: Date.now() + Math.random(),
      x,
      y,
      size,
    }

    setRipples((prev) => [...prev, newRipple])

    // Remove ripple after animation completes
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id))
    }, 800)
  }, [])

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onClick={handleClick}
    >
      {children}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute pointer-events-none animate-ink-ripple"
          style={{
            left: ripple.x - ripple.size / 2,
            top: ripple.y - ripple.size / 2,
            width: ripple.size,
            height: ripple.size,
            backgroundColor: color,
            borderRadius: '50%',
          }}
        />
      ))}
    </div>
  )
}

export default InkRipple
