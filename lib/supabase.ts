import { createClient } from "@supabase/supabase-js"
import type { User, Notification, Offer } from "@/types"

const supabaseUrl = "https://jadejiusjhyviorllqlz.supabase.co"
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImphZGVqaXVzamh5dmlvcmxscWx6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwMTUyOTYsImV4cCI6MjA2NTU5MTI5Nn0.SzNgJ5wepmlP6856fxyve5pYlI89t6JrmgVgyQYo_Go"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
})

// Database types
export interface DatabaseUser {
  id: string
  username: string
  password: string
  role: "user" | "admin"
  full_name?: string
  banned: boolean
  favorites: string[]
  barcode?: string
  items_saved: number
  created_at: string
  last_login?: string
  updated_at: string
}

export interface DatabaseWarning {
  id: string
  user_id: string
  message: string
  read: boolean
  type: "warning" | "items_update"
  created_at: string
}

export interface DatabaseOffer {
  id: string
  product_name: string
  discount: number
  expiry_date: string
  description: string
  ai_suggested: boolean
  approved: boolean
  created_at: string
}

export interface DatabaseNotification {
  id: string
  product_name: string
  discount: number
  description: string
  created_at: string
}

// Helper functions to convert between database and app types
export function dbUserToAppUser(dbUser: DatabaseUser, warnings: DatabaseWarning[] = []): User {
  return {
    id: dbUser.id,
    username: dbUser.username,
    password: dbUser.password,
    role: dbUser.role,
    fullName: dbUser.full_name,
    banned: dbUser.banned,
    favorites: dbUser.favorites,
    barcode: dbUser.barcode,
    itemsSaved: dbUser.items_saved,
    createdAt: dbUser.created_at,
    lastLogin: dbUser.last_login,
    updatedAt: dbUser.updated_at,
    warnings: warnings.map((w) => ({
      id: w.id,
      message: w.message,
      read: w.read,
      type: w.type,
      timestamp: w.created_at,
    })),
  }
}

export function dbOfferToAppOffer(dbOffer: DatabaseOffer): Offer {
  return {
    id: dbOffer.id,
    productName: dbOffer.product_name,
    discount: dbOffer.discount,
    expiryDate: dbOffer.expiry_date,
    description: dbOffer.description,
    aiSuggested: dbOffer.ai_suggested,
    approved: dbOffer.approved,
    createdAt: dbOffer.created_at,
  }
}

export function dbNotificationToAppNotification(dbNotification: DatabaseNotification): Notification {
  return {
    id: dbNotification.id,
    productName: dbNotification.product_name,
    discount: dbNotification.discount,
    description: dbNotification.description,
    timestamp: dbNotification.created_at,
  }
}

