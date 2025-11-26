"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StatsTracker } from "@/components/stats-tracker"
import { TeamHistory } from "@/components/team-history"
import { TeamChat } from "@/components/team-chat"
import { Settings } from "@/components/settings"
import { FortniteNews } from "@/components/fortnite-news"
import { Leaderboard } from "@/components/leaderboard"
import { Analytics } from "@/components/analytics"
import { TicketSystem } from "@/components/ticket-system"

interface DashboardProps {
  user: any
  onLogout: () => void
}

type View = "dashboard" | "tracker" | "history" | "chat" | "settings" | "news" | "leaderboard" | "analytics" | "tickets"

export function Dashboard({ user, onLogout }: DashboardProps) {
  const [currentView, setCurrentView] = useState<View>("dashboard")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [unreadTickets] = useState(3) // Added ticket notifications

  const menuItems = [
    {
      id: "dashboard" as View,
      label: "Dashboard",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
    },
    {
      id: "tracker" as View,
      label: "Stats Tracker",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      id: "analytics" as View,
      label: "Analytics",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
    },
    {
      id: "leaderboard" as View,
      label: "Leaderboard",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 19l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z"
          />
        </svg>
      ),
    },
    {
      id: "tickets" as View,
      label: "Support",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
      badge: unreadTickets,
    },
    {
      id: "history" as View,
      label: "Historique",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      id: "news" as View,
      label: "Fortnite News",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
          />
        </svg>
      ),
    },
    {
      id: "chat" as View,
      label: "Chat",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      ),
    },
    {
      id: "settings" as View,
      label: "Paramètres",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ]

  const renderContent = () => {
    switch (currentView) {
      case "tracker":
        return <StatsTracker />
      case "analytics":
        return <Analytics />
      case "leaderboard":
        return <Leaderboard />
      case "history":
        return <TeamHistory />
      case "news":
        return <FortniteNews />
      case "chat":
        return <TeamChat user={user} />
      case "tickets":
        return <TicketSystem user={user} />
      case "settings":
        return <Settings user={user} onLogout={onLogout} />
      default:
        return <DashboardHome user={user} />
    }
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={`${sidebarCollapsed ? "w-20" : "w-72"} bg-card border-r border-border flex flex-col transition-all duration-300 scrollbar-thin overflow-y-auto`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-border">
          {!sidebarCollapsed ? (
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-primary via-primary to-accent p-3 rounded-xl shadow-lg hover:scale-105 transition-transform">
                <svg
                  className="w-7 h-7 text-primary-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h1 className="font-bold text-xl text-foreground tracking-tight">EOZ ESPORT</h1>
                <p className="text-xs text-muted-foreground font-medium">Elite Platform</p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="bg-gradient-to-br from-primary to-accent p-3 rounded-xl hover:scale-110 transition-transform">
                <svg
                  className="w-7 h-7 text-primary-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`relative w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all font-semibold text-sm ${
                currentView === item.id
                  ? "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg shadow-primary/30 scale-[1.02]"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground hover:scale-[1.01]"
              }`}
              title={sidebarCollapsed ? item.label : undefined}
            >
              <span>{item.icon}</span>
              {!sidebarCollapsed && <span>{item.label}</span>}
              {item.badge && item.badge > 0 && (
                <Badge className="ml-auto bg-destructive text-destructive-foreground text-xs h-5 min-w-[20px] px-1.5">
                  {item.badge}
                </Badge>
              )}
            </button>
          ))}
        </nav>

        {/* Collapse Button */}
        <div className="p-4 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="w-full hover:bg-secondary"
          >
            <svg
              className={`w-5 h-5 transition-transform ${sidebarCollapsed ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </Button>
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-border bg-secondary/30">
          {!sidebarCollapsed ? (
            <div className="flex items-center gap-3">
              <Avatar className="h-11 w-11 border-2 border-primary/30 hover:border-primary transition-colors">
                <AvatarImage
                  src={user.avatar || `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
                  alt={user.username}
                />
                <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground font-bold text-sm">
                  {user.username.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm text-foreground truncate">{user.username}</p>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-lg shadow-green-500/50"></div>
                  <p className="text-xs text-muted-foreground font-medium">En ligne</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <Avatar className="h-11 w-11 border-2 border-primary/30 hover:border-primary transition-colors hover:scale-110">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.username} />
                <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground font-bold">
                  {user.username.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto scrollbar-thin">{renderContent()}</main>
    </div>
  )
}

function DashboardHome({ user }: { user: any }) {
  return (
    <div className="p-8 space-y-8 max-w-[1600px] mx-auto">
      <div className="space-y-3">
        <h2 className="text-5xl font-bold text-foreground text-balance tracking-tight">
          Bienvenue, <span className="text-primary">{user.username}</span>
        </h2>
        <p className="text-muted-foreground text-xl font-medium">
          Dashboard EOZ Esport - Suivez vos performances en temps réel
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 hover:border-primary/40 transition-all hover:scale-[1.02]">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">Victoires ce mois</p>
              <svg
                className="w-5 h-5 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
            </div>
            <p className="text-3xl font-bold text-foreground font-mono">47</p>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <span className="text-primary font-semibold">↑ 12%</span> vs mois dernier
            </p>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20 hover:border-accent/40 transition-all hover:scale-[1.02]">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">K/D Ratio</p>
              <svg
                className="w-5 h-5 text-accent"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-foreground font-mono">2.8</p>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <span className="text-accent font-semibold">↑ 0.3</span> cette semaine
            </p>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 hover:border-primary/40 transition-all hover:scale-[1.02]">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">Matchs joués</p>
              <svg
                className="w-5 h-5 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <p className="text-3xl font-bold text-foreground font-mono">156</p>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <span className="text-primary font-semibold">30.1%</span> win rate
            </p>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20 hover:border-accent/40 transition-all hover:scale-[1.02]">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">Heures jouées</p>
              <svg
                className="w-5 h-5 text-accent"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-foreground font-mono">342h</p>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <span className="text-accent font-semibold">↑ 24h</span> cette semaine
            </p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4 text-foreground">Activité récente</h3>
          <div className="space-y-4">
            {[
              { action: "Victoire en Arena", time: "Il y a 2 heures", icon: "🏆" },
              { action: "Nouveau record de kills", time: "Il y a 5 heures", icon: "⚡" },
              { action: "Entraînement terminé", time: "Hier", icon: "💪" },
              { action: "Match d'équipe", time: "Il y a 2 jours", icon: "🎮" },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
              >
                <div className="text-2xl">{item.icon}</div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{item.action}</p>
                  <p className="text-sm text-muted-foreground">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4 text-foreground">Membres en ligne</h3>
          <div className="space-y-3">
            {[
              { name: "EOZ_Alpha", status: "En partie", avatar: "🎯" },
              { name: "EOZ_Beta", status: "Disponible", avatar: "⚡" },
              { name: "EOZ_Gamma", status: "En partie", avatar: "🔥" },
              { name: "EOZ_Delta", status: "Absent", avatar: "💫" },
            ].map((member, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                <div className="text-2xl">{member.avatar}</div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{member.name}</p>
                  <p className="text-sm text-muted-foreground">{member.status}</p>
                </div>
                <div
                  className={`w-2 h-2 rounded-full ${member.status === "Disponible" ? "bg-green-500" : member.status === "En partie" ? "bg-yellow-500" : "bg-gray-500"}`}
                ></div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
