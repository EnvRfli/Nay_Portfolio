import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { useEffect } from "react"
import { Navbar } from "./components/layout/Navbar"
import { Footer } from "./components/layout/Footer"
import { Hero } from "./features/hero/Hero"
import { Services } from "./features/services/Services"
import { Projects } from "./features/projects/Projects"
import { Contact } from "./features/contact/Contact"
import { ProjectDetail } from "./pages/ProjectDetail"
import { AllProjects } from "./pages/AllProjects"
import { AdminProvider } from "./contexts/AdminContext"
import { ToastProvider } from "./contexts/ToastContext"

function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Use timeout to solve race condition and ensure elements are rendered
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else if (pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname, hash]);

  return null;
}

function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Projects />
      <Contact />
    </main>
  )
}

function App() {
  return (
    <ToastProvider>
      <AdminProvider>
        <BrowserRouter>
          <div className="font-sans">
            <ScrollToHash />
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/project/:id" element={<ProjectDetail />} />
              <Route path="/projects" element={<AllProjects />} />
            </Routes>
            <Footer />
          </div>
        </BrowserRouter>
      </AdminProvider>
    </ToastProvider>
  )
}

export default App
