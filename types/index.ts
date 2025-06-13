export interface User {
  username: string
  password: string
  role: "user" | "admin"
  banned?: boolean
  warnings?: Warning[]
  favorites?: string[]
  barcode?: string
  itemsSaved?: number
}

export interface Warning {
  id: string
  message: string
  timestamp: string
  read: boolean
  type?: "warning" | "items_update"
}

export interface Offer {
  id: string
  productName: string
  discount: number
  expiryDate: string
  description: string
  aiSuggested?: boolean
  approved?: boolean
}

export interface Notification {
  id: string
  productName: string
  discount: number
  description: string
  timestamp: string
}

export interface AIRecommendation {
  id: string
  productName: string
  currentPrice: number
  suggestedDiscount: number
  reason: string
  timestamp: string
  approved?: boolean
  rejected?: boolean
}

export interface LeaderboardEntry {
  username: string
  itemsSaved: number
  rank: number
  prize?: string
}
