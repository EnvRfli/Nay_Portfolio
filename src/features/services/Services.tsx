import { useState } from "react"
import { ServiceCard } from "./ServiceCard"
import ComputerImg from "../../assets/computer.png"
import LaptopImg from "../../assets/laptop.png"
import PhoneLeftImg from "../../assets/phone_left.png"
import PhoneRightImg from "../../assets/phone_right.png"

const SERVICES_DATA = [
  {
    id: 0,
    bgGradient: "bg-gradient-to-br from-[#DAC2FE] to-[#CEADFF]",
    title: "Dashboard Admin",
    description: "Website untuk mengelola data dan sistem dengan mudah",
    align: "left" as const,
    imageSrc: ComputerImg,
  },
  {
    id: 1,
    bgGradient: "bg-gradient-to-br from-[#8F70FF] to-[#704FE6]",
    title: "Aplikasi Mobile",
    description: "Aplikasi ponsel untuk layanan cepat dan praktis kapan saja",
    align: "center" as const,
    imageSrc: PhoneLeftImg,
    imageSrc2: PhoneRightImg,
  },
  {
    id: 2,
    bgGradient: "bg-gradient-to-br from-[#FFD25D] to-[#FFBB5D]",
    title: "Website Publik",
    description: "Situs informasi dan layanan yang sederhana dan mudah diakses",
    align: "right" as const,
    imageSrc: LaptopImg,
  }
]

export function Services() {
  const [activeId, setActiveId] = useState<number | null>(null)

  return (
    <section id="layanan" className="py-24 relative">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 mb-16">
          <div className="lg:w-1/3">
            <h2 className="text-3xl lg:text-4xl font-bold text-dark-text" style={{ lineHeight: 1.8 }}>
              <span className="bg-gradient-to-r from-[#647ED4] to-[#4966D4] bg-clip-text text-transparent pt-2 pb-3">Layanan</span> yang<br />Ditawarkan
            </h2>
          </div>
          <div className="lg:w-2/3 flex items-center">
            <p className="text-lg text-slate-600" style={{ lineHeight: 2 }}>
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
              activeId={activeId}
              onHover={() => setActiveId(service.id)}
              onLeave={() => setActiveId(null)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
