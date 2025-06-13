"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  X,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  Brain,
  Target,
  TrendingDown,
  Users,
  ShoppingCart,
  Leaf,
  Smartphone,
  BarChart3,
  CheckCircle,
  Trophy,
  Gift,
  Star,
  Play,
  Pause,
  Clock,
} from "lucide-react"

interface PresentationModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function PresentationModal({ isOpen, onClose }: PresentationModalProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(false)
  const [showTimeDialog, setShowTimeDialog] = useState(false)
  const [slideTime, setSlideTime] = useState("5")
  const [autoPlayInterval, setAutoPlayInterval] = useState<NodeJS.Timeout | null>(null)

  const slides = [
    // Slide 1: Start
    {
      id: "start",
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-8 px-8">
          <div className="animate-bounce-in">
            <Lightbulb className="w-24 h-24 text-yellow-400 animate-float" />
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white animate-fade-in stagger-1">
              Smart<span className="text-blue-400">hylle</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 animate-fade-in stagger-2">
              Fremtiden for matsvinn-reduksjon
            </p>
            <p className="text-lg text-gray-300 animate-fade-in stagger-3">
              Oppdage hvordan AI kan redde planeten, én vare om gangen
            </p>
          </div>
        </div>
      ),
    },
    // Slide 2: Problem
    {
      id: "problem",
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-8 px-8">
          <TrendingDown className="w-20 h-20 text-red-400 animate-bounce-in" />
          <h2 className="text-4xl md:text-5xl font-bold text-white animate-fade-in stagger-1">Problemet</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
            {[
              { value: "1.3B", label: "tonn mat kastes årlig" },
              { value: "30%", label: "av all mat produsert" },
              { value: "8%", label: "av globale CO2-utslipp" },
            ].map((stat, index) => (
              <div
                key={stat.value}
                className="glass rounded-xl p-6 border border-white/20 animate-scale-in"
                style={{ animationDelay: `${(index + 2) * 200}ms` }}
              >
                <div className="text-3xl font-bold text-red-400 mb-2">{stat.value}</div>
                <div className="text-white">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    // Slide 3: Løsning
    {
      id: "solution",
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-8 px-8">
          <Brain className="w-20 h-20 text-blue-400 animate-bounce-in" />
          <h2 className="text-4xl md:text-5xl font-bold text-white animate-fade-in stagger-1">Vår Løsning</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
            {[
              {
                icon: <Smartphone className="w-12 h-12 text-green-400 mb-4 mx-auto" />,
                title: "Smart App",
                description: "Mobilapp som kobler forbrukere med tilbud",
              },
              {
                icon: <BarChart3 className="w-12 h-12 text-blue-400 mb-4 mx-auto" />,
                title: "AI-Analyse",
                description: "Prediktiv analyse av utløpsdatoer og etterspørsel",
              },
            ].map((item, index) => (
              <div
                key={item.title}
                className="glass rounded-xl p-6 border border-white/20 animate-scale-in hover-lift"
                style={{ animationDelay: `${(index + 2) * 200}ms` }}
              >
                <div className="animate-float">{item.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    // Slide 4: Hvordan det fungerer
    {
      id: "how-it-works",
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-8 px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white animate-fade-in">Hvordan det fungerer</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl">
            {[
              {
                step: "1",
                icon: <Target className="w-16 h-16 text-blue-400 mb-4 mx-auto mt-4" />,
                title: "AI Analyserer",
                description: "Vår AI scanner utløpsdatoer og foreslår optimale rabatter",
              },
              {
                step: "2",
                icon: <Users className="w-16 h-16 text-green-400 mb-4 mx-auto mt-4" />,
                title: "Brukere Får Tilbud",
                description: "Personaliserte varsler sendes til interesserte kunder",
              },
              {
                step: "3",
                icon: <CheckCircle className="w-16 h-16 text-yellow-400 mb-4 mx-auto mt-4" />,
                title: "Mat Reddes",
                description: "Varer selges i stedet for å bli kastet",
              },
            ].map((item, index) => (
              <div
                key={item.step}
                className="glass rounded-xl p-6 border border-white/20 relative animate-scale-in hover-lift"
                style={{ animationDelay: `${(index + 1) * 200}ms` }}
              >
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold animate-bounce-in">
                  {item.step}
                </div>
                <div className="animate-float">{item.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    // Slide 5: Belønninger
    {
      id: "rewards",
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-8 px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white animate-fade-in">Mål & Belønninger</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
            {[
              {
                icon: <Trophy className="w-16 h-16 text-yellow-400 mb-4 mx-auto" />,
                title: "Toppliste",
                description: "Konkurrér med andre og vinn premier",
              },
              {
                icon: <Gift className="w-16 h-16 text-green-400 mb-4 mx-auto" />,
                title: "Belønninger",
                description: "Opptjen poeng for hver vare du redder",
              },
              {
                icon: <Star className="w-16 h-16 text-blue-400 mb-4 mx-auto" />,
                title: "Utmerkelser",
                description: "Få anerkjennelse for ditt miljøbidrag",
              },
            ].map((item, index) => (
              <div
                key={item.title}
                className="glass rounded-xl p-6 border border-white/20 hover-lift animate-scale-in"
                style={{ animationDelay: `${(index + 1) * 200}ms` }}
              >
                <div className="animate-float">{item.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    // Slide 6: Resultater
    {
      id: "results",
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-8 px-8">
          <Leaf className="w-20 h-20 text-green-400 animate-bounce-in" />
          <h2 className="text-4xl md:text-5xl font-bold text-white animate-fade-in stagger-1">Våre Resultater</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl">
            {[
              { value: "40%", label: "Mindre matsvinn" },
              { value: "1000+", label: "Varer reddet" },
              { value: "500+", label: "Aktive brukere" },
              { value: "2.5T", label: "CO2 spart" },
            ].map((stat, index) => (
              <div
                key={stat.value}
                className="glass rounded-xl p-6 border border-white/20 animate-bounce-in"
                style={{ animationDelay: `${(index + 2) * 200}ms` }}
              >
                <div className="text-3xl font-bold text-green-400 mb-2">{stat.value}</div>
                <div className="text-white text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    // Slide 7: Call to Action
    {
      id: "cta",
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-8 px-8">
          <ShoppingCart className="w-20 h-20 text-blue-400 animate-bounce-in" />
          <h2 className="text-4xl md:text-5xl font-bold text-white animate-fade-in stagger-1">Klar til å starte?</h2>
          <p className="text-xl text-blue-100 animate-fade-in stagger-2">Bli med i kampen mot matsvinn i dag</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in stagger-3">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-4 hover-lift"
              onClick={() => (window.location.href = "/application")}
            >
              <Smartphone className="w-5 h-5 mr-2" />
              Prøv appen gratis
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-gray-900 text-lg px-8 py-4 hover-lift"
              onClick={onClose}
            >
              Lær mer
            </Button>
          </div>
        </div>
      ),
    },
  ]

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    } else {
      // Stop autoplay when reaching the end
      stopAutoPlay()
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const startAutoPlay = () => {
    const timeInSeconds = Number.parseInt(slideTime)
    if (isNaN(timeInSeconds) || timeInSeconds < 1) return

    setIsAutoPlaying(true)
    setShowTimeDialog(false)

    // Start immediately if not on first slide, or wait for interval
    const startDelay = currentSlide === 0 ? timeInSeconds * 1000 : 0

    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        if (prev >= slides.length - 1) {
          setIsAutoPlaying(false)
          clearInterval(interval)
          return prev
        }
        return prev + 1
      })
    }, timeInSeconds * 1000)

    // If not on first slide, advance immediately
    if (currentSlide > 0) {
      setTimeout(() => {
        setCurrentSlide((prev) => {
          if (prev >= slides.length - 1) {
            setIsAutoPlaying(false)
            clearInterval(interval)
            return prev
          }
          return prev + 1
        })
      }, 100) // Small delay to ensure state is set
    }

    setAutoPlayInterval(interval)
  }

  const stopAutoPlay = () => {
    setIsAutoPlaying(false)
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval)
      setAutoPlayInterval(null)
    }
  }

  const handleAutoPlayClick = () => {
    if (isAutoPlaying) {
      stopAutoPlay()
    } else {
      setShowTimeDialog(true)
    }
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight" && !isAutoPlaying) nextSlide()
    if (e.key === "ArrowLeft" && !isAutoPlaying) prevSlide()
    if (e.key === "Escape") {
      stopAutoPlay()
      onClose()
    }
    if (e.key === " ") {
      e.preventDefault()
      handleAutoPlayClick()
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
    } else {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "auto"
      setCurrentSlide(0)
      stopAutoPlay()
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "auto"
      stopAutoPlay()
    }
  }, [isOpen, currentSlide, isAutoPlaying])

  if (!isOpen) return null

  const currentStepData = slides[currentSlide]

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-green-800 z-50 flex flex-col">
      {/* Close button */}
      <Button
        variant="ghost"
        size="sm"
        className="absolute top-4 right-4 z-50 text-white hover:bg-white/20 hover-scale"
        onClick={onClose}
      >
        <X className="w-6 h-6" />
      </Button>

      {/* Slide content */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full h-full flex items-center justify-center transition-all duration-500 ease-in-out">
          {currentStepData.content}
        </div>
      </div>

      {/* Navigation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-6 z-10">
        <Button
          variant="ghost"
          size="sm"
          className="text-white hover:bg-white/20 w-12 h-12 rounded-full hover-scale"
          onClick={prevSlide}
          disabled={currentSlide === 0 || isAutoPlaying}
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>

        <div className="flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all hover-scale ${
                index === currentSlide ? "bg-white scale-125" : "bg-white/40 hover:bg-white/60"
              } ${isAutoPlaying ? "cursor-not-allowed" : ""}`}
              onClick={() => !isAutoPlaying && goToSlide(index)}
              disabled={isAutoPlaying}
            />
          ))}
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="text-white hover:bg-white/20 w-12 h-12 rounded-full hover-scale"
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1 || isAutoPlaying}
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>

      {/* Auto-play controls */}
      <div className="absolute bottom-8 right-8 z-10">
        <Button
          variant="ghost"
          size="sm"
          className={`text-white hover:bg-white/20 rounded-full transition-all duration-200 ${
            isAutoPlaying ? "bg-white/20" : ""
          }`}
          onClick={handleAutoPlayClick}
        >
          {isAutoPlaying ? (
            <>
              <Pause className="w-5 h-5 mr-2" />
              Stopp auto
            </>
          ) : (
            <>
              <Play className="w-5 h-5 mr-2" />
              Kjør automatisk
            </>
          )}
        </Button>
      </div>

      {/* Time dialog */}
      {showTimeDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-60">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-2xl max-w-sm w-full mx-4 animate-scale-in">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Automatisk presentasjon</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Hvor mange sekunder skal hver slide vises?</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="slideTime" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Sekunder per slide
                </Label>
                <Input
                  id="slideTime"
                  type="number"
                  min="1"
                  max="60"
                  value={slideTime}
                  onChange={(e) => setSlideTime(e.target.value)}
                  placeholder="5"
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs">
                {["3", "5", "10"].map((time) => (
                  <Button
                    key={time}
                    variant="outline"
                    size="sm"
                    onClick={() => setSlideTime(time)}
                    className={slideTime === time ? "bg-blue-100 dark:bg-blue-900" : ""}
                  >
                    {time}s
                  </Button>
                ))}
              </div>

              <div className="flex gap-3 pt-2">
                <Button variant="outline" onClick={() => setShowTimeDialog(false)} className="flex-1">
                  Avbryt
                </Button>
                <Button
                  onClick={startAutoPlay}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  disabled={!slideTime || Number.parseInt(slideTime) < 1}
                >
                  <Play className="w-4 h-4 mr-2" />
                  Start
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
        <div
          className="h-full bg-gradient-to-r from-blue-400 to-green-400 transition-all duration-500 ease-in-out"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>
    </div>
  )
}
