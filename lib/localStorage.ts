import type { User, Notification, Offer, AIRecommendation } from "@/types"

// Lokal lagring nøkler
const STORAGE_KEYS = {
  USERS: "smarthylle-users",
  NOTIFICATIONS: "smarthylle-notifications",
  OFFERS: "smarthylle-offers",
  AI_RECOMMENDATIONS: "smarthylle-ai-recommendations",
}

// Initialiser med standard data hvis ikke eksisterer
export function initializeLocalStorage() {
  if (typeof window === "undefined") return

  // Initialiser brukere
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    const defaultUsers: User[] = [
      // Vanlige brukere
      {
        username: "bruker1",
        password: "pass1",
        role: "user",
        itemsSaved: 45,
        warnings: [],
        banned: false,
        favorites: [],
        barcode: "SH001123456",
      },
      {
        username: "bruker2",
        password: "pass2",
        role: "user",
        itemsSaved: 32,
        warnings: [],
        banned: false,
        favorites: [],
        barcode: "SH002123456",
      },
      {
        username: "bruker3",
        password: "pass3",
        role: "user",
        itemsSaved: 67,
        warnings: [],
        banned: false,
        favorites: [],
        barcode: "SH003123456",
      },
      {
        username: "bruker4",
        password: "pass4",
        role: "user",
        itemsSaved: 23,
        warnings: [],
        banned: false,
        favorites: [],
        barcode: "SH004123456",
      },
      {
        username: "bruker5",
        password: "pass5",
        role: "user",
        itemsSaved: 89,
        warnings: [],
        banned: false,
        favorites: [],
        barcode: "SH005123456",
      },
      {
        username: "bruker6",
        password: "pass6",
        role: "user",
        itemsSaved: 12,
        warnings: [],
        banned: false,
        favorites: [],
        barcode: "SH006123456",
      },
      {
        username: "bruker7",
        password: "pass7",
        role: "user",
        itemsSaved: 56,
        warnings: [],
        banned: false,
        favorites: [],
        barcode: "SH007123456",
      },
      {
        username: "bruker8",
        password: "pass8",
        role: "user",
        itemsSaved: 78,
        warnings: [],
        banned: false,
        favorites: [],
        barcode: "SH008123456",
      },
      {
        username: "bruker9",
        password: "pass9",
        role: "user",
        itemsSaved: 34,
        warnings: [],
        banned: false,
        favorites: [],
        barcode: "SH009123456",
      },
      {
        username: "bruker10",
        password: "pass10",
        role: "user",
        itemsSaved: 91,
        warnings: [],
        banned: false,
        favorites: [],
        barcode: "SH010123456",
      },

      // Admin brukere
      {
        username: "admin1",
        password: "adminpass1",
        role: "admin",
        itemsSaved: 0,
        warnings: [],
        banned: false,
        favorites: [],
        barcode: "SHA001123456",
      },
      {
        username: "admin2",
        password: "adminpass2",
        role: "admin",
        itemsSaved: 0,
        warnings: [],
        banned: false,
        favorites: [],
        barcode: "SHA002123456",
      },
      {
        username: "admin3",
        password: "adminpass3",
        role: "admin",
        itemsSaved: 0,
        warnings: [],
        banned: false,
        favorites: [],
        barcode: "SHA003123456",
      },
      {
        username: "admin4",
        password: "adminpass4",
        role: "admin",
        itemsSaved: 0,
        warnings: [],
        banned: false,
        favorites: [],
        barcode: "SHA004123456",
      },
      {
        username: "admin5",
        password: "adminpass5",
        role: "admin",
        itemsSaved: 0,
        warnings: [],
        banned: false,
        favorites: [],
        barcode: "SHA005123456",
      },
    ]
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(defaultUsers))
  }

  // Initialiser tilbud
  if (!localStorage.getItem(STORAGE_KEYS.OFFERS)) {
    const defaultOffers: Offer[] = [
      {
        id: "1",
        productName: "Økologiske epler",
        discount: 30,
        expiryDate: "2024-12-20",
        description: "Ferske økologiske epler som utløper snart",
      },
      {
        id: "2",
        productName: "Fullkornbrød",
        discount: 50,
        expiryDate: "2024-12-18",
        description: "Hjemmebakt fullkornbrød med kort holdbarhet",
      },
      {
        id: "3",
        productName: "Yoghurt naturell",
        discount: 25,
        expiryDate: "2024-12-22",
        description: "Kremete naturell yoghurt på tilbud",
      },
      {
        id: "4",
        productName: "Bananer",
        discount: 40,
        expiryDate: "2024-12-19",
        description: "Modne bananer perfekte for smoothie",
      },
      {
        id: "5",
        productName: "Laks filet",
        discount: 35,
        expiryDate: "2024-12-21",
        description: "Fersk laksfilet med kort holdbarhet",
      },
    ]
    localStorage.setItem(STORAGE_KEYS.OFFERS, JSON.stringify(defaultOffers))
  }

  // Initialiser varsler
  if (!localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)) {
    const defaultNotifications: Notification[] = []
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(defaultNotifications))
  }

  // Initialiser AI-anbefalinger
  if (!localStorage.getItem(STORAGE_KEYS.AI_RECOMMENDATIONS)) {
    const defaultAIRecommendations: AIRecommendation[] = []
    localStorage.setItem(STORAGE_KEYS.AI_RECOMMENDATIONS, JSON.stringify(defaultAIRecommendations))
  }
}

