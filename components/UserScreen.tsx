"use client"

import type { User, Notification, Offer } from "@/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTheme } from "@/contexts/ThemeContext"
import Footer from "@/components/Footer"
import Barcode from "@/components/Barcode"
import Leaderboard from "@/components/Leaderboard"
import {
  LogOut,
  Bell,
  ShoppingCart,
  Calendar,
  Percent,
  AlertTriangle,
  ArrowLeft,
  Star,
  Heart,
  Sun,
  Moon,
  QrCode,
  Trophy,
} from "lucide-react"

interface UserScreenProps {
  user: User
  users: User[]
  notifications: Notification[]
  offers: Offer[]
  isAdminPreview?: boolean
  onLogout: () => void
  onToggleFavorite: (offerId: string) => void
}

export default function UserScreen({
  user,
  users,
  notifications,
  offers,
  isAdminPreview = false,
  onLogout,
  onToggleFavorite,
}: UserScreenProps) {
  const { theme, toggleTheme } = useTheme()

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("nb-NO")
  }

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString("nb-NO")
  }

  const unreadWarnings = user.warnings?.filter((warning) => !warning.read) || []
  const favoriteOffers = offers.filter((offer) => user.favorites?.includes(offer.id))

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShoppingCart className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Smarthylle</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={toggleTheme}>
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            <Button variant="ghost" size="sm" onClick={onLogout} className="text-gray-600 dark:text-gray-300">
              {isAdminPreview ? (
                <>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Tilbake
                </>
              ) : (
                <>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logg ut
                </>
              )}
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Velkommen */}
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {isAdminPreview ? "Admin forhåndsvisning" : `Velkommen, ${user.username}!`}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Du har reddet {user.itemsSaved || 0} matvarer fra å bli kastet
          </p>
        </div>

        {/* Advarsler */}
        {unreadWarnings.length > 0 && (
          <Card className="border-yellow-300 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-600">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center text-yellow-800 dark:text-yellow-200">
                <AlertTriangle className="w-5 h-5 mr-2 text-yellow-600 dark:text-yellow-400" />
                Advarsler
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {unreadWarnings.map((warning) => (
                <div
                  key={warning.id}
                  className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-yellow-200 dark:border-yellow-600"
                >
                  <p className="text-sm text-gray-800 dark:text-gray-200 mb-2">{warning.message}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{formatTimestamp(warning.timestamp)}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Tabs */}
        <Tabs defaultValue="offers">
          <TabsList className="grid grid-cols-5 mb-4">
            <TabsTrigger value="offers">
              <Percent className="w-4 h-4 mr-1" />
              Tilbud
            </TabsTrigger>
            <TabsTrigger value="favorites">
              <Heart className="w-4 h-4 mr-1" />
              Mine
            </TabsTrigger>
            <TabsTrigger value="leaderboard">
              <Trophy className="w-4 h-4 mr-1" />
              Topp
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="w-4 h-4 mr-1" />
              Varsler
            </TabsTrigger>
            <TabsTrigger value="barcode">
              <QrCode className="w-4 h-4 mr-1" />
              Kode
            </TabsTrigger>
          </TabsList>

          {/* Tilbud */}
          <TabsContent value="offers">
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-lg flex items-center text-gray-900 dark:text-white">
                  <Percent className="w-5 h-5 mr-2 text-green-600 dark:text-green-400" />
                  Dagens tilbud
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {offers.map((offer) => (
                  <div key={offer.id} className="border dark:border-gray-600 rounded-lg p-4 bg-white dark:bg-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{offer.productName}</h3>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                          {offer.discount}% rabatt
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onToggleFavorite(offer.id)}
                          className={
                            user.favorites?.includes(offer.id)
                              ? "text-red-500 hover:text-red-600"
                              : "text-gray-400 hover:text-red-500"
                          }
                        >
                          <Heart className={`w-4 h-4 ${user.favorites?.includes(offer.id) ? "fill-current" : ""}`} />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{offer.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Calendar className="w-4 h-4 mr-1" />
                        Utløper: {formatDate(offer.expiryDate)}
                      </div>
                      {offer.aiSuggested && (
                        <Badge variant="outline" className="text-xs">
                          <Star className="w-3 h-3 mr-1" />
                          AI-forslag
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Mine tilbud */}
          <TabsContent value="favorites">
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-lg flex items-center text-gray-900 dark:text-white">
                  <Heart className="w-5 h-5 mr-2 text-red-500" />
                  Mine favoritt-tilbud
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {favoriteOffers.length > 0 ? (
                  favoriteOffers.map((offer) => (
                    <div
                      key={offer.id}
                      className="border dark:border-gray-600 rounded-lg p-4 bg-white dark:bg-gray-700"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white">{offer.productName}</h3>
                        <div className="flex items-center space-x-2">
                          <Badge className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                            {offer.discount}% rabatt
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onToggleFavorite(offer.id)}
                            className="text-red-500 hover:text-red-600"
                          >
                            <Heart className="w-4 h-4 fill-current" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{offer.description}</p>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Calendar className="w-4 h-4 mr-1" />
                        Utløper: {formatDate(offer.expiryDate)}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                    <Heart className="w-12 h-12 mx-auto mb-2 text-gray-300 dark:text-gray-600" />
                    <p>Ingen favoritt-tilbud ennå</p>
                    <p className="text-sm">Trykk på hjertet på tilbud for å legge dem til her</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Toppliste */}
          <TabsContent value="leaderboard">
            <Leaderboard users={users} currentUser={user} />
          </TabsContent>

          {/* Varsler */}
          <TabsContent value="notifications">
            {notifications.length > 0 ? (
              <Card className="bg-white dark:bg-gray-800">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center text-gray-900 dark:text-white">
                    <Bell className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                    Nye varsler
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {notifications.slice(0, 5).map((notification) => (
                    <div key={notification.id} className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-gray-900 dark:text-white">{notification.productName}</h4>
                        <Badge
                          variant="secondary"
                          className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200"
                        >
                          {notification.discount}% rabatt
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{notification.description}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {formatTimestamp(notification.timestamp)}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-white dark:bg-gray-800">
                <CardContent className="text-center py-6">
                  <Bell className="w-12 h-12 mx-auto mb-2 text-gray-300 dark:text-gray-600" />
                  <p className="text-gray-500 dark:text-gray-400">Ingen varsler ennå</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Strekkode */}
          <TabsContent value="barcode">
            <Barcode code={user.barcode || ""} username={user.username} />
          </TabsContent>
        </Tabs>

        <Footer />
      </div>
    </div>
  )
}
