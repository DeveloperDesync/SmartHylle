import { NextResponse } from "next/server"
import { getFirebaseAdmin } from "@/lib/firebase-admin"
import type { User, Offer } from "@/types"

// POST - Initialiser database med testdata
export async function POST() {
  try {
    const { db } = getFirebaseAdmin()

    // Sjekk om data allerede eksisterer
    const usersSnapshot = await db.collection("users").limit(1).get()
    if (!usersSnapshot.empty) {
      return NextResponse.json({ message: "Data already initialized" })
    }

    console.log("Initializing test data...")

    // Opprett testbrukere
    const testUsers: Omit<User, "id">[] = [
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
        createdAt: new Date().toISOString(),
        lastLogin: null,
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
        createdAt: new Date().toISOString(),
        lastLogin: null,
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
        createdAt: new Date().toISOString(),
        lastLogin: null,
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
        createdAt: new Date().toISOString(),
        lastLogin: null,
      },
    ]

    // Legg til brukere i batch
    const batch = db.batch()
    testUsers.forEach((user) => {
      const userRef = db.collection("users").doc()
      batch.set(userRef, user)
    })

    // Opprett testtilbud
    const testOffers: Omit<Offer, "id">[] = [
      {
        productName: "Økologiske epler",
        discount: 30,
        expiryDate: "2024-12-20",
        description: "Ferske økologiske epler som utløper snart",
        createdAt: new Date().toISOString(),
      },
      {
        productName: "Fullkornbrød",
        discount: 50,
        expiryDate: "2024-12-18",
        description: "Hjemmebakt fullkornbrød med kort holdbarhet",
        aiSuggested: true,
        approved: true,
        createdAt: new Date().toISOString(),
      },
    ]

    testOffers.forEach((offer) => {
      const offerRef = db.collection("offers").doc()
      batch.set(offerRef, offer)
    })

    await batch.commit()

    console.log("Test data initialized successfully")
    return NextResponse.json({ message: "Test data initialized successfully" })
  } catch (error) {
    console.error("Error initializing data:", error)
    return NextResponse.json({ error: "Failed to initialize data", details: error }, { status: 500 })
  }
}
