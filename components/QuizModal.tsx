"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  X,
  ChevronRight,
  HelpCircle,
  CheckCircle,
  XCircle,
  Trophy,
  Brain,
  Leaf,
  ShoppingCart,
  Award,
  RefreshCw,
} from "lucide-react"

interface QuizModalProps {
  isOpen: boolean
  onClose: () => void
}

interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  image?: string
}

export default function QuizModal({ isOpen, onClose }: QuizModalProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(20)
  const [timerActive, setTimerActive] = useState(true)

  const quizQuestions: QuizQuestion[] = [
    {
      id: "q1",
      question: "Hva er hovedformålet med Smarthylle-appen?",
      options: [
        "Å selge økologisk mat",
        "Å redusere matsvinn",
        "Å spore matens opprinnelse",
        "Å sammenligne matpriser",
      ],
      correctAnswer: 1,
      explanation:
        "Smarthylle bruker AI for å identifisere varer som nærmer seg utløpsdato og tilby rabatter for å redusere matsvinn.",
    },
    {
      id: "q2",
      question: "Hvilken teknologi bruker Smarthylle for å foreslå rabatter?",
      options: ["Blockchain", "Virtual Reality", "Kunstig intelligens (AI)", "5G-nettverk"],
      correctAnswer: 2,
      explanation:
        "Smarthylle bruker kunstig intelligens for å analysere data og foreslå optimale rabatter basert på utløpsdatoer og etterspørsel.",
    },
    {
      id: "q3",
      question: "Hvordan belønnes brukere i Smarthylle-appen?",
      options: ["Med kontanter", "Med poeng for hver reddet vare", "Med gratis leveranse", "Med gavekort"],
      correctAnswer: 1,
      explanation:
        "Brukere får poeng for hver vare de redder fra å bli kastet, og kan konkurrere på en toppliste for å vinne premier.",
    },
    {
      id: "q4",
      question: "Omtrent hvor mye av all produsert mat kastes globalt?",
      options: ["5%", "15%", "30%", "50%"],
      correctAnswer: 2,
      explanation:
        "Omtrent 30% av all mat som produseres globalt ender opp som matsvinn, noe som utgjør ca. 1.3 milliarder tonn årlig.",
    },
    {
      id: "q5",
      question: "Hvilken funksjon bruker kunder i butikken for å aktivere tilbud?",
      options: ["Ansiktsgjenkjenning", "Fingeravtrykk", "QR/strekkode", "NFC-brikke"],
      correctAnswer: 2,
      explanation: "Kunder viser sin unike strekkode/QR-kode i butikken for å aktivere tilbudene de har valgt i appen.",
    },
  ]

  useEffect(() => {
    if (isOpen) {
      resetQuiz()
    }
  }, [isOpen])

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (isOpen && timerActive && !isAnswered && !quizCompleted) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            handleTimeout()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => clearInterval(timer)
  }, [isOpen, timerActive, isAnswered, quizCompleted, currentQuestionIndex])

  const handleTimeout = () => {
    setIsAnswered(true)
    setTimerActive(false)
  }

  const resetQuiz = () => {
    setCurrentQuestionIndex(0)
    setSelectedOption(null)
    setIsAnswered(false)
    setScore(0)
    setQuizCompleted(false)
    setTimeLeft(20)
    setTimerActive(true)
  }

  const handleOptionSelect = (optionIndex: number) => {
    if (isAnswered) return

    setSelectedOption(optionIndex)
    setIsAnswered(true)
    setTimerActive(false)

    if (optionIndex === quizQuestions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedOption(null)
      setIsAnswered(false)
      setTimeLeft(20)
      setTimerActive(true)
    } else {
      setQuizCompleted(true)
    }
  }

  const getScoreMessage = () => {
    const percentage = (score / quizQuestions.length) * 100

    if (percentage === 100) return "Perfekt! Du er en Smarthylle-ekspert!"
    if (percentage >= 80) return "Veldig bra! Du vet mye om Smarthylle!"
    if (percentage >= 60) return "Bra jobbet! Du har forstått det grunnleggende!"
    if (percentage >= 40) return "Ikke verst! Du er på rett vei!"
    return "Du kan lære mer om Smarthylle ved å prøve appen!"
  }

  const getScoreColor = () => {
    const percentage = (score / quizQuestions.length) * 100

    if (percentage === 100) return "text-green-600 dark:text-green-400"
    if (percentage >= 80) return "text-blue-600 dark:text-blue-400"
    if (percentage >= 60) return "text-yellow-600 dark:text-yellow-400"
    if (percentage >= 40) return "text-orange-600 dark:text-orange-400"
    return "text-red-600 dark:text-red-400"
  }

  if (!isOpen) return null

  const currentQuestion = quizQuestions[currentQuestionIndex]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl bg-white dark:bg-gray-800 shadow-xl">
        <CardHeader className="relative border-b border-gray-200 dark:border-gray-700">
          <Button variant="ghost" size="sm" onClick={onClose} className="absolute right-4 top-4">
            <X className="w-5 h-5" />
          </Button>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <HelpCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl">Smarthylle Quiz</CardTitle>
              {!quizCompleted && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Spørsmål {currentQuestionIndex + 1} av {quizQuestions.length}
                </p>
              )}
            </div>
          </div>

          {!quizCompleted && (
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Tid igjen</span>
                <span className={timeLeft < 5 ? "text-red-500 font-bold" : ""}>{timeLeft} sekunder</span>
              </div>
              <Progress value={(timeLeft / 20) * 100} className="h-2" />
            </div>
          )}
        </CardHeader>

        <CardContent className="p-6">
          {!quizCompleted ? (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-4">{currentQuestion.question}</h3>

                <div className="space-y-3">
                  {currentQuestion.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleOptionSelect(index)}
                      disabled={isAnswered}
                      className={`w-full text-left p-4 rounded-lg border transition-all ${
                        selectedOption === index
                          ? isAnswered
                            ? index === currentQuestion.correctAnswer
                              ? "bg-green-100 border-green-500 dark:bg-green-900/30 dark:border-green-600"
                              : "bg-red-100 border-red-500 dark:bg-red-900/30 dark:border-red-600"
                            : "bg-blue-100 border-blue-500 dark:bg-blue-900/30 dark:border-blue-600"
                          : isAnswered && index === currentQuestion.correctAnswer
                            ? "bg-green-100 border-green-500 dark:bg-green-900/30 dark:border-green-600"
                            : "bg-white hover:bg-gray-50 border-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{option}</span>
                        {isAnswered && (
                          <>
                            {index === currentQuestion.correctAnswer ? (
                              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                            ) : selectedOption === index ? (
                              <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                            ) : null}
                          </>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {isAnswered && (
                <div
                  className={`p-4 rounded-lg ${
                    selectedOption === currentQuestion.correctAnswer
                      ? "bg-green-50 border border-green-200 dark:bg-green-900/20 dark:border-green-800"
                      : "bg-red-50 border border-red-200 dark:bg-red-900/20 dark:border-red-800"
                  }`}
                >
                  <p className="font-medium mb-2">
                    {selectedOption === currentQuestion.correctAnswer ? (
                      <span className="text-green-700 dark:text-green-400">Riktig svar!</span>
                    ) : (
                      <span className="text-red-700 dark:text-red-400">
                        Feil svar. Riktig svar er: {currentQuestion.options[currentQuestion.correctAnswer]}
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{currentQuestion.explanation}</p>
                </div>
              )}

              <div className="flex justify-end">
                <Button onClick={handleNextQuestion} disabled={!isAnswered} className="bg-blue-600 hover:bg-blue-700">
                  {currentQuestionIndex < quizQuestions.length - 1 ? (
                    <>
                      Neste spørsmål
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </>
                  ) : (
                    "Se resultater"
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto">
                <Trophy className="w-10 h-10 text-blue-600 dark:text-blue-400" />
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-2">Quiz fullført!</h3>
                <p className={`text-xl font-medium ${getScoreColor()}`}>
                  Din poengsum: {score} av {quizQuestions.length}
                </p>
                <p className="text-gray-600 dark:text-gray-300 mt-2">{getScoreMessage()}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <Brain className="w-6 h-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                  <p className="text-sm text-blue-800 dark:text-blue-200">AI-drevet teknologi</p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <Leaf className="w-6 h-6 text-green-600 dark:text-green-400 mx-auto mb-2" />
                  <p className="text-sm text-green-800 dark:text-green-200">Reduserer matsvinn</p>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                  <Award className="w-6 h-6 text-yellow-600 dark:text-yellow-400 mx-auto mb-2" />
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">Belønner brukere</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={resetQuiz} variant="outline" className="flex items-center">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Ta quizen på nytt
                </Button>
                <Button onClick={onClose} className="bg-blue-600 hover:bg-blue-700">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Prøv Smarthylle-appen
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
