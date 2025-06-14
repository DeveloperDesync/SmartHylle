"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import FangMatenSpill from "@/components/games/FangMatenSpill"
import MatsvinMatcher from "@/components/games/MatsvinMatcher"
import RedningsRush from "@/components/games/RedningsRush"

export default function SpillPage() {
  const [activeGame, setActiveGame] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const games = [
    {
      id: "fang-maten",
      title: "Fang Maten! 🍌",
      description: "Fang mat som faller før den lander i søpla! Rask refleks og god timing er nøkkelen.",
      difficulty: "Lett",
      color: "from-yellow-400 to-orange-500",
      bgColor: "from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20",
      icon: "🍎",
      stats: "⭐ 4.8 | 🎮 12.4k spilt",
    },
    {
      id: "matsvinn-matcher",
      title: "Matsvinn Matcher 🧩",
      description: "Match 3 eller flere like matvarer for å redde dem! Strategisk puzzle-spill med power-ups.",
      difficulty: "Medium",
      color: "from-purple-400 to-pink-500",
      bgColor: "from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20",
      icon: "🥕",
      stats: "⭐ 4.9 | 🎮 8.7k spilt",
    },
    {
      id: "rednings-rush",
      title: "Rednings Rush ⚡",
      description: "Redd mat før den går ut på dato! Tidspress og strategisk planlegging i dette intense spillet.",
      difficulty: "Vanskelig",
      color: "from-green-400 to-blue-500",
      bgColor: "from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20",
      icon: "⏰",
      stats: "⭐ 4.7 | 🎮 15.2k spilt",
    },
  ]

  if (activeGame) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Game Header */}
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <button
                onClick={() => setActiveGame(null)}
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
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
                >
                  <path d="m12 19-7-7 7-7" />
                  <path d="M19 12H5" />
                </svg>
                <span>Tilbake til spill</span>
              </button>
              <Link
                href="/"
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
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
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9,22 9,12 15,12 15,22" />
                </svg>
                <span>Hjem</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Game Content */}
        <div className="py-8">
          {activeGame === "fang-maten" && <FangMatenSpill />}
          {activeGame === "matsvinn-matcher" && <MatsvinMatcher />}
          {activeGame === "rednings-rush" && <RedningsRush />}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
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
                  <circle cx="8" cy="21" r="1" />
                  <circle cx="19" cy="21" r="1" />
                  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Smart<span className="text-blue-600">hylle</span> <span className="text-green-600">Spill</span>
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Lær gjennom lek</p>
              </div>
            </Link>
            <Link
              href="/"
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9,22 9,12 15,12 15,22" />
              </svg>
              <span>Tilbake til hjem</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 mb-6 animate-bounce-in">
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
              <path d="M6 3h12l4 6-10 13L2 9l4-6Z" />
            </svg>
            Lær gjennom spill
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in">
            Matsvinn{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">Spill</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto animate-fade-in stagger-1">
            Spill deg til kunnskap om matsvinn! Tre hektende spill som lærer deg å redde mat på en morsom måte.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 dark:text-gray-400 animate-fade-in stagger-2">
            <div className="flex items-center">
              <span className="text-2xl mr-2">🏆</span>
              <span>36.3k spillere</span>
            </div>
            <div className="flex items-center">
              <span className="text-2xl mr-2">⭐</span>
              <span>4.8/5 rating</span>
            </div>
            <div className="flex items-center">
              <span className="text-2xl mr-2">🌱</span>
              <span>127 tonn mat reddet</span>
            </div>
          </div>
        </div>
      </section>

      {/* Games Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 animate-fade-in">Velg ditt spill</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 animate-fade-in stagger-1">
              Tre unike spill, hver med sin egen utfordring og læringsopplevelse
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {games.map((game, index) => (
              <div
                key={game.id}
                className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${game.bgColor} border border-gray-200 dark:border-gray-700 hover-lift animate-fade-in group cursor-pointer`}
                style={{ animationDelay: `${index * 200}ms` }}
                onClick={() => setActiveGame(game.id)}
              >
                {/* Difficulty Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      game.difficulty === "Lett"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : game.difficulty === "Medium"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                    }`}
                  >
                    {game.difficulty}
                  </span>
                </div>

                {/* Game Icon */}
                <div className="text-center pt-12 pb-6">
                  <div className="text-8xl mb-4 animate-bounce-slow group-hover:scale-110 transition-transform duration-300">
                    {game.icon}
                  </div>
                  <div className={`w-24 h-1 mx-auto rounded-full bg-gradient-to-r ${game.color} opacity-60`}></div>
                </div>

                {/* Game Info */}
                <div className="px-8 pb-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-green-600 transition-all duration-300">
                    {game.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">{game.description}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mb-6">
                    <span>{game.stats}</span>
                  </div>
                  <button
                    className={`w-full py-3 px-6 rounded-xl bg-gradient-to-r ${game.color} text-white font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2`}
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
                    >
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                    <span>Spill nå!</span>
                  </button>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 animate-fade-in">Spillstatistikk</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 animate-fade-in stagger-1">
              Se hva spillerne våre har oppnådd sammen
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "36.3k", label: "Aktive spillere", color: "text-blue-600", icon: "👥" },
              { value: "127T", label: "Mat reddet (virtuelt)", color: "text-green-600", icon: "🌱" },
              { value: "2.1M", label: "Spill fullført", color: "text-purple-600", icon: "🎮" },
              { value: "89%", label: "Lærte noe nytt", color: "text-orange-600", icon: "🧠" },
            ].map((stat, index) => (
              <div key={stat.label} className="animate-fade-in" style={{ animationDelay: `${index * 200}ms` }}>
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className={`text-4xl font-bold ${stat.color} mb-2 animate-scale-in`}>{stat.value}</div>
                <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4 animate-fade-in">Klar for å redde mat gjennom spill?</h2>
          <p className="text-xl text-green-100 mb-8 animate-fade-in stagger-1">
            Velg ditt favorittspill og start læringen i dag!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in stagger-2">
            <Link
              href="/application"
              className="inline-flex items-center px-8 py-4 bg-white text-green-600 font-medium rounded-lg hover:bg-gray-100 transition-all duration-200 hover-lift"
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
              Prøv appen også
            </Link>
            <Link
              href="/"
              className="inline-flex items-center px-8 py-4 bg-transparent text-white font-medium rounded-lg border-2 border-white hover:bg-white hover:text-green-600 transition-all duration-200 hover-lift"
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
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9,22 9,12 15,12 15,22" />
              </svg>
              Tilbake til hjem
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
