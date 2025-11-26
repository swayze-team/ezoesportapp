"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function StatsTracker() {
  const [epicUsername, setEpicUsername] = useState("")
  const [accountType, setAccountType] = useState("epic")
  const [loading, setLoading] = useState(false)
  const [stats, setStats] = useState<any>(null)
  const [error, setError] = useState("")

  const handleSearch = async () => {
    if (!epicUsername.trim()) {
      setError("Veuillez entrer un nom d'utilisateur")
      return
    }

    setLoading(true)
    setError("")

    try {
      const response = await fetch(
        `/api/fortnite/stats?username=${encodeURIComponent(epicUsername)}&accountType=${accountType}`,
      )
      const data = await response.json()

      if (response.ok && data.data) {
        setStats(data.data)
      } else {
        setError(data.error || "Joueur introuvable ou erreur API")
      }
    } catch (err) {
      setError("Erreur lors de la recherche des stats")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8 space-y-8 scrollbar-thin max-w-[1600px] mx-auto">
      <div className="space-y-3">
        <h2 className="text-5xl font-bold text-foreground tracking-tight">Fortnite Stats Tracker</h2>
        <p className="text-muted-foreground text-xl font-medium">
          Suivez vos performances et celles de votre équipe en temps réel
        </p>
      </div>

      {/* Search */}
      <Card className="p-6 bg-gradient-to-br from-card to-secondary/20">
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            placeholder="Entrez votre nom Epic Games..."
            value={epicUsername}
            onChange={(e) => setEpicUsername(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            className="flex-1 h-12"
          />
          <Select value={accountType} onValueChange={setAccountType}>
            <SelectTrigger className="w-full sm:w-[180px] h-12">
              <SelectValue placeholder="Platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="epic">Epic Games</SelectItem>
              <SelectItem value="psn">PlayStation</SelectItem>
              <SelectItem value="xbl">Xbox Live</SelectItem>
            </SelectContent>
          </Select>
          <Button
            onClick={handleSearch}
            disabled={loading}
            className="bg-primary text-primary-foreground h-12 px-8 font-semibold hover:scale-[1.02] transition-transform"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-primary-foreground"></div>
                <span>Recherche...</span>
              </div>
            ) : (
              "Rechercher"
            )}
          </Button>
        </div>
        {error && (
          <p className="text-destructive text-sm mt-4 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {error}
          </p>
        )}
      </Card>

      {/* Stats Display */}
      {stats && (
        <>
          {/* Player Info */}
          <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl font-bold text-primary-foreground">
                {stats.account?.name?.substring(0, 2).toUpperCase() || "FN"}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground">{stats.account?.name || epicUsername}</h3>
                <p className="text-muted-foreground">Level {stats.battlePass?.level || "N/A"}</p>
              </div>
            </div>
          </Card>

          {/* Mode Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.stats?.all &&
              ["overall", "solo", "duo", "squad"].slice(1).map((mode: string, idx: number) => {
                const modeData = stats.stats.all[mode]
                if (!modeData) return null

                const icons = ["👤", "👥", "👨‍👩‍👦‍👦"]
                const colors = ["primary", "accent", "primary"]
                const color = colors[idx]

                return (
                  <Card
                    key={mode}
                    className={`p-6 bg-gradient-to-br from-${color}/10 to-${color}/5 border-${color}/20 hover:border-${color}/40 transition-all hover:scale-[1.02]`}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-foreground capitalize">{mode}</h3>
                        <span className="text-3xl">{icons[idx]}</span>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Victoires</span>
                          <span className="font-bold text-foreground font-mono text-lg">{modeData.wins || 0}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">K/D Ratio</span>
                          <span className="font-bold text-foreground font-mono text-lg">
                            {modeData.kd?.toFixed(2) || "0.00"}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Win Rate</span>
                          <span className="font-bold text-foreground font-mono text-lg">
                            {modeData.winRate?.toFixed(1) || "0.0"}%
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Kills</span>
                          <span className="font-bold text-foreground font-mono text-lg">{modeData.kills || 0}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Matchs</span>
                          <span className="font-bold text-muted-foreground font-mono">{modeData.matches || 0}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                )
              })}
          </div>

          {/* Overall Stats */}
          {stats.stats?.all?.overall && (
            <Card className="p-6">
              <h3 className="text-2xl font-bold mb-6 text-foreground">Statistiques globales</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { label: "Total Victoires", value: stats.stats.all.overall.wins || 0, icon: "🏆" },
                  { label: "Total Kills", value: stats.stats.all.overall.kills || 0, icon: "⚡" },
                  { label: "K/D Global", value: stats.stats.all.overall.kd?.toFixed(2) || "0.00", icon: "📊" },
                  { label: "Total Matchs", value: stats.stats.all.overall.matches || 0, icon: "🎮" },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="text-center space-y-2 p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                  >
                    <div className="text-4xl">{stat.icon}</div>
                    <p className="text-3xl font-bold text-foreground font-mono">{stat.value}</p>
                    <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </>
      )}

      {/* Default stats when no search */}
      {!stats && !loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">Solo</h3>
                <span className="text-2xl">👤</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Victoires</span>
                  <span className="font-bold text-foreground">127</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">K/D</span>
                  <span className="font-bold text-foreground">2.4</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Win Rate</span>
                  <span className="font-bold text-foreground">18.3%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Kills</span>
                  <span className="font-bold text-foreground">3,421</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">Duo</h3>
                <span className="text-2xl">👥</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Victoires</span>
                  <span className="font-bold text-foreground">84</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">K/D</span>
                  <span className="font-bold text-foreground">2.8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Win Rate</span>
                  <span className="font-bold text-foreground">21.7%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Kills</span>
                  <span className="font-bold text-foreground">2,156</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">Squad</h3>
                <span className="text-2xl">👨‍👩‍👦‍👦</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Victoires</span>
                  <span className="font-bold text-foreground">156</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">K/D</span>
                  <span className="font-bold text-foreground">3.2</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Win Rate</span>
                  <span className="font-bold text-foreground">25.4%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Kills</span>
                  <span className="font-bold text-foreground">4,789</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Recent Matches */}
      <Card className="p-6">
        <h3 className="text-xl font-bold mb-4 text-foreground">Derniers matchs</h3>
        <div className="space-y-3">
          {[
            { mode: "Solo", placement: "1st", kills: 12, result: "win" },
            { mode: "Duo", placement: "3rd", kills: 8, result: "loss" },
            { mode: "Squad", placement: "1st", kills: 15, result: "win" },
            { mode: "Solo", placement: "7th", kills: 5, result: "loss" },
            { mode: "Duo", placement: "2nd", kills: 10, result: "loss" },
          ].map((match, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
            >
              <div className={`w-2 h-2 rounded-full ${match.result === "win" ? "bg-green-500" : "bg-red-500"}`}></div>
              <div className="flex-1 grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Mode</p>
                  <p className="font-medium text-foreground">{match.mode}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Placement</p>
                  <p className="font-medium text-foreground">{match.placement}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Kills</p>
                  <p className="font-medium text-foreground">{match.kills}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
