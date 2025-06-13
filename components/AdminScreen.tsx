"use client"

import type React from "react"

import { useState } from "react"
import type { User, Notification, Offer, AIRecommendation } from "@/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "@/contexts/ThemeContext"
import Footer from "@/components/Footer"
import Leaderboard from "@/components/Leaderboard"
import {
  LogOut,
  Send,
  Settings,
  Plus,
  Eye,
  Users,
  AlertTriangle,
  Ban,
  Trash2,
  ShoppingBag,
  UserPlus,
  Sun,
  Moon,
  Sparkles,
  Check,
  X,
  Trophy,
  Leaf,
  Minus,
} from "lucide-react"

interface AdminScreenProps {
  user: User
  users: User[]
  offers: Offer[]
  onLogout: () => void
  onAddNotification: (notification: Omit<Notification, "id" | "timestamp">) => void
  onAddUser: (user: Omit<User, "warnings" | "banned">) => boolean
  onWarnUser: (username: string, message: string) => void
  onBanUser: (username: string, banned: boolean) => void
  onRemoveOffer: (offerId: string) => void
  onViewAsUser: () => void
  aiRecommendations: AIRecommendation[]
  onApproveAIRecommendation: (recommendationId: string, approved: boolean) => void
  onAddItemsToUser: (username: string, itemsToAdd: number) => void
  onRemoveItemsFromUser: (username: string, itemsToRemove: number) => void
}

