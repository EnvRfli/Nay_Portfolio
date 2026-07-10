import { useState } from "react"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import type { Swiper as SwiperType } from 'swiper';

import { ProjectCard } from "./ProjectCard"
import { useProjects } from "../../hooks/useProjects"
import { Button } from "../../components/ui/Button"
import { MOCK_PROJECTS } from "../../lib/mockData"
import { useAdmin } from "../../contexts/AdminContext"
import { ProjectFormModal } from "./admin/ProjectFormModal"

export function Projects() {
  const { projects: fetchedProjects, loading } = useProjects();
  const { isAdmin } = useAdmin();
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  
  // Modal states
  const [isFormModalOpen, setFormModalOpen] = useState(false);
  
  // Use fetched projects if available, otherwise mock data for preview
  const projects = fetchedProjects.length > 0 ? fetchedProjects : MOCK_PROJECTS;

  return (
    <section id="project" className="py-24 bg-white relative">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold text-accent-orange uppercase tracking-wider mb-3">
              Project Saya
            </h2>
            <h3 className="text-3xl md:text-5xl font-bold text-[#26263B] mb-6 leading-tight">
              Eksplorasi Karya <br />
              <span className="text-slate-400">Terbaik Saya</span>
            </h3>
            <p className="text-slate-600 text-lg md:text-xl">
              Beberapa hasil karya yang telah saya kerjakan dengan penuh dedikasi.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            {isAdmin && (
              <Button onClick={() => setFormModalOpen(true)} className="flex items-center gap-2">
                <Plus size={18} />
                Tambah Project
              </Button>
            )}
            
            {/* Custom Navigation Buttons */}
            <div className="flex items-center gap-3">
              <button 
                onClick={() => swiperInstance?.slidePrev()}
                className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-primary-blue hover:border-primary-blue transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={() => swiperInstance?.slideNext()}
                className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-primary-blue hover:border-primary-blue transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="h-[450px] flex items-center justify-center bg-slate-50 rounded-3xl">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-blue"></div>
          </div>
        ) : (
          <div className="relative -mx-6 px-6">
            <Swiper
              modules={[Navigation]}
              spaceBetween={24}
              slidesPerView={1.2}
              onSwiper={setSwiperInstance}
              breakpoints={{
                640: {
                  slidesPerView: 2.2,
                },
                1024: {
                  slidesPerView: 3,
                }
              }}
              className="!pb-12"
            >
              {projects.map((project) => (
                <SwiperSlide key={project.id}>
                  <ProjectCard project={project} isAdmin={isAdmin} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>

      <ProjectFormModal 
        isOpen={isFormModalOpen} 
        onClose={() => setFormModalOpen(false)} 
        project={null}
      />
    </section>
  )
}
