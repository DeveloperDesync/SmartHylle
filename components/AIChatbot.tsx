"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}

const predefinedResponses: Record<string, string> = {
  hei: "Hei! 👋 Jeg er Smarthylle AI, din personlige matsvinn-ekspert! Spør meg om alt som har med matsvinn å gjøre.",
  "hva er matsvinn":
    "Matsvinn er mat som produseres for mennesker, men som ikke blir spist. Globalt kastes 1/3 av all mat - det er 1.3 milliarder tonn årlig! 😱",
  "hvordan fungerer smarthylle":
    "Smarthylle bruker AI for å analysere utløpsdatoer og foreslå smarte rabatter. Butikker får solgt mat i stedet for å kaste den, og du sparer penger! 💰",
  "hvor mye kan jeg spare":
    "Gjennomsnittlig kan du spare 2000-4000 kr årlig ved å bruke Smarthylle! Plus du hjelper miljøet ved å redusere CO₂-utslipp. 🌱",
  miljøpåvirkning:
    "Matsvinn står for 8-10% av globale CO₂-utslipp! Hvis matsvinn var et land, ville det vært det tredje største utslippslandet etter Kina og USA. 🌍",
  tips: "Her er mine beste tips: 1) Planlegg måltider 2) Lagre mat riktig 3) Bruk rester kreativt 4) Kjøp bare det du trenger 5) Bruk Smarthylle for gode tilbud! ✨",
  norge:
    "I Norge kaster hver person ca. 68 kg mat årlig. Det tilsvarer 350,000 tonn totalt og koster samfunnet 20 milliarder kroner! 🇳🇴",
  ai: "Vår AI analyserer salgsdata, værforhold, sesongvariasjoner og utløpsdatoer for å foreslå optimale rabatter. Jo mer data, jo smartere blir systemet! 🤖",
  butikker:
    "Vi samarbeider med butikker for å redusere deres matsvinn med opptil 40%. Det er en win-win situasjon - mindre svinn for dem, billigere mat for deg! 🏪",
  fremtid:
    "Vår visjon er et Norge uten matsvinn innen 2030! Vi jobber mot å redde 1 million tonn mat og spare 2.5 millioner tonn CO₂ årlig. 🚀",
}

const getAIResponse = (input: string): string => {
  const lowerInput = input.toLowerCase()

  // Check for exact matches first
  for (const [key, response] of Object.entries(predefinedResponses)) {
    if (lowerInput.includes(key)) {
      return response
    }
  }

  // Fallback responses based on keywords
  if (lowerInput.includes("penger") || lowerInput.includes("spare") || lowerInput.includes("kost")) {
    return "💰 Med Smarthylle kan du spare tusenvis av kroner årlig! Gjennomsnittsfamilien sparer 3000 kr ved å kjøpe mat som nærmer seg utløpsdato med 30-50% rabatt."
  }

  if (lowerInput.includes("miljø") || lowerInput.includes("co2") || lowerInput.includes("klima")) {
    return "🌱 Matsvinn er en av de største miljøutfordringene! Ved å redusere matsvinn med bare 25% kan vi spare like mye CO₂ som å ta 1 million biler av veien."
  }

  if (lowerInput.includes("hvordan") || lowerInput.includes("fungerer")) {
    return "🤖 Smarthylle fungerer slik: 1) AI analyserer butikkens lager 2) Foreslår rabatter på varer som nærmer seg utløp 3) Du får varsler om tilbud 4) Mat reddes fra å bli kastet!"
  }

  if (lowerInput.includes("app") || lowerInput.includes("nedlast")) {
    return "📱 Appen er under utvikling! Du kan teste prototypen her på nettsiden. Vi lanserer beta-versjon i Q2 2025. Registrer deg for å få beskjed når den er klar!"
  }

  // Default response
  return "🤔 Interessant spørsmål! Jeg er ekspert på matsvinn, miljøpåvirkning, og hvordan Smarthylle kan hjelpe deg spare penger. Prøv å spørre om 'tips', 'miljøpåvirkning', eller 'hvordan fungerer smarthylle'!"
}

export default function AIChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hei! 👋 Jeg er Smarthylle AI, din personlige matsvinn-ekspert! Spør meg om matsvinn, miljøpåvirkning, eller hvordan du kan spare penger med vår app. Hva lurer du på?",
      isUser: false,
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(
      () => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: getAIResponse(input),
          isUser: false,
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, aiResponse])
        setIsTyping(false)
      },
      1000 + Math.random() * 1000,
    ) // 1-2 seconds delay
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const quickQuestions = [
    "Hva er matsvinn?",
    "Hvor mye kan jeg spare?",
    "Miljøpåvirkning",
    "Gi meg tips",
    "Hvordan fungerer AI-en?",
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="h-[600px] flex flex-col">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3 animate-pulse">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
              >
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
              </svg>
            </div>
            <div>
              <div className="text-xl font-bold">Smarthylle AI</div>
              <div className="text-sm text-blue-100">Din matsvinn-ekspert</div>
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? "justify-end" : "justify-start"} animate-fade-in`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.isUser
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-none"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString("nb-NO", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start animate-fade-in">
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg rounded-bl-none">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">💡 Foreslåtte spørsmål:</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {quickQuestions.map((question) => (
                <button
                  key={question}
                  onClick={() => setInput(question)}
                  className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="flex space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Spør meg om matsvinn, miljø, eller Smarthylle..."
                className="flex-1"
                disabled={isTyping}
              />
              <Button
                onClick={sendMessage}
                disabled={!input.trim() || isTyping}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m22 2-7 20-4-9-9-4Z" />
                  <path d="M22 2 11 13" />
                </svg>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
