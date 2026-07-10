export function Footer() {
  return (
    <footer className="bg-dark-navy text-white relative overflow-hidden py-16">
      {/* Decorative background swirly lines */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 opacity-20 pointer-events-none">
        <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 200C50 117.157 117.157 50 200 50C282.843 50 350 117.157 350 200C350 282.843 282.843 350 200 350C117.157 350 50 282.843 50 200Z" stroke="white" strokeWidth="40"/>
        </svg>
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
        <div className="text-3xl font-bold tracking-tight">
          <span className="text-primary-blue">portfolio</span>
          <span className="text-accent-orange">ku</span>
        </div>
        
        <div className="flex-1 max-w-xl text-center md:text-left text-slate-300">
          Portofolio ini menunjukkan komitmen saya dalam menciptakan desain UI/UX yang inovatif dan efektif bagi klien.
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-7xl flex flex-wrap justify-center gap-4 mb-16 relative z-10">
        <a href="#beranda" className="px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium">Beranda</a>
        <a href="#layanan" className="px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium">Layanan</a>
        <a href="#project" className="px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium">Project</a>
        <a href="#kontak" className="px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium">Kontak</a>
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="border-t border-white/10 pt-8 text-center text-sm text-slate-400">
          Copyright © 2024 Nazilla. All Rights Reserved.
        </div>
      </div>
    </footer>
  )
}
