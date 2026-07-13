import { useProjects } from "../../../hooks/useProjects"
import { ProjectSimpleCard } from "../ProjectSimpleCard"
import { Button } from "../../../components/ui/Button"
import { useNavigate } from "react-router-dom"

interface FeaturedProjectsProps {
  currentProjectId: string;
}

export function FeaturedProjects({ currentProjectId }: FeaturedProjectsProps) {
  const { projects, loading } = useProjects()
  const navigate = useNavigate();

  // Filter out current project and take up to 3
  const featured = projects
    .filter(p => p.id !== currentProjectId)
    .slice(0, 3)

  if (loading) {
    return (
      <div className="w-full py-24 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-blue"></div>
      </div>
    )
  }

  if (featured.length === 0) return null;

  return (
    <section className="py-24 bg-[#F8F9FB]">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#26263B] mb-6 leading-tight">
              Pilihan Project <span className="text-[#5974DD]">Unggulan</span>
            </h2>
            <p className="text-slate-600 text-md md:text-lg" style={{ lineHeight: 2 }}>
              Hasil kerja terbaik telah dipilih untuk Anda. Temukan kreativitas yang menarik dan solusi yang relevan dalam setiap proyek
            </p>
          </div>

          <div className="shrink-0">
            <Button
              size="lg"
              onClick={() => navigate('/projects')}
              className="bg-gradient-to-r from-[#647ED4] to-[#4966D4] text-white border-0 hover:opacity-90 transition-opacity"
            >
              Lihat Semua Project
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8">
          {featured.map((project) => (
            <ProjectSimpleCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
