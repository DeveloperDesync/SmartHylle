"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Leaf } from 'lucide-react'
import type { Warning } from "@/types"

interface WarningModalProps {
  warnings: Warning[]
  onClose: () => void
}

export default function WarningModal({ warnings, onClose }: WarningModalProps) {
  if (warnings.length === 0) return null

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString("nb-NO")
  }

  const hasWarnings = warnings.some((w) => w.type !== "items_update")
  const hasItemsUpdates = warnings.some((w) => w.type === "items_update")

  const getIcon = () => {
    if (hasWarnings && hasItemsUpdates) {
      return <AlertTriangle className="w-8 h-8 text-blue-600 dark:text-blue-400" />
    } else if (hasItemsUpdates) {
      return <Leaf className="w-8 h-8 text-green-600 dark:text-green-400" />
    } else {
      return <AlertTriangle className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
    }
  }

  const getTitle = () => {
    if (hasWarnings && hasItemsUpdates) {
      return "Viktige meldinger"
    } else if (hasItemsUpdates) {
      return "Oppdatering av reddet varer"
    } else {
      return "Viktig melding"
    }
  }

  const getBackgroundColor = (warning: Warning) => {
    if (warning.type === "items_update") {
      return "bg-green-50 dark:bg-green-900/20"
    }
    return "bg-yellow-50 dark:bg-yellow-900/20"
  }

  const getBorderColor = (warning: Warning) => {
    if (warning.type === "items_update") {
      return "border-green-200 dark:border-green-600"
    }
    return "border-yellow-200 dark:border-yellow-600"
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md bg-white dark:bg-gray-800">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
            {getIcon()}
          </div>
          <CardTitle className="text-xl text-gray-800 dark:text-gray-200">{getTitle()}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {warnings.map((warning) => (
            <div
              key={warning.id}
              className={`p-4 rounded-lg border ${getBackgroundColor(warning)} ${getBorderColor(warning)}`}
            >
              <div className="flex items-start space-x-2">
                {warning.type === "items_update" ? (
                  <Leaf className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                )}
                <div className="flex-1">
                  <p className="text-gray-800 dark:text-gray-200 mb-2">{warning.message}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{formatTimestamp(warning.timestamp)}</p>
                </div>
              </div>
            </div>
          ))}
          <Button onClick={onClose} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Jeg forstår
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
