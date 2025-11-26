"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function LoginPage() {
  const handleDiscordLogin = () => {
    const redirectUri = `${window.location.origin}/api/auth/discord/callback`
    const clientId = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID

    if (!clientId) {
      console.error("[v0] Discord Client ID not configured")
      alert("Configuration Discord manquante. Veuillez configurer NEXT_PUBLIC_DISCORD_CLIENT_ID")
      return
    }

    const discordAuthUrl = `https://discord.com/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=identify%20email%20guilds`

    console.log("[v0] Redirecting to Discord OAuth:", discordAuthUrl)
    window.location.href = discordAuthUrl
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4 sm:p-6 md:p-8 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(6,182,212,0.12),transparent_70%)] animate-pulse-glow"></div>
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(236,72,153,0.12),transparent_60%)] animate-pulse-glow"
          style={{ animationDelay: "1s" }}
        ></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(6,182,212,0.03)_50%,transparent_100%)]"></div>
      </div>

      <Card className="relative w-full max-w-md sm:max-w-lg p-8 sm:p-12 glass-card-strong shadow-2xl animate-slide-in">
        <div className="text-center space-y-8">
          <div className="flex items-center justify-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary blur-3xl opacity-40 rounded-full animate-pulse-glow group-hover:opacity-60 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent blur-2xl opacity-30 rounded-full animate-gradient"></div>
              <div className="relative bg-gradient-to-br from-primary via-primary/90 to-accent p-12 rounded-3xl shadow-2xl border border-primary/30 border-glow group-hover:scale-105 transition-all duration-500 animate-float">
                <svg
                  className="w-24 h-24 text-primary-foreground drop-shadow-2xl"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent text-balance animate-gradient bg-[length:200%_auto] tracking-tight text-display">
              EOZ ESPORT
            </h1>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-12 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
              <p className="text-muted-foreground font-bold text-lg sm:text-xl tracking-wide uppercase">
                Elite Gaming Platform
              </p>
              <div className="h-px w-12 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed text-pretty px-2 sm:px-6">
            Rejoignez la plateforme professionnelle EOZ Esport. Statistiques Fortnite en temps réel, chat d'équipe
            sécurisé, système de support dédié, analytics avancées et bien plus encore.
          </p>

          <Button
            onClick={handleDiscordLogin}
            className="w-full h-16 sm:h-18 text-base sm:text-lg font-bold bg-[#5865F2] hover:bg-[#4752C4] text-white shadow-2xl hover:shadow-[#5865F2]/50 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 rounded-2xl border-2 border-[#5865F2]/50 hover:border-[#5865F2]"
          >
            <div className="flex items-center justify-center gap-4">
              <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
              <span className="tracking-wide">Se connecter avec Discord</span>
            </div>
          </Button>

          <div className="pt-8 border-t border-border/50">
            <div className="grid grid-cols-3 gap-4 sm:gap-6">
              <div className="space-y-3">
                <div className="w-14 h-14 mx-auto bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center hover:from-primary/30 hover:to-primary/20 transition-all hover:scale-110 cursor-pointer shadow-lg border border-primary/20">
                  <svg
                    className="w-7 h-7 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground text-center font-bold tracking-wide">
                  Stats Temps Réel
                </p>
              </div>
              <div className="space-y-3">
                <div className="w-14 h-14 mx-auto bg-gradient-to-br from-accent/20 to-accent/10 rounded-2xl flex items-center justify-center hover:from-accent/30 hover:to-accent/20 transition-all hover:scale-110 cursor-pointer shadow-lg border border-accent/20">
                  <svg
                    className="w-7 h-7 text-accent"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground text-center font-bold tracking-wide">
                  Chat Équipe
                </p>
              </div>
              <div className="space-y-3">
                <div className="w-14 h-14 mx-auto bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center hover:from-primary/30 hover:to-primary/20 transition-all hover:scale-110 cursor-pointer shadow-lg border border-primary/20">
                  <svg
                    className="w-7 h-7 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground text-center font-bold tracking-wide">
                  Support 24/7
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
