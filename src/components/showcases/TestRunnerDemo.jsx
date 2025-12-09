'use client'

import { useState, useEffect } from 'react'

/**
 * Interactive demo showing test execution for Ontario Flag Time Machine
 * Simulates running Jest tests with visual feedback
 */
export function TestRunnerDemo() {
  const [isRunning, setIsRunning] = useState(false)
  const [currentTest, setCurrentTest] = useState(-1)
  const [results, setResults] = useState([])

  const tests = [
    { name: 'getFlagForYear(1867) → Union Jack', expected: 'union-jack.svg', category: 'boundary' },
    { name: 'getFlagForYear(1868) → Red Ensign', expected: 'canada-1868.svg', category: 'boundary' },
    { name: 'getFlagForYear(1964) → Red Ensign', expected: 'canada-1957.svg', category: 'boundary' },
    { name: 'getFlagForYear(1965) → Ontario Flag', expected: 'ontario.svg', category: 'boundary' },
    { name: 'VintageSwitch onClick → calls onToggle', expected: 'toHaveBeenCalled', category: 'component' },
    { name: 'VintageSwitch disabled → no callback', expected: 'not.toHaveBeenCalled', category: 'component' },
  ]

  const runTests = () => {
    setIsRunning(true)
    setResults([])
    setCurrentTest(0)
  }

  useEffect(() => {
    if (!isRunning || currentTest < 0) return

    if (currentTest >= tests.length) {
      setIsRunning(false)
      setCurrentTest(-1)
      return
    }

    const timer = setTimeout(() => {
      setResults(prev => [...prev, { ...tests[currentTest], passed: true }])
      setCurrentTest(prev => prev + 1)
    }, 400)

    return () => clearTimeout(timer)
  }, [isRunning, currentTest])

  const passedCount = results.filter(r => r.passed).length
  const totalTests = tests.length

  return (
    <div className="flex flex-col items-center gap-4 py-6">
      {/* Terminal-style container */}
      <div className="
        w-full max-w-lg
        bg-[#1a1a1a]
        border border-[#333]
        rounded-lg
        overflow-hidden
        shadow-[0_4px_20px_rgba(0,0,0,0.5)]
        font-mono text-sm
      ">
        {/* Terminal header */}
        <div className="
          flex items-center gap-2 px-4 py-2
          bg-gradient-to-b from-[#2a2a2a] to-[#222]
          border-b border-[#333]
        ">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27ca40]" />
          </div>
          <span className="text-[#888] text-xs ml-2">jest --watch</span>
        </div>

        {/* Terminal content */}
        <div className="p-4 min-h-[280px]">
          {/* Header */}
          <div className="text-[#888] mb-3">
            <span className="text-[#61afef]">PASS</span> src/__tests__/
          </div>

          {/* Test suites */}
          <div className="space-y-1 mb-4">
            <div className="text-[#c8c8c8]">
              <span className="text-[#888]">describe</span>
              <span className="text-[#98c379]">{' \'getFlagForYear - boundaries\''}</span>
            </div>

            {/* Boundary tests */}
            {tests.filter(t => t.category === 'boundary').map((test, i) => {
              const result = results.find(r => r.name === test.name)
              const isCurrent = isRunning && tests[currentTest]?.name === test.name

              return (
                <div key={i} className="pl-4 flex items-center gap-2">
                  {result ? (
                    <span className="text-[#27ca40]">✓</span>
                  ) : isCurrent ? (
                    <span className="text-[#ffbd2e] animate-pulse">●</span>
                  ) : (
                    <span className="text-[#555]">○</span>
                  )}
                  <span className={result ? 'text-[#888]' : isCurrent ? 'text-[#c8c8c8]' : 'text-[#555]'}>
                    {test.name.split(' → ')[0]}
                  </span>
                  {result && (
                    <span className="text-[#555] text-xs">
                      → {test.expected}
                    </span>
                  )}
                </div>
              )
            })}

            <div className="text-[#c8c8c8] mt-3">
              <span className="text-[#888]">describe</span>
              <span className="text-[#98c379]">{' \'VintageSwitch interactions\''}</span>
            </div>

            {/* Component tests */}
            {tests.filter(t => t.category === 'component').map((test, i) => {
              const result = results.find(r => r.name === test.name)
              const isCurrent = isRunning && tests[currentTest]?.name === test.name

              return (
                <div key={i} className="pl-4 flex items-center gap-2">
                  {result ? (
                    <span className="text-[#27ca40]">✓</span>
                  ) : isCurrent ? (
                    <span className="text-[#ffbd2e] animate-pulse">●</span>
                  ) : (
                    <span className="text-[#555]">○</span>
                  )}
                  <span className={result ? 'text-[#888]' : isCurrent ? 'text-[#c8c8c8]' : 'text-[#555]'}>
                    {test.name.split(' → ')[0]}
                  </span>
                </div>
              )
            })}
          </div>

          {/* Summary */}
          {results.length > 0 && !isRunning && (
            <div className="border-t border-[#333] pt-3 mt-3">
              <div className="flex justify-between text-xs">
                <span className="text-[#888]">Tests:</span>
                <span>
                  <span className="text-[#27ca40]">{passedCount} passed</span>
                  <span className="text-[#888]">, {totalTests} total</span>
                </span>
              </div>
              <div className="flex justify-between text-xs mt-1">
                <span className="text-[#888]">Time:</span>
                <span className="text-[#888]">0.{Math.floor(Math.random() * 900) + 100}s</span>
              </div>
            </div>
          )}

          {/* Waiting state */}
          {results.length === 0 && !isRunning && (
            <div className="text-[#555] text-center py-8">
              Press Run to execute tests
            </div>
          )}
        </div>

        {/* Run button */}
        <div className="px-4 py-3 border-t border-[#333] bg-[#1f1f1f]">
          <button
            onClick={runTests}
            disabled={isRunning}
            className={`
              w-full py-2 rounded
              font-mono text-sm
              transition-all duration-200
              ${isRunning
                ? 'bg-[#333] text-[#666] cursor-not-allowed'
                : 'bg-[#27ca40] text-[#1a1a1a] hover:bg-[#32d74b] active:scale-[0.98]'
              }
            `}
          >
            {isRunning ? 'Running...' : results.length > 0 ? 'Run Again' : 'Run Tests'}
          </button>
        </div>
      </div>

      {/* Caption */}
      <p className="text-xs text-[#888] text-center max-w-md">
        Interactive demo: Click Run to simulate test execution
      </p>
    </div>
  )
}

export default TestRunnerDemo
