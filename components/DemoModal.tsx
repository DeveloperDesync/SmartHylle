"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  X,
  ChevronRight,
  ChevronLeft,
  Smartphone,
  Bell,
  ShoppingCart,
  QrCode,
  CheckCircle,
  Heart,
  Trophy,
  Sparkles,
  ArrowDown,
  Play,
  Pause,
} from "lucide-react"

interface DemoModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [animationStep, setAnimationStep] = useState(0)

  const demoSteps = [
    {
      id: "welcome",
      title: "Velkommen til Smarthylle Demo!",
      description: "La oss vise deg hvordan appen fungerer steg for steg",
      content: (
        <div className="text-center space-y-6">
          <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto">
            <Smartphone className="w-12 h-12 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Interaktiv Demo</h3>
            <p className="text-gray-600 dark:text-gray-300">Følg med mens vi simulerer en ekte brukeropplevelse</p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              💡 Tips: Du kan navigere manuelt eller la demoen kjøre automatisk
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "login",
      title: "1. Logg inn i appen",
      description: "Brukere logger inn med sine legitimasjoner",
      content: (
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg border p-4 max-w-sm mx-auto">
            <div className="text-center mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-bold">Smarthylle</h4>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400">Brukernavn</label>
                <div className="border rounded p-2 bg-gray-50 dark:bg-gray-700">
                  <span className={`text-sm ${animationStep >= 1 ? "opacity-100" : "opacity-30"}`}>bruker1</span>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400">Passord</label>
                <div className="border rounded p-2 bg-gray-50 dark:bg-gray-700">
                  <span className={`text-sm ${animationStep >= 2 ? "opacity-100" : "opacity-30"}`}>••••••</span>
                </div>
              </div>
              <Button
                className={`w-full transition-all duration-500 ${
                  animationStep >= 3 ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-300"
                }`}
                disabled={animationStep < 3}
              >
                {animationStep >= 3 ? "Logg inn" : "Vent..."}
              </Button>
            </div>
          </div>
          {animationStep >= 4 && (
            <div className="text-center animate-fade-in">
              <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <p className="text-green-600 dark:text-green-400 font-medium">Innlogget!</p>
            </div>
          )}
        </div>
      ),
    },
    {
      id: "browse",
      title: "2. Bla gjennom tilbud",
      description: "Brukere ser tilgjengelige tilbud med AI-foreslåtte rabatter",
      content: (
        <div className="space-y-4">
          <div className="grid gap-3 max-w-sm mx-auto">
            {[
              { name: "Økologiske epler", discount: 30, expiry: "2024-12-20", ai: false },
              { name: "Fullkornbrød", discount: 50, expiry: "2024-12-18", ai: true },
              { name: "Yoghurt naturell", discount: 25, expiry: "2024-12-22", ai: false },
            ].map((offer, index) => (
              <div
                key={offer.name}
                className={`border rounded-lg p-3 bg-white dark:bg-gray-800 transition-all duration-500 ${
                  animationStep >= index + 1
                    ? "opacity-100 transform translate-y-0"
                    : "opacity-30 transform translate-y-4"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-sm">{offer.name}</h4>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs">
                      {offer.discount}% rabatt
                    </Badge>
                    <Button variant="ghost" size="sm" className="p-1">
                      <Heart className="w-4 h-4 text-gray-400" />
                    </Button>
                  </div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  Utløper: {new Date(offer.expiry).toLocaleDateString("nb-NO")}
                </p>
                {offer.ai && (
                  <Badge variant="outline" className="text-xs">
                    <Sparkles className="w-3 h-3 mr-1" />
                    AI-forslag
                  </Badge>
                )}
              </div>
            ))}
          </div>
          {animationStep >= 4 && (
            <div className="text-center animate-fade-in">
              <ArrowDown className="w-6 h-6 text-blue-500 mx-auto animate-bounce" />
              <p className="text-sm text-blue-600 dark:text-blue-400">Velg et tilbud!</p>
            </div>
          )}
        </div>
      ),
    },
    {
      id: "select",
      title: "3. Velg og favoriser tilbud",
      description: "Brukere kan favorisere tilbud de er interessert i",
      content: (
        <div className="space-y-4">
          <div className="max-w-sm mx-auto">
            <div className="border rounded-lg p-4 bg-white dark:bg-gray-800 border-red-200 dark:border-red-600">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Fullkornbrød</h4>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                    50% rabatt
                  </Badge>
                  <Button variant="ghost" size="sm" className="p-1">
                    <Heart
                      className={`w-4 h-4 transition-all duration-500 ${
                        animationStep >= 2 ? "text-red-500 fill-current" : "text-gray-400"
                      }`}
                    />
                  </Button>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                Hjemmebakt fullkornbrød med kort holdbarhet
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Utløper: 18. des 2024</p>
              <Badge variant="outline" className="text-xs">
                <Sparkles className="w-3 h-3 mr-1" />
                AI-forslag
              </Badge>
            </div>
          </div>
          {animationStep >= 3 && (
            <div className="text-center animate-fade-in">
              <Heart className="w-8 h-8 text-red-500 mx-auto mb-2 fill-current" />
              <p className="text-red-600 dark:text-red-400 font-medium">Lagt til i favoritter!</p>
            </div>
          )}
        </div>
      ),
    },
    {
      id: "barcode",
      title: "4. Få din handlekode",
      description: "Brukere får en unik QR-kode for å aktivere tilbudet i butikken",
      content: (
        <div className="space-y-4">
          <div className="max-w-sm mx-auto">
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-sm text-gray-600 dark:text-gray-400">Din handlekode</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div
                  className={`bg-white p-4 rounded-lg mb-2 mx-auto inline-block transition-all duration-1000 ${
                    animationStep >= 1 ? "opacity-100 scale-100" : "opacity-0 scale-75"
                  }`}
                >
                  <div className="flex items-center justify-center space-x-1">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div
                        key={i}
                        className="bg-black transition-all duration-100"
                        style={{
                          width: Math.random() > 0.5 ? "2px" : "1px",
                          height: "40px",
                          animationDelay: `${i * 100}ms`,
                        }}
                      />
                    ))}
                  </div>
                  <p className="text-xs font-mono mt-2 text-black">SH001123456</p>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Vis denne koden i butikken for å aktivere tilbud
                </p>
              </CardContent>
            </Card>
          </div>
          {animationStep >= 2 && (
            <div className="text-center animate-fade-in">
              <QrCode className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <p className="text-blue-600 dark:text-blue-400 font-medium">Klar for butikken!</p>
            </div>
          )}
        </div>
      ),
    },
    {
      id: "purchase",
      title: "5. Handle i butikken",
      description: "Brukeren scanner koden og får rabatten aktivert",
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <QrCode
                className={`w-10 h-10 text-green-600 dark:text-green-400 transition-all duration-1000 ${
                  animationStep >= 1 ? "scale-100" : "scale-75"
                }`}
              />
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Kunden scanner koden ved kassen...</p>
          </div>

          {animationStep >= 2 && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-600 rounded-lg p-4 animate-fade-in">
              <div className="text-center">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <h4 className="font-bold text-green-800 dark:text-green-200 mb-2">Tilbud aktivert!</h4>
                <div className="space-y-1 text-sm">
                  <p className="text-green-700 dark:text-green-300">
                    Fullkornbrød: <span className="line-through">40 kr</span> → <strong>20 kr</strong>
                  </p>
                  <p className="text-green-600 dark:text-green-400">Du sparte 20 kr! 🎉</p>
                </div>
              </div>
            </div>
          )}

          {animationStep >= 3 && (
            <div className="text-center animate-fade-in">
              <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <p className="text-yellow-600 dark:text-yellow-400 font-medium">+1 vare reddet fra matsvinn!</p>
            </div>
          )}
        </div>
      ),
    },
    {
      id: "rewards",
      title: "6. Opptjen belønninger",
      description: "Brukere får poeng og klatrer på topplisten",
      content: (
        <div className="space-y-4">
          <div className="max-w-sm mx-auto">
            <Card className="bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-yellow-200 dark:border-yellow-600">
              <CardContent className="p-4 text-center">
                <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
                <h4 className="font-bold text-yellow-800 dark:text-yellow-200 mb-2">Gratulerer!</h4>
                <div className="space-y-2 text-sm">
                  <p className="text-yellow-700 dark:text-yellow-300">
                    Du har nå reddet{" "}
                    <strong className={animationStep >= 1 ? "text-lg" : ""}>{animationStep >= 1 ? "46" : "45"}</strong>{" "}
                    varer!
                  </p>
                  {animationStep >= 2 && (
                    <div className="animate-fade-in">
                      <Badge className="bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200">
                        🥈 2. plass på topplisten!
                      </Badge>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {animationStep >= 3 && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-600 rounded-lg p-4 animate-fade-in">
              <div className="text-center">
                <Bell className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Nytt tilbud tilgjengelig!</h4>
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  AI har funnet nye produkter som trenger å reddes 🤖
                </p>
              </div>
            </div>
          )}
        </div>
      ),
    },
    {
      id: "complete",
      title: "🎉 Demo fullført!",
      description: "Slik fungerer Smarthylle - enkelt og effektivt",
      content: (
        <div className="text-center space-y-6">
          <div className="w-24 h-24 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Takk for at du så demoen!</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Nå vet du hvordan Smarthylle hjelper med å redusere matsvinn
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
              <Smartphone className="w-6 h-6 text-blue-500 mx-auto mb-2" />
              <p className="font-medium text-blue-800 dark:text-blue-200">Enkel app</p>
              <p className="text-blue-600 dark:text-blue-400">Brukervennlig design</p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
              <Sparkles className="w-6 h-6 text-green-500 mx-auto mb-2" />
              <p className="font-medium text-green-800 dark:text-green-200">AI-drevet</p>
              <p className="text-green-600 dark:text-green-400">Smarte anbefalinger</p>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
              <Trophy className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
              <p className="font-medium text-yellow-800 dark:text-yellow-200">Belønninger</p>
              <p className="text-yellow-600 dark:text-yellow-400">Motiverende system</p>
            </div>
          </div>

          <Button onClick={onClose} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
            <Smartphone className="w-5 h-5 mr-2" />
            Prøv appen nå!
          </Button>
        </div>
      ),
    },
  ]

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isPlaying && currentStep < demoSteps.length - 1) {
      interval = setInterval(() => {
        setAnimationStep((prev) => {
          const maxSteps = getMaxAnimationSteps(currentStep)
          if (prev >= maxSteps) {
            // Gå til neste steg
            setCurrentStep((prevStep) => prevStep + 1)
            return 0
          }
          return prev + 1
        })
      }, 1500)
    }

    return () => clearInterval(interval)
  }, [isPlaying, currentStep, animationStep])

  const getMaxAnimationSteps = (step: number) => {
    switch (step) {
      case 1:
        return 4 // login
      case 2:
        return 4 // browse
      case 3:
        return 3 // select
      case 4:
        return 2 // barcode
      case 5:
        return 3 // purchase
      case 6:
        return 3 // rewards
      default:
        return 0
    }
  }

  const nextStep = () => {
    if (currentStep < demoSteps.length - 1) {
      setCurrentStep(currentStep + 1)
      setAnimationStep(0)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      setAnimationStep(0)
    }
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
    if (!isPlaying) {
      setAnimationStep(0)
    }
  }

  const resetDemo = () => {
    setCurrentStep(0)
    setAnimationStep(0)
    setIsPlaying(false)
  }

  useEffect(() => {
    if (isOpen) {
      resetDemo()
    }
  }, [isOpen])

  if (!isOpen) return null

  const currentStepData = demoSteps[currentStep]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <Play className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">App Demo</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Steg {currentStep + 1} av {demoSteps.length}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 dark:bg-gray-700 h-2">
          <div
            className="bg-blue-600 h-2 transition-all duration-300"
            style={{ width: `${((currentStep + 1) / demoSteps.length) * 100}%` }}
          />
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{currentStepData.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{currentStepData.description}</p>
          </div>

          <div className="min-h-[300px] flex items-center justify-center">{currentStepData.content}</div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700">
          <Button variant="outline" onClick={prevStep} disabled={currentStep === 0}>
            <ChevronLeft className="w-4 h-4 mr-2" />
            Forrige
          </Button>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={togglePlay} disabled={currentStep === demoSteps.length - 1}>
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4 mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Auto
                </>
              )}
            </Button>

            <Button variant="outline" size="sm" onClick={resetDemo}>
              Start på nytt
            </Button>
          </div>

          <Button onClick={nextStep} disabled={currentStep === demoSteps.length - 1}>
            Neste
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}
