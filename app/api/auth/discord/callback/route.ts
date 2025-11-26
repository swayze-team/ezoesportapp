import { type NextRequest, NextResponse } from "next/server"

const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID || ""
const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET || ""
const REDIRECT_URI = process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI || "http://localhost:3000"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get("code")

  if (!code) {
    return NextResponse.json({ error: "No code provided" }, { status: 400 })
  }

  try {
    // Exchange code for access token
    const tokenResponse = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: DISCORD_CLIENT_ID,
        client_secret: DISCORD_CLIENT_SECRET,
        grant_type: "authorization_code",
        code: code,
        redirect_uri: REDIRECT_URI,
      }),
    })

    const tokenData = await tokenResponse.json()

    if (!tokenData.access_token) {
      return NextResponse.json({ error: "Failed to get access token" }, { status: 400 })
    }

    // Get user data
    const userResponse = await fetch("https://discord.com/api/users/@me", {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    })

    const userData = await userResponse.json()

    // Redirect to home with user data in URL
    const redirectUrl = new URL("/", request.url)
    redirectUrl.searchParams.set("code", "success")

    const response = NextResponse.redirect(redirectUrl)
    response.cookies.set("discord_user", JSON.stringify(userData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return response
  } catch (error) {
    console.error("Discord OAuth error:", error)
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}
