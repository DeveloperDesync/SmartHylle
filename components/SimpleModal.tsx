"use client"

import type React from "react"
import { useEffect } from "react"
import SimpleButton from "./SimpleButton"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
}

export default function SimpleModal({ isOpen, onClose, children, title }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full transform transition-all">
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          {title && <h3 className="text-lg font-medium">{title}</h3>}
          <SimpleButton variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
            &times;
          </SimpleButton>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  )
}
