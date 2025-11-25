import { useState, useEffect, useRef } from 'react'

/**
 * Page Transition Component
 * Smooth fade and slide transitions between sections
 */
function PageTransition({ children, sectionKey }) {
  const [isVisible, setIsVisible] = useState(false)
  const [currentContent, setCurrentContent] = useState(children)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const prevKeyRef = useRef(sectionKey)

  useEffect(() => {
    // Initial mount - fade in
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 50)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Section change - transition
    if (prevKeyRef.current !== sectionKey) {
      setIsTransitioning(true)
      setIsVisible(false)

      // After fade out, swap content
      const swapTimer = setTimeout(() => {
        setCurrentContent(children)
        prevKeyRef.current = sectionKey
      }, 250)

      // After content swap, fade in
      const fadeInTimer = setTimeout(() => {
        setIsVisible(true)
        setIsTransitioning(false)
      }, 300)

      return () => {
        clearTimeout(swapTimer)
        clearTimeout(fadeInTimer)
      }
    } else {
      // Same section, just update content
      setCurrentContent(children)
    }
  }, [sectionKey, children])

  return (
    <div
      className={`transition-all duration-300 ease-out ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-3'
      }`}
      style={{
        willChange: isTransitioning ? 'opacity, transform' : 'auto',
      }}
    >
      {currentContent}
    </div>
  )
}

export default PageTransition
