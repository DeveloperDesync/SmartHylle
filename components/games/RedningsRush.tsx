"use client"

import { useState, useEffect, useCallback } from "react"

interface FoodItem {
  id: number
  type: string
  emoji: string
  daysLeft: number
  maxDays: number
  points: number
  x: number
  y: number
  saved: boolean
}

interface Customer {
  id: number
  emoji: string
  wants: string[]
  patience: number
  maxPatience: number
  x: number
}

export default function RedningsRush() {
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [timeLeft, setTimeLeft] = useState(60)
  const [gameActive, setGameActive] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [foodItems, setFoodItems] = useState<FoodItem[]>([])
  const [customers, setCustomers] = useState<Customer[]>([])
  const [selectedFood, setSelectedFood] = useState<number | null>(null)
  const [combo, setCombo] = useState(0)
  const [showCombo, setShowCombo] = useState(false)

  const foodTypes = [
    { type: "banana", emoji: "🍌", maxDays: 5, points: 10 },
    { type: "apple", emoji: "🍎", maxDays: 7, points: 15 },
    { type: "bread", emoji: "🍞", maxDays: 3, points: 20 },
    { type: "milk", emoji: "🥛", maxDays: 4, points: 25 },
    { type: "cheese", emoji: "🧀", maxDays: 10, points: 30 },
    { type: "tomato", emoji: "🍅", maxDays: 6, points: 18 },
    { type: "carrot", emoji: "🥕", maxDays: 14, points: 12 },
    { type: "fish", emoji: "🐟", maxDays: 2, points: 35 },
  ]

  const customerEmojis = ["👨", "👩", "👴", "👵", "🧑", "👦", "👧"]

  const generateFood = () => {
    const foods: FoodItem[] = []
    for (let i = 0; i < 12; i++) {
      const foodType = foodTypes[Math.floor(Math.random() * foodTypes.length)]
      const daysLeft = Math.floor(Math.random() * foodType.maxDays) + 1

      foods.push({
        id: i,
        type: foodType.type,
        emoji: foodType.emoji,
        daysLeft,
        maxDays: foodType.maxDays,
        points: foodType.points,
        x: (i % 4) * 25 + 12.5,
        y: Math.floor(i / 4) * 30 + 20,
        saved: false,
      })
    }
    return foods
  }

  const generateCustomer = (): Customer => {
    const wantedTypes = foodTypes
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.floor(Math.random() * 3) + 1)
      .map((f) => f.type)

    return {
      id: Date.now() + Math.random(),
      emoji: customerEmojis[Math.floor(Math.random() * customerEmojis.length)],
      wants: wantedTypes,
      patience: 15 + level * 5,
      maxPatience: 15 + level * 5,
      x: Math.random() * 80 + 10,
    }
  }

  const startGame = () => {
    setScore(0)
    setLevel(1)
    setTimeLeft(60)
    setCombo(0)
    setGameActive(true)
    setGameOver(false)
    setSelectedFood(null)
    setFoodItems(generateFood())
    setCustomers([generateCustomer()])
  }

  const endGame = () => {
    setGameActive(false)
    setGameOver(true)
  }

  const serveFoodToCustomer = (foodId: number, customerId: number) => {
    const food = foodItems.find((f) => f.id === foodId)
    const customer = customers.find((c) => c.id === customerId)

    if (!food || !customer || food.saved) return

    if (customer.wants.includes(food.type)) {
      // Successful serve
      const urgencyBonus = food.daysLeft === 1 ? 50 : food.daysLeft === 2 ? 25 : 0
      const comboBonus = combo * 10
      const totalPoints = food.points + urgencyBonus + comboBonus

      setScore((s) => s + totalPoints)
      setCombo((c) => c + 1)
      setShowCombo(true)
      setTimeout(() => setShowCombo(false), 1000)

      // Mark food as saved and remove customer
      setFoodItems((prev) => prev.map((f) => (f.id === foodId ? { ...f, saved: true } : f)))
      setCustomers((prev) => prev.filter((c) => c.id !== customerId))

      // Add new customer
      setTimeout(() => {
        setCustomers((prev) => [...prev, generateCustomer()])
      }, 1000)
    } else {
      // Wrong food - lose combo
      setCombo(0)
    }

    setSelectedFood(null)
  }

  const updateGame = useCallback(() => {
    if (!gameActive) return

    // Age food
    setFoodItems((prev) =>
      prev.map((food) => {
        if (food.saved) return food

        const newDaysLeft = Math.max(0, food.daysLeft - 0.1)
        if (newDaysLeft === 0 && !food.saved) {
          // Food expired - lose points
          setScore((s) => Math.max(0, s - food.points))
          setCombo(0)
          return { ...food, daysLeft: 0 }
        }
        return { ...food, daysLeft: newDaysLeft }
      }),
    )

    // Update customer patience
    setCustomers((prev) =>
      prev
        .map((customer) => {
          const newPatience = Math.max(0, customer.patience - 1)
          if (newPatience === 0) {
            setCombo(0)
            return { ...customer, patience: 0 }
          }
          return { ...customer, patience: newPatience }
        })
        .filter((c) => c.patience > 0),
    )

    // Add new customers occasionally
    if (Math.random() < 0.02 && customers.length < 3) {
      setCustomers((prev) => [...prev, generateCustomer()])
    }
  }, [gameActive, customers.length])

  // Game loop
  useEffect(() => {
    if (!gameActive) return

    const gameLoop = setInterval(() => {
      updateGame()
      setTimeLeft((t) => {
        if (t <= 1) {
          endGame()
          return 0
        }
        return t - 1
      })
    }, 1000)

    return () => clearInterval(gameLoop)
  }, [gameActive, updateGame])

  // Level progression
  useEffect(() => {
    const newLevel = Math.floor(score / 1000) + 1
    if (newLevel > level) {
      setLevel(newLevel)
      setTimeLeft((t) => t + 30) // Bonus time for new level
    }
  }, [score, level])

  const getFoodColor = (food: FoodItem) => {
    if (food.saved) return "bg-green-200 dark:bg-green-800"
    if (food.daysLeft === 0) return "bg-red-200 dark:bg-red-800"
    if (food.daysLeft <= 1) return "bg-red-100 dark:bg-red-900"
    if (food.daysLeft <= 2) return "bg-yellow-100 dark:bg-yellow-900"
    return "bg-green-100 dark:bg-green-900"
  }

  const getCustomerColor = (customer: Customer) => {
    const patiencePercent = customer.patience / customer.maxPatience
    if (patiencePercent > 0.6) return "bg-green-100 dark:bg-green-900"
    if (patiencePercent > 0.3) return "bg-yellow-100 dark:bg-yellow-900"
    return "bg-red-100 dark:bg-red-900"
  }

  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Game Header */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
            <span className="text-4xl mr-3">⚡</span>
            Rednings Rush
          </h1>
          <div className="flex space-x-6 text-lg font-semibold">
            <div className="text-green-600">Score: {score}</div>
            <div className="text-blue-600">Level: {level}</div>
            <div className="text-red-600">Time: {timeLeft}s</div>
          </div>
        </div>

        {combo > 2 && showCombo && (
          <div className="text-center">
            <div className="inline-block bg-gradient-to-r from-orange-400 to-red-500 text-white px-4 py-2 rounded-full font-bold animate-bounce">
              🔥 COMBO x{combo}! 🔥
            </div>
          </div>
        )}
      </div>

      {/* Game Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Food Storage */}
        <div className="lg:col-span-2">
          <div className="bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900 dark:to-green-900 rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="text-2xl mr-2">🏪</span>
              Mat Lager
            </h2>
            <div className="grid grid-cols-4 gap-3">
              {foodItems.map((food) => (
                <div
                  key={food.id}
                  className={`
                    ${getFoodColor(food)} rounded-lg p-3 cursor-pointer transition-all duration-200
                    hover:scale-105 hover:shadow-lg text-center
                    ${selectedFood === food.id ? "ring-4 ring-blue-500 scale-110" : ""}
                    ${food.saved ? "opacity-50" : ""}
                  `}
                  onClick={() => !food.saved && setSelectedFood(food.id)}
                >
                  <div className="text-3xl mb-2">{food.emoji}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-300">
                    {food.saved ? "Reddet!" : `${Math.ceil(food.daysLeft)} dager`}
                  </div>
                  <div className="text-xs font-bold text-green-600">{food.points}p</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Customers */}
        <div>
          <div className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="text-2xl mr-2">👥</span>
              Kunder
            </h2>
            <div className="space-y-4">
              {customers.map((customer) => (
                <div
                  key={customer.id}
                  className={`
                    ${getCustomerColor(customer)} rounded-lg p-4 cursor-pointer transition-all duration-200
                    hover:scale-105 hover:shadow-lg
                  `}
                  onClick={() => selectedFood !== null && serveFoodToCustomer(selectedFood, customer.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{customer.emoji}</span>
                    <div className="text-xs text-gray-600 dark:text-gray-300">{customer.patience}s</div>
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-300 mb-2">Vil ha:</div>
                  <div className="flex space-x-1">
                    {customer.wants.map((want) => {
                      const foodType = foodTypes.find((f) => f.type === want)
                      return (
                        <span key={want} className="text-lg">
                          {foodType?.emoji}
                        </span>
                      )
                    })}
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                    <div
                      className="bg-gradient-to-r from-green-500 to-red-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(customer.patience / customer.maxPatience) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Game Over Overlay */}
      {gameOver && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center max-w-md mx-4">
            <div className="text-6xl mb-4">⏰</div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Tiden er ute!</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
              Final Score: <span className="font-bold text-green-600">{score}</span>
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Level: {level} | Mat reddet: {foodItems.filter((f) => f.saved).length}
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
        <div className="fixed inset-0 bg-gradient-to-br from-green-400/90 to-blue-500/90 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center max-w-md mx-4">
            <div className="text-6xl mb-4">⚡</div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Rednings Rush</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Redd mat før den går ut på dato! Velg mat fra lageret og server til kunder som vil ha den. Rask service
              gir combo-bonus!
            </p>
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              <p>🔴 1 dag igjen = +50 bonus</p>
              <p>🟡 2 dager igjen = +25 bonus</p>
              <p>🔥 Combo = +10p per combo</p>
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

      {/* Instructions */}
      <div className="mt-6 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Hvordan spille:</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-300">
          <div className="flex items-center">
            <span className="text-2xl mr-3">🏪</span>
            <span>Klikk på mat i lageret for å velge den</span>
          </div>
          <div className="flex items-center">
            <span className="text-2xl mr-3">👥</span>
            <span>Klikk på kunde for å serve valgt mat</span>
          </div>
          <div className="flex items-center">
            <span className="text-2xl mr-3">⏰</span>
            <span>Redd mat før den går ut på dato!</span>
          </div>
        </div>
      </div>
    </div>
  )
}
