import { Link } from "react-router-dom"
import type { Project } from "../../types/database.types"

interface ProjectSimpleCardProps {
  project: Project;
}

export function ProjectSimpleCard({ project }: ProjectSimpleCardProps) {
  return (
    <Link to={`/project/${project.id}`} className="group block">
      <div className="flex flex-col h-full">
        <div className="rounded-3xl overflow-hidden aspect-[4/3] bg-slate-100 mb-6">
          {project.image_url ? (
            <img
              src={project.image_url}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-400">
              No Image
            </div>
          )}
        </div>
        
        <div className="flex-1 flex flex-col px-2">
          <h3 className="text-xl font-bold text-[#26263B] mb-2">{project.title}</h3>
          
          <p className="text-[#5974DD] font-medium mb-3">
            {project.company_name}
          </p>
          
          <p className="text-slate-600 text-sm md:text-base line-clamp-2 leading-relaxed mb-6">
            {project.description}
          </p>

          <div className="mt-auto flex flex-wrap gap-3">
            {project.pills?.map((pill, idx) => (
              <span
                key={idx}
                className="px-5 py-2 bg-[#F1F3F9] text-slate-700 text-xs font-medium rounded-full"
              >
                {pill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}
