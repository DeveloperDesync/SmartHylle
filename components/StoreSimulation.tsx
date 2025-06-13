"use client"

import { useState, useEffect } from "react"
import SimpleButton from "./SimpleButton"
import SimpleCard from "./SimpleCard"
import SimpleBadge from "./SimpleBadge"
import SimpleModal from "./SimpleModal"
import { getProductIcon } from "./ProductIcons"

// Enhanced Icons with animations
const ShoppingCartIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
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
    <circle cx="8" cy="21" r="1" />
    <circle cx="19" cy="21" r="1" />
    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
  </svg>
)

const ShoppingBagIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
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
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
    <path d="M3 6h18" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
)

const ClockIcon = ({ className = "w-3 h-3" }: { className?: string }) => (
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
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
)

const LeafIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
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
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </svg>
)

const ArrowRightIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
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
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
)

const QrCodeIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
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
    <rect width="5" height="5" x="3" y="3" rx="1" />
    <rect width="5" height="5" x="16" y="3" rx="1" />
    <rect width="5" height="5" x="3" y="16" rx="1" />
    <path d="M21 16h-3a2 2 0 0 0-2 2v3" />
    <path d="M21 21v.01" />
    <path d="M12 7v3a2 2 0 0 1-2 2H7" />
    <path d="M3 12h.01" />
    <path d="M12 3h.01" />
    <path d="M12 16v.01" />
    <path d="M16 12h1" />
    <path d="M21 12v.01" />
    <path d="M12 21v-1" />
  </svg>
)

const RefreshCwIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
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
    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
    <path d="M21 3v5h-5" />
    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
    <path d="M3 21v-5h5" />
  </svg>
)

const ChevronLeftIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
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
    <path d="m15 18-6-6 6-6" />
  </svg>
)

const TagIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
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
    <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
    <path d="M7 7h.01" />
  </svg>
)

const SparklesIcon = ({ className = "w-3 h-3" }: { className?: string }) => (
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
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" />
    <path d="M19 17v4" />
    <path d="M3 5h4" />
    <path d="M17 19h4" />
  </svg>
)

const CheckCircleIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
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
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
)

// Enhanced QR Code Component
const AnimatedQRCode = ({ isScanning, scanComplete }: { isScanning: boolean; scanComplete: boolean }) => (
  <div className="relative">
    <div
      className={`bg-white p-8 rounded-xl border-2 transition-all duration-500 ${
        isScanning ? "border-green-500 dark:border-green-400 animate-qr-pulse" : "border-gray-200 dark:border-gray-700"
      }`}
    >
      <div className="relative w-48 h-48 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
        {/* QR Code Pattern */}
        <div className="absolute inset-0 grid grid-cols-8 gap-1 p-2">
          {Array.from({ length: 64 }).map((_, i) => (
            <div
              key={i}
              className={`rounded-sm transition-all duration-300 ${
                Math.random() > 0.5 ? "bg-gray-800 dark:bg-white" : "bg-transparent"
              } ${isScanning ? "animate-pulse" : ""}`}
              style={{ animationDelay: `${i * 20}ms` }}
            />
          ))}
        </div>

        {/* Scanning Line */}
        {isScanning && (
          <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent animate-qr-scan" />
        )}

        {/* Corner Markers */}
        <div className="absolute top-2 left-2 w-6 h-6 border-2 border-gray-800 dark:border-white rounded-sm" />
        <div className="absolute top-2 right-2 w-6 h-6 border-2 border-gray-800 dark:border-white rounded-sm" />
        <div className="absolute bottom-2 left-2 w-6 h-6 border-2 border-gray-800 dark:border-white rounded-sm" />
      </div>
      <p className="mt-4 text-sm font-mono text-gray-600 dark:text-gray-400 text-center">SH001123456</p>
    </div>

    {scanComplete && (
      <div className="absolute inset-0 flex items-center justify-center bg-white/90 dark:bg-gray-800/90 rounded-xl animate-bounce-in">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4 animate-scale-in">
            <CheckCircleIcon className="text-green-600 dark:text-green-400" />
          </div>
          <p className="text-green-600 dark:text-green-400 font-bold text-lg">Skanning fullført!</p>
        </div>
      </div>
    )}
  </div>
)

