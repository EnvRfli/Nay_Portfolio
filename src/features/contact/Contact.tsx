import { FaWhatsapp, FaInstagram, FaEnvelope, FaLinkedin } from "react-icons/fa"

export function Contact() {
  return (
    <section id="kontak" className="py-24 bg-white relative">
      <div className="container mx-auto">
        <div className="bg-primary-blue rounded-[3rem] p-12 md:p-20 relative overflow-hidden shadow-2xl">
          {/* Background Decorative Orange Swirl */}
          <div className="absolute right-0 top-0 h-full w-1/2 pointer-events-none overflow-hidden">
            <svg
              className="absolute right-[-20%] top-[-20%] w-[140%] h-[140%] text-accent-orange opacity-90"
              viewBox="0 0 400 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M300 0C300 150 150 300 0 300"
                stroke="currentColor"
                strokeWidth="40"
                strokeLinecap="round"
              />
              <path
                d="M400 100C300 200 200 150 150 50"
                stroke="currentColor"
                strokeWidth="30"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="relative z-10 max-w-2xl">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight mb-12">
              Mari <span className="text-accent-orange">berkolaborasi</span> dan wujudkan project luar biasa <span className="text-accent-orange">bersama</span>
            </h2>

            <div className="flex flex-wrap gap-4">
              <a
                href="#"
                className="inline-flex items-center gap-3 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-6 py-3 rounded-full transition-colors font-medium border border-white/10"
              >
                <FaWhatsapp className="w-5 h-5" />
                082 234 533 262
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-3 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-6 py-3 rounded-full transition-colors font-medium border border-white/10"
              >
                <FaInstagram className="w-5 h-5" />
                nazilla_azizah
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-3 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-6 py-3 rounded-full transition-colors font-medium border border-white/10"
              >
                <FaEnvelope className="w-5 h-5" />
                azizahnazillaandiz@gmail.com
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-3 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-6 py-3 rounded-full transition-colors font-medium border border-white/10"
              >
                <FaLinkedin className="w-5 h-5" />
                Nazilla Andiz Azizah
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
