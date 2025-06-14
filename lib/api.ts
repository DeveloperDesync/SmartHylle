import type { User, Offer, Notification } from "@/types"

// For prototype: Use localStorage as primary storage
const USE_FIREBASE = false

// localStorage API functions
const localStorageAPI = {
  getUsers(): User[] {
    const users = localStorage.getItem("smarthylle-users")
    return users ? JSON.parse(users) : []
  },

  createUser(userData: Omit<User, "id">): User {
    const users = this.getUsers()

    // Check if username already exists
    if (users.find((u) => u.username === userData.username)) {
      throw new Error("Brukernavn eksisterer allerede")
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
      barcode:
        userData.barcode || `SH${userData.username.toUpperCase().slice(0, 3)}${Math.random().toString().slice(2, 8)}`,
    }

    users.push(newUser)
    localStorage.setItem("smarthylle-users", JSON.stringify(users))
    return newUser
  },

  updateUser(userId: string, updates: Partial<User>): void {
    const users = this.getUsers()
    const userIndex = users.findIndex((u) => u.id === userId)

    if (userIndex === -1) {
      throw new Error("Bruker ikke funnet")
    }

    users[userIndex] = { ...users[userIndex], ...updates }
    localStorage.setItem("smarthylle-users", JSON.stringify(users))
  },

  login(username: string, password: string): User {
    const users = this.getUsers()
    const user = users.find((u) => u.username === username)

    if (!user) {
      throw new Error("Brukernavn ikke funnet")
    }

    if (user.password !== password) {
      throw new Error("Feil passord")
    }

    if (user.banned) {
      throw new Error("Kontoen din er utestengt")
    }

    // Update last login
    this.updateUser(user.id!, { lastLogin: new Date().toISOString() })

    return { ...user, lastLogin: new Date().toISOString() }
  },

  getOffers(): Offer[] {
    const offers = localStorage.getItem("smarthylle-offers")
    return offers ? JSON.parse(offers) : []
  },

  createOffer(offerData: Omit<Offer, "id">): Offer {
    const offers = this.getOffers()

    const newOffer: Offer = {
      ...offerData,
      id: `offer_${Date.now()}`,
      createdAt: new Date().toISOString(),
    }

    offers.unshift(newOffer)
    localStorage.setItem("smarthylle-offers", JSON.stringify(offers))
    return newOffer
  },

  getNotifications(): Notification[] {
    const notifications = localStorage.getItem("smarthylle-notifications")
    return notifications ? JSON.parse(notifications) : []
  },

  createNotification(notificationData: Omit<Notification, "id" | "timestamp">): Notification {
    const notifications = this.getNotifications()

    const newNotification: Notification = {
      ...notificationData,
      id: `notification_${Date.now()}`,
      timestamp: new Date().toISOString(),
    }

    notifications.unshift(newNotification)
    // Keep only last 10 notifications
    const limitedNotifications = notifications.slice(0, 10)
    localStorage.setItem("smarthylle-notifications", JSON.stringify(limitedNotifications))
    return newNotification
  },

  initializeData(): void {
    // Check if data already exists
    const existingUsers = this.getUsers()
    if (existingUsers.length > 0) {
      console.log("Data already initialized")
      return
    }

    console.log("Initializing localStorage data...")

    // Create initial users
    const initialUsers = [
      { username: "bruker1", password: "pass1", role: "user", fullName: "Test Bruker 1" },
      { username: "bruker2", password: "pass2", role: "user", fullName: "Test Bruker 2" },
      { username: "bruker3", password: "pass3", role: "user", fullName: "Test Bruker 3" },
      { username: "bruker4", password: "pass4", role: "user", fullName: "Test Bruker 4" },
      { username: "bruker5", password: "pass5", role: "user", fullName: "Test Bruker 5" },
      { username: "admin1", password: "adminpass1", role: "admin", fullName: "Admin 1" },
      { username: "admin2", password: "adminpass2", role: "admin", fullName: "Admin 2" },
    ]

    for (const user of initialUsers) {
      this.createUser({
        ...user,
        itemsSaved: Math.floor(Math.random() * 50),
        warnings: [],
        favorites: [],
        banned: false,
      })
    }

    // Create initial offers
    const initialOffers = [
      {
        productName: "Økologisk melk",
        discount: 30,
        expiryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        description: "Fersk økologisk melk som utløper snart",
      },
      {
        productName: "Fersk laks",
        discount: 40,
        expiryDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        description: "Høykvalitets laks, perfekt for middag",
      },
      {
        productName: "Italiensk pasta",
        discount: 25,
        expiryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        description: "Autentisk italiensk pasta på tilbud",
      },
    ]

    for (const offer of initialOffers) {
      this.createOffer(offer)
    }

    // Create initial notifications
    const initialNotifications = [
      {
        productName: "Økologisk melk",
        discount: 30,
        description: "Ny rabatt tilgjengelig på økologisk melk!",
      },
      {
        productName: "Fersk laks",
        discount: 40,
        description: "Stor rabatt på fersk laks - ikke gå glipp av dette!",
      },
    ]

    for (const notification of initialNotifications) {
      this.createNotification(notification)
    }

    console.log("localStorage data initialized successfully")
  },
}

// Export API functions
export const userAPI = {
  async login(username: string, password: string): Promise<User> {
    return localStorageAPI.login(username, password)
  },

  async getUsers(): Promise<User[]> {
    return localStorageAPI.getUsers()
  },

  async createUser(userData: Omit<User, "id">): Promise<User> {
    return localStorageAPI.createUser(userData)
  },

  async updateUser(id: string, updates: Partial<User>): Promise<User> {
    localStorageAPI.updateUser(id, updates)
    const users = localStorageAPI.getUsers()
    const updatedUser = users.find((u) => u.id === id)
    if (!updatedUser) {
      throw new Error("User not found after update")
    }
    return updatedUser
  },
}

export const offersAPI = {
  async getOffers(): Promise<Offer[]> {
    return localStorageAPI.getOffers()
  },

  async createOffer(offerData: Omit<Offer, "id">): Promise<Offer> {
    return localStorageAPI.createOffer(offerData)
  },
}

export const notificationsAPI = {
  async getNotifications(): Promise<Notification[]> {
    return localStorageAPI.getNotifications()
  },

  async createNotification(notificationData: Omit<Notification, "id" | "timestamp">): Promise<Notification> {
    return localStorageAPI.createNotification(notificationData)
  },
}

export const initAPI = {
  async initializeData(): Promise<void> {
    localStorageAPI.initializeData()
  },
}
