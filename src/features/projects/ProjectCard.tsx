import { useState } from "react"
import { Link } from "react-router-dom"
import { Card } from "../../components/ui/Card"
import type { Project } from "../../types/database.types"
import { Edit2, Trash2 } from "lucide-react"
import { ProjectFormModal } from "./admin/ProjectFormModal"
import { DeleteConfirmModal } from "./admin/DeleteConfirmModal"

interface ProjectCardProps {
  project: Project;
  isAdmin?: boolean;
}

export function ProjectCard({ project, isAdmin = false }: ProjectCardProps) {
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsEditOpen(true)
  }

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDeleteOpen(true)
  }

  return (
    <>
      <Link to={`/project/${project.id}`} className="block h-[450px]">
        <Card className="overflow-hidden group cursor-pointer border-0 shadow-soft h-full relative rounded-3xl flex flex-col">
          <div className="absolute inset-0 bg-slate-100">
            {project.image_url ? (
              <img
                src={project.image_url}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400">
                No Image
              </div>
            )}
          </div>

          {/* Admin Controls Overlay */}
          {isAdmin && (
            <div className="absolute top-4 right-4 z-30 flex gap-2">
              <button
                onClick={handleEditClick}
                className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-colors shadow-lg"
              >
                <Edit2 size={18} />
              </button>
              <button
                onClick={handleDeleteClick}
                className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-colors shadow-lg"
              >
                <Trash2 size={18} />
              </button>
            </div>
          )}

          {/* Slide-up overlay */}
          <div className="absolute inset-x-0 bottom-0 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] bg-[#26263B] rounded-2xl p-6 z-20 flex flex-col shadow-2xl h-[280px]">
            <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
            <p className="text-xs font-semibold text-amber-500 uppercase tracking-wider mb-4">
              {project.company_name}
            </p>
            <p className="text-slate-300 line-clamp-4 text-sm mb-6 flex-1 leading-relaxed">{project.description}</p>

            <div className="mt-auto">
              <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#26263B] transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </div>
            </div>
          </div>
        </Card>
      </Link>

      <ProjectFormModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        project={project}
      />
      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        projectId={project.id}
        projectTitle={project.title}
      />
    </>
  )
}
