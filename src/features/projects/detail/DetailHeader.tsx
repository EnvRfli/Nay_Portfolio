import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import type { Project } from "../../../types/database.types"
import ArrowDetail from "../../../assets/arrow_detail_project.svg"

export function DetailHeader({ project }: { project: Project }) {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute top-0 right-0 pointer-events-none z-0">
        <img src={ArrowDetail} alt="" className="w-[200px] md:w-[300px] lg:w-[400px] -mr-[10%] -mt-[10%] object-contain" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl pt-32 pb-12 relative z-10">
        <Link to="/" className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-slate-600 text-slate-600 hover:bg-slate-100 transition-colors mb-10">
          <ArrowLeft size={24} />
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold text-[#26263B] mb-4">
          {project.title}
        </h1>

        {project.company_name && (
          <h2 className="text-xl md:text-2xl bg-gradient-to-r from-[#647ED4] to-[#4966D4] bg-clip-text text-transparent font-medium mb-6">
            {project.company_name}
          </h2>
        )}

        <p className="text-slate-600 text-lg md:text-xl leading-10 max-w-4xl mb-10" style={{ lineHeight: 2 }}>
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
    </section>
  )
}