export default function AdminScreen({
  user,
  users,
  offers,
  onLogout,
  onAddNotification,
  onAddUser,
  onWarnUser,
  onBanUser,
  onRemoveOffer,
  onViewAsUser,
  aiRecommendations,
  onApproveAIRecommendation,
  onAddItemsToUser,
  onRemoveItemsFromUser,
}: AdminScreenProps) {
  // State for varslingsfanen
  const [productName, setProductName] = useState("")
  const [discount, setDiscount] = useState("")
  const [description, setDescription] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  // State for brukeradministrasjon
  const [selectedUser, setSelectedUser] = useState("")
  const [warningMessage, setWarningMessage] = useState("")
  const [isSubmittingWarning, setIsSubmittingWarning] = useState(false)
  const [warningSuccess, setWarningSuccess] = useState("")

  // State for ny bruker
  const [newUsername, setNewUsername] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [newRole, setNewRole] = useState<"user" | "admin">("user")
  const [isCreatingUser, setIsCreatingUser] = useState(false)
  const [userCreatedMessage, setUserCreatedMessage] = useState("")

  // State for reddet varer
  const [selectedUserForItems, setSelectedUserForItems] = useState("")
  const [itemsToModify, setItemsToModify] = useState("")
  const [isModifyingItems, setIsModifyingItems] = useState(false)
  const [itemsModifiedMessage, setItemsModifiedMessage] = useState("")

  const { theme, toggleTheme } = useTheme()

  // Håndter sending av varsling
  const handleSubmitNotification = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSuccessMessage("")

    // Simuler sending
    await new Promise((resolve) => setTimeout(resolve, 1000))

    onAddNotification({
      productName,
      discount: Number.parseInt(discount),
      description,
    })

    // Reset form
    setProductName("")
    setDiscount("")
    setDescription("")
    setSuccessMessage("Varsling sendt til alle brukere!")
    setIsSubmitting(false)

    // Fjern suksessmelding etter 3 sekunder
    setTimeout(() => setSuccessMessage(""), 3000)
  }

  // Håndter sending av advarsel
  const handleSubmitWarning = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedUser || !warningMessage) return

    setIsSubmittingWarning(true)
    setWarningSuccess("")

    // Simuler sending
    await new Promise((resolve) => setTimeout(resolve, 1000))

    onWarnUser(selectedUser, warningMessage)

    // Reset form
    setWarningMessage("")
    setWarningSuccess(`Advarsel sendt til ${selectedUser}!`)
    setIsSubmittingWarning(false)

    // Fjern suksessmelding etter 3 sekunder
    setTimeout(() => setWarningSuccess(""), 3000)
  }

  // Håndter oppretting av ny bruker
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newUsername || !newPassword) return

    setIsCreatingUser(true)
    setUserCreatedMessage("")

    // Simuler sending
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const success = onAddUser({
      username: newUsername,
      password: newPassword,
      role: newRole,
    })

    if (success) {
      // Reset form
      setNewUsername("")
      setNewPassword("")
      setNewRole("user")
      setUserCreatedMessage(`Bruker ${newUsername} opprettet!`)
    } else {
      setUserCreatedMessage("Kunne ikke opprette bruker. Prøv et annet brukernavn.")
    }

    setIsCreatingUser(false)

    // Fjern suksessmelding etter 3 sekunder
    setTimeout(() => setUserCreatedMessage(""), 3000)
  }

  // Håndter tillegging av reddet varer
  const handleAddItems = async () => {
    if (!selectedUserForItems || !itemsToModify) return

    setIsModifyingItems(true)
    setItemsModifiedMessage("")

    // Simuler sending
    await new Promise((resolve) => setTimeout(resolve, 1000))

    onAddItemsToUser(selectedUserForItems, Number.parseInt(itemsToModify))

    // Reset form
    setItemsToModify("")
    setItemsModifiedMessage(`${itemsToModify} varer lagt til for ${selectedUserForItems}!`)
    setIsModifyingItems(false)

    // Fjern suksessmelding etter 3 sekunder
    setTimeout(() => setItemsModifiedMessage(""), 3000)
  }

  // Håndter fjerning av reddet varer
  const handleRemoveItems = async () => {
    if (!selectedUserForItems || !itemsToModify) return

    const selectedUserData = users.find((u) => u.username === selectedUserForItems)
    const currentItems = selectedUserData?.itemsSaved || 0
    const itemsToRemove = Number.parseInt(itemsToModify)

    if (itemsToRemove > currentItems) {
      setItemsModifiedMessage(`Kan ikke fjerne ${itemsToRemove} varer. Brukeren har kun ${currentItems} varer.`)
      setTimeout(() => setItemsModifiedMessage(""), 3000)
      return
    }

    setIsModifyingItems(true)
    setItemsModifiedMessage("")

    // Simuler sending
    await new Promise((resolve) => setTimeout(resolve, 1000))

    onRemoveItemsFromUser(selectedUserForItems, itemsToRemove)

    // Reset form
    setItemsToModify("")
    setItemsModifiedMessage(`${itemsToRemove} varer fjernet fra ${selectedUserForItems}!`)
    setIsModifyingItems(false)

    // Fjern suksessmelding etter 3 sekunder
    setTimeout(() => setItemsModifiedMessage(""), 3000)
  }

  // Filtrer bort admin-brukeren som er logget inn
  const filteredUsers = users.filter((u) => u.username !== user.username)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white shadow-sm border-b dark:bg-gray-800 dark:border-gray-700">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Settings className="w-6 h-6 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Admin Panel</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={toggleTheme}>
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            <Button variant="ghost" size="sm" onClick={onLogout} className="text-gray-600 dark:text-gray-400">
              <LogOut className="w-4 h-4 mr-2" />
              Logg ut
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Velkommen */}
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Velkommen, {user.username}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">Administrer Smarthylle-appen</p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="notifications">
          <TabsList className="grid grid-cols-8 mb-4">
            <TabsTrigger value="notifications">
              <Send className="w-4 h-4 mr-1 md:mr-2" />
              <span className="hidden md:inline">Info</span>
            </TabsTrigger>
            <TabsTrigger value="users">
              <Users className="w-4 h-4 mr-1 md:mr-2" />
              <span className="hidden md:inline">Mod</span>
            </TabsTrigger>
            <TabsTrigger value="offers">
              <ShoppingBag className="w-4 h-4 mr-1 md:mr-2" />
              <span className="hidden md:inline">Tilbud</span>
            </TabsTrigger>
            <TabsTrigger value="newuser">
              <UserPlus className="w-4 h-4 mr-1 md:mr-2" />
              <span className="hidden md:inline">Lag</span>
            </TabsTrigger>
            <TabsTrigger value="items">
              <Leaf className="w-4 h-4 mr-1 md:mr-2" />
              <span className="hidden md:inline">Varer</span>
            </TabsTrigger>
            <TabsTrigger value="leaderboard">
              <Trophy className="w-4 h-4 mr-1 md:mr-2" />
              <span className="hidden md:inline">Topp</span>
            </TabsTrigger>
            <TabsTrigger value="preview">
              <Eye className="w-4 h-4 mr-1 md:mr-2" />
              <span className="hidden md:inline">Test</span>
            </TabsTrigger>
            <TabsTrigger value="ai">
              <Sparkles className="w-4 h-4 mr-1 md:mr-2" />
              <span className="hidden md:inline">AI</span>
            </TabsTrigger>
          </TabsList>

          {/* Varslingsfane */}
          <TabsContent value="notifications">
            {/* Suksessmelding */}
            {successMessage && (
              <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-center mb-4">
                {successMessage}
              </div>
            )}

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Plus className="w-5 h-5 mr-2 text-blue-600" />
                  Send ny varsling
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitNotification} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="productName" className="text-sm font-medium">
                      Produktnavn
                    </Label>
                    <Input
                      id="productName"
                      type="text"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      placeholder="F.eks. Økologiske epler"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="discount" className="text-sm font-medium">
                      Rabatt (%)
                    </Label>
                    <Input
                      id="discount"
                      type="number"
                      min="1"
                      max="99"
                      value={discount}
                      onChange={(e) => setDiscount(e.target.value)}
                      placeholder="F.eks. 30"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-sm font-medium">
                      Beskrivelse
                    </Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Beskriv tilbudet og hvorfor det er på salg..."
                      rows={3}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
                    {isSubmitting ? (
                      "Sender..."
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send varsling
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Brukerfane */}
          <TabsContent value="users">
            {/* Suksessmelding */}
            {warningSuccess && (
              <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-center mb-4">
                {warningSuccess}
              </div>
            )}

            <Card className="mb-4">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-yellow-600" />
                  Send advarsel
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitWarning} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="selectedUser" className="text-sm font-medium">
                      Velg bruker
                    </Label>
                    <Select value={selectedUser} onValueChange={setSelectedUser} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Velg bruker" />
                      </SelectTrigger>
                      <SelectContent>
                        {filteredUsers
                          .filter((u) => u.role === "user")
                          .map((u) => (
                            <SelectItem key={u.username} value={u.username}>
                              {u.username} {u.banned ? "(Utestengt)" : ""}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="warningMessage" className="text-sm font-medium">
                      Advarselsmelding
                    </Label>
                    <Textarea
                      id="warningMessage"
                      value={warningMessage}
                      onChange={(e) => setWarningMessage(e.target.value)}
                      placeholder="Skriv advarselsmeldingen..."
                      rows={3}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-yellow-600 hover:bg-yellow-700"
                    disabled={isSubmittingWarning || !selectedUser}
                  >
                    {isSubmittingWarning ? (
                      "Sender..."
                    ) : (
                      <>
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        Send advarsel
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Ban className="w-5 h-5 mr-2 text-red-600" />
                  Utesteng bruker
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredUsers
                    .filter((u) => u.role === "user")
                    .map((u) => (
                      <div
                        key={u.username}
                        className="flex items-center justify-between p-3 bg-white rounded-lg border"
                      >
                        <div>
                          <p className="font-medium">{u.username}</p>
                          <p className="text-xs text-gray-500">
                            {u.warnings?.length || 0} advarsler • Rolle: {u.role}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch checked={!!u.banned} onCheckedChange={(checked) => onBanUser(u.username, checked)} />
                          <span className={u.banned ? "text-red-600 text-sm" : "text-gray-500 text-sm"}>
                            {u.banned ? "Utestengt" : "Aktiv"}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tilbudsfane */}
          <TabsContent value="offers">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <ShoppingBag className="w-5 h-5 mr-2 text-green-600" />
                  Administrer tilbud
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {offers.map((offer) => (
                    <div key={offer.id} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-medium">{offer.productName}</p>
                          <span className="text-sm bg-green-100 text-green-800 px-2 py-0.5 rounded">
                            {offer.discount}%
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">
                          Utløper: {new Date(offer.expiryDate).toLocaleDateString("nb-NO")}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-800 hover:bg-red-50"
                        onClick={() => onRemoveOffer(offer.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}

                  {offers.length === 0 && (
                    <div className="text-center py-6 text-gray-500">
                      <p>Ingen tilbud tilgjengelig</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Ny bruker-fane */}
          <TabsContent value="newuser">
            {/* Suksessmelding */}
            {userCreatedMessage && (
              <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-center mb-4">
                {userCreatedMessage}
              </div>
            )}

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <UserPlus className="w-5 h-5 mr-2 text-blue-600" />
                  Opprett ny bruker
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateUser} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="newUsername" className="text-sm font-medium">
                      Brukernavn
                    </Label>
                    <Input
                      id="newUsername"
                      type="text"
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                      placeholder="Skriv inn brukernavn"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newPassword" className="text-sm font-medium">
                      Passord
                    </Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Skriv inn passord"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newRole" className="text-sm font-medium">
                      Rolle
                    </Label>
                    <Select value={newRole} onValueChange={(value) => setNewRole(value as "user" | "admin")}>
                      <SelectTrigger>
                        <SelectValue placeholder="Velg rolle" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">Vanlig bruker</SelectItem>
                        <SelectItem value="admin">Administrator</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isCreatingUser}>
                    {isCreatingUser ? (
                      "Oppretter..."
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4 mr-2" />
                        Opprett bruker
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reddet varer-fane */}
          <TabsContent value="items">
            {/* Suksessmelding */}
            {itemsModifiedMessage && (
              <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-center mb-4">
                {itemsModifiedMessage}
              </div>
            )}

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Leaf className="w-5 h-5 mr-2 text-green-600" />
                  Administrer reddet varer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="selectedUserForItems" className="text-sm font-medium">
                      Velg bruker
                    </Label>
                    <Select value={selectedUserForItems} onValueChange={setSelectedUserForItems} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Velg bruker" />
                      </SelectTrigger>
                      <SelectContent>
                        {filteredUsers
                          .filter((u) => u.role === "user")
                          .map((u) => (
                            <SelectItem key={u.username} value={u.username}>
                              {u.username} ({u.itemsSaved || 0} varer reddet)
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="itemsToModify" className="text-sm font-medium">
                      Antall varer
                    </Label>
                    <Input
                      id="itemsToModify"
                      type="number"
                      min="1"
                      value={itemsToModify}
                      onChange={(e) => setItemsToModify(e.target.value)}
                      placeholder="F.eks. 5"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      onClick={handleAddItems}
                      className="bg-green-600 hover:bg-green-700"
                      disabled={isModifyingItems || !selectedUserForItems || !itemsToModify}
                    >
                      {isModifyingItems ? (
                        "Behandler..."
                      ) : (
                        <>
                          <Plus className="w-4 h-4 mr-2" />
                          Legg til
                        </>
                      )}
                    </Button>

                    <Button
                      onClick={handleRemoveItems}
                      variant="outline"
                      className="border-red-300 text-red-600 hover:bg-red-50"
                      disabled={isModifyingItems || !selectedUserForItems || !itemsToModify}
                    >
                      {isModifyingItems ? (
                        "Behandler..."
                      ) : (
                        <>
                          <Minus className="w-4 h-4 mr-2" />
                          Fjern
                        </>
                      )}
                    </Button>
                  </div>

                  <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm text-blue-800 dark:text-blue-200">
                    <p className="font-medium mb-1">💡 Tips:</p>
                    <p>• Legg til varer når kunder scanner QR-kode i butikken</p>
                    <p>• Fjern varer hvis det er gjort en feil eller misbruk</p>
                    <p>• Brukeren får automatisk beskjed om endringen</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Toppliste-fane */}
          <TabsContent value="leaderboard">
            <Leaderboard users={users} />
          </TabsContent>

          {/* Forhåndsvisningsfane */}
          <TabsContent value="preview">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Eye className="w-5 h-5 mr-2 text-blue-600" />
                  Se som bruker
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Klikk på knappen nedenfor for å se hvordan appen ser ut for vanlige brukere.
                </p>
                <Button onClick={onViewAsUser} className="w-full bg-blue-600 hover:bg-blue-700">
                  <Eye className="w-4 h-4 mr-2" />
                  Forhåndsvis brukervisning
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI-anbefalinger fane */}
          <TabsContent value="ai">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-purple-600" />
                  AI-anbefalinger
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {aiRecommendations
                    .filter((rec) => !rec.approved && !rec.rejected)
                    .map((recommendation) => (
                      <div key={recommendation.id} className="border rounded-lg p-4 bg-white">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-gray-900">{recommendation.productName}</h3>
                          <Badge className="bg-purple-100 text-purple-800">
                            {recommendation.suggestedDiscount}% rabatt
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{recommendation.reason}</p>
                        <p className="text-xs text-gray-500 mb-3">Nåværende pris: {recommendation.currentPrice} kr</p>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => onApproveAIRecommendation(recommendation.id, true)}
                          >
                            <Check className="w-4 h-4 mr-1" />
                            Godkjenn
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-300 text-red-600 hover:bg-red-50"
                            onClick={() => onApproveAIRecommendation(recommendation.id, false)}
                          >
                            <X className="w-4 h-4 mr-1" />
                            Avvis
                          </Button>
                        </div>
                      </div>
                    ))}

                  {aiRecommendations.filter((rec) => !rec.approved && !rec.rejected).length === 0 && (
                    <div className="text-center py-6 text-gray-500">
                      <Sparkles className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                      <p>Ingen AI-anbefalinger for øyeblikket</p>
                      <p className="text-sm">AI analyserer kontinuerlig for nye muligheter</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  )
}
