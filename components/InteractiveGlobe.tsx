"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"

interface CountryData {
  name: string
  wastePerPerson: number
  totalWaste: number
  population: number
  co2Impact: number
  color: string
  position: { x: number; y: number; z: number }
}

const countryData: Record<string, CountryData> = {
  norway: {
    name: "Norge",
    wastePerPerson: 68,
    totalWaste: 350000,
    population: 5.4,
    co2Impact: 875,
    color: "#3B82F6",
    position: { x: 60, y: 10, z: 0 },
  },
  usa: {
    name: "USA",
    wastePerPerson: 95,
    totalWaste: 31000000,
    population: 331,
    co2Impact: 77500,
    color: "#EF4444",
    position: { x: -100, y: 40, z: 0 },
  },
  china: {
    name: "Kina",
    wastePerPerson: 44,
    totalWaste: 62000000,
    population: 1439,
    co2Impact: 155000,
    color: "#F59E0B",
    position: { x: 104, y: 35, z: 0 },
  },
  germany: {
    name: "Tyskland",
    wastePerPerson: 75,
    totalWaste: 6200000,
    population: 83,
    co2Impact: 15500,
    color: "#10B981",
    position: { x: 10, y: 51, z: 0 },
  },
  brazil: {
    name: "Brasil",
    wastePerPerson: 35,
    totalWaste: 7400000,
    population: 215,
    co2Impact: 18500,
    color: "#8B5CF6",
    position: { x: -55, y: -10, z: 0 },
  },
  india: {
    name: "India",
    wastePerPerson: 51,
    totalWaste: 68800000,
    population: 1380,
    co2Impact: 172000,
    color: "#F97316",
    position: { x: 77, y: 20, z: 0 },
  },
}

