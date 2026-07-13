import { useState, useEffect, useMemo } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { useProjects } from "../hooks/useProjects"
import { ProjectSimpleCard } from "../features/projects/ProjectSimpleCard"
import ArrowAll from "../assets/arrow_all_project.svg"
import { motion, AnimatePresence } from "framer-motion"

export function AllProjects() {
  const { projects, loading } = useProjects()
  const [activeFilter, setActiveFilter] = useState("Semua Project")

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Extract unique pills from all projects
  const availableFilters = useMemo(() => {
    const allPills = new Set<string>()
    projects.forEach(project => {
      if (project.pills) {
        project.pills.forEach(pill => {
          if (pill !== "Creator" && pill !== "Modifier") {
            allPills.add(pill)
          }
        })
      }
    })
    return ["Semua Project", ...Array.from(allPills).sort()]
  }, [projects])

  // Filter projects based on active filter
  const filteredProjects = useMemo(() => {
    if (activeFilter === "Semua Project") {
      return projects
    }
    return projects.filter(p => p.pills && p.pills.includes(activeFilter))
  }, [projects, activeFilter])

  return (
    <div className="min-h-screen bg-[#FFFFFF] pt-32 pb-24 relative overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute top-100 right-0 pointer-events-none z-0">
        <img src={ArrowAll} alt="" className="w-[100px] md:w-[150px] lg:w-[200px] object-cover" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">

        {/* Header Section */}
        <div className="mb-12">
          <Link to="/" className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white border border-slate-600 hover:bg-slate-50 transition-colors mb-12">
            <ArrowLeft className="text-slate-600" />
          </Link>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#26263B] mb-8">
            Kenali <span className="bg-gradient-to-r from-[#647ED4] to-[#4966D4] bg-clip-text text-transparent">Solusi Desain</span> Saya
          </h1>
          <p className="text-slate-600 text-lg md:text-xl w-full md:w-4/5" style={{ lineHeight: 1.8 }}>
            Menghadirkan solusi desain UI/UX berbasis data dan riset untuk menciptakan pengalaman yang intuitif, estetis, dan strategis bagi kebutuhan bisnis.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-3 mb-16">
          {availableFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-colors ${activeFilter === filter
                ? "bg-gradient-to-r from-[#647ED4] to-[#4966D4] text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200 border border-transparent shadow-sm"
                }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="w-full py-24 flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-blue"></div>
          </div>
        ) : filteredProjects.length > 0 ? (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProjectSimpleCard project={project} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="w-full py-24 text-center">
            <p className="text-slate-500 text-lg">Tidak ada project yang sesuai dengan filter ini.</p>
          </div>
        )}

      </div>
    </div>
  )
}
