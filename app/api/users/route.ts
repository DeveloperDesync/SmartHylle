import { type NextRequest, NextResponse } from "next/server"
import { getFirebaseAdmin } from "@/lib/firebase-admin"
import type { User } from "@/types"

// GET - Hent alle brukere
export async function GET() {
  try {
    const { db } = getFirebaseAdmin()
    const usersSnapshot = await db.collection("users").get()
    const users: User[] = []

    usersSnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() } as User)
    })

    return NextResponse.json(users)
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json({ error: "Failed to fetch users", details: error }, { status: 500 })
  }
}

// POST - Opprett ny bruker
export async function POST(request: NextRequest) {
  try {
    const { db } = getFirebaseAdmin()
    const userData = await request.json()

    // Sjekk om brukernavn allerede eksisterer
    const existingUser = await db.collection("users").where("username", "==", userData.username).get()
    if (!existingUser.empty) {
      return NextResponse.json({ error: "Username already exists" }, { status: 400 })
    }

    // Opprett ny bruker
    const newUser: Omit<User, "id"> = {
      username: userData.username,
      password: userData.password, // I produksjon bør dette hashe
      role: userData.role || "user",
      itemsSaved: 0,
      warnings: [],
      banned: false,
      favorites: [],
      barcode: `SH${userData.username.toUpperCase().slice(0, 3)}${Math.random().toString().slice(2, 8)}`,
      createdAt: new Date().toISOString(),
      lastLogin: null,
    }

    const docRef = await db.collection("users").add(newUser)

    return NextResponse.json({ id: docRef.id, ...newUser })
  } catch (error) {
    console.error("Error creating user:", error)
    return NextResponse.json({ error: "Failed to create user", details: error }, { status: 500 })
  }
}
