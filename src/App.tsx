import { BrowserRouter, Routes, Route } from "react-router-dom"
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
