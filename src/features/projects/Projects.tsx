import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { ChevronLeft, ChevronRight, Plus, ArrowRight } from 'lucide-react';
import type { Swiper as SwiperType } from 'swiper';

import { ProjectCard } from "./ProjectCard"
import { useProjects } from "../../hooks/useProjects"
import { Button } from "../../components/ui/Button"
import { MOCK_PROJECTS } from "../../lib/mockData"
import { useAdmin } from "../../contexts/AdminContext"
import { ProjectFormModal } from "./admin/ProjectFormModal"
import ArrowService from "../../assets/arrow_service.svg"

export function Projects() {
  const navigate = useNavigate();
  const { projects: fetchedProjects, loading } = useProjects();
  const { isAdmin } = useAdmin();
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  // Modal states
  const [isFormModalOpen, setFormModalOpen] = useState(false);

  // Use fetched projects if available, otherwise mock data for preview
  const projects = fetchedProjects.length > 0 ? fetchedProjects : MOCK_PROJECTS;

  return (
    <section id="project" className="py-24 relative overflow-hidden">
      {/* Background Shape */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 -left-20 w-[300px] md:w-[400px] lg:w-[600px] h-[300px] md:h-[400px] lg:h-[600px] bg-gradient-to-r from-[#647ED4] to-[#4966D4] rounded-full blur-[200px] opacity-10" />
        <img src={ArrowService} alt="" className="absolute top-0 left-0 w-[100px] md:w-[150px] lg:w-[200px]" />
      </div>
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-dark-text mb-6 leading-tight">
              Jelajahi Hasil <span className="bg-gradient-to-r from-[#647ED4] to-[#4966D4] bg-clip-text text-transparent">Project Saya</span>
            </h2>
            <p className="text-slate-600 text-md md:text-lg" style={{ lineHeight: 2 }}>
              Saya merancang desain UI/UX berbasis riset untuk menciptakan pengalaman yang intuitif, estetis, dan mendukung tujuan bisnis.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {isAdmin && (
              <Button onClick={() => setFormModalOpen(true)} className="flex items-center gap-2">
                <Plus size={18} />
                Tambah Project
              </Button>
            )}

            <Button 
              size="lg" 
              onClick={() => navigate('/projects')}
              className="group bg-gradient-to-r from-[#647ED4] to-[#4966D4] text-white border-0 hover:opacity-90 transition-all flex items-center"
            >
              Lihat Semua Project
              <div className="flex items-center justify-center w-0 opacity-0 group-hover:w-5 group-hover:ml-2 group-hover:opacity-100 transition-all duration-300 overflow-hidden">
                <ArrowRight className="w-5 h-5 shrink-0" />
              </div>
            </Button>
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
              onSwiper={(swiper) => {
                setSwiperInstance(swiper);
                setIsBeginning(swiper.isBeginning);
                setIsEnd(swiper.isEnd);
              }}
              onSlideChange={(swiper) => {
                setIsBeginning(swiper.isBeginning);
                setIsEnd(swiper.isEnd);
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2.2,
                },
                1024: {
                  slidesPerView: 3,
                }
              }}
              className="!pb-6"
            >
              {projects.map((project) => (
                <SwiperSlide key={project.id}>
                  <ProjectCard project={project} isAdmin={isAdmin} />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation Buttons (Bottom Center) */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={() => swiperInstance?.slidePrev()}
                disabled={isBeginning}
                className="w-14 h-14 rounded-full flex items-center justify-center text-white bg-gradient-to-r from-[#647ED4] to-[#4966D4] transition-all hover:scale-105 hover:shadow-lg disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
              >
                <ChevronLeft size={28} />
              </button>
              <button
                onClick={() => swiperInstance?.slideNext()}
                disabled={isEnd}
                className="w-14 h-14 rounded-full flex items-center justify-center text-white bg-gradient-to-r from-[#647ED4] to-[#4966D4] transition-all hover:scale-105 hover:shadow-lg disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
              >
                <ChevronRight size={28} />
              </button>
            </div>
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
