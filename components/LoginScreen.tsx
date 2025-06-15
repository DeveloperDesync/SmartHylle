"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingCart, Leaf } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { useTheme } from "@/contexts/ThemeContext"
import { Moon, Sun, UserPlus, Shield, Eye, EyeOff } from "lucide-react"
import Footer from "@/components/Footer"
import * as storage from "@/lib/localStorage"

interface LoginScreenProps {
  onLogin: (username: string, password: string) => Promise<boolean>
  rememberMe: boolean
  onRememberMeChange: (checked: boolean) => void
  loginError?: string
}

export default function LoginScreen({ onLogin, rememberMe, onRememberMeChange, loginError }: LoginScreenProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showRegister, setShowRegister] = useState(false)

  // Register form states
  const [registerUsername, setRegisterUsername] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isAdmin, setIsAdmin] = useState(false)
  const [adminCode, setAdminCode] = useState("")
  const [showAdminCode, setShowAdminCode] = useState(false)
  const [registerError, setRegisterError] = useState("")
  const [registerSuccess, setRegisterSuccess] = useState("")
  const [isRegistering, setIsRegistering] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { theme, toggleTheme } = useTheme()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const success = await onLogin(username, password)
    if (!success) {
      // Error message is now handled by parent component
    }

    setIsLoading(false)
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setRegisterError("")
    setRegisterSuccess("")
    setIsRegistering(true)

    // Validation
    if (!registerUsername.trim() || !registerPassword.trim() || !confirmPassword.trim()) {
      setRegisterError("Alle felt må fylles ut")
      setIsRegistering(false)
      return
    }

    if (registerPassword !== confirmPassword) {
      setRegisterError("Passordene stemmer ikke overens")
      setIsRegistering(false)
      return
    }

    if (registerPassword.length < 4) {
      setRegisterError("Passordet må være minst 4 tegn")
      setIsRegistering(false)
      return
    }

    // Check if admin code is correct if admin is selected
    if (isAdmin) {
      if (adminCode !== "smarthylle-administrasjon123") {
        setRegisterError("Ugyldig administrator-kode")
        setIsRegistering(false)
        return
      }
    }

    // Simulate registration delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Create new user
    const newUser = {
      username: registerUsername.trim(),
      password: registerPassword,
      role: isAdmin ? ("admin" as const) : ("user" as const),
      itemsSaved: 0,
      warnings: [],
      banned: false,
      favorites: [],
      barcode: `SH${registerUsername.toUpperCase().slice(0, 3)}${Math.random().toString().slice(2, 8)}`,
    }

    // Try to add user
    try {
      const createdUser = storage.localStorageAPI.createUser(newUser)
      const success = !!createdUser

      if (success) {
        setRegisterSuccess(`Bruker "${registerUsername}" opprettet! Du kan nå logge inn.`)
        // Reset form
        setRegisterUsername("")
        setRegisterPassword("")
        setConfirmPassword("")
        setIsAdmin(false)
        setAdminCode("")
        setShowAdminCode(false)

        // Auto-switch to login after 2 seconds
        setTimeout(() => {
          setShowRegister(false)
          setRegisterSuccess("")
          setUsername(registerUsername)
        }, 2000)
      }
    } catch (error: any) {
      setRegisterError(error.message || "Kunne ikke opprette bruker")
    }

    setIsRegistering(false)
  }

  const toggleRegisterMode = () => {
    setShowRegister(!showRegister)
    setRegisterError("")
    setRegisterSuccess("")
    // Reset register form
    setRegisterUsername("")
    setRegisterPassword("")
    setConfirmPassword("")
    setIsAdmin(false)
    setAdminCode("")
    setShowAdminCode(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-end">
            <Button variant="ghost" size="sm" onClick={toggleTheme}>
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
          </div>
          <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
            <div className="flex">
              <ShoppingCart className="w-6 h-6 text-white mr-1" />
              <Leaf className="w-6 h-6 text-white" />
            </div>
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-gray-900">Smarthylle</CardTitle>
            <CardDescription className="text-gray-600">
              {showRegister ? "Opprett ny konto" : "Reduser matsvinn med AI-drevne tilbud"}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          {!showRegister ? (
            // Login Form
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium text-gray-700">
                  Brukernavn
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Skriv inn brukernavn"
                  required
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Passord
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Skriv inn passord"
                  required
                  className="w-full"
                />
              </div>

              {loginError && (
                <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg border border-red-200">
                  {loginError}
                </div>
              )}

              <div className="flex items-center space-x-2">
                <Checkbox id="remember" checked={rememberMe} onCheckedChange={onRememberMeChange} />
                <Label htmlFor="remember" className="text-sm">
                  Husk meg
                </Label>
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                {isLoading ? "Logger inn..." : "Logg inn"}
              </Button>

              <div className="text-center">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={toggleRegisterMode}
                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-all duration-200"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Opprett ny konto
                </Button>
              </div>

              <div className="mt-6 text-xs text-gray-500 text-center">
                <p className="mb-2">Test-brukere:</p>
                <p>Bruker: bruker1 / pass1</p>
                <p>Admin: admin1 / adminpass1</p>
              </div>
            </form>
          ) : (
            // Register Form
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="registerUsername" className="text-sm font-medium text-gray-700">
                  Brukernavn
                </Label>
                <Input
                  id="registerUsername"
                  type="text"
                  value={registerUsername}
                  onChange={(e) => setRegisterUsername(e.target.value)}
                  placeholder="Velg et brukernavn"
                  required
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="registerPassword" className="text-sm font-medium text-gray-700">
                  Passord
                </Label>
                <div className="relative">
                  <Input
                    id="registerPassword"
                    type={showPassword ? "text" : "password"}
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    placeholder="Opprett et passord"
                    required
                    className="w-full pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                  Bekreft passord
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Skriv passordet på nytt"
                    required
                    className="w-full pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isAdmin"
                    checked={isAdmin}
                    onCheckedChange={(checked) => {
                      setIsAdmin(!!checked)
                      setShowAdminCode(!!checked)
                      if (!checked) {
                        setAdminCode("")
                      }
                    }}
                  />
                  <Label htmlFor="isAdmin" className="text-sm flex items-center">
                    <Shield className="w-4 h-4 mr-1 text-blue-600" />
                    Jeg er administrator
                  </Label>
                </div>

                {showAdminCode && (
                  <div className="space-y-2 animate-fade-in bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-600">
                    <Label htmlFor="adminCode" className="text-sm font-medium text-blue-800 dark:text-blue-200">
                      Administrator-kode
                    </Label>
                    <Input
                      id="adminCode"
                      type="password"
                      value={adminCode}
                      onChange={(e) => setAdminCode(e.target.value)}
                      placeholder="Skriv inn administrator-kode"
                      required={isAdmin}
                      className="w-full"
                    />
                    <p className="text-xs text-blue-600 dark:text-blue-300">
                      Kun autoriserte administratorer kan opprette admin-kontoer
                    </p>
                  </div>
                )}
              </div>

              {registerError && (
                <div className="text-red-600 text-sm text-center bg-red-50 p-2 rounded animate-fade-in">
                  {registerError}
                </div>
              )}

              {registerSuccess && (
                <div className="text-green-600 text-sm text-center bg-green-50 p-2 rounded animate-fade-in">
                  {registerSuccess}
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 transition-all duration-200"
                disabled={isRegistering}
              >
                {isRegistering ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Oppretter konto...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Opprett konto
                  </div>
                )}
              </Button>

              <div className="text-center">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={toggleRegisterMode}
                  className="text-gray-600 hover:text-gray-700 hover:bg-gray-50 transition-all duration-200"
                >
                  Har du allerede en konto? Logg inn
                </Button>
              </div>
            </form>
          )}

          <Footer />
        </CardContent>
      </Card>
    </div>
  )
}
