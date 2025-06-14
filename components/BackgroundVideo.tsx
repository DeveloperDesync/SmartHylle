"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  ShoppingCart,
  Smartphone,
  Brain,
  Leaf,
  TrendingDown,
  Users,
  CheckCircle,
  Heart,
  QrCode,
  Trophy,
  Sparkles,
  BarChart3,
  Target,
  Gift,
  Zap,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

interface BackgroundVideoProps {
  isOpen: boolean
  onClose: () => void
}

export default function BackgroundVideo({ isOpen, onClose }: BackgroundVideoProps) {
  const [isPlaying, setIsPlaying] = useState(true)
  const [currentScene, setCurrentScene] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [speed, setSpeed] = useState(1)
  const [showControls, setShowControls] = useState(true)

  const scenes = [
    {
      id: "problem",
      duration: 8000,
      title: "Problemet med matsvinn",
      content: (
        <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-red-900 via-red-800 to-orange-800 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 animate-float">🍎</div>
            <div className="absolute top-20 right-20 animate-float-delayed">🥖</div>
            <div className="absolute bottom-20 left-20 animate-float">🥛</div>
            <div className="absolute bottom-10 right-10 animate-float-delayed">🥬</div>
            <div className="absolute top-1/2 left-1/4 animate-float">🍌</div>
            <div className="absolute top-1/3 right-1/3 animate-float-delayed">🍞</div>
          </div>

          <div className="text-center z-10 space-y-8 animate-fade-in-up">
            <TrendingDown className="w-24 h-24 text-red-400 mx-auto animate-bounce-slow" />
            <h1 className="text-6xl font-bold mb-4 animate-slide-in-left">Matsvinn</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
              <div className="bg-black/30 rounded-xl p-6 backdrop-blur-sm animate-scale-in stagger-1">
                <div className="text-4xl font-bold text-red-400 mb-2 animate-counter" data-target="1.3">
                  1.3B
                </div>
                <div className="text-lg">tonn mat kastes årlig</div>
              </div>
              <div className="bg-black/30 rounded-xl p-6 backdrop-blur-sm animate-scale-in stagger-2">
                <div className="text-4xl font-bold text-red-400 mb-2 animate-counter" data-target="30">
                  30%
                </div>
                <div className="text-lg">av all mat produsert</div>
              </div>
              <div className="bg-black/30 rounded-xl p-6 backdrop-blur-sm animate-scale-in stagger-3">
                <div className="text-4xl font-bold text-red-400 mb-2 animate-counter" data-target="8">
                  8%
                </div>
                <div className="text-lg">av globale CO₂-utslipp</div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 w-full h-2 bg-red-600 animate-progress"></div>
        </div>
      ),
    },
    {
      id: "solution",
      duration: 6000,
      title: "Smarthylle - Løsningen",
      content: (
        <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-blue-900 via-blue-800 to-green-800 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 animate-pulse">💡</div>
            <div className="absolute top-20 right-20 animate-pulse-delayed">🤖</div>
            <div className="absolute bottom-20 left-20 animate-pulse">📱</div>
            <div className="absolute bottom-10 right-10 animate-pulse-delayed">🌱</div>
          </div>

          <div className="text-center z-10 space-y-8">
            <div className="animate-bounce-in">
              <div className="w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-float">
                <ShoppingCart className="w-16 h-16 text-white" />
                <Leaf className="w-12 h-12 text-green-400 -ml-4 -mt-4" />
              </div>
            </div>

            <h1 className="text-7xl font-bold mb-6 animate-slide-in-right">
              Smart<span className="text-blue-400">hylle</span>
            </h1>

            <p className="text-2xl text-blue-100 mb-8 animate-fade-in stagger-1">AI-drevet løsning mot matsvinn</p>

            <div className="flex justify-center space-x-12 animate-fade-in stagger-2">
              <div className="text-center">
                <Brain className="w-16 h-16 text-blue-400 mx-auto mb-4 animate-pulse" />
                <p className="text-lg">Kunstig Intelligens</p>
              </div>
              <div className="text-center">
                <Smartphone className="w-16 h-16 text-green-400 mx-auto mb-4 animate-pulse-delayed" />
                <p className="text-lg">Mobilapp</p>
              </div>
              <div className="text-center">
                <Leaf className="w-16 h-16 text-yellow-400 mx-auto mb-4 animate-pulse" />
                <p className="text-lg">Bærekraft</p>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-green-600 animate-progress"></div>
        </div>
      ),
    },
    {
      id: "ai-analysis",
      duration: 7000,
      title: "AI Analyserer Produkter",
      content: (
        <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
            <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-400 rounded-full animate-ping-delayed"></div>
            <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
            <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-ping-delayed"></div>
          </div>

          <div className="text-center z-10 space-y-8">
            <Brain className="w-24 h-24 text-purple-400 mx-auto animate-pulse-glow" />
            <h1 className="text-5xl font-bold mb-6 animate-slide-in-left">AI Analyserer</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
              <div className="bg-black/30 rounded-xl p-6 backdrop-blur-sm animate-slide-in-left stagger-1">
                <BarChart3 className="w-12 h-12 text-blue-400 mb-4 mx-auto animate-bounce-slow" />
                <h3 className="text-xl font-bold mb-2">Utløpsdato-analyse</h3>
                <p className="text-blue-200">Predikerer når produkter utløper</p>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Epler</span>
                    <span className="text-yellow-400">2 dager</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Brød</span>
                    <span className="text-red-400">1 dag</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Yoghurt</span>
                    <span className="text-green-400">4 dager</span>
                  </div>
                </div>
              </div>

              <div className="bg-black/30 rounded-xl p-6 backdrop-blur-sm animate-slide-in-right stagger-2">
                <Target className="w-12 h-12 text-green-400 mb-4 mx-auto animate-spin-slow" />
                <h3 className="text-xl font-bold mb-2">Optimal rabatt</h3>
                <p className="text-green-200">Beregner beste rabattsats</p>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Epler</span>
                    <span className="text-yellow-400">30%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Brød</span>
                    <span className="text-red-400">50%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Yoghurt</span>
                    <span className="text-green-400">25%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="animate-fade-in stagger-3">
              <Sparkles className="w-8 h-8 text-yellow-400 mx-auto mb-2 animate-spin" />
              <p className="text-xl text-purple-200">AI finner de beste tilbudene automatisk</p>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-purple-600 to-blue-600 animate-progress"></div>
        </div>
      ),
    },
    {
      id: "user-notification",
      duration: 6000,
      title: "Brukere Får Varsler",
      content: (
        <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-green-900 via-teal-800 to-blue-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 animate-bounce">📱</div>
            <div className="absolute top-20 right-20 animate-bounce-delayed">🔔</div>
            <div className="absolute bottom-20 left-20 animate-bounce">💬</div>
            <div className="absolute bottom-10 right-10 animate-bounce-delayed">👥</div>
          </div>

          <div className="text-center z-10 space-y-8">
            <div className="relative animate-bounce-in">
              <Smartphone className="w-24 h-24 text-green-400 mx-auto" />
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center animate-ping">
                <span className="text-sm font-bold">3</span>
              </div>
            </div>

            <h1 className="text-5xl font-bold mb-6 animate-slide-in-up">Personlige Varsler</h1>

            <div className="max-w-md mx-auto space-y-4 animate-fade-in stagger-1">
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-green-400/30 animate-slide-in-left">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">🍎</div>
                  <div className="flex-1 text-left">
                    <h3 className="font-bold">Økologiske epler</h3>
                    <p className="text-green-200 text-sm">30% rabatt - utløper i morgen</p>
                  </div>
                  <Heart className="w-6 h-6 text-red-400" />
                </div>
              </div>

              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-blue-400/30 animate-slide-in-right stagger-1">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">🥖</div>
                  <div className="flex-1 text-left">
                    <h3 className="font-bold">Fullkornbrød</h3>
                    <p className="text-blue-200 text-sm">50% rabatt - utløper i dag</p>
                  </div>
                  <Sparkles className="w-6 h-6 text-yellow-400" />
                </div>
              </div>

              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-purple-400/30 animate-slide-in-left stagger-2">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">🥛</div>
                  <div className="flex-1 text-left">
                    <h3 className="font-bold">Yoghurt naturell</h3>
                    <p className="text-purple-200 text-sm">25% rabatt - utløper om 3 dager</p>
                  </div>
                  <CheckCircle className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </div>

            <div className="animate-fade-in stagger-3">
              <Users className="w-8 h-8 text-teal-400 mx-auto mb-2 animate-pulse" />
              <p className="text-xl text-teal-200">500+ aktive brukere får personlige tilbud</p>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-green-600 to-teal-600 animate-progress"></div>
        </div>
      ),
    },
    {
      id: "shopping",
      duration: 8000,
      title: "Handleopplevelsen",
      content: (
        <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-orange-900 via-red-800 to-pink-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 animate-float">🛒</div>
            <div className="absolute top-20 right-20 animate-float-delayed">💳</div>
            <div className="absolute bottom-20 left-20 animate-float">📱</div>
            <div className="absolute bottom-10 right-10 animate-float-delayed">✨</div>
          </div>

          <div className="text-center z-10 space-y-6">
            <h1 className="text-5xl font-bold mb-8 animate-slide-in-down">Enkel Handleopplevelse</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
              {/* Steg 1 */}
              <div className="bg-black/30 rounded-xl p-6 backdrop-blur-sm animate-scale-in stagger-1">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-slow">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <Heart className="w-12 h-12 text-red-400 mx-auto mb-4 animate-pulse" />
                <h3 className="text-xl font-bold mb-2">Velg Favoritter</h3>
                <p className="text-orange-200">Marker produkter du vil ha</p>
              </div>

              {/* Steg 2 */}
              <div className="bg-black/30 rounded-xl p-6 backdrop-blur-sm animate-scale-in stagger-2">
                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-slow">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <QrCode className="w-12 h-12 text-blue-400 mx-auto mb-4 animate-spin-slow" />
                <h3 className="text-xl font-bold mb-2">Få QR-kode</h3>
                <p className="text-red-200">Unik kode for dine tilbud</p>
              </div>

              {/* Steg 3 */}
              <div className="bg-black/30 rounded-xl p-6 backdrop-blur-sm animate-scale-in stagger-3">
                <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-slow">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4 animate-pulse" />
                <h3 className="text-xl font-bold mb-2">Handle i Butikk</h3>
                <p className="text-pink-200">Scan koden ved kassen</p>
              </div>
            </div>

            {/* QR-kode demo */}
            <div className="bg-white rounded-xl p-6 max-w-sm mx-auto animate-fade-in stagger-4">
              <div className="text-black text-center">
                <h4 className="font-bold mb-4">Din handlekode</h4>
                <div className="bg-black p-4 rounded-lg mb-4">
                  <div className="flex justify-center space-x-1">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div
                        key={i}
                        className="bg-white animate-barcode-scan"
                        style={{
                          width: Math.random() > 0.5 ? "3px" : "2px",
                          height: "40px",
                          animationDelay: `${i * 100}ms`,
                        }}
                      />
                    ))}
                  </div>
                  <p className="text-white text-xs font-mono mt-2">SH001123456</p>
                </div>
                <p className="text-gray-600 text-sm">Vis denne koden i butikken</p>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-orange-600 to-pink-600 animate-progress"></div>
        </div>
      ),
    },
    {
      id: "savings",
      duration: 6000,
      title: "Besparelser og Belønninger",
      content: (
        <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-yellow-900 via-orange-800 to-red-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 animate-float">💰</div>
            <div className="absolute top-20 right-20 animate-float-delayed">🏆</div>
            <div className="absolute bottom-20 left-20 animate-float">🎉</div>
            <div className="absolute bottom-10 right-10 animate-float-delayed">⭐</div>
          </div>

          <div className="text-center z-10 space-y-8">
            <Trophy className="w-24 h-24 text-yellow-400 mx-auto animate-bounce-glow" />
            <h1 className="text-5xl font-bold mb-6 animate-slide-in-up">Belønninger</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
              <div className="bg-black/30 rounded-xl p-6 backdrop-blur-sm animate-slide-in-left">
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-400 mb-2 animate-counter" data-target="247">
                    247 kr
                  </div>
                  <p className="text-green-200 text-lg">Spart denne måneden</p>
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Brød (50% rabatt)</span>
                      <span className="text-green-400">20 kr</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Epler (30% rabatt)</span>
                      <span className="text-green-400">15 kr</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Yoghurt (25% rabatt)</span>
                      <span className="text-green-400">12 kr</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-black/30 rounded-xl p-6 backdrop-blur-sm animate-slide-in-right">
                <div className="text-center">
                  <div className="text-4xl font-bold text-yellow-400 mb-2 animate-counter" data-target="46">
                    46
                  </div>
                  <p className="text-yellow-200 text-lg">Varer reddet fra matsvinn</p>
                  <div className="mt-4">
                    <div className="flex justify-center items-center space-x-2 mb-2">
                      <Trophy className="w-6 h-6 text-yellow-400" />
                      <span className="text-lg font-bold">2. plass</span>
                    </div>
                    <p className="text-yellow-200 text-sm">på topplisten denne uken</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="animate-fade-in stagger-2">
              <div className="flex justify-center items-center space-x-4 mb-4">
                <Gift className="w-8 h-8 text-purple-400 animate-bounce" />
                <span className="text-xl">Neste belønning om 4 varer!</span>
                <Gift className="w-8 h-8 text-purple-400 animate-bounce-delayed" />
              </div>
              <div className="w-64 h-4 bg-gray-700 rounded-full mx-auto overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-progress-bar"
                  style={{ width: "80%" }}
                ></div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-600 to-orange-600 animate-progress"></div>
        </div>
      ),
    },
    {
      id: "impact",
      duration: 7000,
      title: "Miljøpåvirkning",
      content: (
        <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-green-900 via-teal-800 to-blue-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 animate-float">🌍</div>
            <div className="absolute top-20 right-20 animate-float-delayed">🌱</div>
            <div className="absolute bottom-20 left-20 animate-float">♻️</div>
            <div className="absolute bottom-10 right-10 animate-float-delayed">🌿</div>
          </div>

          <div className="text-center z-10 space-y-8">
            <Leaf className="w-24 h-24 text-green-400 mx-auto animate-pulse-glow" />
            <h1 className="text-5xl font-bold mb-6 animate-slide-in-down">Miljøgevinst</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
              <div className="bg-black/30 rounded-xl p-6 backdrop-blur-sm animate-scale-in stagger-1">
                <div className="text-4xl font-bold text-green-400 mb-2 animate-counter" data-target="1000">
                  1,000+
                </div>
                <p className="text-green-200 text-lg mb-4">Varer reddet</p>
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto animate-spin-slow">
                  <Leaf className="w-8 h-8 text-white" />
                </div>
              </div>

              <div className="bg-black/30 rounded-xl p-6 backdrop-blur-sm animate-scale-in stagger-2">
                <div className="text-4xl font-bold text-blue-400 mb-2 animate-counter" data-target="2.5">
                  2.5T
                </div>
                <p className="text-blue-200 text-lg mb-4">CO₂ redusert</p>
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto animate-bounce-slow">
                  <span className="text-2xl">🌍</span>
                </div>
              </div>

              <div className="bg-black/30 rounded-xl p-6 backdrop-blur-sm animate-scale-in stagger-3">
                <div className="text-4xl font-bold text-yellow-400 mb-2 animate-counter" data-target="40">
                  40%
                </div>
                <p className="text-yellow-200 text-lg mb-4">Mindre matsvinn</p>
                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto animate-pulse">
                  <TrendingDown className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>

            <div className="animate-fade-in stagger-4">
              <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-6 max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold mb-4">Sammen skaper vi forskjell</h3>
                <p className="text-lg text-green-100">
                  Hver gang du redder en vare fra å bli kastet, bidrar du til en mer bærekraftig fremtid for alle.
                </p>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-green-600 to-blue-600 animate-progress"></div>
        </div>
      ),
    },
    {
      id: "future",
      duration: 6000,
      title: "Fremtiden med Smarthylle",
      content: (
        <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 animate-float">🚀</div>
            <div className="absolute top-20 right-20 animate-float-delayed">✨</div>
            <div className="absolute bottom-20 left-20 animate-float">🌟</div>
            <div className="absolute bottom-10 right-10 animate-float-delayed">💫</div>
          </div>

          <div className="text-center z-10 space-y-8">
            <div className="animate-bounce-in">
              <Zap className="w-24 h-24 text-purple-400 mx-auto animate-pulse-glow" />
            </div>

            <h1 className="text-6xl font-bold mb-6 animate-slide-in-up">
              Fremtiden er{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Smart</span>
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
              <div className="bg-black/30 rounded-xl p-6 backdrop-blur-sm animate-slide-in-left">
                <Brain className="w-12 h-12 text-blue-400 mx-auto mb-4 animate-pulse" />
                <h3 className="text-xl font-bold mb-2">Smartere AI</h3>
                <p className="text-blue-200">Enda bedre prediksjoner og personalisering</p>
              </div>

              <div className="bg-black/30 rounded-xl p-6 backdrop-blur-sm animate-slide-in-right">
                <Users className="w-12 h-12 text-green-400 mx-auto mb-4 animate-bounce-slow" />
                <h3 className="text-xl font-bold mb-2">Flere Partnere</h3>
                <p className="text-green-200">Utvidelse til flere butikker og regioner</p>
              </div>
            </div>

            <div className="animate-fade-in stagger-2">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-8 max-w-3xl mx-auto">
                <h3 className="text-3xl font-bold mb-4">Bli med på reisen!</h3>
                <p className="text-xl text-purple-100 mb-6">Sammen kan vi skape en verden uten matsvinn</p>
                <div className="flex justify-center space-x-6">
                  <div className="text-center">
                    <Smartphone className="w-8 h-8 mx-auto mb-2 animate-bounce" />
                    <p className="text-sm">Last ned appen</p>
                  </div>
                  <div className="text-center">
                    <Heart className="w-8 h-8 mx-auto mb-2 animate-bounce-delayed" />
                    <p className="text-sm">Redd mat</p>
                  </div>
                  <div className="text-center">
                    <Leaf className="w-8 h-8 mx-auto mb-2 animate-bounce" />
                    <p className="text-sm">Hjelp miljøet</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-purple-600 to-pink-600 animate-progress"></div>
        </div>
      ),
    },
  ]

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isPlaying && isOpen) {
      const currentSceneDuration = scenes[currentScene].duration / speed

      interval = setInterval(() => {
        setCurrentScene((prev) => {
          const nextScene = prev + 1
          return nextScene >= scenes.length ? 0 : nextScene
        })
      }, currentSceneDuration)
    }

    return () => clearInterval(interval)
  }, [isPlaying, currentScene, speed, isOpen, scenes.length])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const restart = () => {
    setCurrentScene(0)
    setIsPlaying(true)
  }

  const nextScene = () => {
    setCurrentScene((prev) => (prev + 1) % scenes.length)
  }

  const prevScene = () => {
    setCurrentScene((prev) => (prev - 1 + scenes.length) % scenes.length)
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const changeSpeed = (newSpeed: number) => {
    setSpeed(newSpeed)
  }

  const goToScene = (index: number) => {
    setCurrentScene(index)
  }

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case " ":
          e.preventDefault()
          togglePlay()
          break
        case "ArrowRight":
          nextScene()
          break
        case "ArrowLeft":
          prevScene()
          break
        case "r":
          restart()
          break
        case "f":
          toggleFullscreen()
          break
        case "m":
          toggleMute()
          break
        case "Escape":
          onClose()
          break
      }
    }

    document.addEventListener("keydown", handleKeyPress)
    return () => document.removeEventListener("keydown", handleKeyPress)
  }, [isOpen])

  useEffect(() => {
    let timeout: NodeJS.Timeout
    if (isOpen) {
      timeout = setTimeout(() => setShowControls(false), 3000)
    }
    return () => clearTimeout(timeout)
  }, [isOpen, currentScene])

  if (!isOpen) return null

  const currentSceneData = scenes[currentScene]

  return (
    <div
      className={`fixed inset-0 bg-black z-50 ${isFullscreen ? "cursor-none" : ""}`}
      onMouseMove={() => {
        setShowControls(true)
        setTimeout(() => setShowControls(false), 3000)
      }}
    >
      {/* Scene Content */}
      <div className="w-full h-full relative overflow-hidden">{currentSceneData.content}</div>

      {/* Controls Overlay */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-0"} ${isFullscreen ? "pointer-events-none" : ""}`}
      >
        {/* Top Bar */}
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h2 className="text-white text-xl font-bold">{currentSceneData.title}</h2>
              <div className="text-white/70 text-sm">
                Scene {currentScene + 1} av {scenes.length}
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/20 pointer-events-auto"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          {/* Progress Bar */}
          <div className="mb-4">
            <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
                style={{ width: `${((currentScene + 1) / scenes.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={prevScene}
                className="text-white hover:bg-white/20 pointer-events-auto"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={togglePlay}
                className="text-white hover:bg-white/20 pointer-events-auto"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={nextScene}
                className="text-white hover:bg-white/20 pointer-events-auto"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={restart}
                className="text-white hover:bg-white/20 pointer-events-auto"
              >
                <RotateCcw className="w-5 h-5" />
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              {/* Speed Control */}
              <div className="flex items-center space-x-1">
                {[0.5, 1, 1.5, 2].map((speedOption) => (
                  <Button
                    key={speedOption}
                    variant="ghost"
                    size="sm"
                    onClick={() => changeSpeed(speedOption)}
                    className={`text-white hover:bg-white/20 pointer-events-auto text-xs ${
                      speed === speedOption ? "bg-white/20" : ""
                    }`}
                  >
                    {speedOption}x
                  </Button>
                ))}
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMute}
                className="text-white hover:bg-white/20 pointer-events-auto"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={toggleFullscreen}
                className="text-white hover:bg-white/20 pointer-events-auto"
              >
                {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Scene Navigation */}
          <div className="flex justify-center mt-4 space-x-2">
            {scenes.map((_, index) => (
              <button
                key={index}
                onClick={() => goToScene(index)}
                className={`w-3 h-3 rounded-full transition-all pointer-events-auto ${
                  index === currentScene ? "bg-white scale-125" : "bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Keyboard Shortcuts Help */}
      <div className="absolute top-4 right-4 text-white/70 text-xs space-y-1 pointer-events-none">
        <div>Space: Play/Pause</div>
        <div>←/→: Forrige/Neste</div>
        <div>R: Start på nytt</div>
        <div>F: Fullskjerm</div>
        <div>Esc: Lukk</div>
      </div>
    </div>
  )
}
