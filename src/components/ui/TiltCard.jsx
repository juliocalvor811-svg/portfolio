import { useState, useRef, useCallback } from 'react'

/**
 * 3D Tilt Card Component
 * Adds subtle 3D perspective effect on hover
 * Throttled to 60fps for performance
 */
function TiltCard({ children, className = '', intensity = 10 }) {
  const cardRef = useRef(null)
  const [transform, setTransform] = useState('')
  const [isHovering, setIsHovering] = useState(false)
  const rafRef = useRef(null)
  const lastUpdate = useRef(0)

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return
    
    // Throttle to ~60fps
    const now = performance.now()
    if (now - lastUpdate.current < 16) return
    lastUpdate.current = now

    // Cancel any pending animation frame
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    
    rafRef.current = requestAnimationFrame(() => {
      const rect = cardRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = ((y - centerY) / centerY) * -intensity
      const rotateY = ((x - centerX) / centerX) * intensity

      setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`)
    })
  }, [intensity])

  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    setTransform('')
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
  }

  return (
    <div
      ref={cardRef}
      className={`transition-transform duration-200 ease-out ${className}`}
      style={{
        transform: isHovering ? transform : '',
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  )
}

export default TiltCard
