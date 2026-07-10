import { useState } from "react"
import { ServiceCard } from "./ServiceCard"

const SERVICES_DATA = [
  {
    id: 0,
    bgGradient: "bg-gradient-to-br from-[#E1C4FF] to-[#D5ADFF]",
    title: "Dashboard Admin",
    description: "Website untuk mengelola data dan sistem dengan mudah",
    align: "left" as const,
  },
  {
    id: 1,
    bgGradient: "bg-gradient-to-br from-[#8C7DFF] to-[#6A52FF]",
    title: "Aplikasi Mobile",
    description: "Aplikasi ponsel untuk layanan cepat dan praktis kapan saja",
    align: "center" as const,
  },
  {
    id: 2,
    bgGradient: "bg-gradient-to-br from-[#FFD382] to-[#FFA842]",
    title: "Website Publik",
    description: "Situs informasi dan layanan yang sederhana dan mudah diakses",
    align: "right" as const,
  }
]

export function Services() {
  const [activeId, setActiveId] = useState<number | null>(null)

  return (
    <section id="layanan" className="py-24 bg-white relative">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-12 mb-16">
          <div className="lg:w-1/3">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 leading-tight">
              <span className="text-primary-blue">Layanan</span> yang<br />Ditawarkan
            </h2>
          </div>
          <div className="lg:w-2/3 flex items-center">
            <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
              Saya menawarkan layanan desain UI/UX profesional untuk dashboard admin, aplikasi mobile, dan website publik. Setiap solusi dirancang khusus untuk memenuhi kebutuhan klien, menghadirkan pengalaman yang estetis, fungsional, dan selaras dengan tujuan bisnis.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row h-auto md:h-[400px] w-full gap-4 md:gap-6">
          {SERVICES_DATA.map((service) => (
            <ServiceCard
              key={service.id}
              {...service}
              isActive={activeId === service.id}
              onHover={() => setActiveId(service.id)}
              onLeave={() => setActiveId(null)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
