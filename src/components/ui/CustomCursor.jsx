import { useState, useEffect, useRef, useCallback } from 'react'
import { PenTool } from 'lucide-react'

/**
 * Custom Cursor Component
 * Optimized with RAF for smooth 60fps performance
 */
function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const cursorRef = useRef(null)
  const positionRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef(null)

  // Use RAF for smooth cursor movement (better than setState on every mousemove)
  const updateCursorPosition = useCallback(() => {
    if (cursorRef.current) {
      cursorRef.current.style.left = `${positionRef.current.x}px`
      cursorRef.current.style.top = `${positionRef.current.y}px`
    }
  }, [])

  useEffect(() => {
    // Only show custom cursor on desktop
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouchDevice) return

    const handleMouseMove = (e) => {
      positionRef.current = { x: e.clientX, y: e.clientY }

      // Use RAF for smooth updates
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      rafRef.current = requestAnimationFrame(updateCursorPosition)

      if (!isVisible) setIsVisible(true)
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    // Detect hoverable elements (throttled with simple flag)
    let lastTarget = null
    const handleMouseOver = (e) => {
      const target = e.target
      if (target === lastTarget) return
      lastTarget = target

      const isClickable =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        window.getComputedStyle(target).cursor === 'pointer'

      setIsHovering(isClickable)
    }

    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseover', handleMouseOver, { passive: true })

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseover', handleMouseOver)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [isVisible, updateCursorPosition])

  // Don't render on touch devices or SSR
  if (typeof window === 'undefined') return null

  return (
    <div
      ref={cursorRef}
      className={`fixed pointer-events-none z-[10000] will-change-transform ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        left: 0,
        top: 0,
        transform: 'translate(-2px, -2px)',
      }}
    >
      <PenTool
        size={18}
        strokeWidth={1.5}
        className={`transition-colors duration-150 ${
          isHovering ? 'text-neutral-500' : 'text-neutral-800'
        }`}
        style={{
          filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.15))',
        }}
      />
    </div>
  )
}

export default CustomCursor
