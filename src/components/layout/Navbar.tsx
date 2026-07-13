import { useState, useEffect } from "react"
import { Button } from "../ui/Button"
import { cn } from "../../lib/utils"
import { useAdmin } from "../../contexts/AdminContext"
import { useToast } from "../../contexts/ToastContext"
import { Modal } from "../ui/Modal"

const NAV_LINKS = [
  { name: "Beranda", href: "/#beranda" },
  { name: "Layanan", href: "/#layanan" },
  { name: "Project", href: "/#project" },
]

export function Navbar() {
  const [active, setActive] = useState("Beranda")
  const [scrolled, setScrolled] = useState(false)
  const { isAdmin, isEasterEggFound, setEasterEggFound, login, logout } = useAdmin()
  const { showToast } = useToast()

  const [showLoginModal, setShowLoginModal] = useState(false)
  const [adminKey, setAdminKey] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        if (!isEasterEggFound) {
          setEasterEggFound(true)
          showToast("Dev Mode Unlocked!", "success")
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isEasterEggFound, setEasterEggFound, showToast])

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (login(adminKey)) {
      showToast("Access Granted. Welcome, Admin.", "success")
      setShowLoginModal(false)
      setAdminKey("")
    } else {
      showToast("Access Denied. Incorrect key.", "error")
    }
  }

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          scrolled ? "bg-white/80 backdrop-blur-lg shadow-sm py-4" : "bg-transparent py-6"
        )}
      >
        <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
          <a href="/" className="text-2xl font-bold tracking-tight">
            <span className="text-primary-blue">portfolio</span>
            <span className="text-accent-orange">ku</span>
          </a>

          <div className="hidden md:flex items-center space-x-16">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setActive(link.name)}
                className={cn(
                  "text-md transition-colors relative",
                  active === link.name
                    ? "font-bold bg-gradient-to-r from-[#647ED4] to-[#4966D4] bg-clip-text text-transparent"
                    : "font-medium text-slate-600 hover:text-dark-text"
                )}
              >
                {link.name}
                {active === link.name && (
                  <span className="absolute -bottom-2 left-1/2 w-4 h-[3px] rounded-full -translate-x-1/2" style={{ background: 'linear-gradient(to right, #647ED4, #4966D4)' }} />
                )}
              </a>
            ))}

            {/* Easter Egg Button */}
            {isEasterEggFound && !isAdmin && (
              <button
                onClick={() => setShowLoginModal(true)}
                className="text-sm font-mono text-primary-blue bg-blue-50 px-3 py-1 rounded-md hover:bg-blue-100 transition-colors"
              >
                {'<Dev />'}
              </button>
            )}

            {isAdmin && (
              <button
                onClick={logout}
                className="text-sm font-mono text-red-500 bg-red-50 px-3 py-1 rounded-md hover:bg-red-100 transition-colors"
              >
                Logout Admin
              </button>
            )}

            <a
              href="/#kontak"
              onClick={() => setActive("Kontak")}
              className="text-sm font-bold px-12 py-3 rounded-full transition-all shadow-sm hover:shadow-md hover:opacity-90"
              style={{ background: 'linear-gradient(to right, #647ED4, #4966D4)', color: 'white' }}
            >
              Kontak
            </a>
          </div>
        </div>
      </nav>

      <Modal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} title="Developer Access">
        <form onSubmit={handleLoginSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Enter Access Key</label>
            <input
              type="password"
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all"
              placeholder="••••••••"
              autoFocus
            />
          </div>
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => setShowLoginModal(false)}>Cancel</Button>
            <Button type="submit" variant="primary">Authenticate</Button>
          </div>
        </form>
      </Modal>
    </>
  )
}
