import ArrowTopRight from "../../assets/arrow_footer_top_right.svg"
import ArrowBottomLeft from "../../assets/arrow_footer_bottom_left.svg"
import { Link } from "react-router-dom"

export function Footer() {
  return (
    <footer className="bg-[#272343] text-white relative overflow-hidden py-16">
      {/* Decorative background swirly lines */}
      <div className="absolute top-0 right-0 pointer-events-none z-0">
        <img src={ArrowTopRight} alt="" className="w-64 md:w-80 lg:w-[250px] object-cover" />
      </div>
      <div className="absolute bottom-0 left-0 pointer-events-none z-0">
        <img src={ArrowBottomLeft} alt="" className="w-64 md:w-80 lg:w-[250px] object-cover" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10 flex flex-col md:flex-row items-center justify-between gap- mb-16">
        {/* Left: Logo */}
        <div className="text-3xl md:text-4xl font-bold tracking-tight">
          <span className="text-primary-blue">portfolio</span>
          <span className="text-accent-orange">ku</span>
        </div>

        {/* Right: Text and Pills */}
        <div className="flex flex-col gap-6 max-w-2xl text-center md:text-left">
          <p className="text-slate-300 text-lg leading-10">
            Portofolio ini menunjukkan komitmen saya dalam menciptakan desain UI/UX yang inovatif dan efektif bagi klien.
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <Link to="/#beranda" className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium">Beranda</Link>
            <Link to="/#layanan" className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium">Layanan</Link>
            <Link to="/#project" className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium">Project</Link>
            <Link to="/#kontak" className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium">Kontak</Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="border-t border-white/10 pt-8 text-center text-sm text-slate-400">
          Copyright © 2024 Nazilla. All Rights Reserved.
        </div>
      </div>
    </footer>
  )
}
