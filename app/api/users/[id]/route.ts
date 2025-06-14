import { type NextRequest, NextResponse } from "next/server"
import { getFirebaseAdmin } from "@/lib/firebase-admin"

// GET - Hent spesifikk bruker
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { db } = getFirebaseAdmin()
    const userDoc = await db.collection("users").doc(params.id).get()

    if (!userDoc.exists) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ id: userDoc.id, ...userDoc.data() })
  } catch (error) {
    console.error("Error fetching user:", error)
    return NextResponse.json({ error: "Failed to fetch user", details: error }, { status: 500 })
  }
}

// PUT - Oppdater bruker
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { db } = getFirebaseAdmin()
    const updates = await request.json()

    await db
      .collection("users")
      .doc(params.id)
      .update({
        ...updates,
        updatedAt: new Date().toISOString(),
      })

    const updatedDoc = await db.collection("users").doc(params.id).get()
    return NextResponse.json({ id: updatedDoc.id, ...updatedDoc.data() })
  } catch (error) {
    console.error("Error updating user:", error)
    return NextResponse.json({ error: "Failed to update user", details: error }, { status: 500 })
  }
}

// DELETE - Slett bruker
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { db } = getFirebaseAdmin()
    await db.collection("users").doc(params.id).delete()
    return NextResponse.json({ message: "User deleted successfully" })
  } catch (error) {
    console.error("Error deleting user:", error)
    return NextResponse.json({ error: "Failed to delete user", details: error }, { status: 500 })
  }
}