// API functions
export const supabaseAPI = {
  // Users
  async getUsers(): Promise<User[]> {
    const { data: users, error: usersError } = await supabase
      .from("users")
      .select("*")
      .order("created_at", { ascending: false })

    if (usersError) throw usersError

    const { data: warnings, error: warningsError } = await supabase.from("warnings").select("*")

    if (warningsError) throw warningsError

    return users.map((user) => {
      const userWarnings = warnings.filter((w) => w.user_id === user.id)
      return dbUserToAppUser(user, userWarnings)
    })
  },

  async getUserById(id: string): Promise<User | null> {
    const { data: user, error: userError } = await supabase.from("users").select("*").eq("id", id).single()

    if (userError) {
      if (userError.code === "PGRST116") return null
      throw userError
    }

    const { data: warnings, error: warningsError } = await supabase.from("warnings").select("*").eq("user_id", id)

    if (warningsError) throw warningsError

    return dbUserToAppUser(user, warnings || [])
  },

  async login(username: string, password: string): Promise<User> {
    const { data: user, error } = await supabase.from("users").select("*").eq("username", username).single()

    if (error) {
      if (error.code === "PGRST116") {
        throw new Error("Brukernavn ikke funnet")
      }
      throw error
    }

    if (user.password !== password) {
      throw new Error("Feil passord")
    }

    if (user.banned) {
      throw new Error("Kontoen din er utestengt")
    }

    // Update last login
    await supabase.from("users").update({ last_login: new Date().toISOString() }).eq("id", user.id)

    // Get warnings
    const { data: warnings } = await supabase.from("warnings").select("*").eq("user_id", user.id)

    return dbUserToAppUser({ ...user, last_login: new Date().toISOString() }, warnings || [])
  },

  async createUser(userData: Omit<User, "id" | "warnings">): Promise<User> {
    const { data, error } = await supabase
      .from("users")
      .insert({
        username: userData.username,
        password: userData.password,
        role: userData.role,
        full_name: userData.fullName,
        banned: userData.banned || false,
        favorites: userData.favorites || [],
        barcode:
          userData.barcode || `SH${userData.username.toUpperCase().slice(0, 3)}${Math.random().toString().slice(2, 8)}`,
        items_saved: userData.itemsSaved || 0,
      })
      .select()
      .single()

    if (error) {
      if (error.code === "23505") {
        throw new Error("Brukernavn eksisterer allerede")
      }
      throw error
    }

    return dbUserToAppUser(data)
  },

  async updateUser(id: string, updates: Partial<User>): Promise<User> {
    const dbUpdates: any = {}

    if (updates.banned !== undefined) dbUpdates.banned = updates.banned
    if (updates.favorites !== undefined) dbUpdates.favorites = updates.favorites
    if (updates.itemsSaved !== undefined) dbUpdates.items_saved = updates.itemsSaved
    if (updates.lastLogin !== undefined) dbUpdates.last_login = updates.lastLogin

    dbUpdates.updated_at = new Date().toISOString()

    const { data, error } = await supabase.from("users").update(dbUpdates).eq("id", id).select().single()

    if (error) throw error

    // Get warnings
    const { data: warnings } = await supabase.from("warnings").select("*").eq("user_id", id)

    return dbUserToAppUser(data, warnings || [])
  },

  // Warnings
  async addWarning(userId: string, message: string, type: "warning" | "items_update" = "warning"): Promise<void> {
    console.log("🚨 Adding warning to user:", userId, message)
    const { error } = await supabase.from("warnings").insert({
      user_id: userId,
      message,
      type,
      read: false,
    })

    if (error) {
      console.error("❌ Failed to add warning:", error)
      throw error
    }
    console.log("✅ Warning added successfully")
  },

  async markWarningsAsRead(userId: string): Promise<void> {
    const { error } = await supabase.from("warnings").update({ read: true }).eq("user_id", userId).eq("read", false)

    if (error) throw error
  },

  // Offers
  async getOffers(): Promise<Offer[]> {
    const { data, error } = await supabase.from("offers").select("*").order("created_at", { ascending: false })

    if (error) throw error

    return data.map(dbOfferToAppOffer)
  },

  async createOffer(offerData: Omit<Offer, "id">): Promise<Offer> {
    const { data, error } = await supabase
      .from("offers")
      .insert({
        product_name: offerData.productName,
        discount: offerData.discount,
        expiry_date: offerData.expiryDate,
        description: offerData.description,
        ai_suggested: offerData.aiSuggested || false,
        approved: offerData.approved !== false,
      })
      .select()
      .single()

    if (error) throw error

    return dbOfferToAppOffer(data)
  },

  async deleteOffer(id: string): Promise<void> {
    const { error } = await supabase.from("offers").delete().eq("id", id)

    if (error) throw error
  },

  // Notifications
  async getNotifications(): Promise<Notification[]> {
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10)

    if (error) throw error

    return data.map(dbNotificationToAppNotification)
  },

  async createNotification(notificationData: Omit<Notification, "id" | "timestamp">): Promise<Notification> {
    console.log("📢 Creating notification:", notificationData)
    const { data, error } = await supabase
      .from("notifications")
      .insert({
        product_name: notificationData.productName,
        discount: notificationData.discount,
        description: notificationData.description,
      })
      .select()
      .single()

    if (error) {
      console.error("❌ Failed to create notification:", error)
      throw error
    }

    console.log("✅ Notification created successfully")
    return dbNotificationToAppNotification(data)
  },
}

// Real-time subscriptions with better error handling
export function subscribeToUserUpdates(userId: string, callback: (user: User) => void) {
  console.log("🔄 Setting up user subscription for:", userId)

  const channel = supabase
    .channel(`user-updates-${userId}`)
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "users",
        filter: `id=eq.${userId}`,
      },
      async (payload) => {
        console.log("📡 User update received:", payload)
        try {
          const user = await supabaseAPI.getUserById(userId)
          if (user) {
            console.log("✅ User data refreshed, calling callback")
            callback(user)
          }
        } catch (error) {
          console.error("❌ Failed to refresh user data:", error)
        }
      },
    )
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "warnings",
        filter: `user_id=eq.${userId}`,
      },
      async (payload) => {
        console.log("🚨 New warning received:", payload)
        try {
          const user = await supabaseAPI.getUserById(userId)
          if (user) {
            console.log("✅ User data refreshed with new warning")
            callback(user)
          }
        } catch (error) {
          console.error("❌ Failed to refresh user data after warning:", error)
        }
      },
    )
    .subscribe((status) => {
      console.log("📡 User subscription status:", status)
    })

  return () => {
    console.log("🔌 Unsubscribing from user updates")
    supabase.removeChannel(channel)
  }
}

export function subscribeToNotifications(callback: (notifications: Notification[]) => void) {
  console.log("🔄 Setting up notifications subscription")

  const channel = supabase
    .channel("notifications-updates")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "notifications",
      },
      async (payload) => {
        console.log("📢 New notification received:", payload)
        try {
          const notifications = await supabaseAPI.getNotifications()
          console.log("✅ Notifications refreshed")
          callback(notifications)
        } catch (error) {
          console.error("❌ Failed to refresh notifications:", error)
        }
      },
    )
    .subscribe((status) => {
      console.log("📡 Notifications subscription status:", status)
    })

  return () => {
    console.log("🔌 Unsubscribing from notifications")
    supabase.removeChannel(channel)
  }
}

// Test real-time connection
export async function testRealtimeConnection(): Promise<boolean> {
  return new Promise((resolve) => {
    const channel = supabase.channel("test-connection").subscribe((status) => {
      console.log("🧪 Real-time test status:", status)
      if (status === "SUBSCRIBED") {
        supabase.removeChannel(channel)
        resolve(true)
      } else if (status === "CLOSED" || status === "CHANNEL_ERROR") {
        supabase.removeChannel(channel)
        resolve(false)
      }
    })

    // Timeout after 5 seconds
    setTimeout(() => {
      supabase.removeChannel(channel)
      resolve(false)
    }, 5000)
  })
}
