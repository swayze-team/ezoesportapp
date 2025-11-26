import { type NextRequest, NextResponse } from "next/server"

// In-memory storage (replace with database in production)
const ticketsStore = new Map<string, any[]>()

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const token = searchParams.get("token")

  if (!token) {
    return NextResponse.json({ error: "Token required" }, { status: 400 })
  }

  const userTickets = ticketsStore.get(token) || []
  return NextResponse.json({ tickets: userTickets })
}

export async function POST(request: NextRequest) {
  try {
    const { ticket, userToken } = await request.json()

    if (!userToken || !ticket) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const userTickets = ticketsStore.get(userToken) || []
    userTickets.push(ticket)
    ticketsStore.set(userToken, userTickets)

    // Here you would normally:
    // 1. Save to database
    // 2. Send notification to admins
    // 3. Send confirmation email to user

    console.log("[v0] New ticket created:", ticket.id)

    return NextResponse.json({ success: true, ticket })
  } catch (error) {
    console.error("[v0] Error creating ticket:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
