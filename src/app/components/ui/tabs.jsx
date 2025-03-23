"use client"

import { createContext, useContext, useState } from "react"

const TabsContext = createContext(null)

export function Tabs({ defaultValue, children, className = "", ...props }) {
  const [activeTab, setActiveTab] = useState(defaultValue)

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={className} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}

export function TabsList({ children, className = "", ...props }) {
  return (
    <div className={`flex space-x-2 ${className}`} {...props}>
      {children}
    </div>
  )
}

export function TabsTrigger({ children, value, className = "", ...props }) {
  const { activeTab, setActiveTab } = useContext(TabsContext)
  const isActive = activeTab === value

  return (
    <button
      className={`px-4 py-2 rounded ${isActive ? "bg-primary text-white" : "bg-gray-100"} ${className}`}
      onClick={() => setActiveTab(value)}
      {...props}
    >
      {children}
    </button>
  )
}

export function TabsContent({ children, value, className = "", ...props }) {
  const { activeTab } = useContext(TabsContext)

  if (activeTab !== value) {
    return null
  }

  return (
    <div className={className} {...props}>
      {children}
    </div>
  )
}

export default Tabs

