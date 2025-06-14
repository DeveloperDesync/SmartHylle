"use client"

import { useState, useEffect } from "react"
import type { User, Notification, Offer, Warning, AIRecommendation } from "@/types"
import LoginScreen from "@/components/LoginScreen"
import UserScreen from "@/components/UserScreen"
import AdminScreen from "@/components/AdminScreen"
import WarningModal from "@/components/WarningModal"
import Loading from "@/components/Loading"
import { ThemeProvider } from "@/contexts/ThemeContext"
import { userAPI, offersAPI, notificationsAPI, initAPI } from "@/lib/api"

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
  const [initError, setInitError] = useState<string | null>(null)
  const [loginError, setLoginError] = useState<string>("")

  useEffect(() => {
    initializeApp()
  }, [])

  const initializeApp = async () => {
    setIsInitializing(true)
    setInitError(null)

    try {
      console.log("Starting app initialization...")

      // Initialize localStorage data
      await initAPI.initializeData()
      console.log("localStorage data initialization completed")

      // Load data
      await loadData()
      console.log("Data loading completed")

      // Check for remembered user
      const rememberedUser = localStorage.getItem("smarthylle-remembered-user")
      if (rememberedUser) {
        try {
          const userData = JSON.parse(rememberedUser)
          const user = await userAPI.login(userData.username, userData.password)
          setCurrentUser(user)
          console.log("Auto-login successful")
        } catch (error) {
          console.warn("Auto-login failed:", error)
          localStorage.removeItem("smarthylle-remembered-user")
        }
      }

      // Simulate AI recommendations
      const aiInterval = setInterval(() => {
        if (Math.random() > 0.7) {
          generateAIRecommendation()
        }
      }, 30000)

      setIsInitializing(false)
      console.log("App initialization completed successfully")

      return () => clearInterval(aiInterval)
    } catch (error) {
      console.error("Failed to initialize app:", error)
      setInitError(error instanceof Error ? error.message : "Ukjent feil oppstod")
      setIsInitializing(false)
    }
  }

  const loadData = async () => {
    try {
      console.log("Loading data from localStorage...")

      // Load data in parallel but handle errors individually
      const results = await Promise.allSettled([
        userAPI.getUsers(),
        offersAPI.getOffers(),
        notificationsAPI.getNotifications(),
      ])

      // Handle users
      if (results[0].status === "fulfilled") {
        setUsers(results[0].value)
        console.log("Users loaded:", results[0].value.length)
      } else {
        console.error("Failed to load users:", results[0].reason)
        setUsers([]) // Set empty array as fallback
      }

      // Handle offers
      if (results[1].status === "fulfilled") {
        setOffers(results[1].value)
        console.log("Offers loaded:", results[1].value.length)
      } else {
        console.error("Failed to load offers:", results[1].reason)
        setOffers([]) // Set empty array as fallback
      }

      // Handle notifications
      if (results[2].status === "fulfilled") {
        setNotifications(results[2].value)
        console.log("Notifications loaded:", results[2].value.length)
      } else {
        console.error("Failed to load notifications:", results[2].reason)
        setNotifications([]) // Set empty array as fallback
      }
    } catch (error) {
      console.error("Failed to load data:", error)
      // Don't throw error, just log it and continue with empty arrays
    }
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

    setAiRecommendations((prev) => [recommendation, ...prev.slice(0, 9)])
  }

  const handleLogin = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    setLoginError("")

    try {
      const user = await userAPI.login(username, password)

      // Check for unread warnings
      const unreadWarnings = user.warnings?.filter((warning: Warning) => !warning.read) || []
      if (unreadWarnings.length > 0) {
        setPendingWarnings(unreadWarnings)
        setShowWarningModal(true)

        // Mark warnings as read
        const updatedWarnings = user.warnings?.map((warning: Warning) => ({ ...warning, read: true })) || []
        if (user.id) {
          await userAPI.updateUser(user.id, { warnings: updatedWarnings })
        }

        user.warnings = updatedWarnings
      }

      setCurrentUser(user)

      // Remember user if selected
      if (rememberMe) {
        localStorage.setItem("smarthylle-remembered-user", JSON.stringify({ username, password }))
      }

      // Refresh users list to get latest data
      await loadData()

      setIsLoading(false)
      return true
    } catch (error) {
      console.error("Login failed:", error)
      const errorMessage = error instanceof Error ? error.message : "Innlogging feilet"
      setLoginError(errorMessage)
      setIsLoading(false)
      return false
    }
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setViewAsUser(false)
    setLoginError("")
    localStorage.removeItem("smarthylle-remembered-user")
  }

  const handleAddNotification = async (notification: Omit<Notification, "id" | "timestamp">) => {
    try {
      const newNotification = await notificationsAPI.createNotification(notification)
      setNotifications((prev) => [newNotification, ...prev.slice(0, 9)])
    } catch (error) {
      console.error("Failed to add notification:", error)
    }
  }

  const handleAddUser = async (newUser: Omit<User, "warnings" | "banned" | "favorites" | "barcode" | "id">) => {
    try {
      const userWithDefaults = {
        ...newUser,
        itemsSaved: 0,
        barcode: `SH${newUser.username.toUpperCase().slice(0, 3)}${Math.random().toString().slice(2, 8)}`,
      }

      const createdUser = await userAPI.createUser(userWithDefaults)
      setUsers((prev) => [...prev, createdUser])
      return true
    } catch (error) {
      console.error("Failed to add user:", error)
      return false
    }
  }

  const handleWarnUser = async (username: string, message: string) => {
    try {
      const user = users.find((u) => u.username === username)
      if (!user || !user.id) return

      const warning = {
        id: Date.now().toString(),
        message,
        timestamp: new Date().toISOString(),
        read: false,
      }

      const updatedWarnings = [...(user.warnings || []), warning]
      await userAPI.updateUser(user.id, { warnings: updatedWarnings })

      // Update local state
      setUsers((prev) => prev.map((u) => (u.id === user.id ? { ...u, warnings: updatedWarnings } : u)))
    } catch (error) {
      console.error("Failed to warn user:", error)
    }
  }

  const handleBanUser = async (username: string, banned: boolean) => {
    try {
      const user = users.find((u) => u.username === username)
      if (!user || !user.id) return

      await userAPI.updateUser(user.id, { banned })

      setUsers((prev) => prev.map((u) => (u.id === user.id ? { ...u, banned } : u)))
    } catch (error) {
      console.error("Failed to ban user:", error)
    }
  }

  const handleRemoveOffer = async (offerId: string) => {
    // For now just remove from local state - can implement DELETE API later
    setOffers((prev) => prev.filter((offer) => offer.id !== offerId))
  }

  const handleToggleFavorite = async (offerId: string) => {
    if (!currentUser || !currentUser.id) return

    try {
      const updatedFavorites = currentUser.favorites?.includes(offerId)
        ? currentUser.favorites.filter((id) => id !== offerId)
        : [...(currentUser.favorites || []), offerId]

      await userAPI.updateUser(currentUser.id, { favorites: updatedFavorites })

      const updatedUser = { ...currentUser, favorites: updatedFavorites }
      setCurrentUser(updatedUser)

      // Update users array too
      setUsers((prev) => prev.map((u) => (u.id === currentUser.id ? updatedUser : u)))
    } catch (error) {
      console.error("Failed to toggle favorite:", error)
    }
  }

  const handleApproveAIRecommendation = async (recommendationId: string, approved: boolean) => {
    setAiRecommendations((prev) =>
      prev.map((rec) => (rec.id === recommendationId ? { ...rec, approved, rejected: !approved } : rec)),
    )

    if (approved) {
      const recommendation = aiRecommendations.find((rec) => rec.id === recommendationId)
      if (recommendation) {
        try {
          const newOffer = {
            productName: recommendation.productName,
            discount: recommendation.suggestedDiscount,
            expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
            description: `AI-foreslått tilbud: ${recommendation.reason}`,
            aiSuggested: true,
            approved: true,
          }

          const createdOffer = await offersAPI.createOffer(newOffer)
          setOffers((prev) => [createdOffer, ...prev])
        } catch (error) {
          console.error("Failed to create offer from AI recommendation:", error)
        }
      }
    }
  }

  const handleAddItemsToUser = async (username: string, itemsToAdd: number) => {
    try {
      const user = users.find((u) => u.username === username)
      if (!user || !user.id) return

      const newItemsSaved = (user.itemsSaved || 0) + itemsToAdd

      // Send message to user
      const message = `🎉 Gratulerer! Du har reddet ${itemsToAdd} ${itemsToAdd === 1 ? "vare" : "varer"} fra å bli kastet. Totalt har du nå reddet ${newItemsSaved} varer!`
      const warning = {
        id: Date.now().toString(),
        message,
        timestamp: new Date().toISOString(),
        read: false,
        type: "items_update" as const,
      }

      const updatedWarnings = [...(user.warnings || []), warning]

      await userAPI.updateUser(user.id, {
        itemsSaved: newItemsSaved,
        warnings: updatedWarnings,
      })

      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? { ...u, itemsSaved: newItemsSaved, warnings: updatedWarnings } : u)),
      )
    } catch (error) {
      console.error("Failed to add items to user:", error)
    }
  }

  const handleRemoveItemsFromUser = async (username: string, itemsToRemove: number) => {
    try {
      const user = users.find((u) => u.username === username)
      if (!user || !user.id) return

      const currentItems = user.itemsSaved || 0
      if (itemsToRemove > currentItems) return

      const newItemsSaved = Math.max(0, currentItems - itemsToRemove)

      // Send message to user
      const message = `⚠️ ${itemsToRemove} ${itemsToRemove === 1 ? "vare har" : "varer har"} blitt fjernet fra din konto av en administrator. Du har nå totalt ${newItemsSaved} reddet ${newItemsSaved === 1 ? "vare" : "varer"}. Kontakt oss hvis du mener dette er en feil.`
      const warning = {
        id: Date.now().toString(),
        message,
        timestamp: new Date().toISOString(),
        read: false,
        type: "items_update" as const,
      }

      const updatedWarnings = [...(user.warnings || []), warning]

      await userAPI.updateUser(user.id, {
        itemsSaved: newItemsSaved,
        warnings: updatedWarnings,
      })

      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? { ...u, itemsSaved: newItemsSaved, warnings: updatedWarnings } : u)),
      )
    } catch (error) {
      console.error("Failed to remove items from user:", error)
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
          <p className="text-gray-600 dark:text-gray-400">Starter Smarthylle...</p>
          {initError && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg max-w-md">
              <p className="text-red-800 text-sm font-medium">Feil ved oppstart:</p>
              <p className="text-red-600 text-sm">{initError}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-2 px-4 py-2 bg-red-600 text-white rounded text-sm hover:bg-red-700"
              >
                Prøv igjen
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }

  if (isLoading) {
    return <Loading />
  }

  if (!currentUser) {
    return (
      <LoginScreen
        onLogin={handleLogin}
        rememberMe={rememberMe}
        onRememberMeChange={setRememberMe}
        loginError={loginError}
      />
    )
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