export default function InteractiveGlobe() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [rotation, setRotation] = useState(0)
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; opacity: number }>>([])

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 0.3) % 360)
    }, 50)

    const particleInterval = setInterval(() => {
      setParticles((prev) => [
        ...prev.slice(-15),
        {
          id: Date.now(),
          x: Math.random() * 100,
          y: Math.random() * 100,
          opacity: 1,
        },
      ])
    }, 800)

    return () => {
      clearInterval(interval)
      clearInterval(particleInterval)
    }
  }, [])

  useEffect(() => {
    const fadeInterval = setInterval(() => {
      setParticles((prev) => prev.map((p) => ({ ...p, opacity: p.opacity - 0.015 })).filter((p) => p.opacity > 0))
    }, 50)

    return () => clearInterval(fadeInterval)
  }, [])

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* 3D Globe */}
        <div className="relative">
          <div className="relative w-96 h-96 mx-auto perspective-1000">
            {/* Space background */}
            <div className="absolute inset-0 bg-gradient-radial from-gray-900 via-blue-900 to-black rounded-full overflow-hidden">
              {/* Animated stars */}
              {Array.from({ length: 80 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${2 + Math.random() * 2}s`,
                  }}
                />
              ))}
            </div>

            {/* 3D Globe Container */}
            <div
              className="absolute inset-8 preserve-3d"
              style={{
                transform: `rotateY(${rotation}deg) rotateX(-10deg)`,
                transformStyle: "preserve-3d",
              }}
            >
              {/* Globe sphere */}
              <div className="relative w-full h-full rounded-full bg-gradient-to-br from-blue-400 via-green-500 to-blue-600 shadow-2xl overflow-hidden transform-gpu">
                {/* Continents as SVG overlay */}
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 400 400"
                  style={{ transform: "rotateY(0deg)" }}
                >
                  {/* North America */}
                  <path
                    d="M80 120 Q120 100 160 120 L180 140 Q170 180 140 200 L100 190 Q70 160 80 120"
                    fill="rgba(34, 197, 94, 0.8)"
                    stroke="rgba(22, 163, 74, 0.9)"
                    strokeWidth="2"
                    className="cursor-pointer hover:fill-green-600 transition-colors"
                    onClick={() => setSelectedCountry("usa")}
                  />

                  {/* Europe */}
                  <path
                    d="M200 100 Q230 95 250 110 L260 130 Q250 150 220 155 L200 145 Q190 120 200 100"
                    fill="rgba(59, 130, 246, 0.8)"
                    stroke="rgba(37, 99, 235, 0.9)"
                    strokeWidth="2"
                    className="cursor-pointer hover:fill-blue-600 transition-colors"
                    onClick={() => setSelectedCountry("germany")}
                  />

                  {/* Scandinavia */}
                  <path
                    d="M210 80 Q225 75 235 85 L240 100 Q235 110 220 105 L210 95 Q205 85 210 80"
                    fill="rgba(59, 130, 246, 0.9)"
                    stroke="rgba(37, 99, 235, 1)"
                    strokeWidth="2"
                    className="cursor-pointer hover:fill-blue-700 transition-colors"
                    onClick={() => setSelectedCountry("norway")}
                  />

                  {/* Asia */}
                  <path
                    d="M280 110 Q340 100 380 130 L390 170 Q370 200 320 210 L280 190 Q260 150 280 110"
                    fill="rgba(245, 158, 11, 0.8)"
                    stroke="rgba(217, 119, 6, 0.9)"
                    strokeWidth="2"
                    className="cursor-pointer hover:fill-yellow-600 transition-colors"
                    onClick={() => setSelectedCountry("china")}
                  />

                  {/* India */}
                  <path
                    d="M300 180 Q320 175 335 190 L340 210 Q330 225 310 220 L300 205 Q295 190 300 180"
                    fill="rgba(249, 115, 22, 0.8)"
                    stroke="rgba(234, 88, 12, 0.9)"
                    strokeWidth="2"
                    className="cursor-pointer hover:fill-orange-600 transition-colors"
                    onClick={() => setSelectedCountry("india")}
                  />

                  {/* South America */}
                  <path
                    d="M120 220 Q140 210 155 230 L160 280 Q150 320 130 330 L110 320 Q100 280 110 250 Q105 235 120 220"
                    fill="rgba(139, 92, 246, 0.8)"
                    stroke="rgba(124, 58, 237, 0.9)"
                    strokeWidth="2"
                    className="cursor-pointer hover:fill-purple-600 transition-colors"
                    onClick={() => setSelectedCountry("brazil")}
                  />

                  {/* Africa */}
                  <path
                    d="M200 180 Q240 170 260 200 L265 250 Q255 290 225 300 L200 290 Q180 250 185 220 Q185 200 200 180"
                    fill="rgba(34, 197, 94, 0.7)"
                    stroke="rgba(22, 163, 74, 0.8)"
                    strokeWidth="2"
                    className="cursor-pointer hover:fill-green-600 transition-colors"
                  />

                  {/* Australia */}
                  <path
                    d="M320 280 Q350 275 370 290 L375 310 Q365 325 340 320 L320 310 Q315 295 320 280"
                    fill="rgba(34, 197, 94, 0.6)"
                    stroke="rgba(22, 163, 74, 0.7)"
                    strokeWidth="2"
                    className="cursor-pointer hover:fill-green-600 transition-colors"
                  />
                </svg>

                {/* Globe grid lines */}
                <div className="absolute inset-0 opacity-30">
                  {/* Latitude lines */}
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div
                      key={`lat-${i}`}
                      className="absolute border-white/40 rounded-full"
                      style={{
                        top: `${i * 12.5}%`,
                        left: "5%",
                        right: "5%",
                        height: "1px",
                        transform: `perspective(400px) rotateX(${(i - 4) * 15}deg)`,
                      }}
                    />
                  ))}

                  {/* Longitude lines */}
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={`lng-${i}`}
                      className="absolute border-white/40"
                      style={{
                        left: `${5 + i * 11.25}%`,
                        top: "5%",
                        bottom: "5%",
                        width: "1px",
                        borderRadius: "50%",
                        transform: `perspective(400px) rotateY(${i * 22.5}deg)`,
                      }}
                    />
                  ))}
                </div>

                {/* Atmosphere glow */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-blue-200/20 to-transparent animate-pulse" />
                <div className="absolute inset-0 rounded-full shadow-inner shadow-blue-900/50" />
              </div>

              {/* Country markers */}
              {Object.entries(countryData).map(([key, country]) => (
                <div
                  key={key}
                  className="absolute w-4 h-4 rounded-full cursor-pointer transform transition-all duration-300 hover:scale-150 animate-pulse"
                  style={{
                    backgroundColor: country.color,
                    left: `${50 + Math.cos((country.position.x * Math.PI) / 180) * 30}%`,
                    top: `${50 - Math.sin((country.position.y * Math.PI) / 180) * 30}%`,
                    boxShadow: `0 0 10px ${country.color}`,
                    transform: `translate(-50%, -50%) scale(${selectedCountry === key ? 1.5 : 1})`,
                  }}
                  onClick={() => setSelectedCountry(key)}
                  title={country.name}
                />
              ))}
            </div>

            {/* Floating CO2 particles */}
            {particles.map((particle) => (
              <div
                key={particle.id}
                className="absolute w-2 h-2 bg-red-400 rounded-full animate-float pointer-events-none"
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  opacity: particle.opacity,
                  boxShadow: "0 0 6px rgba(239, 68, 68, 0.6)",
                }}
              />
            ))}

            {/* Orbital ring */}
            <div
              className="absolute inset-0 border-2 border-white/30 rounded-full animate-spin-slow"
              style={{ animationDuration: "20s" }}
            />
          </div>

          <p className="text-center text-white mt-6 text-sm font-medium">
            🌍 Klikk på kontinentene eller de pulserende punktene for statistikk
          </p>
        </div>

        {/* Rest of the component remains the same... */}
        <div className="space-y-4">
          {selectedCountry ? (
            <Card className="animate-scale-in">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div
                    className="w-4 h-4 rounded-full mr-3"
                    style={{ backgroundColor: countryData[selectedCountry].color }}
                  />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {countryData[selectedCountry].name}
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                      {countryData[selectedCountry].wastePerPerson} kg
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Matsvinn per person/år</div>
                  </div>

                  <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                      {(countryData[selectedCountry].totalWaste / 1000000).toFixed(1)}M
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Tonn totalt matsvinn/år</div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {countryData[selectedCountry].population}M
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Befolkning</div>
                  </div>

                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {(countryData[selectedCountry].co2Impact / 1000).toFixed(0)}K
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Tonn CO₂ fra matsvinn/år</div>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    💡 <strong>Med Smarthylle:</strong> Dette landet kunne redusert matsvinnet med{" "}
                    <span className="font-bold text-green-600">
                      {((countryData[selectedCountry].totalWaste * 0.4) / 1000000).toFixed(1)}M tonn
                    </span>{" "}
                    og spare{" "}
                    <span className="font-bold text-green-600">
                      {((countryData[selectedCountry].co2Impact * 0.4) / 1000).toFixed(0)}K tonn CO₂
                    </span>{" "}
                    årlig!
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
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
                    className="w-8 h-8 text-blue-600 dark:text-blue-400"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                    <path d="M2 12h20" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Utforsk verden</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Klikk på kontinentene eller de pulserende punktene på jordkloden for å se matsvinn-statistikk.
                </p>
                <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                  🔴 Høyt matsvinn • 🟡 Middels matsvinn • 🟢 Lavt matsvinn
                </div>
              </CardContent>
            </Card>
          )}

          {/* Global stats */}
          <Card>
            <CardContent className="p-6">
              <h4 className="font-bold text-gray-900 dark:text-white mb-4">🌍 Globale fakta</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Totalt matsvinn globalt:</span>
                  <span className="font-bold">1.3 milliarder tonn/år</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">CO₂ fra matsvinn:</span>
                  <span className="font-bold">3.3 milliarder tonn/år</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Andel av total mat:</span>
                  <span className="font-bold">33%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Mennesker som sulter:</span>
                  <span className="font-bold">828 millioner</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
