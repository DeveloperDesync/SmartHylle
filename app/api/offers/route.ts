import { type NextRequest, NextResponse } from "next/server"
import { getFirebaseAdmin } from "@/lib/firebase-admin"
import type { Offer } from "@/types"

// GET - Hent alle tilbud
export async function GET() {
  try {
    const { db } = getFirebaseAdmin()
    const offersSnapshot = await db.collection("offers").orderBy("createdAt", "desc").get()
    const offers: Offer[] = []

    offersSnapshot.forEach((doc) => {
      offers.push({ id: doc.id, ...doc.data() } as Offer)
    })

    return NextResponse.json(offers)
  } catch (error) {
    console.error("Error fetching offers:", error)
    return NextResponse.json({ error: "Failed to fetch offers", details: error }, { status: 500 })
  }
}

// POST - Opprett nytt tilbud
export async function POST(request: NextRequest) {
  try {
    const { db } = getFirebaseAdmin()
    const offerData = await request.json()

    const newOffer: Omit<Offer, "id"> = {
      ...offerData,
      createdAt: new Date().toISOString(),
    }

    const docRef = await db.collection("offers").add(newOffer)

    return NextResponse.json({ id: docRef.id, ...newOffer })
  } catch (error) {
    console.error("Error creating offer:", error)
    return NextResponse.json({ error: "Failed to create offer", details: error }, { status: 500 })
  }
}
