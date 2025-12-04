import { useState } from 'react'

// Colores naturales diferenciados
const naturalColors = [
  '#B8860B',   // Dorado oscuro (JavaScript)
  '#8B0000',   // Granate oscuro (HTML)
  '#2F4F4F',   // Gris pizarra oscuro (TypeScript)
  '#8B4513',   // Marrón cuero (PLpgSQL)
  '#556B2F',   // Verde oliva oscuro
]

function getColorForTech(index) {
  return naturalColors[index % naturalColors.length]
}

function TechStackBar({ tech }) {
  const [hoveredTech, setHoveredTech] = useState(null)
  
  // Si es array plano (proyectos simples como Portfolio)
  if (Array.isArray(tech)) {
    const totalItems = tech.length
    
    return (
      <div className="bg-neutral-50 border border-neutral-200 p-4 sm:p-5">
        <h3 className="text-[10px] sm:text-xs tracking-wider sm:tracking-widest font-bold mb-3 sm:mb-4">
          TECHNOLOGIES
        </h3>
        
        {/* Progress Bar */}
        <div className="h-2 rounded-full overflow-hidden flex mb-2 bg-neutral-200">
          {tech.map((item, index) => {
            const percentage = (100 / totalItems)
            const color = getColorForTech(index)
            
            return (
              <div
                key={item}
                className="h-full transition-all duration-300 first:rounded-l-full last:rounded-r-full cursor-pointer"
                style={{ 
                  width: `${percentage}%`,
                  backgroundColor: color,
                  opacity: hoveredTech === null || hoveredTech === item ? 1 : 0.3
                }}
                onMouseEnter={() => setHoveredTech(item)}
                onMouseLeave={() => setHoveredTech(null)}
              />
            )
          })}
        </div>
        
        {/* Legend */}
        <div className="flex flex-wrap gap-x-3 sm:gap-x-4 gap-y-1 sm:gap-y-1.5">
          {tech.map((item, index) => {
            const percentage = (100 / totalItems).toFixed(1)
            const color = getColorForTech(index)
            
            return (
              <div 
                key={item}
                className="flex items-center gap-1.5 cursor-default group"
                onMouseEnter={() => setHoveredTech(item)}
                onMouseLeave={() => setHoveredTech(null)}
              >
                <span 
                  className="w-2 h-2 rounded-full flex-shrink-0 transition-transform group-hover:scale-125"
                  style={{ backgroundColor: color }}
                />
                <span className={`text-[9px] sm:text-[10px] transition-colors ${
                  hoveredTech === item 
                    ? 'text-neutral-900 font-medium' 
                    : 'text-neutral-600'
                }`}>
                  {item}
                </span>
                <span className={`text-[9px] sm:text-[10px] transition-colors ${
                  hoveredTech === item 
                    ? 'text-neutral-700' 
                    : 'text-neutral-400'
                }`}>
                  {percentage}%
                </span>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
  
  // Es un objeto con categorías (languages, backend, ai)
  const { languages = [], backend = [], ai = [], ...rest } = tech
  const otherCategories = Object.entries(rest)
  
  return (
    <div className="bg-neutral-50 border border-neutral-200 p-4 sm:p-5">
      <h3 className="text-[10px] sm:text-xs tracking-wider sm:tracking-widest font-bold mb-3 sm:mb-4">
        TECHNOLOGIES
      </h3>
      
      <div className="space-y-4">
        {/* Languages - con barra y porcentajes REALES */}
        {languages.length > 0 && (
          <div>
            <p className="text-[9px] tracking-wider text-neutral-400 uppercase mb-1.5">
              languages
            </p>
            
            {/* Progress Bar */}
            <div className="h-2 rounded-full overflow-hidden flex mb-2 bg-neutral-200">
              {languages.map((lang, index) => {
                const color = getColorForTech(index)
                
                return (
                  <div
                    key={lang.name}
                    className="h-full transition-all duration-300 first:rounded-l-full last:rounded-r-full cursor-pointer"
                    style={{ 
                      width: `${lang.percentage}%`,
                      backgroundColor: color,
                      opacity: hoveredTech === null || hoveredTech === lang.name ? 1 : 0.3
                    }}
                    onMouseEnter={() => setHoveredTech(lang.name)}
                    onMouseLeave={() => setHoveredTech(null)}
                  />
                )
              })}
            </div>
            
            {/* Legend */}
            <div className="flex flex-wrap gap-x-3 sm:gap-x-4 gap-y-1 sm:gap-y-1.5">
              {languages.map((lang, index) => {
                const color = getColorForTech(index)
                
                return (
                  <div 
                    key={lang.name}
                    className="flex items-center gap-1.5 cursor-default group"
                    onMouseEnter={() => setHoveredTech(lang.name)}
                    onMouseLeave={() => setHoveredTech(null)}
                  >
                    <span 
                      className="w-2 h-2 rounded-full flex-shrink-0 transition-transform group-hover:scale-125"
                      style={{ backgroundColor: color }}
                    />
                    <span className={`text-[9px] sm:text-[10px] transition-colors ${
                      hoveredTech === lang.name 
                        ? 'text-neutral-900 font-medium' 
                        : 'text-neutral-600'
                    }`}>
                      {lang.name}
                    </span>
                    <span className={`text-[9px] sm:text-[10px] transition-colors ${
                      hoveredTech === lang.name 
                        ? 'text-neutral-700' 
                        : 'text-neutral-400'
                    }`}>
                      {lang.percentage}%
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        )}
        
        {/* Backend - solo tags */}
        {backend.length > 0 && (
          <div>
            <p className="text-[9px] tracking-wider text-neutral-400 uppercase mb-1.5">
              backend
            </p>
            <div className="flex flex-wrap gap-1.5">
              {backend.map(item => (
                <span
                  key={item}
                  className="text-[9px] sm:text-[10px] tracking-wider px-2 py-1 bg-white border border-neutral-200"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* AI - solo tags */}
        {ai.length > 0 && (
          <div>
            <p className="text-[9px] tracking-wider text-neutral-400 uppercase mb-1.5">
              ai
            </p>
            <div className="flex flex-wrap gap-1.5">
              {ai.map(item => (
                <span
                  key={item}
                  className="text-[9px] sm:text-[10px] tracking-wider px-2 py-1 bg-white border border-neutral-200"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* Otras categorías - solo tags */}
        {otherCategories.map(([category, items]) => (
          <div key={category}>
            <p className="text-[9px] tracking-wider text-neutral-400 uppercase mb-1.5">
              {category}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {items.map(item => (
                <span
                  key={item}
                  className="text-[9px] sm:text-[10px] tracking-wider px-2 py-1 bg-white border border-neutral-200"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TechStackBar
