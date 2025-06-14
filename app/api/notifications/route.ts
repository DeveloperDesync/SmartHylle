import { type NextRequest, NextResponse } from "next/server"
import { getFirebaseAdmin } from "@/lib/firebase-admin"
import type { Notification } from "@/types"

// GET - Hent alle varsler
export async function GET() {
  try {
    const { db } = getFirebaseAdmin()
    const notificationsSnapshot = await db.collection("notifications").orderBy("timestamp", "desc").limit(10).get()
    const notifications: Notification[] = []

    notificationsSnapshot.forEach((doc) => {
      notifications.push({ id: doc.id, ...doc.data() } as Notification)
    })

    return NextResponse.json(notifications)
  } catch (error) {
    console.error("Error fetching notifications:", error)
    return NextResponse.json({ error: "Failed to fetch notifications", details: error }, { status: 500 })
  }
}

// POST - Opprett nytt varsel
export async function POST(request: NextRequest) {
  try {
    const { db } = getFirebaseAdmin()
    const notificationData = await request.json()

    const newNotification: Omit<Notification, "id"> = {
      ...notificationData,
      timestamp: new Date().toISOString(),
    }

    const docRef = await db.collection("notifications").add(newNotification)

    return NextResponse.json({ id: docRef.id, ...newNotification })
  } catch (error) {
    console.error("Error creating notification:", error)
    return NextResponse.json({ error: "Failed to create notification", details: error }, { status: 500 })
  }
}
