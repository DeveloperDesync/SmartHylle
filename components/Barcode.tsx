"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface BarcodeProps {
  code: string
  username: string
}

export default function Barcode({ code, username }: BarcodeProps) {
  return (
    <Card className="bg-white dark:bg-gray-800">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-sm text-gray-600 dark:text-gray-400">Din handlekode</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <div className="bg-white p-4 rounded-lg mb-2 mx-auto inline-block">
          <div className="flex items-center justify-center space-x-1">
            {/* Simulert strekkode */}
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="bg-black"
                style={{
                  width: Math.random() > 0.5 ? "2px" : "1px",
                  height: "40px",
                }}
              />
            ))}
          </div>
          <p className="text-xs font-mono mt-2 text-black">{code}</p>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">Vis denne koden i butikken for å aktivere tilbud</p>
      </CardContent>
    </Card>
  )
}
