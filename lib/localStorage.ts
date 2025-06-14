import type { User, Offer, Notification } from "@/types"

const STORAGE_KEYS = {
  USERS: "smarthylle-users",
  OFFERS: "smarthylle-offers",
  NOTIFICATIONS: "smarthylle-notifications",
  INITIALIZED: "smarthylle-initialized",
}

// User functions
export function getUsers(): User[] {
  if (typeof window === "undefined") return []

  try {
    const stored = localStorage.getItem(STORAGE_KEYS.USERS)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error("Error getting users from localStorage:", error)
    return []
  }
}

export function createUser(userData: Omit<User, "id">): User {
  const users = getUsers()

  // Check if username already exists
  if (users.some((u) => u.username === userData.username)) {
    throw new Error("Username already exists")
  }

  const newUser: User = {
    ...userData,
    id: `user_${Date.now()}`,
    createdAt: new Date().toISOString(),
    lastLogin: null,
    warnings: userData.warnings || [],
    banned: userData.banned || false,
    favorites: userData.favorites || [],
    itemsSaved: userData.itemsSaved || 0,
  }

  const updatedUsers = [...users, newUser]
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(updatedUsers))

  return newUser
}

export function updateUser(userId: string, updates: Partial<User>): void {
  const users = getUsers()
  const userIndex = users.findIndex((u) => u.id === userId)

  if (userIndex === -1) {
    throw new Error("User not found")
  }

  users[userIndex] = { ...users[userIndex], ...updates }
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users))
}

// Offer functions
export function getOffers(): Offer[] {
  if (typeof window === "undefined") return []

  try {
    const stored = localStorage.getItem(STORAGE_KEYS.OFFERS)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error("Error getting offers from localStorage:", error)
    return []
  }
}

export function createOffer(offerData: Omit<Offer, "id">): Offer {
  const offers = getOffers()

  const newOffer: Offer = {
    ...offerData,
    id: `offer_${Date.now()}`,
    createdAt: new Date().toISOString(),
  }

  const updatedOffers = [newOffer, ...offers]
  localStorage.setItem(STORAGE_KEYS.OFFERS, JSON.stringify(updatedOffers))

  return newOffer
}

// Notification functions
export function getNotifications(): Notification[] {
  if (typeof window === "undefined") return []

  try {
    const stored = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error("Error getting notifications from localStorage:", error)
    return []
  }
}

export function createNotification(notificationData: Omit<Notification, "id" | "timestamp">): Notification {
  const notifications = getNotifications()

  const newNotification: Notification = {
    ...notificationData,
    id: `notification_${Date.now()}`,
    timestamp: new Date().toISOString(),
  }

  const updatedNotifications = [newNotification, ...notifications.slice(0, 9)] // Keep only 10 most recent
  localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(updatedNotifications))

  return newNotification
}

// Initialize data
export function initializeLocalData(): void {
  if (typeof window === "undefined") return

  const isInitialized = localStorage.getItem(STORAGE_KEYS.INITIALIZED)
  if (isInitialized) {
    console.log("LocalStorage already initialized")
    return
  }

  console.log("Initializing localStorage with test data...")

  // Initialize users
  const initialUsers: User[] = [
    {
      id: "user_1",
      username: "bruker1",
      password: "pass1",
      role: "user",
      fullName: "Test Bruker 1",
      itemsSaved: 15,
      warnings: [],
      favorites: [],
      banned: false,
      barcode: "SHBRU123456",
      createdAt: new Date().toISOString(),
      lastLogin: null,
    },
    {
      id: "user_2",
      username: "bruker2",
      password: "pass2",
      role: "user",
      fullName: "Test Bruker 2",
      itemsSaved: 8,
      warnings: [],
      favorites: [],
      banned: false,
      barcode: "SHBRU234567",
      createdAt: new Date().toISOString(),
      lastLogin: null,
    },
    {
      id: "user_3",
      username: "bruker3",
      password: "pass3",
      role: "user",
      fullName: "Test Bruker 3",
      itemsSaved: 23,
      warnings: [],
      favorites: [],
      banned: false,
      barcode: "SHBRU345678",
      createdAt: new Date().toISOString(),
      lastLogin: null,
    },
    {
      id: "admin_1",
      username: "admin1",
      password: "adminpass1",
      role: "admin",
      fullName: "Admin 1",
      itemsSaved: 0,
      warnings: [],
      favorites: [],
      banned: false,
      barcode: "SHADM123456",
      createdAt: new Date().toISOString(),
      lastLogin: null,
    },
    {
      id: "admin_2",
      username: "admin2",
      password: "adminpass2",
      role: "admin",
      fullName: "Admin 2",
      itemsSaved: 0,
      warnings: [],
      favorites: [],
      banned: false,
      barcode: "SHADM234567",
      createdAt: new Date().toISOString(),
      lastLogin: null,
    },
  ]

  // Initialize offers
  const initialOffers: Offer[] = [
    {
      id: "offer_1",
      productName: "Økologisk melk",
      discount: 30,
      expiryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      description: "Fersk økologisk melk som utløper snart",
      createdAt: new Date().toISOString(),
    },
    {
      id: "offer_2",
      productName: "Fersk laks",
      discount: 40,
      expiryDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      description: "Høykvalitets laks med kort holdbarhet",
      createdAt: new Date().toISOString(),
    },
  ]

  // Initialize notifications
  const initialNotifications: Notification[] = [
    {
      id: "notification_1",
      productName: "Italiensk pasta",
      discount: 25,
      description: "Ny rabatt på italiensk pasta!",
      timestamp: new Date().toISOString(),
    },
  ]

  // Save to localStorage
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(initialUsers))
  localStorage.setItem(STORAGE_KEYS.OFFERS, JSON.stringify(initialOffers))
  localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(initialNotifications))
  localStorage.setItem(STORAGE_KEYS.INITIALIZED, "true")

  console.log("LocalStorage initialization completed")
}
