import { type NextRequest, NextResponse } from "next/server"
import { getFirebaseAdmin } from "@/lib/firebase-admin"

export async function POST(request: NextRequest) {
  try {
    const { db } = getFirebaseAdmin()
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json({ error: "Brukernavn og passord er påkrevd" }, { status: 400 })
    }

    // Find user by username
    const usersSnapshot = await db.collection("users").where("username", "==", username).get()

    if (usersSnapshot.empty) {
      return NextResponse.json({ error: "Ugyldig brukernavn eller passord" }, { status: 401 })
    }

    const userDoc = usersSnapshot.docs[0]
    const userData = userDoc.data()

    // Check password
    if (userData.password !== password) {
      return NextResponse.json({ error: "Ugyldig brukernavn eller passord" }, { status: 401 })
    }

    // Check if user is banned
    if (userData.banned) {
      return NextResponse.json({ error: "Brukeren er utestengt" }, { status: 403 })
    }

    // Update last login
    await userDoc.ref.update({
      lastLogin: new Date().toISOString(),
    })

    const user = { id: userDoc.id, ...userData }
    return NextResponse.json(user)
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Innlogging feilet", details: error }, { status: 500 })
  }
}
