"use client"

import { useState, useEffect, useRef } from "react"

interface AnimationStep {
  id: string
  title: string
  description: string
  progress: number
}

const steps: AnimationStep[] = [
  {
    id: "start",
    title: "En banan blir til",
    description: "Vår banan starter sin reise i butikken, fersk og klar til å bli spist...",
    progress: 0,
  },
  {
    id: "traditional-path",
    title: "Den tradisjonelle veien",
    description: "Uten Smarthylle går bananen ofte usolgt og ender i søpla...",
    progress: 25,
  },
  {
    id: "waste-impact",
    title: "Miljøpåvirkningen",
    description: "1 kg matsvinn = 2.5 kg CO₂ = 13 km bilkjøring",
    progress: 50,
  },
  {
    id: "smarthylle-path",
    title: "Smarthylle-veien",
    description: "Med Smarthylle får bananen en ny sjanse med smart rabatt!",
    progress: 75,
  },
  {
    id: "happy-ending",
    title: "Reddet og spist!",
    description: "Bananen blir reddet, miljøet blir glad, og du sparer penger! 🎉",
    progress: 100,
  },
]

export default function ScrollStoryAnimation() {
  const [currentStep, setCurrentStep] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const containerHeight = containerRef.current.offsetHeight
      const windowHeight = window.innerHeight

      // Calculate how much of the container is visible
      const visibleTop = Math.max(0, -rect.top)
      const visibleBottom = Math.min(containerHeight, windowHeight - rect.top)
      const visibleHeight = Math.max(0, visibleBottom - visibleTop)
      const visibilityRatio = visibleHeight / windowHeight

      setIsVisible(visibilityRatio > 0.1)

      if (rect.top <= windowHeight && rect.bottom >= 0) {
        const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight + containerHeight)))
        setScrollProgress(progress)

        // Determine current step based on progress
        const stepIndex = Math.floor(progress * (steps.length - 1))
        setCurrentStep(Math.min(stepIndex, steps.length - 1))
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial call

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const getBananaPosition = () => {
    const baseProgress = scrollProgress * 100
    if (baseProgress < 25) {
      // Moving from store to traditional path
      return { x: baseProgress * 2, y: 0, rotation: baseProgress * 2 }
    } else if (baseProgress < 50) {
      // Traditional path - going down to waste
      const localProgress = (baseProgress - 25) / 25
      return { x: 50, y: localProgress * 40, rotation: 45 + localProgress * 45 }
    } else if (baseProgress < 75) {
      // Smarthylle intervention - banana goes back up
      const localProgress = (baseProgress - 50) / 25
      return { x: 50 + localProgress * 30, y: 40 - localProgress * 30, rotation: 90 - localProgress * 90 }
    } else {
      // Happy ending - banana reaches customer
      const localProgress = (baseProgress - 75) / 25
      return { x: 80 + localProgress * 15, y: 10 - localProgress * 10, rotation: localProgress * 360 }
    }
  }

  const bananaPos = getBananaPosition()

  return (
    <section className="relative min-h-[400vh] bg-gradient-to-b from-yellow-50 via-orange-50 to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      {/* Sticky container */}
      <div ref={containerRef} className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 opacity-20">
          {/* Animated background particles */}
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Main animation canvas */}
        <div className="relative w-full h-full max-w-6xl mx-auto">
          {/* Store */}
          <div
            className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-all duration-1000 ${
              currentStep >= 0 ? "scale-100 opacity-100" : "scale-50 opacity-0"
            }`}
          >
            <div className="bg-blue-600 text-white p-4 rounded-lg shadow-lg">
              <div className="text-2xl mb-2">🏪</div>
              <div className="font-bold">Butikk</div>
            </div>
          </div>

          {/* Traditional waste bin */}
          <div
            className={`absolute left-1/2 bottom-20 transform -translate-x-1/2 transition-all duration-1000 ${
              currentStep >= 1 && currentStep < 3 ? "scale-100 opacity-100" : "scale-50 opacity-30"
            }`}
          >
            <div className="bg-red-600 text-white p-4 rounded-lg shadow-lg">
              <div className="text-2xl mb-2">🗑️</div>
              <div className="font-bold">Søppel</div>
            </div>
          </div>

          {/* Smarthylle intervention */}
          <div
            className={`absolute right-1/3 top-1/3 transform transition-all duration-1000 ${
              currentStep >= 3 ? "scale-100 opacity-100 animate-pulse" : "scale-50 opacity-0"
            }`}
          >
            <div className="bg-green-600 text-white p-4 rounded-lg shadow-lg">
              <div className="text-2xl mb-2">🤖</div>
              <div className="font-bold">Smarthylle AI</div>
            </div>
          </div>

          {/* Happy customer */}
          <div
            className={`absolute right-4 top-1/4 transform transition-all duration-1000 ${
              currentStep >= 4 ? "scale-100 opacity-100" : "scale-50 opacity-0"
            }`}
          >
            <div className="bg-purple-600 text-white p-4 rounded-lg shadow-lg">
              <div className="text-2xl mb-2">😊</div>
              <div className="font-bold">Glad kunde</div>
            </div>
          </div>

          {/* The banana - main character */}
          <div
            className="absolute transition-all duration-500 ease-out"
            style={{
              left: `${bananaPos.x}%`,
              top: `${bananaPos.y + 50}%`,
              transform: `translate(-50%, -50%) rotate(${bananaPos.rotation}deg)`,
            }}
          >
            <div className="text-6xl animate-bounce">🍌</div>
          </div>

          {/* Path visualization */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {/* Traditional path */}
            <path
              d="M 100 300 Q 400 300 400 500"
              stroke="#ef4444"
              strokeWidth="3"
              fill="none"
              strokeDasharray="10,5"
              className={`transition-opacity duration-1000 ${
                currentStep >= 1 && currentStep < 3 ? "opacity-100" : "opacity-30"
              }`}
            />
            {/* Smarthylle path */}
            <path
              d="M 400 500 Q 600 200 800 150"
              stroke="#10b981"
              strokeWidth="3"
              fill="none"
              strokeDasharray="10,5"
              className={`transition-opacity duration-1000 ${currentStep >= 3 ? "opacity-100" : "opacity-30"}`}
            />
          </svg>

          {/* Environmental impact visualization */}
          {currentStep === 2 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-red-100 dark:bg-red-900/50 rounded-2xl p-8 max-w-md text-center animate-scale-in">
                <div className="text-4xl mb-4">💨</div>
                <div className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">2.5 kg CO₂</div>
                <div className="text-lg text-gray-700 dark:text-gray-300 mb-4">per kg matsvinn</div>
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <span>🚗</span>
                  <span>=</span>
                  <span className="font-bold">13 km bilkjøring</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Progress indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-full px-6 py-3">
            <div className="flex space-x-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index <= currentStep ? "bg-blue-600" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Story text overlay */}
      <div className="fixed bottom-8 left-8 right-8 z-10 pointer-events-none">
        <div
          className={`bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl p-6 shadow-2xl transition-all duration-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{steps[currentStep]?.title}</h3>
            <p className="text-lg text-gray-600 dark:text-gray-300">{steps[currentStep]?.description}</p>

            {/* Environmental stats */}
            {currentStep === 2 && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-red-100 dark:bg-red-900/30 rounded-lg p-3">
                  <div className="font-bold text-red-600 dark:text-red-400">2.5 kg CO₂</div>
                  <div className="text-gray-600 dark:text-gray-400">per kg matsvinn</div>
                </div>
                <div className="bg-orange-100 dark:bg-orange-900/30 rounded-lg p-3">
                  <div className="font-bold text-orange-600 dark:text-orange-400">13 km</div>
                  <div className="text-gray-600 dark:text-gray-400">bilkjøring tilsvarende</div>
                </div>
                <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-3">
                  <div className="font-bold text-blue-600 dark:text-blue-400">3.3 kWh</div>
                  <div className="text-gray-600 dark:text-gray-400">energi kastet bort</div>
                </div>
              </div>
            )}

            {/* Success message */}
            {currentStep === 4 && (
              <div className="mt-4 bg-green-100 dark:bg-green-900/30 rounded-lg p-4">
                <div className="text-green-600 dark:text-green-400 font-bold text-lg">
                  🎉 Mat reddet, miljø beskyttet, penger spart!
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Med Smarthylle reduserer vi matsvinn med opptil 40%
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="fixed bottom-4 right-8 z-10">
        <div className="bg-blue-600 text-white p-3 rounded-full shadow-lg animate-bounce">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 13l3 3 7-7" />
            <path d="M12 3v6" />
          </svg>
        </div>
      </div>
    </section>
  )
}