interface Product {
  id: string
  name: string
  image: string
  originalPrice: number
  discountedPrice: number
  expiryDate: string
  daysUntilExpiry: number
  co2Saved: number
  weight: number
  category: string
  aiReason: string
}

const products: Product[] = [
  {
    id: "1",
    name: "Økologisk Melk",
    image: "/placeholder.svg?height=120&width=120",
    originalPrice: 24.9,
    discountedPrice: 14.9,
    expiryDate: "2025-06-15",
    daysUntilExpiry: 3,
    co2Saved: 0.8,
    weight: 1.0,
    category: "Meieri",
    aiReason: "Nærmer seg utløpsdato, AI foreslår 40% rabatt basert på historisk salg av meieriprodukter",
  },
  {
    id: "2",
    name: "Fullkornsbrød",
    image: "/placeholder.svg?height=120&width=120",
    originalPrice: 32.5,
    discountedPrice: 16.25,
    expiryDate: "2025-06-14",
    daysUntilExpiry: 2,
    co2Saved: 0.5,
    weight: 0.7,
    category: "Bakeri",
    aiReason: "Bakt i går, AI foreslår 50% rabatt basert på ferske bakevarer som selges best samme dag",
  },
  {
    id: "3",
    name: "Fersk Laks",
    image: "/placeholder.svg?height=120&width=120",
    originalPrice: 89.9,
    discountedPrice: 53.9,
    expiryDate: "2025-06-14",
    daysUntilExpiry: 2,
    co2Saved: 2.1,
    weight: 0.4,
    category: "Fisk",
    aiReason: "Høy lagerbeholdning og kort holdbarhet, AI foreslår 40% rabatt basert på salgstrender",
  },
  {
    id: "4",
    name: "Yoghurt Naturell",
    image: "/placeholder.svg?height=120&width=120",
    originalPrice: 19.9,
    discountedPrice: 9.95,
    expiryDate: "2025-06-16",
    daysUntilExpiry: 4,
    co2Saved: 0.4,
    weight: 0.5,
    category: "Meieri",
    aiReason: "Overproduksjon denne uken, AI foreslår 50% rabatt for å balansere lagerbeholdning",
  },
  {
    id: "5",
    name: "Økologiske Epler",
    image: "/placeholder.svg?height=120&width=120",
    originalPrice: 29.9,
    discountedPrice: 17.9,
    expiryDate: "2025-06-17",
    daysUntilExpiry: 5,
    co2Saved: 0.3,
    weight: 0.8,
    category: "Frukt",
    aiReason: "Sesongbasert overskudd, AI foreslår 40% rabatt basert på tilgjengelighet og etterspørsel",
  },
  {
    id: "6",
    name: "Ferske Kyllingfileter",
    image: "/placeholder.svg?height=120&width=120",
    originalPrice: 69.9,
    discountedPrice: 41.9,
    expiryDate: "2025-06-15",
    daysUntilExpiry: 3,
    co2Saved: 1.8,
    weight: 0.5,
    category: "Kjøtt",
    aiReason: "Nærmer seg utløpsdato, AI foreslår 40% rabatt basert på historisk salg av kjøttprodukter",
  },
]

enum SimulationStep {
  INTRO = "intro",
  STORE = "store",
  CHECKOUT = "checkout",
  RECEIPT = "receipt",
}

