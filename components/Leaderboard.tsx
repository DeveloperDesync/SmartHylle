"use client"

import type { User, LeaderboardEntry } from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Medal, Award, Leaf } from "lucide-react"

interface LeaderboardProps {
  users: User[]
  currentUser?: User
}

export default function Leaderboard({ users, currentUser }: LeaderboardProps) {
  // Filtrer ut admin-brukere og sorter etter varer reddet
  const leaderboardData: LeaderboardEntry[] = users
    .filter((user) => user.role === "user")
    .sort((a, b) => (b.itemsSaved || 0) - (a.itemsSaved || 0))
    .map((user, index) => ({
      username: user.username,
      itemsSaved: user.itemsSaved || 0,
      rank: index + 1,
      prize: getPrize(index + 1),
    }))

  function getPrize(rank: number): string {
    switch (rank) {
      case 1:
        return "50% rabatt på 3 valgfri varer (maks 150 kr per vare)"
      case 2:
        return "50% rabatt på 2 valgfri varer (maks 150 kr per vare)"
      case 3:
        return "50% rabatt på 1 valgfri vare (maks 150 kr per vare)"
      default:
        return ""
    }
  }

  function getRankIcon(rank: number) {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-sm font-bold text-gray-500">#{rank}</span>
    }
  }

  function getRankColor(rank: number) {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-100 to-yellow-50 border-yellow-300 dark:from-yellow-900/20 dark:to-yellow-800/10 dark:border-yellow-600"
      case 2:
        return "bg-gradient-to-r from-gray-100 to-gray-50 border-gray-300 dark:from-gray-800/20 dark:to-gray-700/10 dark:border-gray-600"
      case 3:
        return "bg-gradient-to-r from-amber-100 to-amber-50 border-amber-300 dark:from-amber-900/20 dark:to-amber-800/10 dark:border-amber-600"
      default:
        return "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
    }
  }

  return (
    <Card className="bg-white dark:bg-gray-800">
      <CardHeader>
        <CardTitle className="text-lg flex items-center text-gray-900 dark:text-white">
          <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
          Toppliste - Matsvinn-helter
        </CardTitle>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Brukere som har reddet flest matvarer fra å bli kastet
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        {leaderboardData.slice(0, 10).map((entry) => (
          <div
            key={entry.username}
            className={`p-4 rounded-lg border ${getRankColor(entry.rank)} ${
              currentUser?.username === entry.username ? "ring-2 ring-blue-500 dark:ring-blue-400" : ""
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                {getRankIcon(entry.rank)}
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {entry.username}
                    {currentUser?.username === entry.username && (
                      <Badge variant="outline" className="ml-2 text-xs">
                        Deg
                      </Badge>
                    )}
                  </p>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Leaf className="w-4 h-4 mr-1 text-green-500" />
                    {entry.itemsSaved} varer reddet
                  </div>
                </div>
              </div>
              {entry.rank <= 3 && (
                <Badge
                  className={
                    entry.rank === 1
                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                      : entry.rank === 2
                        ? "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                        : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
                  }
                >
                  {entry.rank}. plass
                </Badge>
              )}
            </div>
            {entry.prize && (
              <div className="mt-2 p-2 bg-green-50 dark:bg-green-900/20 rounded text-xs text-green-800 dark:text-green-200">
                🎁 Premie: {entry.prize}
              </div>
            )}
          </div>
        ))}

        {leaderboardData.length === 0 && (
          <div className="text-center py-6 text-gray-500 dark:text-gray-400">
            <Trophy className="w-12 h-12 mx-auto mb-2 text-gray-300 dark:text-gray-600" />
            <p>Ingen data tilgjengelig ennå</p>
            <p className="text-sm">Start å redde matvarer for å komme på topplisten!</p>
          </div>
        )}

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h3 className="font-medium text-blue-900 dark:text-blue-200 mb-2">Slik fungerer det:</h3>
          <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
            <li>• Kjøp tilbud fra appen for å redde matvarer</li>
            <li>• Vis strekkoden din i butikken</li>
            <li>• Få poeng for hver vare du redder</li>
            <li>• Klatre på topplisten og vinn premier!</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
