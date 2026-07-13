import { useState, useEffect } from "react"
import { Button } from "../../components/ui/Button"
import { Marquee } from "./Marquee"
import { motion, AnimatePresence } from "framer-motion"
import ArrowHero from "../../assets/arrow_hero.svg"

export function Hero() {
  const [textIndex, setTextIndex] = useState(0)
  const words1 = ["Produk Inovatif", "Solusi Digital"]
  const words2 = ["Spesialis Digital", "UI/UX Designer"]

  useEffect(() => {
    const timer = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % 2)
    }, 2000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section id="beranda" className="relative min-h-screen flex flex-col justify-center pt-24">
      {/* Background Shapes */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 -left-20 w-[300px] md:w-[400px] lg:w-[600px] h-[300px] md:h-[400px] lg:h-[600px] bg-gradient-to-r from-[#647ED4] to-[#4966D4] rounded-full blur-[200px] opacity-10" />
        <img src={ArrowHero} alt="" className="absolute top-10 right-0 w-[200px] md:w-[300px] lg:w-[400px]" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl flex-1 flex flex-col justify-center relative z-10">
        <div className="max-w-4xl">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-dark-text mb-8" style={{ lineHeight: 1.7 }}>
            Merancang{" "}
            <span className="inline-flex overflow-hidden px-1 -mx-1">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={textIndex}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -30, opacity: 0 }}
                  transition={{ duration: 0.5, type: "spring", stiffness: 300, damping: 30 }}
                  className="whitespace-nowrap bg-gradient-to-r from-[#647ED4] to-[#4966D4] bg-clip-text text-transparent pt-2 pb-3"
                >
                  {words1[textIndex]}
                </motion.span>
              </AnimatePresence>
            </span>{" "}
            dengan Pendekatan Kreatif dan Analitis Sebagai{" "}
            <span className="relative inline-block">
              <span className="inline-flex overflow-hidden relative z-10 px-1 -mx-1">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={textIndex}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -30, opacity: 0 }}
                    transition={{ duration: 0.5, type: "spring", stiffness: 300, damping: 30 }}
                    className="whitespace-nowrap bg-gradient-to-r from-[#647ED4] to-[#4966D4] bg-clip-text text-transparent pt-2 pb-3"
                  >
                    {words2[textIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
              <svg className="absolute -bottom-1 left-0 w-full z-0" viewBox="0 0 200 12" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                <path d="M2 9.5C50 3.5 150 2 198 9.5" stroke="#F9A826" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl">
            5+ tahun pengalaman di bidang UI/UX Designer
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a href="#kontak">
              <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-[#647ED4] to-[#4966D4]">Kontak Saya</Button>
            </a>
            <a href="#project">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">Semua Project</Button>
            </a>
          </div>
        </div>
      </div>

      <div className="mt-20">
        <Marquee />
      </div>
    </section>
  )
}