export default function StoreSimulation() {
  const [step, setStep] = useState<SimulationStep>(SimulationStep.INTRO)
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([])
  const [showProductInfo, setShowProductInfo] = useState<string | null>(null)
  const [isScanning, setIsScanning] = useState(false)
  const [scanComplete, setScanComplete] = useState(false)
  const [showReceipt, setShowReceipt] = useState(false)
  const [animationTrigger, setAnimationTrigger] = useState(0)

  const totalSaved = selectedProducts.reduce(
    (acc, product) => acc + (product.originalPrice - product.discountedPrice),
    0,
  )

  const totalCO2Saved = selectedProducts.reduce((acc, product) => acc + product.co2Saved, 0)

  const totalWeight = selectedProducts.reduce((acc, product) => acc + product.weight, 0)

  useEffect(() => {
    if (step === SimulationStep.STORE) {
      setAnimationTrigger((prev) => prev + 1)
    }
  }, [step])

  const handleProductClick = (product: Product) => {
    setShowProductInfo(product.id)
  }

  const handleAddToCart = (product: Product) => {
    setSelectedProducts([...selectedProducts, product])
    setShowProductInfo(null)
    // Trigger wiggle animation on cart
    const cartElement = document.querySelector(".cart-wiggle")
    if (cartElement) {
      cartElement.classList.add("animate-wiggle")
      setTimeout(() => cartElement.classList.remove("animate-wiggle"), 1000)
    }
  }

  const handleRemoveFromCart = (productId: string) => {
    setSelectedProducts(selectedProducts.filter((p) => p.id !== productId))
  }

  const handleScanQrCode = () => {
    setIsScanning(true)
    setTimeout(() => {
      setScanComplete(true)
      setTimeout(() => {
        setShowReceipt(true)
      }, 1500)
    }, 3000)
  }

  const resetSimulation = () => {
    setStep(SimulationStep.INTRO)
    setSelectedProducts([])
    setShowProductInfo(null)
    setIsScanning(false)
    setScanComplete(false)
    setShowReceipt(false)
    setAnimationTrigger(0)
  }

  const formatPrice = (price: number) => {
    return price.toFixed(2).replace(".", ",") + " kr"
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("nb-NO")
  }

  return (
    <div className="w-full max-w-6xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-xl overflow-hidden">
      <div className="relative">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 animate-slide-in-left">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center animate-float">
                <ShoppingCartIcon />
              </div>
              <div>
                <h2 className="text-xl font-bold">Smarthylle Simulator</h2>
                <p className="text-sm text-blue-100">Opplev hvordan appen fungerer i butikken</p>
              </div>
            </div>
            {step !== SimulationStep.INTRO && (
              <div className="animate-slide-in-right">
                <SimpleButton
                  variant="outline"
                  size="sm"
                  onClick={resetSimulation}
                  className="text-white border-white/30 hover-scale"
                >
                  <div className="flex items-center">
                    <RefreshCwIcon />
                    <span className="ml-2">Start på nytt</span>
                  </div>
                </SimpleButton>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 md:p-6">
          {step === SimulationStep.INTRO && (
            <div className="text-center py-8 px-4 transition-all duration-300">
              <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-in">
                <ShoppingBagIcon className="w-10 h-10 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 animate-fade-in stagger-1">
                Opplev Smarthylle i butikken
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-lg mx-auto animate-fade-in stagger-2">
                Prøv vår interaktive simulering for å se hvordan Smarthylle hjelper deg å redde mat fra å bli kastet,
                spare penger og bidra til miljøet.
              </p>
              <div className="animate-fade-in stagger-3">
                <SimpleButton
                  size="lg"
                  onClick={() => setStep(SimulationStep.STORE)}
                  className="bg-blue-600 hover:bg-blue-700 text-white hover-lift"
                >
                  <div className="flex items-center">
                    <span>Start simulering</span>
                    <ArrowRightIcon className="ml-2" />
                  </div>
                </SimpleButton>
              </div>
            </div>
          )}

          {step === SimulationStep.STORE && (
            <div className="transition-all duration-300">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Butikkhylle */}
                <div className="flex-1">
                  <div className="mb-4 flex items-center justify-between animate-slide-in-left">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                      <span className="mr-2 text-blue-600">
                        <TagIcon />
                      </span>
                      Smarthylle Produkter
                    </h3>
                    <SimpleBadge variant="outline" className="flex items-center glass">
                      <span className="mr-1">
                        <ClockIcon />
                      </span>
                      <span>12. juni 2025</span>
                    </SimpleBadge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.map((product, index) => {
                      const ProductIcon = getProductIcon(product.name)
                      return (
                        <SimpleCard
                          key={product.id}
                          className={`relative overflow-hidden cursor-pointer transition-all hover:shadow-lg hover-lift animate-fade-in ${
                            selectedProducts.some((p) => p.id === product.id) ? "opacity-50 pointer-events-none" : ""
                          }`}
                          style={{ animationDelay: `${index * 100}ms` }}
                          onClick={() => handleProductClick(product)}
                        >
                          <div className="p-4">
                            <div className="flex justify-center mb-3">
                              <div className="w-24 h-24 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                                <ProductIcon className="w-16 h-16 text-gray-600 dark:text-gray-400" />
                              </div>
                            </div>
                            <h4 className="font-medium text-gray-900 dark:text-white mb-1">{product.name}</h4>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  Utløper: {formatDate(product.expiryDate)}
                                </p>
                                <div className="flex items-center mt-1">
                                  <span className="text-lg font-bold text-green-600 dark:text-green-400">
                                    {formatPrice(product.discountedPrice)}
                                  </span>
                                  <span className="text-sm text-gray-500 dark:text-gray-400 line-through ml-2">
                                    {formatPrice(product.originalPrice)}
                                  </span>
                                </div>
                              </div>
                              <SimpleBadge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 animate-pulse">
                                -
                                {Math.round(
                                  ((product.originalPrice - product.discountedPrice) / product.originalPrice) * 100,
                                )}
                                %
                              </SimpleBadge>
                            </div>
                          </div>
                          <div className="absolute top-2 right-2">
                            <SimpleBadge variant="outline" className="bg-blue-50 dark:bg-blue-900/20 text-xs glass">
                              <span className="mr-1 text-blue-500">
                                <SparklesIcon />
                              </span>
                              AI-pris
                            </SimpleBadge>
                          </div>
                        </SimpleCard>
                      )
                    })}
                  </div>
                </div>

                {/* Handlekurv */}
                <div className="w-full lg:w-80 flex-shrink-0 animate-slide-in-right">
                  <SimpleCard className="sticky top-4 cart-wiggle">
                    <div className="p-4 border-b">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
                        <span className="mr-2 text-blue-600">
                          <ShoppingCartIcon />
                        </span>
                        Din handlekurv
                        {selectedProducts.length > 0 && (
                          <SimpleBadge className="ml-2 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 animate-bounce-in">
                            {selectedProducts.length}
                          </SimpleBadge>
                        )}
                      </h3>
                    </div>
                    <div className="p-4 max-h-[400px] overflow-y-auto">
                      {selectedProducts.length === 0 ? (
                        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                          <div className="mx-auto mb-2 text-gray-300 dark:text-gray-600 animate-float">
                            <ShoppingCartIcon className="w-12 h-12 mx-auto" />
                          </div>
                          <p>Handlekurven er tom</p>
                          <p className="text-sm">Klikk på produkter for å legge dem til</p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {selectedProducts.map((product, index) => {
                            const ProductIcon = getProductIcon(product.name)
                            return (
                              <div
                                key={`${product.id}-${index}`}
                                className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0 animate-slide-in-left"
                                style={{ animationDelay: `${index * 100}ms` }}
                              >
                                <div className="flex items-center">
                                  <div className="w-10 h-10 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-center mr-3">
                                    <ProductIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">{product.name}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                      {formatPrice(product.discountedPrice)}
                                    </p>
                                  </div>
                                </div>
                                <SimpleButton
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 text-red-500 hover-scale"
                                  onClick={() => handleRemoveFromCart(product.id)}
                                >
                                  &times;
                                </SimpleButton>
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </div>
                    <div className="p-4 border-t bg-gray-50 dark:bg-gray-800">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600 dark:text-gray-300">Totalt:</span>
                        <span className="font-bold text-gray-900 dark:text-white">
                          {formatPrice(selectedProducts.reduce((acc, product) => acc + product.discountedPrice, 0))}
                        </span>
                      </div>
                      <div className="flex justify-between mb-4 text-sm">
                        <span className="text-gray-600 dark:text-gray-300">Du sparer:</span>
                        <span className="font-medium text-green-600 dark:text-green-400">
                          {formatPrice(totalSaved)}
                        </span>
                      </div>
                      <SimpleButton
                        className="w-full bg-blue-600 hover:bg-blue-700 hover-lift"
                        disabled={selectedProducts.length === 0}
                        onClick={() => setStep(SimulationStep.CHECKOUT)}
                      >
                        <div className="flex items-center justify-center">
                          <span>Gå til kassen</span>
                          <span className="ml-2">
                            <ArrowRightIcon />
                          </span>
                        </div>
                      </SimpleButton>
                    </div>
                  </SimpleCard>
                </div>
              </div>

              {/* Produkt info modal */}
              {showProductInfo && (
                <SimpleModal
                  isOpen={!!showProductInfo}
                  onClose={() => setShowProductInfo(null)}
                  title={products.find((p) => p.id === showProductInfo)?.name || ""}
                >
                  {(() => {
                    const product = products.find((p) => p.id === showProductInfo)!
                    const ProductIcon = getProductIcon(product.name)
                    return (
                      <>
                        <div className="flex justify-center mb-4 animate-scale-in">
                          <div className="w-32 h-32 bg-gray-50 dark:bg-gray-800 rounded-xl flex items-center justify-center">
                            <ProductIcon className="w-24 h-24 text-gray-600 dark:text-gray-400" />
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex justify-between items-center animate-fade-in stagger-1">
                            <div>
                              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                                {formatPrice(product.discountedPrice)}
                              </p>
                              <p className="text-gray-500 dark:text-gray-400 line-through">
                                {formatPrice(product.originalPrice)}
                              </p>
                            </div>
                            <SimpleBadge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-lg px-3 py-1 animate-pulse">
                              -
                              {Math.round(
                                ((product.originalPrice - product.discountedPrice) / product.originalPrice) * 100,
                              )}
                              %
                            </SimpleBadge>
                          </div>

                          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg glass animate-fade-in stagger-2">
                            <div className="flex items-center mb-2">
                              <span className="mr-2 text-blue-600">
                                <SparklesIcon />
                              </span>
                              <h4 className="font-medium text-blue-800 dark:text-blue-200">AI-generert pristilbud</h4>
                            </div>
                            <p className="text-sm text-blue-700 dark:text-blue-300">{product.aiReason}</p>
                          </div>

                          <div className="grid grid-cols-2 gap-3 text-sm">
                            {[
                              { label: "Kategori", value: product.category },
                              { label: "Utløpsdato", value: formatDate(product.expiryDate) },
                              { label: "Dager til utløp", value: `${product.daysUntilExpiry} dager` },
                              { label: "CO₂ spart", value: `${product.co2Saved.toFixed(1)} kg` },
                            ].map((item, index) => (
                              <div
                                key={item.label}
                                className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg animate-fade-in"
                                style={{ animationDelay: `${(index + 3) * 100}ms` }}
                              >
                                <p className="text-gray-500 dark:text-gray-400">{item.label}</p>
                                <p className="font-medium text-gray-900 dark:text-white">{item.value}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="border-t mt-4 pt-4 flex justify-end animate-fade-in stagger-6">
                          <SimpleButton variant="outline" className="mr-2" onClick={() => setShowProductInfo(null)}>
                            Avbryt
                          </SimpleButton>
                          <SimpleButton
                            className="bg-blue-600 hover:bg-blue-700 hover-lift"
                            onClick={() => handleAddToCart(product)}
                          >
                            <div className="flex items-center">
                              <span className="mr-2">
                                <ShoppingCartIcon />
                              </span>
                              Legg i handlekurv
                            </div>
                          </SimpleButton>
                        </div>
                      </>
                    )
                  })()}
                </SimpleModal>
              )}
            </div>
          )}

          {step === SimulationStep.CHECKOUT && (
            <div className="max-w-2xl mx-auto transition-all duration-300">
              <div className="flex items-center mb-6 animate-slide-in-left">
                <SimpleButton variant="ghost" size="sm" onClick={() => setStep(SimulationStep.STORE)} className="mr-4">
                  <div className="flex items-center">
                    <ChevronLeftIcon />
                    <span className="ml-1">Tilbake</span>
                  </div>
                </SimpleButton>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Betal ved kassen</h3>
              </div>

              <SimpleCard className="p-6 mb-6 animate-fade-in">
                <div className="text-center mb-6">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    Vis din Smarthylle-kode for å aktivere rabattene
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Skann QR-koden nedenfor for å registrere dine rabatter og redde mat fra å bli kastet
                  </p>

                  <div className="flex justify-center">
                    <AnimatedQRCode isScanning={isScanning} scanComplete={scanComplete} />
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                  <h5 className="font-medium text-gray-900 dark:text-white mb-3">Din handlekurv:</h5>
                  <div className="space-y-2 mb-4">
                    {selectedProducts.map((product, index) => (
                      <div
                        key={product.id}
                        className="flex justify-between text-sm animate-slide-in-left"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <span className="text-gray-600 dark:text-gray-300">{product.name}</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {formatPrice(product.discountedPrice)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-3 flex justify-between">
                    <span className="font-medium text-gray-900 dark:text-white">Totalt:</span>
                    <span className="font-bold text-gray-900 dark:text-white">
                      {formatPrice(selectedProducts.reduce((acc, product) => acc + product.discountedPrice, 0))}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-gray-600 dark:text-gray-300">Du sparer:</span>
                    <span className="font-medium text-green-600 dark:text-green-400">{formatPrice(totalSaved)}</span>
                  </div>
                </div>
              </SimpleCard>

              <div className="text-center animate-fade-in stagger-2">
                <SimpleButton
                  size="lg"
                  className={`bg-blue-600 hover:bg-blue-700 hover-lift ${
                    isScanning ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={isScanning}
                  onClick={handleScanQrCode}
                >
                  {isScanning ? (
                    <div className="flex items-center">
                      <span className="mr-2 animate-spin">
                        <RefreshCwIcon />
                      </span>
                      Skanner...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <span className="mr-2">
                        <QrCodeIcon />
                      </span>
                      Skann QR-kode
                    </div>
                  )}
                </SimpleButton>
              </div>

              {showReceipt && (
                <SimpleModal isOpen={showReceipt} onClose={() => {}} title="Kvittering">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-in">
                      <LeafIcon className="w-10 h-10 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 animate-fade-in stagger-1">
                      Takk for ditt kjøp!
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 animate-fade-in stagger-2">
                      Du har gjort en forskjell for miljøet og redusert matsvinn
                    </p>
                  </div>

                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 mb-6 glass animate-scale-in">
                    <h4 className="font-bold text-green-800 dark:text-green-200 mb-4 text-center">
                      Din miljøpåvirkning
                    </h4>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      {[
                        { value: `${totalCO2Saved.toFixed(1)} kg`, label: "CO₂ spart" },
                        { value: selectedProducts.length.toString(), label: "Varer reddet" },
                        { value: `${totalWeight.toFixed(1)} kg`, label: "Mat reddet" },
                        { value: formatPrice(totalSaved), label: "Penger spart" },
                      ].map((item, index) => (
                        <div
                          key={item.label}
                          className="animate-bounce-in"
                          style={{ animationDelay: `${index * 200}ms` }}
                        >
                          <p className="text-3xl font-bold text-green-600 dark:text-green-400">{item.value}</p>
                          <p className="text-sm text-green-700 dark:text-green-300">{item.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="text-center mb-6 animate-fade-in stagger-4">
                    <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      Du reddet {totalWeight.toFixed(1)} kg mat og {totalCO2Saved.toFixed(1)} kg CO₂!
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      Takk for at du gjør en forskjell for miljøet og samfunnet.
                    </p>
                  </div>

                  <div className="flex justify-center animate-fade-in stagger-5">
                    <SimpleButton
                      size="lg"
                      onClick={resetSimulation}
                      className="bg-blue-600 hover:bg-blue-700 hover-lift"
                    >
                      <div className="flex items-center">
                        <span className="mr-2">
                          <RefreshCwIcon />
                        </span>
                        Prøv igjen
                      </div>
                    </SimpleButton>
                  </div>
                </SimpleModal>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
