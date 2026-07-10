import { createContext, useContext, useState, useEffect, useCallback } from "react"
import type { ReactNode } from "react"

interface AdminContextType {
  isAdmin: boolean;
  login: (key: string) => boolean;
  logout: () => void;
  isEasterEggFound: boolean;
  setEasterEggFound: (val: boolean) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false)
  const [isEasterEggFound, setEasterEggFound] = useState(false)

  // Initialize from session storage
  useEffect(() => {
    const sessionAdmin = sessionStorage.getItem("portfolio_admin")
    if (sessionAdmin === "true") {
      setIsAdmin(true)
      setEasterEggFound(true)
    }
  }, [])

  const login = useCallback((key: string) => {
    const adminKey = import.meta.env.VITE_ADMIN_KEY || "iloveyou"
    if (key === adminKey) {
      setIsAdmin(true)
      sessionStorage.setItem("portfolio_admin", "true")
      return true
    }
    return false
  }, [])

  const logout = useCallback(() => {
    setIsAdmin(false)
    setEasterEggFound(false)
    sessionStorage.removeItem("portfolio_admin")
  }, [])

  return (
    <AdminContext.Provider value={{ isAdmin, login, logout, isEasterEggFound, setEasterEggFound }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider")
  }
  return context
}
