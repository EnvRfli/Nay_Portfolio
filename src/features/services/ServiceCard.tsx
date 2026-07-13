import { cn } from "../../lib/utils"
import { motion, AnimatePresence } from "framer-motion"

interface ServiceCardProps {
  id: number;
  bgGradient: string;
  title: string;
  description: string;
  align: "left" | "center" | "right";
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
  imageSrc?: string;
  imageSrc2?: string;
}

export function ServiceCard({ id, bgGradient, title, description, align, isActive, onHover, onLeave, imageSrc, imageSrc2 }: ServiceCardProps) {
  return (
    <motion.div
      layout
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      initial={{ flex: 1 }}
      animate={{ flex: isActive ? 6 : 1 }}
      transition={{ type: "spring", stiffness: 350, damping: 20 }}
      className={cn(
        "rounded-3xl overflow-hidden relative min-h-[300px] md:min-h-0 flex items-center justify-center p-8 cursor-pointer shadow-lg",
        bgGradient
      )}
    >
      {/* Geometric Background Shapes */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] -right-[95%] w-[100%] h-[250%] bg-[#C4C4C4] opacity-15 rotate-[35deg] origin-top-right transform transition-transform duration-1000" />
        <div className="absolute top-[60%] -right-[20%] w-[200%] h-[250%] bg-[#C4C4C4] opacity-15 rotate-[35deg] origin-top-right transform transition-transform duration-1000" />

        {/* Blurred Orbs */}
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#AE7CF8] rounded-full blur-[100px] opacity-25" />
        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#AE7CF8] rounded-full blur-[100px] opacity-25" />
      </div>

      <motion.div
        layout
        className="absolute inset-0 w-full h-full p-8 md:p-12 flex items-center justify-center"
        initial={false}
        animate={{
          x: imageSrc2 ? 0 : (isActive ? (align === "left" ? "35%" : align === "right" ? "-35%" : 0) : 0),
          scale: isActive ? (align === "center" ? 1.2 : 1.25) : 1,
          opacity: imageSrc2 ? 1 : (isActive && align === "center" ? 0.15 : 1),
        }}
        transition={{ type: "spring", stiffness: 350, damping: 20 }}
      >
        {imageSrc2 && imageSrc ? (
          <>
            <motion.img
              src={imageSrc}
              alt={title + " left"}
              className="absolute w-[80%] h-[90%] md:w-[50%] md:h-[90%] object-contain drop-shadow-2xl z-0"
              initial={false}
              animate={{
                x: isActive ? "-60%" : "-40%",
                y: isActive ? "0%" : "10%",
                scale: isActive ? 1.3 : 1.2,
              }}
              transition={{ type: "spring", stiffness: 350, damping: 20 }}
            />
            <motion.img
              src={imageSrc2}
              alt={title + " right"}
              className="absolute w-[70%] h-[80%] md:w-[45%] md:h-[80%] object-contain drop-shadow-2xl z-10"
              initial={false}
              animate={{
                x: isActive ? "60%" : "40%",
                y: isActive ? "10%" : "0%",
                scale: isActive ? 1.3 : 1.2,
              }}
              transition={{ type: "spring", stiffness: 350, damping: 20 }}
            />
          </>
        ) : imageSrc ? (
          <motion.img
            src={imageSrc}
            alt={title}
            className="w-[100%] h-[100%] object-contain drop-shadow-2xl"
            initial={false}
            animate={{ scale: isActive ? 1.2 : 1 }}
            transition={{ type: "spring", stiffness: 350, damping: 20 }}
          />
        ) : (
          <div className="w-full h-4/5 bg-white/20 rounded-xl border border-white/30 backdrop-blur-sm shadow-xl flex items-center justify-center text-white/70 text-lg font-bold px-4 text-center">
            {title} Mockup
          </div>
        )}
      </motion.div>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, x: align === "left" ? -20 : align === "right" ? 20 : 0, y: align === "center" ? 20 : 0 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: align === "left" ? -20 : align === "right" ? 20 : 0, y: align === "center" ? 10 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.05 }}
            className={cn(
              "absolute inset-0 flex flex-col justify-center p-8 md:p-12 z-10",
              align === "left" ? "items-start text-left w-[50%] md:w-1/2" :
                align === "right" ? "items-end text-right w-[50%] md:w-1/2 ml-auto" :
                  "items-center text-center w-[60%] md:w-1/2 mx-auto"
            )}
          >
            <h3 className={cn("text-2xl md:text-3xl font-bold mb-3 md:mb-4", id === 1 ? "text-white" : "text-[#26263B]")}>{title}</h3>
            <p className={cn("text-sm md:text-lg leading-relaxed", id === 1 ? "text-white/90" : "text-slate-700")}>{description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
