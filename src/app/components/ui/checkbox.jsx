"use client"

import { forwardRef } from "react"

const Checkbox = forwardRef(({ className = "", checked, onCheckedChange, ...props }, ref) => {
  return (
    <div className="relative flex items-center">
      <input
        type="checkbox"
        ref={ref}
        checked={checked}
        onChange={(e) => onCheckedChange && onCheckedChange(e.target.checked)}
        className={`h-4 w-4 rounded border border-gray-300 text-blue-600 focus:ring-blue-500 ${className}`}
        {...props}
      />
    </div>
  )
})

Checkbox.displayName = "Checkbox"

export { Checkbox }
