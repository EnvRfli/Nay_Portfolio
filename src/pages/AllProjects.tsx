import { useState, useEffect, useMemo } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { useProjects } from "../hooks/useProjects"
import { ProjectSimpleCard } from "../features/projects/ProjectSimpleCard"

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
        project.pills.forEach(pill => allPills.add(pill))
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
    <div className="min-h-screen bg-[#FFFFFF] pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-7xl">

        {/* Header Section */}
        <div className="mb-12">
          <Link to="/" className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white border border-slate-200 hover:bg-slate-50 transition-colors mb-12">
            <ArrowLeft className="text-slate-600" />
          </Link>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#26263B] mb-6">
            Kenali <span className="text-[#5974DD]">Solusi Desain</span> Saya
          </h1>
          <p className="text-slate-600 text-lg md:text-xl max-w-3xl leading-relaxed">
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
                ? "bg-[#5974DD] text-white"
                : "bg-white text-slate-600 hover:bg-slate-50 border border-transparent shadow-sm"
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8">
            {filteredProjects.map((project) => (
              <ProjectSimpleCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="w-full py-24 text-center">
            <p className="text-slate-500 text-lg">Tidak ada project yang sesuai dengan filter ini.</p>
          </div>
        )}

      </div>
    </div>
  )
}
