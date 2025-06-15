import { supabaseAPI } from "@/lib/supabase"
import { localStorageAsyncAPI } from "@/lib/localStorage"
import type { User, Notification, Offer } from "@/types"

// Check if Supabase is available and tables exist
let useSupabase = false

async function checkSupabaseAvailability() {
  try {
    await supabaseAPI.getUsers()
    useSupabase = true
    console.log("✅ Supabase is available and configured")
    return true
  } catch (error) {
    console.warn("⚠️ Supabase not available, falling back to localStorage:", error)
    useSupabase = false
    return false
  }
}

// Initialize and check which storage to use
export async function initializeStorage() {
  const supabaseAvailable = await checkSupabaseAvailability()

  if (!supabaseAvailable) {
    // Initialize localStorage as fallback
    await localStorageAsyncAPI.initializeData()
  }

  return supabaseAvailable
}

// Unified API that automatically chooses between Supabase and localStorage
export const userAPI = {
  async getUsers(): Promise<User[]> {
    if (useSupabase) {
      try {
        return await supabaseAPI.getUsers()
      } catch (error) {
        console.warn("Supabase failed, falling back to localStorage:", error)
        useSupabase = false
        return await localStorageAsyncAPI.getUsers()
      }
    }
    return await localStorageAsyncAPI.getUsers()
  },

  async getUserById(id: string): Promise<User | null> {
    if (useSupabase) {
      try {
        return await supabaseAPI.getUserById(id)
      } catch (error) {
        console.warn("Supabase failed, falling back to localStorage:", error)
        useSupabase = false
        return await localStorageAsyncAPI.getUserById(id)
      }
    }
    return await localStorageAsyncAPI.getUserById(id)
  },

  async login(username: string, password: string): Promise<User> {
    if (useSupabase) {
      try {
        return await supabaseAPI.login(username, password)
      } catch (error) {
        console.warn("Supabase login failed, trying localStorage:", error)
        useSupabase = false
        return await localStorageAsyncAPI.login(username, password)
      }
    }
    return await localStorageAsyncAPI.login(username, password)
  },

  async createUser(userData: Omit<User, "id" | "warnings">): Promise<User> {
    if (useSupabase) {
      try {
        return await supabaseAPI.createUser(userData)
      } catch (error) {
        console.warn("Supabase failed, falling back to localStorage:", error)
        useSupabase = false
        return await localStorageAsyncAPI.createUser(userData)
      }
    }
    return await localStorageAsyncAPI.createUser(userData)
  },

  async updateUser(id: string, updates: Partial<User>): Promise<User> {
    if (useSupabase) {
      try {
        return await supabaseAPI.updateUser(id, updates)
      } catch (error) {
        console.warn("Supabase failed, falling back to localStorage:", error)
        useSupabase = false
        return await localStorageAsyncAPI.updateUser(id, updates)
      }
    }
    return await localStorageAsyncAPI.updateUser(id, updates)
  },
}

export const offersAPI = {
  async getOffers(): Promise<Offer[]> {
    if (useSupabase) {
      try {
        return await supabaseAPI.getOffers()
      } catch (error) {
        console.warn("Supabase failed, falling back to localStorage:", error)
        useSupabase = false
        return await localStorageAsyncAPI.getOffers()
      }
    }
    return await localStorageAsyncAPI.getOffers()
  },

  async createOffer(offerData: Omit<Offer, "id">): Promise<Offer> {
    if (useSupabase) {
      try {
        return await supabaseAPI.createOffer(offerData)
      } catch (error) {
        console.warn("Supabase failed, falling back to localStorage:", error)
        useSupabase = false
        return await localStorageAsyncAPI.createOffer(offerData)
      }
    }
    return await localStorageAsyncAPI.createOffer(offerData)
  },

  async deleteOffer(id: string): Promise<void> {
    if (useSupabase) {
      try {
        return await supabaseAPI.deleteOffer(id)
      } catch (error) {
        console.warn("Supabase failed, falling back to localStorage:", error)
        useSupabase = false
        return await localStorageAsyncAPI.deleteOffer(id)
      }
    }
    return await localStorageAsyncAPI.deleteOffer(id)
  },
}

export const notificationsAPI = {
  async getNotifications(): Promise<Notification[]> {
    if (useSupabase) {
      try {
        return await supabaseAPI.getNotifications()
      } catch (error) {
        console.warn("Supabase failed, falling back to localStorage:", error)
        useSupabase = false
        return await localStorageAsyncAPI.getNotifications()
      }
    }
    return await localStorageAsyncAPI.getNotifications()
  },

  async createNotification(notificationData: Omit<Notification, "id" | "timestamp">): Promise<Notification> {
    if (useSupabase) {
      try {
        return await supabaseAPI.createNotification(notificationData)
      } catch (error) {
        console.warn("Supabase failed, falling back to localStorage:", error)
        useSupabase = false
        return await localStorageAsyncAPI.createNotification(notificationData)
      }
    }
    return await localStorageAsyncAPI.createNotification(notificationData)
  },
}

// Legacy API for backward compatibility
export const initAPI = {
  async initializeData() {
    return await initializeStorage()
  },
}

// Export current storage type for debugging
export function getCurrentStorageType(): "supabase" | "localStorage" {
  return useSupabase ? "supabase" : "localStorage"
}
