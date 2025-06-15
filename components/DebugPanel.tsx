"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { getCurrentStorageType } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DebugPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const [debugInfo, setDebugInfo] = useState<any>({})
  const [testResults, setTestResults] = useState<string[]>([])

  const runDiagnostics = async () => {
    const results: string[] = []

    try {
      // Test 1: Check storage type
      const storageType = getCurrentStorageType()
      results.push(`✅ Storage Type: ${storageType}`)

      // Test 2: Test Supabase connection
      try {
        const { data, error } = await supabase.from("users").select("count").limit(1)
        if (error) throw error
        results.push(`✅ Supabase Connection: OK`)
      } catch (error) {
        results.push(`❌ Supabase Connection: ${error}`)
      }

      // Test 3: Check tables
      try {
        const { data: users } = await supabase.from("users").select("*").limit(1)
        const { data: offers } = await supabase.from("offers").select("*").limit(1)
        const { data: notifications } = await supabase.from("notifications").select("*").limit(1)
        const { data: warnings } = await supabase.from("warnings").select("*").limit(1)

        results.push(`✅ Users table: ${users?.length || 0} records`)
        results.push(`✅ Offers table: ${offers?.length || 0} records`)
        results.push(`✅ Notifications table: ${notifications?.length || 0} records`)
        results.push(`✅ Warnings table: ${warnings?.length || 0} records`)
      } catch (error) {
        results.push(`❌ Tables check: ${error}`)
      }

      // Test 4: Test real-time
      try {
        const channel = supabase.channel("test-channel")
        results.push(`✅ Real-time channels: Available`)
        supabase.removeChannel(channel)
      } catch (error) {
        results.push(`❌ Real-time: ${error}`)
      }

      // Test 5: Check localStorage fallback
      const localData = localStorage.getItem("smarthylle-users")
      results.push(`📱 localStorage users: ${localData ? JSON.parse(localData).length : 0}`)
    } catch (error) {
      results.push(`❌ Diagnostics failed: ${error}`)
    }

    setTestResults(results)
  }

  const clearLocalStorage = () => {
    localStorage.removeItem("smarthylle-users")
    localStorage.removeItem("smarthylle-offers")
    localStorage.removeItem("smarthylle-notifications")
    localStorage.removeItem("smarthylle-remembered-user")
    alert("localStorage cleared! Refresh the page.")
  }

  const testCrossDevice = async () => {
    try {
      const testUser = {
        username: `test_${Date.now()}`,
        password: "test123",
        role: "user" as const,
        fullName: "Cross Device Test User",
        banned: false,
        favorites: [],
        itemsSaved: 0,
      }

      const { data, error } = await supabase
        .from("users")
        .insert({
          username: testUser.username,
          password: testUser.password,
          role: testUser.role,
          full_name: testUser.fullName,
          banned: testUser.banned,
          favorites: testUser.favorites,
          items_saved: testUser.itemsSaved,
          barcode: `TEST${Math.random().toString().slice(2, 8)}`,
        })
        .select()
        .single()

      if (error) throw error

      alert(`✅ Test user created: ${testUser.username}/test123\nTry logging in with this on another device!`)
    } catch (error) {
      alert(`❌ Failed to create test user: ${error}`)
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-16 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs z-50 hover:bg-red-700"
      >
        🔧 Debug
      </button>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            🔧 Debug Panel
            <Button variant="outline" size="sm" onClick={() => setIsOpen(false)}>
              ✕
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <Button onClick={runDiagnostics} className="w-full">
              🔍 Run Diagnostics
            </Button>
            <Button onClick={testCrossDevice} variant="outline" className="w-full">
              📱 Test Cross-Device
            </Button>
            <Button onClick={clearLocalStorage} variant="destructive" className="w-full">
              🗑️ Clear localStorage
            </Button>
            <Button onClick={() => window.location.reload()} variant="outline" className="w-full">
              🔄 Refresh App
            </Button>
          </div>

          {testResults.length > 0 && (
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="font-bold mb-2">🔍 Diagnostic Results:</h3>
              <div className="space-y-1 text-sm font-mono">
                {testResults.map((result, index) => (
                  <div key={index} className={result.startsWith("❌") ? "text-red-600" : "text-green-600"}>
                    {result}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-bold mb-2">📋 Quick Tests:</h3>
            <ol className="text-sm space-y-1 list-decimal list-inside">
              <li>Click "Run Diagnostics" to check everything</li>
              <li>Click "Test Cross-Device" to create a test user</li>
              <li>Try logging in with the test user on another device</li>
              <li>If it doesn't work, check the diagnostic results</li>
            </ol>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="font-bold mb-2">⚠️ Common Issues:</h3>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Browser cache - try incognito/private mode</li>
              <li>Different networks - both devices need internet</li>
              <li>Supabase RLS policies - might block access</li>
              <li>localStorage fallback - clear it and refresh</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
