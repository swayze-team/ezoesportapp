"use client"

import { useState, useEffect } from "react"
import { LoginPage } from "@/components/login-page"
import { Dashboard } from "@/components/dashboard"

export default function Home() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check Discord OAuth callback
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get("code")

    if (code) {
      // Exchange code for user data
      fetch(`/api/auth/discord/callback?code=${code}`)
        .then((res) => res.json())
        .then((userData) => {
          if (userData.id) {
            setUser(userData)
            localStorage.setItem("eoz_user", JSON.stringify(userData))
            // Clean URL
            window.history.replaceState({}, document.title, "/")
          }
        })
        .catch(console.error)
        .finally(() => setLoading(false))
    } else {
      // Check if user is already logged in
      const storedUser = localStorage.getItem("eoz_user")
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
      setLoading(false)
    }
  }, [])

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem("eoz_user")
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
            <div className="absolute inset-0 animate-ping rounded-full h-16 w-16 border border-primary opacity-20"></div>
          </div>
          <p className="text-foreground font-semibold text-lg">Connexion en cours...</p>
        </div>
      </div>
    )
  }

  return user ? <Dashboard user={user} onLogout={handleLogout} /> : <LoginPage />
}
