"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"

interface FallingItem {
  id: number
  x: number
  y: number
  type: string
  emoji: string
  points: number
  speed: number
}

export default function FangMatenSpill() {
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [gameActive, setGameActive] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [basketX, setBasketX] = useState(50)
  const [fallingItems, setFallingItems] = useState<FallingItem[]>([])
  const [level, setLevel] = useState(1)
  const [combo, setCombo] = useState(0)
  const [showCombo, setShowCombo] = useState(false)

  const foodItems = [
    { type: "banana", emoji: "🍌", points: 10 },
    { type: "apple", emoji: "🍎", points: 15 },
    { type: "bread", emoji: "🍞", points: 20 },
    { type: "carrot", emoji: "🥕", points: 12 },
    { type: "tomato", emoji: "🍅", points: 18 },
    { type: "cheese", emoji: "🧀", points: 25 },
  ]

  const trashItems = [
    { type: "trash", emoji: "🗑️", points: -50 },
    { type: "bomb", emoji: "💣", points: -100 },
  ]

  const startGame = () => {
    setScore(0)
    setLives(3)
    setLevel(1)
    setCombo(0)
    setFallingItems([])
    setGameActive(true)
    setGameOver(false)
    setBasketX(50)
  }

  const endGame = () => {
    setGameActive(false)
    setGameOver(true)
  }

  const spawnItem = useCallback(() => {
    if (!gameActive) return

    const isTrash = Math.random() < 0.2 // 20% chance for trash
    const items = isTrash ? trashItems : foodItems
    const item = items[Math.floor(Math.random() * items.length)]

    const newItem: FallingItem = {
      id: Date.now() + Math.random(),
      x: Math.random() * 80 + 10, // 10% to 90% of screen width
      y: -10,
      type: item.type,
      emoji: item.emoji,
      points: item.points,
      speed: 1 + level * 0.3 + Math.random() * 0.5,
    }

    setFallingItems((prev) => [...prev, newItem])
  }, [gameActive, level])

  const updateGame = useCallback(() => {
    if (!gameActive) return

    setFallingItems((prev) => {
      const updated = prev.map((item) => ({
        ...item,
        y: item.y + item.speed,
      }))

      // Remove items that fell off screen and reduce lives
      const onScreen = updated.filter((item) => {
        if (item.y > 100) {
          if (item.points > 0) {
            // Only lose life for good items
            setLives((l) => l - 1)
            setCombo(0) // Reset combo on miss
          }
          return false
        }
        return true
      })

      return onScreen
    })
  }, [gameActive])

  const catchItem = (itemId: number) => {
    setFallingItems((prev) => {
      const item = prev.find((i) => i.id === itemId)
      if (!item) return prev

      if (item.points > 0) {
        setCombo((c) => c + 1)
        setShowCombo(true)
        setTimeout(() => setShowCombo(false), 1000)

        const comboMultiplier = Math.floor(combo / 3) + 1
        setScore((s) => s + item.points * comboMultiplier)
      } else {
        setScore((s) => Math.max(0, s + item.points))
        setCombo(0)
        if (item.type === "bomb") {
          setLives((l) => l - 1)
        }
      }

      return prev.filter((i) => i.id !== itemId)
    })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    setBasketX(Math.max(5, Math.min(95, x)))
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const touch = e.touches[0]
    const x = ((touch.clientX - rect.left) / rect.width) * 100
    setBasketX(Math.max(5, Math.min(95, x)))
  }

  // Game loop
  useEffect(() => {
    if (!gameActive) return

    const gameLoop = setInterval(() => {
      updateGame()
      if (Math.random() < 0.3 + level * 0.1) {
        spawnItem()
      }
    }, 100)

    return () => clearInterval(gameLoop)
  }, [gameActive, updateGame, spawnItem, level])

  // Level progression
  useEffect(() => {
    const newLevel = Math.floor(score / 500) + 1
    if (newLevel > level) {
      setLevel(newLevel)
    }
  }, [score, level])

  // Game over check
  useEffect(() => {
    if (lives <= 0) {
      endGame()
    }
  }, [lives])

  // Check for catches
  useEffect(() => {
    fallingItems.forEach((item) => {
      if (item.y > 85 && item.y < 95 && item.x > basketX - 8 && item.x < basketX + 8) {
        catchItem(item.id)
      }
    })
  }, [fallingItems, basketX])

  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Game Header */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
            <span className="text-4xl mr-3">🍌</span>
            Fang Maten!
          </h1>
          <div className="flex space-x-6 text-lg font-semibold">
            <div className="text-green-600">Score: {score}</div>
            <div className="text-blue-600">Level: {level}</div>
            <div className="text-red-600 flex items-center">
              <span className="mr-1">❤️</span>
              {lives}
            </div>
          </div>
        </div>

        {combo > 2 && showCombo && (
          <div className="text-center">
            <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full font-bold animate-bounce">
              🔥 COMBO x{Math.floor(combo / 3) + 1}! 🔥
            </div>
          </div>
        )}
      </div>

      {/* Game Area */}
      <div className="relative">
        <div
          className="bg-gradient-to-b from-sky-200 to-green-200 dark:from-sky-800 dark:to-green-800 rounded-2xl overflow-hidden shadow-2xl"
          style={{ height: "600px", width: "100%" }}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
        >
          {/* Falling Items */}
          {fallingItems.map((item) => (
            <div
              key={item.id}
              className="absolute text-4xl animate-pulse cursor-pointer hover:scale-110 transition-transform"
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
                transform: "translate(-50%, -50%)",
              }}
              onClick={() => catchItem(item.id)}
            >
              {item.emoji}
            </div>
          ))}

          {/* Basket */}
          <div
            className="absolute bottom-4 text-6xl cursor-pointer transition-all duration-100 hover:scale-110"
            style={{
              left: `${basketX}%`,
              transform: "translateX(-50%)",
            }}
          >
            🧺
          </div>

          {/* Game Over Overlay */}
          {gameOver && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center max-w-md mx-4">
                <div className="text-6xl mb-4">😢</div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Spill Over!</h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
                  Final Score: <span className="font-bold text-green-600">{score}</span>
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  Level: {level} | Mat reddet: {Math.floor(score / 15)}
                </p>
                <button
                  onClick={startGame}
                  className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  Spill Igjen! 🎮
                </button>
              </div>
            </div>
          )}

          {/* Start Screen */}
          {!gameActive && !gameOver && (
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/90 to-blue-500/90 flex items-center justify-center">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center max-w-md mx-4">
                <div className="text-6xl mb-4">🍎</div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Fang Maten!</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Fang mat som faller før den lander i søpla! Unngå søppel og bomber. Bygg combo for ekstra poeng!
                </p>
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                  <p>🍌 = 10 poeng | 🍎 = 15 poeng | 🍞 = 20 poeng</p>
                  <p>🗑️ = -50 poeng | 💣 = -100 poeng + liv</p>
                </div>
                <button
                  onClick={startGame}
                  className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  Start Spill! 🚀
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-6 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Hvordan spille:</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-300">
          <div className="flex items-center">
            <span className="text-2xl mr-3">🖱️</span>
            <span>Beveg musen for å styre kurven</span>
          </div>
          <div className="flex items-center">
            <span className="text-2xl mr-3">📱</span>
            <span>På mobil: Dra fingeren</span>
          </div>
          <div className="flex items-center">
            <span className="text-2xl mr-3">🎯</span>
            <span>Klikk på mat for å fange den</span>
          </div>
        </div>
      </div>
    </div>
  )
}