// Bruker-funksjoner
export function getUsers(): User[] {
  if (typeof window === "undefined") return []
  const users = localStorage.getItem(STORAGE_KEYS.USERS)
  return users ? JSON.parse(users) : []
}

export function saveUsers(users: User[]) {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users))
}

export function getUser(username: string): User | null {
  const users = getUsers()
  return users.find((user) => user.username === username) || null
}

export function updateUser(username: string, updates: Partial<User>) {
  const users = getUsers()
  const updatedUsers = users.map((user) => (user.username === username ? { ...user, ...updates } : user))
  saveUsers(updatedUsers)
}

export function addUser(newUser: User): boolean {
  const users = getUsers()
  if (users.find((user) => user.username === newUser.username)) {
    return false // Bruker eksisterer allerede
  }
  users.push(newUser)
  saveUsers(users)
  return true
}

// Tilbud-funksjoner
export function getOffers(): Offer[] {
  if (typeof window === "undefined") return []
  const offers = localStorage.getItem(STORAGE_KEYS.OFFERS)
  return offers ? JSON.parse(offers) : []
}

export function saveOffers(offers: Offer[]) {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEYS.OFFERS, JSON.stringify(offers))
}

export function addOffer(offer: Offer) {
  const offers = getOffers()
  offers.unshift(offer)
  saveOffers(offers)
}

export function removeOffer(offerId: string) {
  const offers = getOffers()
  const filteredOffers = offers.filter((offer) => offer.id !== offerId)
  saveOffers(filteredOffers)
}

// Varsling-funksjoner
export function getNotifications(): Notification[] {
  if (typeof window === "undefined") return []
  const notifications = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)
  return notifications ? JSON.parse(notifications) : []
}

export function saveNotifications(notifications: Notification[]) {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications))
}

export function addNotification(notification: Notification) {
  const notifications = getNotifications()
  notifications.unshift(notification)
  // Behold bare de siste 10 varslene
  if (notifications.length > 10) {
    notifications.splice(10)
  }
  saveNotifications(notifications)
}

// AI-anbefalinger funksjoner
export function getAIRecommendations(): AIRecommendation[] {
  if (typeof window === "undefined") return []
  const recommendations = localStorage.getItem(STORAGE_KEYS.AI_RECOMMENDATIONS)
  return recommendations ? JSON.parse(recommendations) : []
}

export function saveAIRecommendations(recommendations: AIRecommendation[]) {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEYS.AI_RECOMMENDATIONS, JSON.stringify(recommendations))
}

export function addAIRecommendation(recommendation: AIRecommendation) {
  const recommendations = getAIRecommendations()
  recommendations.unshift(recommendation)
  // Behold bare de siste 10 anbefalingene
  if (recommendations.length > 10) {
    recommendations.splice(10)
  }
  saveAIRecommendations(recommendations)
}

export function updateAIRecommendation(id: string, updates: Partial<AIRecommendation>) {
  const recommendations = getAIRecommendations()
  const updatedRecommendations = recommendations.map((rec) => (rec.id === id ? { ...rec, ...updates } : rec))
  saveAIRecommendations(updatedRecommendations)
}
