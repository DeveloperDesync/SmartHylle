"use client"

import { useState, useEffect } from "react"
import StoreSimulation from "@/components/StoreSimulation"
import PresentationModal from "@/components/PresentationModal"
import DemoModal from "@/components/DemoModal"
import QuizModal from "@/components/QuizModal"
import BackgroundVideo from "@/components/BackgroundVideo"
// Legg til import for den nye komponenten øverst i filen
import ScrollStoryAnimation from "@/components/ScrollStoryAnimation"

export default function Home() {
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [mounted, setMounted] = useState(false)
  const [showPresentation, setShowPresentation] = useState(false)
  const [showDemo, setShowDemo] = useState(false)
  const [showQuiz, setShowQuiz] = useState(false)
  const [showBackgroundVideo, setShowBackgroundVideo] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.classList.toggle("dark", savedTheme === "dark")
    } else if (prefersDark) {
      setTheme("dark")
      document.documentElement.classList.add("dark")
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
    localStorage.setItem("theme", newTheme)
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3 animate-slide-in-left">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center animate-float">
                <div className="flex">
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
                    className="w-5 h-5 text-white mr-0.5"
                  >
                    <circle cx="8" cy="21" r="1" />
                    <circle cx="19" cy="21" r="1" />
                    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                  </svg>
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
                    className="w-5 h-5 text-white"
                  >
                    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
                  </svg>
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Smart<span className="text-blue-600">hylle</span>
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Reduser matsvinn med AI</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 animate-slide-in-right">
              <nav className="hidden md:flex space-x-6">
                <button
                  onClick={() => setShowPresentation(true)}
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors hover-scale"
                >
                  Presentasjon
                </button>
                <button
                  onClick={() => setShowDemo(true)}
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors hover-scale"
                >
                  Demo
                </button>
                <button
                  onClick={() => setShowQuiz(true)}
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors hover-scale"
                >
                  Quiz
                </button>
                <button
                  onClick={() => setShowBackgroundVideo(true)}
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors hover-scale"
                >
                  Bakgrunnsvideo
                </button>
              </nav>
              <button
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover-scale transition-all duration-200"
                onClick={toggleTheme}
              >
                {theme === "dark" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="5" />
                    <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 mb-6 animate-bounce-in">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
              <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
            </svg>
            Bærekraftig teknologi
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in stagger-1">
            Slutt på{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">matsvinn</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto animate-fade-in stagger-2">
            Smarthylle bruker kunstig intelligens for å redusere matsvinn ved å tilby smarte rabatter på varer som
            nærmer seg utløpsdato.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in stagger-3">
            <a
              href="/application"
              className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 hover-lift"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <rect width="7" height="18" x="3" y="3" rx="1" />
                <rect width="7" height="5" x="14" y="3" rx="1" />
                <rect width="7" height="5" x="14" y="12" rx="1" />
              </svg>
              Prøv appen
            </a>
            <button
              onClick={() => setShowPresentation(true)}
              className="inline-flex items-center px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-medium rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 hover-lift"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              Se presentasjon
            </button>
            <button
              onClick={() => setShowBackgroundVideo(true)}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 hover-lift"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              Bakgrunnsvideo
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 animate-fade-in">Våre mål</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 animate-fade-in stagger-1">
              Dette er hva vi jobber mot å oppnå med Smarthylle
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "40%", label: "Reduksjon i matsvinn", color: "text-blue-600" },
              { value: "1000+", label: "Varer reddet", color: "text-green-600" },
              { value: "500+", label: "Aktive brukere", color: "text-purple-600" },
              { value: "2.5T", label: "CO₂ spart", color: "text-orange-600" },
            ].map((stat, index) => (
              <div key={stat.label} className="animate-fade-in" style={{ animationDelay: `${index * 200}ms` }}>
                <div className={`text-4xl font-bold ${stat.color} mb-2 animate-scale-in`}>{stat.value}</div>
                <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UN SDG Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 via-green-600 to-blue-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium bg-white/20 text-white mb-6 animate-bounce-in">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              FNs bærekraftsmål
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in">
              Vi kjemper for en bærekraftig fremtid
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto animate-fade-in stagger-1">
              Smarthylle bidrar direkte til FNs bærekraftsmål og arbeider for en bedre verden gjennom teknologi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* SDG 12 */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center hover-lift animate-fade-in">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-orange-500 flex items-center justify-center animate-scale-in">
                <div className="text-white font-bold text-lg">12</div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Ansvarlig forbruk og produksjon</h3>
              <p className="text-blue-100 mb-6">
                Vi reduserer matsvinn ved å koble forbrukere med varer som nærmer seg utløpsdato, og fremmer ansvarlig
                forbruk.
              </p>
              <div className="space-y-2 text-sm text-blue-200">
                <div className="flex items-center justify-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Reduserer matsvinn med opptil 40%
                </div>
                <div className="flex items-center justify-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Fremmer sirkulær økonomi
                </div>
              </div>
            </div>

            {/* SDG 13 */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center hover-lift animate-fade-in stagger-1">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-green-600 flex items-center justify-center animate-scale-in">
                <div className="text-white font-bold text-lg">13</div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Stoppe klimaendringene</h3>
              <p className="text-blue-100 mb-6">
                Ved å redusere matsvinn bidrar vi til å senke CO₂-utslipp og bekjempe klimaendringene aktivt.
              </p>
              <div className="space-y-2 text-sm text-blue-200">
                <div className="flex items-center justify-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  2. 5 tonn CO₂ spart årlig
                </div>
                <div className="flex items-center justify-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Reduserer miljøpåvirkning
                </div>
              </div>
            </div>

            {/* SDG 17 */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center hover-lift animate-fade-in stagger-2">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-blue-800 flex items-center justify-center animate-scale-in">
                <div className="text-white font-bold text-lg">17</div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Samarbeid for å nå målene</h3>
              <p className="text-blue-100 mb-6">
                Vi bygger partnerskap mellom butikker, forbrukere og teknologi for å skape bærekraftige løsninger
                sammen.
              </p>
              <div className="space-y-2 text-sm text-blue-200">
                <div className="flex items-center justify-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Kobler butikker og forbrukere
                </div>
                <div className="flex items-center justify-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Teknologi for bærekraft
                </div>
              </div>
            </div>
          </div>

          {/* UN Logo and Link */}
          <div className="text-center mt-12 animate-fade-in stagger-3">
            <div className="inline-flex items-center space-x-4 bg-white/10 backdrop-blur-md rounded-full px-6 py-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-8 h-8 text-blue-600" fill="currentColor">
                  <circle cx="12" cy="12" r="10" />
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
                    fill="white"
                  />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-white font-semibold">FNs bærekraftsmål</p>
                <p className="text-blue-200 text-sm">Sammen for en bærekraftig fremtid</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 animate-fade-in">
              Hvordan Smarthylle fungerer
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto animate-fade-in stagger-1">
              Vår AI-drevne plattform kobler butikker med forbrukere for å redusere matsvinn
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: (
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
                    className="w-8 h-8"
                  >
                    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                  </svg>
                ),
                title: "AI Analyserer",
                description: "Vår AI scanner utløpsdatoer og foreslår optimale rabatter basert på historiske data",
              },
              {
                icon: (
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
                    className="w-8 h-8"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="m22 21-3-3" />
                    <path d="m15 18 3 3" />
                  </svg>
                ),
                title: "Brukere Får Tilbud",
                description: "Personaliserte varsler sendes til interesserte kunder basert på deres preferanser",
              },
              {
                icon: (
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
                    className="w-8 h-8"
                  >
                    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
                  </svg>
                ),
                title: "Mat Reddes",
                description: "Varer selges i stedet for å bli kastet, og brukere sparer penger mens de hjelper miljøet",
              },
            ].map((feature, index) => (
              <div
                key={feature.title}
                className="text-center p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg hover-lift animate-fade-in"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 dark:text-blue-400 animate-scale-in">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scroll Story Animation Section */}
      <ScrollStoryAnimation />

      {/* Store Simulation Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 mb-4 animate-bounce-in">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              Interaktiv demo
            </div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 animate-fade-in stagger-1">
              Opplev Smarthylle i butikken
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto animate-fade-in stagger-2">
              Prøv vår interaktive butikksimulering og se hvordan Smarthylle hjelper deg å redde mat fra å bli kastet
            </p>
          </div>

          <div className="animate-fade-in stagger-3">
            <StoreSimulation />
          </div>
        </div>
      </section>

      {/* Interactive Tools Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 animate-fade-in">
              Interaktive verktøy
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto animate-fade-in stagger-1">
              Utforsk våre smarte verktøy for å lære mer om matsvinn og miljøpåvirkning
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Waste Calculator Button */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl p-8 text-center hover-lift animate-fade-in border border-red-100 dark:border-red-800">
              <div className="w-20 h-20 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-red-600 dark:text-red-400"
                >
                  <path d="M3 6h18l-1.5 9a2 2 0 0 1-2 1.5H6.5a2 2 0 0 1-2-1.5L3 6Z" />
                  <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Matsvinn Kalkulator</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Beregn hvor mye mat du kaster og se den virkelige miljøpåvirkningen. Få visualisert CO₂-utslipp,
                energiforbruk og mer.
              </p>
              <a
                href="/kalkulator"
                className="inline-flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-all duration-200 hover-lift"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <rect x="9" y="9" width="6" height="6" />
                  <path d="M9 1v6M15 1v6M9 15v6M15 15v6M1 9h6M1 15h6M17 9h6M17 15h6" />
                </svg>
                Beregn påvirkning
              </a>
            </div>

            {/* AI Chatbot Button */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl p-8 text-center hover-lift animate-fade-in stagger-1 border border-purple-100 dark:border-purple-800">
              <div className="w-20 h-20 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-purple-600 dark:text-purple-400"
                >
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">AI Matsvinn-ekspert</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Chat med vår AI-ekspert om matsvinn, miljøpåvirkning og bærekraftige løsninger. Få svar på alle dine
                spørsmål.
              </p>
              <a
                href="/chatbot"
                className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-all duration-200 hover-lift"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                Chat med AI
              </a>
            </div>

            {/* Gaming Section - legg til etter AI Chatbot Button */}
            <div className="bg-gradient-to-br from-green-50 to-yellow-50 dark:from-green-900/20 dark:to-yellow-900/20 rounded-2xl p-8 text-center hover-lift animate-fade-in stagger-2 border border-green-100 dark:border-green-800">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-green-600 dark:text-green-400"
                >
                  <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
                  <path d="M12 18h.01" />
                  <path d="M8 6h8" />
                  <path d="M8 10h8" />
                  <path d="M8 14h8" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Matsvinn Spill</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Spill deg til kunnskap om matsvinn! 3 hektende spill som lærer deg å redde mat på en morsom måte.
              </p>
              <a
                href="/spill"
                className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all duration-200 hover-lift"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="M6 3h12l4 6-10 13L2 9l4-6Z" />
                </svg>
                Spill nå!
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 animate-fade-in">Møt teamet</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto animate-fade-in stagger-1">
              Lidenskapelige utviklere som jobber for en bærekraftig fremtid
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="text-center bg-gray-50 dark:bg-gray-700 rounded-xl p-8 hover-lift animate-fade-in">
              <div className="w-32 h-32 rounded-full mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center animate-scale-in">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">William Dybvik</h3>
              <p className="text-blue-600 dark:text-blue-400 font-medium mb-4">Utvikler av app og nettside</p>
              <a
                href="mailto:William@smarthylle.xyz"
                className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-10 5L2 7" />
                </svg>
                William@smarthylle.xyz
              </a>
            </div>

            <div className="text-center bg-gray-50 dark:bg-gray-700 rounded-xl p-8 hover-lift animate-fade-in stagger-1">
              <div className="w-32 h-32 rounded-full mx-auto mb-6 bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center animate-scale-in">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="m22 21-3-3" />
                  <path d="m15 18 3 3" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Samarbeidspartnere</h3>
              <p className="text-blue-600 dark:text-blue-400 font-medium mb-4">Utviklingsteam</p>
              <div className="text-gray-600 dark:text-gray-300 space-y-1">
                <p>William Dybvik</p>
                <p>Matas Brusgiz</p>
                <p>Erlend Skjegstad</p>
                <p>Henrik Olsen</p>
                <p>Åsmund Hovden</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 animate-fade-in">Kontakt oss</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 animate-fade-in stagger-1">
            Har du spørsmål eller vil du samarbeide med oss?
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover-lift animate-fade-in stagger-2">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
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
                  className="text-blue-600 dark:text-blue-400"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-10 5L2 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Generell kontakt</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">For generelle henvendelser, samarbeid og support</p>
              <a
                href="mailto:Kontakt@smarthylle.xyz"
                className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors font-medium"
              >
                Kontakt@smarthylle.xyz
              </a>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover-lift animate-fade-in stagger-3">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
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
                  className="text-green-600 dark:text-green-400"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Kontakt William direkte</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                For tekniske spørsmål og utviklingsrelaterte henvendelser
              </p>
              <a
                href="mailto:William@smarthylle.xyz"
                className="inline-flex items-center text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors font-medium"
              >
                William@smarthylle.xyz
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4 animate-fade-in">Klar til å redusere matsvinn?</h2>
          <p className="text-xl text-blue-100 mb-8 animate-fade-in stagger-1">
            Bli med i kampen mot matsvinn og gjør en forskjell for miljøet
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in stagger-2">
            <a
              href="/application"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition-all duration-200 hover-lift"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <rect width="7" height="18" x="3" y="3" rx="1" />
                <rect width="7" height="5" x="14" y="3" rx="1" />
                <rect width="7" height="5" x="14" y="12" rx="1" />
              </svg>
              Prøv appen gratis
            </a>
            <button
              onClick={() => setShowDemo(true)}
              className="inline-flex items-center px-8 py-4 bg-transparent text-white font-medium rounded-lg border-2 border-white hover:bg-white hover:text-blue-600 transition-all duration-200 hover-lift"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              Se demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="animate-fade-in">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <circle cx="8" cy="21" r="1" />
                    <circle cx="19" cy="21" r="1" />
                    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                  </svg>
                </div>
                <span className="text-xl font-bold">Smarthylle</span>
              </div>
              <p className="text-gray-400 text-sm">
                AI-drevet plattform for å redusere matsvinn og skape en mer bærekraftig fremtid.
              </p>
            </div>

            <div className="animate-fade-in stagger-1">
              <h3 className="font-semibold mb-4">Produkt</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="/application" className="hover:text-white transition-colors">
                    Appen
                  </a>
                </li>
                <li>
                  <button onClick={() => setShowPresentation(true)} className="hover:text-white transition-colors">
                    Presentasjon
                  </button>
                </li>
                <li>
                  <button onClick={() => setShowDemo(true)} className="hover:text-white transition-colors">
                    Demo
                  </button>
                </li>
                <li>
                  <button onClick={() => setShowQuiz(true)} className="hover:text-white transition-colors">
                    Quiz
                  </button>
                </li>
                <li>
                  <button onClick={() => setShowBackgroundVideo(true)} className="hover:text-white transition-colors">
                    Bakgrunnsvideo
                  </button>
                </li>
              </ul>
            </div>

            <div className="animate-fade-in stagger-2">
              <h3 className="font-semibold mb-4">Selskap</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Om oss
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Team
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Karriere
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Kontakt
                  </a>
                </li>
              </ul>
            </div>

            <div className="animate-fade-in stagger-3">
              <h3 className="font-semibold mb-4">Ressurser</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Dokumentasjon
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Hjelp
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Personvern
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Vilkår
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p className="mb-2 animate-fade-in">&copy; 2025 Smarthylle. Alle rettigheter reservert.</p>
            <p className="text-sm animate-fade-in stagger-1">Nettside og App utviklet av William Dybvik</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <PresentationModal isOpen={showPresentation} onClose={() => setShowPresentation(false)} />
      <DemoModal isOpen={showDemo} onClose={() => setShowDemo(false)} />
      <QuizModal isOpen={showQuiz} onClose={() => setShowQuiz(false)} />
      <BackgroundVideo isOpen={showBackgroundVideo} onClose={() => setShowBackgroundVideo(false)} />
    </div>
  )
}
