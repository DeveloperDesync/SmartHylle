"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

const TreeIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
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
    className={className}
  >
    <path d="M10 10v.2A3 3 0 0 1 8.9 16v0H5v0h0A3.02 3.02 0 0 1 5 10.2V10a3 3 0 0 1 3-3 3 3 0 0 1 3 3Z" />
    <path d="m7 13 4.93-2.93a2 2 0 0 1 2.14 0L19 13" />
    <path d="m5 16-3 3" />
    <path d="m19 16 3 3" />
    <path d="M12 16v6" />
  </svg>
)

const CarIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
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
    className={className}
  >
    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9L18 10V6c0-2-2-4-4-4H4c-2 0-4 2-4 4v10c0 .6.4 1 1 1h2" />
    <circle cx="7" cy="17" r="2" />
    <path d="M9 17h6" />
    <circle cx="17" cy="17" r="2" />
  </svg>
)

const FlameIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
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
    className={className}
  >
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
  </svg>
)

export default function WasteCalculator() {
  const [foodWaste, setFoodWaste] = useState("")
  const [results, setResults] = useState<{
    co2: number
    trees: number
    carKm: number
    energy: number
  } | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [animatedValues, setAnimatedValues] = useState({
    co2: 0,
    trees: 0,
    carKm: 0,
    energy: 0,
  })

  const calculateImpact = () => {
    const waste = Number.parseFloat(foodWaste)
    if (!waste || waste <= 0) return

    setIsCalculating(true)

    // Simulate calculation delay
    setTimeout(() => {
      // Real calculations based on research:
      // 1kg food waste = ~2.5kg CO2
      // 1 tree absorbs ~22kg CO2 per year
      // 1L gasoline = ~2.3kg CO2
      // Average car: 8L/100km
      const co2 = waste * 2.5
      const trees = co2 / 22
      const carKm = co2 / (2.3 * 0.08)
      const energy = waste * 3.3 // kWh equivalent

      setResults({ co2, trees, carKm, energy })
      setIsCalculating(false)

      // Animate numbers
      animateNumbers({ co2, trees, carKm, energy })
    }, 1500)
  }

  const animateNumbers = (target: typeof animatedValues) => {
    const duration = 2000
    const steps = 60
    const stepDuration = duration / steps

    let currentStep = 0
    const interval = setInterval(() => {
      currentStep++
      const progress = currentStep / steps
      const easeOut = 1 - Math.pow(1 - progress, 3)

      setAnimatedValues({
        co2: target.co2 * easeOut,
        trees: target.trees * easeOut,
        carKm: target.carKm * easeOut,
        energy: target.energy * easeOut,
      })

      if (currentStep >= steps) {
        clearInterval(interval)
        setAnimatedValues(target)
      }
    }, stepDuration)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl text-center flex items-center justify-center">
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
              className="mr-2 text-red-600"
            >
              <path d="M3 6h18l-1.5 9a2 2 0 0 1-2 1.5H6.5a2 2 0 0 1-2-1.5L3 6Z" />
              <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
            Matsvinn Kalkulator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1">
              <Label htmlFor="foodWaste" className="text-sm font-medium mb-2 block">
                Hvor mye mat kaster du per uke? (kg)
              </Label>
              <Input
                id="foodWaste"
                type="number"
                min="0"
                step="0.1"
                value={foodWaste}
                onChange={(e) => setFoodWaste(e.target.value)}
                placeholder="F.eks. 2.5"
                className="text-lg"
              />
            </div>
            <Button
              onClick={calculateImpact}
              disabled={!foodWaste || isCalculating}
              className="bg-red-600 hover:bg-red-700 px-8"
            >
              {isCalculating ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Beregner...
                </div>
              ) : (
                "Beregn påvirkning"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {results && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
          <Card className="text-center hover-lift">
            <CardContent className="p-6">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <FlameIcon className="text-red-600 dark:text-red-400" />
              </div>
              <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">
                {animatedValues.co2.toFixed(1)} kg
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">CO₂ utslipp per uke</p>
              <p className="text-xs text-gray-500 mt-2">{(animatedValues.co2 * 52).toFixed(0)} kg per år</p>
            </CardContent>
          </Card>

          <Card className="text-center hover-lift">
            <CardContent className="p-6">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <TreeIcon className="text-green-600 dark:text-green-400" />
              </div>
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                {animatedValues.trees.toFixed(1)}
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Trær trengs for å absorbere CO₂</p>
              <p className="text-xs text-gray-500 mt-2">Per år (22kg CO₂/tre)</p>
            </CardContent>
          </Card>

          <Card className="text-center hover-lift">
            <CardContent className="p-6">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <CarIcon className="text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {animatedValues.carKm.toFixed(0)} km
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Bilkjøring tilsvarende</p>
              <p className="text-xs text-gray-500 mt-2">{(animatedValues.carKm * 52).toFixed(0)} km per år</p>
            </CardContent>
          </Card>

          <Card className="text-center hover-lift">
            <CardContent className="p-6">
              <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mx-auto mb-4">
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
                  className="w-8 h-8 text-yellow-600 dark:text-yellow-400"
                >
                  <path d="m15 14 5-5-5-5" />
                  <path d="M20 9H9.5A5.5 5.5 0 0 0 4 14.5v0A5.5 5.5 0 0 0 9.5 20H13" />
                </svg>
              </div>
              <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
                {animatedValues.energy.toFixed(1)} kWh
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Energi kastet bort</p>
              <p className="text-xs text-gray-500 mt-2">{(animatedValues.energy * 52).toFixed(0)} kWh per år</p>
            </CardContent>
          </Card>
        </div>
      )}

      {results && (
        <Card className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-green-200 dark:border-green-700">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              💡 Med Smarthylle kunne du redusert dette med opptil 40%!
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <div className="font-bold text-green-600 dark:text-green-400">
                  -{(animatedValues.co2 * 0.4).toFixed(1)} kg CO₂
                </div>
                <div className="text-gray-600 dark:text-gray-300">Mindre utslipp</div>
              </div>
              <div>
                <div className="font-bold text-green-600 dark:text-green-400">
                  -{(animatedValues.carKm * 0.4).toFixed(0)} km
                </div>
                <div className="text-gray-600 dark:text-gray-300">Mindre bilkjøring</div>
              </div>
              <div>
                <div className="font-bold text-green-600 dark:text-green-400">
                  -{(Number.parseFloat(foodWaste) * 0.4).toFixed(1)} kg
                </div>
                <div className="text-gray-600 dark:text-gray-300">Mindre matsvinn</div>
              </div>
              <div>
                <div className="font-bold text-green-600 dark:text-green-400">
                  +{(Number.parseFloat(foodWaste) * 25 * 0.4).toFixed(0)} kr
                </div>
                <div className="text-gray-600 dark:text-gray-300">Spart per uke</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
