import { FaWhatsapp, FaInstagram, FaEnvelope, FaLinkedin } from "react-icons/fa"
import ArrowContact from "../../assets/arrow_contact.svg"

export function Contact() {
  return (
    <section id="kontak" className="py-24 bg-white relative">
      <div className="container mx-auto">
        <div className="bg-gradient-to-br from-[#647ED4] to-[#4966D4] rounded-[2rem] p-12 md:p-20 relative overflow-hidden shadow-2xl">
          {/* Geometric Background Shapes */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <div className="absolute top-[60%] -right-[10%] w-[75%] h-[250%] bg-[#C4C4C4] opacity-10 rotate-[35deg] origin-top-right transform transition-transform duration-1000" />
            <div className="absolute top-[100%] -right-[-35%] w-[200%] h-[250%] bg-[#C4C4C4] opacity-10 rotate-[35deg] origin-top-right transform transition-transform duration-1000" />
            <img src={ArrowContact} alt="" className="absolute right-[3%] h-[120%] w-auto object-contain" />
          </div>

          <div className="relative z-10 max-w-2xl">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-12" style={{ lineHeight: 1.7 }}>
              Mari <span className="bg-gradient-to-b from-[#FFD05D] to-[#FFD05D] bg-clip-text text-transparent">berkolaborasi</span> dan wujudkan project luar biasa <span className="bg-gradient-to-r from-[#FFD05D] to-[#FFD05D] bg-clip-text text-transparent">bersama</span>
            </h2>

            <div className="flex flex-wrap gap-4">
              <a
                href="https://wa.me/+6282234533262"
                className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded-full transition-colors font-medium border border-white/10"
              >
                <FaWhatsapp className="w-5 h-5" />
                082 234 533 262
              </a>
              <a
                href="https://www.instagram.com/nazilla_azizah/"
                className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded-full transition-colors font-medium border border-white/10"
              >
                <FaInstagram className="w-5 h-5" />
                nazilla_azizah
              </a>
              <a
                href="mailto:azizahnazillaandiz@gmail.com"
                className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded-full transition-colors font-medium border border-white/10"
              >
                <FaEnvelope className="w-5 h-5" />
                azizahnazillaandiz@gmail.com
              </a>
              <a
                href="https://www.linkedin.com/in/nazilla-andiz-azizah-91b690248/"
                className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded-full transition-colors font-medium border border-white/10"
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
