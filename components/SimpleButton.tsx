"use client"

import type React from "react"

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  variant?: "primary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  className?: string
}

export default function SimpleButton({
  children,
  onClick,
  disabled = false,
  variant = "primary",
  size = "md",
  className = "",
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"

  const variantStyles = {
    primary: "bg-primary-600 text-white hover:bg-primary-700 focus-visible:ring-primary-500",
    outline:
      "border border-gray-300 dark:border-gray-600 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 focus-visible:ring-gray-500",
    ghost: "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 focus-visible:ring-gray-500",
  }

  const sizeStyles = {
    sm: "h-8 px-3 text-xs",
    md: "h-10 py-2 px-4",
    lg: "h-12 px-6 text-lg",
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </button>
  )
}
