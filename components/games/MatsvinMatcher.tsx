"use client"

import { useState, useEffect } from "react"

interface Tile {
  id: number
  type: string
  emoji: string
  x: number
  y: number
  matched: boolean
  selected: boolean
}

export default function MatsvinMatcher() {
  const [board, setBoard] = useState<Tile[]>([])
  const [score, setScore] = useState(0)
  const [moves, setMoves] = useState(30)
  const [level, setLevel] = useState(1)
  const [gameActive, setGameActive] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [selectedTiles, setSelectedTiles] = useState<number[]>([])
  const [target, setTarget] = useState(1000)
  const [showMatch, setShowMatch] = useState<number[]>([])

  const foodTypes = [
    { type: "banana", emoji: "🍌", points: 10 },
    { type: "apple", emoji: "🍎", points: 15 },
    { type: "bread", emoji: "🍞", points: 20 },
    { type: "carrot", emoji: "🥕", points: 12 },
    { type: "tomato", emoji: "🍅", points: 18 },
    { type: "cheese", emoji: "🧀", points: 25 },
    { type: "orange", emoji: "🍊", points: 14 },
    { type: "grape", emoji: "🍇", points: 16 },
  ]

  const initializeBoard = () => {
    const newBoard: Tile[] = []
    let id = 0

    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        const foodType = foodTypes[Math.floor(Math.random() * foodTypes.length)]
        newBoard.push({
          id: id++,
          type: foodType.type,
          emoji: foodType.emoji,
          x,
          y,
          matched: false,
          selected: false,
        })
      }
    }

    setBoard(newBoard)
  }

  const startGame = () => {
    setScore(0)
    setMoves(30)
    setLevel(1)
    setTarget(1000)
    setGameActive(true)
    setGameOver(false)
    setSelectedTiles([])
    initializeBoard()
  }

  const getTile = (x: number, y: number) => {
    return board.find((tile) => tile.x === x && tile.y === y && !tile.matched)
  }

  const findMatches = () => {
    const matches: number[] = []

    // Check horizontal matches
    for (let y = 0; y < 8; y++) {
      let count = 1
      let currentType = getTile(0, y)?.type

      for (let x = 1; x < 8; x++) {
        const tile = getTile(x, y)
        if (tile && tile.type === currentType) {
          count++
        } else {
          if (count >= 3) {
            for (let i = x - count; i < x; i++) {
              const matchTile = getTile(i, y)
              if (matchTile) matches.push(matchTile.id)
            }
          }
          count = 1
          currentType = tile?.type
        }
      }
      if (count >= 3) {
        for (let i = 8 - count; i < 8; i++) {
          const matchTile = getTile(i, y)
          if (matchTile) matches.push(matchTile.id)
        }
      }
    }

    // Check vertical matches
    for (let x = 0; x < 8; x++) {
      let count = 1
      let currentType = getTile(x, 0)?.type

      for (let y = 1; y < 8; y++) {
        const tile = getTile(x, y)
        if (tile && tile.type === currentType) {
          count++
        } else {
          if (count >= 3) {
            for (let i = y - count; i < y; i++) {
              const matchTile = getTile(x, i)
              if (matchTile) matches.push(matchTile.id)
            }
          }
          count = 1
          currentType = tile?.type
        }
      }
      if (count >= 3) {
        for (let i = 8 - count; i < 8; i++) {
          const matchTile = getTile(x, i)
          if (matchTile) matches.push(matchTile.id)
        }
      }
    }

    return [...new Set(matches)]
  }

  const swapTiles = (tile1: Tile, tile2: Tile) => {
    const newBoard = board.map((tile) => {
      if (tile.id === tile1.id) {
        return { ...tile, x: tile2.x, y: tile2.y }
      }
      if (tile.id === tile2.id) {
        return { ...tile, x: tile1.x, y: tile1.y }
      }
      return tile
    })

    setBoard(newBoard)

    // Check for matches after a short delay
    setTimeout(() => {
      const matches = findMatches()
      if (matches.length > 0) {
        processMatches(matches)
      } else {
        // Swap back if no matches
        setBoard(board)
      }
      setMoves((m) => m - 1)
    }, 300)
  }

  const processMatches = (matches: number[]) => {
    setShowMatch(matches)

    setTimeout(() => {
      setBoard((prev) => prev.map((tile) => (matches.includes(tile.id) ? { ...tile, matched: true } : tile)))

      const points = matches.length * 50 + (matches.length > 3 ? 100 : 0)
      setScore((s) => s + points)
      setShowMatch([])

      // Drop tiles and fill gaps
      setTimeout(() => {
        dropTiles()
      }, 200)
    }, 500)
  }

  const dropTiles = () => {
    const newBoard = [...board]

    for (let x = 0; x < 8; x++) {
      const column = newBoard.filter((tile) => tile.x === x && !tile.matched)
      const gaps = 8 - column.length

      // Move existing tiles down
      column.forEach((tile, index) => {
        tile.y = 7 - index
      })

      // Add new tiles at the top
      for (let i = 0; i < gaps; i++) {
        const foodType = foodTypes[Math.floor(Math.random() * foodTypes.length)]
        newBoard.push({
          id: Date.now() + Math.random(),
          type: foodType.type,
          emoji: foodType.emoji,
          x,
          y: gaps - 1 - i,
          matched: false,
          selected: false,
        })
      }
    }

    // Remove matched tiles
    const filteredBoard = newBoard.filter((tile) => !tile.matched)
    setBoard(filteredBoard)

    // Check for new matches
    setTimeout(() => {
      const matches = findMatches()
      if (matches.length > 0) {
        processMatches(matches)
      }
    }, 300)
  }

  const handleTileClick = (clickedTile: Tile) => {
    if (!gameActive || clickedTile.matched) return

    if (selectedTiles.length === 0) {
      setSelectedTiles([clickedTile.id])
      setBoard((prev) => prev.map((tile) => (tile.id === clickedTile.id ? { ...tile, selected: true } : tile)))
    } else if (selectedTiles.length === 1) {
      const firstTile = board.find((t) => t.id === selectedTiles[0])
      if (!firstTile) return

      const isAdjacent =
        (Math.abs(firstTile.x - clickedTile.x) === 1 && firstTile.y === clickedTile.y) ||
        (Math.abs(firstTile.y - clickedTile.y) === 1 && firstTile.x === clickedTile.x)

      if (isAdjacent) {
        swapTiles(firstTile, clickedTile)
      }

      setSelectedTiles([])
      setBoard((prev) => prev.map((tile) => ({ ...tile, selected: false })))
    }
  }

  // Game over check
  useEffect(() => {
    if (moves <= 0) {
      setGameActive(false)
      setGameOver(true)
    }
  }, [moves])

  // Level progression
  useEffect(() => {
    if (score >= target) {
      setLevel((l) => l + 1)
      setTarget((t) => t + 1000)
      setMoves((m) => m + 10)
    }
  }, [score, target])

  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Game Header */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
            <span className="text-4xl mr-3">🧩</span>
            Matsvinn Matcher
          </h1>
          <div className="flex space-x-6 text-lg font-semibold">
            <div className="text-green-600">Score: {score}</div>
            <div className="text-blue-600">Level: {level}</div>
            <div className="text-orange-600">Moves: {moves}</div>
          </div>
        </div>

        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(100, (score % 1000) / 10)}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{target - score} poeng til neste level</p>
      </div>

      {/* Game Board */}
      <div className="relative">
        <div className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-2xl p-4 shadow-2xl">
          <div className="grid grid-cols-8 gap-1" style={{ aspectRatio: "1" }}>
            {board.map((tile) => (
              <div
                key={tile.id}
                className={`
                  aspect-square bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center text-2xl cursor-pointer
                  transition-all duration-200 hover:scale-105 hover:shadow-lg
                  ${tile.selected ? "ring-4 ring-blue-500 scale-110" : ""}
                  ${showMatch.includes(tile.id) ? "animate-pulse bg-yellow-300" : ""}
                  ${tile.matched ? "opacity-0" : "opacity-100"}
                `}
                onClick={() => handleTileClick(tile)}
                style={{
                  transform: `translate(${tile.x * 100}%, ${tile.y * 100}%)`,
                  position: "absolute",
                  width: "calc(12.5% - 4px)",
                  height: "calc(12.5% - 4px)",
                }}
              >
                {tile.emoji}
              </div>
            ))}
          </div>
        </div>

        {/* Game Over Overlay */}
        {gameOver && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-2xl">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center max-w-md mx-4">
              <div className="text-6xl mb-4">{score >= target ? "🎉" : "😔"}</div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {score >= target ? "Gratulerer!" : "Spill Over!"}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
                Final Score: <span className="font-bold text-purple-600">{score}</span>
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Level: {level} | Mat reddet: {Math.floor(score / 50)}
              </p>
              <button
                onClick={startGame}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                Spill Igjen! 🎮
              </button>
            </div>
          </div>
        )}

        {/* Start Screen */}
        {!gameActive && !gameOver && (
          <div className="absolute inset-0 bg-gradient-to-br from-purple-400/90 to-pink-500/90 flex items-center justify-center rounded-2xl">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center max-w-md mx-4">
              <div className="text-6xl mb-4">🧩</div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Matsvinn Matcher</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Match 3 eller flere like matvarer for å redde dem! Bytt plass på tilstøtende brikker for å lage matches.
              </p>
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                <p>3 matches = 150 poeng</p>
                <p>4+ matches = 250+ poeng</p>
                <p>Nå {target} poeng for neste level!</p>
              </div>
              <button
                onClick={startGame}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                Start Spill! 🚀
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="mt-6 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Hvordan spille:</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-300">
          <div className="flex items-center">
            <span className="text-2xl mr-3">👆</span>
            <span>Klikk på en brikke for å velge den</span>
          </div>
          <div className="flex items-center">
            <span className="text-2xl mr-3">🔄</span>
            <span>Klikk på en tilstøtende brikke for å bytte</span>
          </div>
          <div className="flex items-center">
            <span className="text-2xl mr-3">🎯</span>
            <span>Lag linjer med 3+ like for å matche</span>
          </div>
        </div>
      </div>
    </div>
  )
}
