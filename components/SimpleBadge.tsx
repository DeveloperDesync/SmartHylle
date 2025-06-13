import type React from "react"

interface BadgeProps {
  children: React.ReactNode
  variant?: "default" | "outline" | "success"
  className?: string
}

export default function SimpleBadge({ children, variant = "default", className = "" }: BadgeProps) {
  const variantStyles = {
    default: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
    outline: "border border-gray-200 dark:border-gray-700 bg-transparent",
    success: "bg-success-100 text-success-800 dark:bg-success-900/20 dark:text-success-300",
  }

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
