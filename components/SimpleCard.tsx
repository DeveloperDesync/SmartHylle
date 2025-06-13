"use client"

import type React from "react"

interface CardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export default function SimpleCard({ children, className = "", onClick }: CardProps) {
  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
