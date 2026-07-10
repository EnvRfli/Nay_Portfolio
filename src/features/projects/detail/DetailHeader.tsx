import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import type { Project } from "../../../types/database.types"

export function DetailHeader({ project }: { project: Project }) {
  return (
    <div className="container mx-auto px-6 max-w-7xl pt-32 pb-12">
      <Link to="/" className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-slate-300 text-slate-600 hover:bg-slate-100 transition-colors mb-10">
        <ArrowLeft size={24} />
      </Link>

      <h1 className="text-4xl md:text-5xl font-bold text-[#26263B] mb-3">
        {project.title}
      </h1>

      {project.company_name && (
        <h2 className="text-xl md:text-2xl text-primary-blue font-medium mb-6">
          {project.company_name}
        </h2>
      )}

      <p className="text-slate-600 text-lg md:text-xl leading-relaxed max-w-4xl mb-10">
        {project.description}
      </p>

      {project.pills && project.pills.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {project.pills.map((pill, idx) => (
            <span key={idx} className="bg-[#EAEFFD] text-[#3B4168] px-6 py-2.5 rounded-full text-sm font-medium shadow-sm">
              {pill}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
