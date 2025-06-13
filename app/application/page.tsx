"use client"

import { useState, useEffect } from "react"
import type { User, Notification, Offer, Warning, AIRecommendation } from "@/types"
import LoginScreen from "@/components/LoginScreen"
import UserScreen from "@/components/UserScreen"
import AdminScreen from "@/components/AdminScreen"
import WarningModal from "@/components/WarningModal"
import Loading from "@/components/Loading"
import { ThemeProvider } from "@/contexts/ThemeContext"
import * as storage from "@/lib/localStorage"

function SmarthylleAppContent() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [offers, setOffers] = useState<Offer[]>([])
  const [aiRecommendations, setAiRecommendations] = useState<AIRecommendation[]>([])
  const [viewAsUser, setViewAsUser] = useState(false)
  const [showWarningModal, setShowWarningModal] = useState(false)
  const [pendingWarnings, setPendingWarnings] = useState<Warning[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isInitializing, setIsInitializing] = useState(true)

  useEffect(() => {
    initializeApp()
  }, [])

  const initializeApp = () => {
    setIsInitializing(true)

    // Initialiser lokal lagring
    storage.initializeLocalStorage()

    // Last inn data
    loadData()

    // Sjekk for husket bruker
    const rememberedUser = localStorage.getItem("smarthylle-remembered-user")
    if (rememberedUser) {
      const userData = JSON.parse(rememberedUser)
      const user = storage.getUser(userData.username)
      if (user) {
        const { password, ...userWithoutPassword } = user
        setCurrentUser(userWithoutPassword as User)
      }
    }

    // Simuler AI-anbefalinger
    const aiInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        generateAIRecommendation()
      }
    }, 30000)

    setIsInitializing(false)

    return () => clearInterval(aiInterval)
  }

  const loadData = () => {
    setUsers(storage.getUsers())
    setOffers(storage.getOffers())
    setNotifications(storage.getNotifications())
    setAiRecommendations(storage.getAIRecommendations())
  }

  const generateAIRecommendation = () => {
    const products = ["Økologisk melk", "Fersk laks", "Italiensk pasta", "Norske jordbær", "Hjemmebakt brød"]
    const reasons = [
      "Produktet nærmer seg utløpsdato",
      "Høy lagerbeholdning detektert",
      "Sesongbasert etterspørsel synker",
      "Konkurrerende produkter har lavere pris",
      "AI forutsier redusert salg neste uke",
    ]

    const recommendation: AIRecommendation = {
      id: Date.now().toString(),
      productName: products[Math.floor(Math.random() * products.length)],
      currentPrice: Math.floor(Math.random() * 100) + 20,
      suggestedDiscount: Math.floor(Math.random() * 40) + 10,
      reason: reasons[Math.floor(Math.random() * reasons.length)],
      timestamp: new Date().toISOString(),
    }

    storage.addAIRecommendation(recommendation)
    setAiRecommendations(storage.getAIRecommendations())
  }

  const handleLogin = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simuler lasting
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const user = storage.getUser(username)
    if (user && user.password === password && !user.banned) {
      // Sjekk for uleste advarsler
      const unreadWarnings = user.warnings?.filter((warning: Warning) => !warning.read) || []
      if (unreadWarnings.length > 0) {
        setPendingWarnings(unreadWarnings)
        setShowWarningModal(true)

        // Marker advarsler som lest
        const updatedWarnings = user.warnings?.map((warning: Warning) => ({ ...warning, read: true })) || []
        storage.updateUser(username, { warnings: updatedWarnings })

        const updatedUser = { ...user, warnings: updatedWarnings }
        const { password: _, ...userWithoutPassword } = updatedUser
        setCurrentUser(userWithoutPassword as User)
      } else {
        const { password: _, ...userWithoutPassword } = user
        setCurrentUser(userWithoutPassword as User)
      }

      // Husk bruker hvis valgt
      if (rememberMe) {
        localStorage.setItem("smarthylle-remembered-user", JSON.stringify({ username }))
      }

      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setViewAsUser(false)
    localStorage.removeItem("smarthylle-remembered-user")
  }

  const handleAddNotification = (notification: Omit<Notification, "id" | "timestamp">) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    }
    storage.addNotification(newNotification)
    setNotifications(storage.getNotifications())
  }

  const handleAddUser = (newUser: Omit<User, "warnings" | "banned" | "favorites" | "barcode">) => {
    const userWithDefaults: User = {
      ...newUser,
      warnings: [],
      banned: false,
      favorites: [],
      barcode: `SH${newUser.username.toUpperCase().slice(0, 3)}${Math.random().toString().slice(2, 8)}`,
      itemsSaved: 0,
    }

    const success = storage.addUser(userWithDefaults)
    if (success) {
      setUsers(storage.getUsers())
    }
    return success
  }

  const handleWarnUser = (username: string, message: string) => {
    const warning = {
      id: Date.now().toString(),
      message,
      timestamp: new Date().toISOString(),
      read: false,
    }

    const user = storage.getUser(username)
    if (user) {
      const updatedWarnings = [...(user.warnings || []), warning]
      storage.updateUser(username, { warnings: updatedWarnings })
      setUsers(storage.getUsers())
    }
  }

  const handleBanUser = (username: string, banned: boolean) => {
    storage.updateUser(username, { banned })
    setUsers(storage.getUsers())
  }

  const handleRemoveOffer = (offerId: string) => {
    storage.removeOffer(offerId)
    setOffers(storage.getOffers())
  }

  const handleToggleFavorite = (offerId: string) => {
    if (!currentUser) return

    const updatedFavorites = currentUser.favorites?.includes(offerId)
      ? currentUser.favorites.filter((id) => id !== offerId)
      : [...(currentUser.favorites || []), offerId]

    storage.updateUser(currentUser.username, { favorites: updatedFavorites })

    const updatedUser = { ...currentUser, favorites: updatedFavorites }
    setCurrentUser(updatedUser)
    setUsers(storage.getUsers())
  }

  const handleApproveAIRecommendation = (recommendationId: string, approved: boolean) => {
    storage.updateAIRecommendation(recommendationId, { approved, rejected: !approved })
    setAiRecommendations(storage.getAIRecommendations())

    if (approved) {
      const recommendation = aiRecommendations.find((rec) => rec.id === recommendationId)
      if (recommendation) {
        const newOffer: Offer = {
          id: `ai-${Date.now()}`,
          productName: recommendation.productName,
          discount: recommendation.suggestedDiscount,
          expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          description: `AI-foreslått tilbud: ${recommendation.reason}`,
          aiSuggested: true,
          approved: true,
        }
        storage.addOffer(newOffer)
        setOffers(storage.getOffers())
      }
    }
  }

  const handleAddItemsToUser = (username: string, itemsToAdd: number) => {
    const user = storage.getUser(username)
    if (user) {
      const newItemsSaved = (user.itemsSaved || 0) + itemsToAdd
      storage.updateUser(username, { itemsSaved: newItemsSaved })

      // Send melding til brukeren
      const message = `🎉 Gratulerer! Du har reddet ${itemsToAdd} ${itemsToAdd === 1 ? "vare" : "varer"} fra å bli kastet. Totalt har du nå reddet ${newItemsSaved} varer!`
      const warning = {
        id: Date.now().toString(),
        message,
        timestamp: new Date().toISOString(),
        read: false,
        type: "items_update" as const,
      }

      const updatedWarnings = [...(user.warnings || []), warning]
      storage.updateUser(username, { warnings: updatedWarnings })

      setUsers(storage.getUsers())
    }
  }

  const handleRemoveItemsFromUser = (username: string, itemsToRemove: number) => {
    const user = storage.getUser(username)
    if (user) {
      const currentItems = user.itemsSaved || 0

      if (itemsToRemove > currentItems) {
        return
      }

      const newItemsSaved = Math.max(0, currentItems - itemsToRemove)
      storage.updateUser(username, { itemsSaved: newItemsSaved })

      // Send melding til brukeren
      const message = `⚠️ ${itemsToRemove} ${itemsToRemove === 1 ? "vare har" : "varer har"} blitt fjernet fra din konto av en administrator. Du har nå totalt ${newItemsSaved} reddet ${newItemsSaved === 1 ? "vare" : "varer"}. Kontakt oss hvis du mener dette er en feil.`
      const warning = {
        id: Date.now().toString(),
        message,
        timestamp: new Date().toISOString(),
        read: false,
        type: "items_update" as const,
      }

      const updatedWarnings = [...(user.warnings || []), warning]
      storage.updateUser(username, { warnings: updatedWarnings })

      setUsers(storage.getUsers())
    }
  }

  const toggleViewAsUser = () => {
    setViewAsUser(!viewAsUser)
  }

  const closeWarningModal = () => {
    setShowWarningModal(false)
    setPendingWarnings([])
  }

  if (isInitializing) {
    return (
      <div className="fixed inset-0 bg-white dark:bg-gray-900 flex items-center justify-center z-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Laster inn appen...</p>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return <Loading />
  }

  if (!currentUser) {
    return <LoginScreen onLogin={handleLogin} rememberMe={rememberMe} onRememberMeChange={setRememberMe} />
  }

  return (
    <>
      {showWarningModal && <WarningModal warnings={pendingWarnings} onClose={closeWarningModal} />}

      {currentUser.role === "admin" && !viewAsUser ? (
        <AdminScreen
          user={currentUser}
          users={users}
          offers={offers}
          aiRecommendations={aiRecommendations}
          onLogout={handleLogout}
          onAddNotification={handleAddNotification}
          onAddUser={handleAddUser}
          onWarnUser={handleWarnUser}
          onBanUser={handleBanUser}
          onRemoveOffer={handleRemoveOffer}
          onViewAsUser={toggleViewAsUser}
          onApproveAIRecommendation={handleApproveAIRecommendation}
          onAddItemsToUser={handleAddItemsToUser}
          onRemoveItemsFromUser={handleRemoveItemsFromUser}
        />
      ) : (
        <UserScreen
          user={currentUser}
          users={users}
          notifications={notifications}
          offers={offers}
          isAdminPreview={viewAsUser}
          onLogout={viewAsUser ? toggleViewAsUser : handleLogout}
          onToggleFavorite={handleToggleFavorite}
        />
      )}
    </>
  )
}

export default function ApplicationPage() {
  return (
    <ThemeProvider>
      <SmarthylleAppContent />
    </ThemeProvider>
  )
}
