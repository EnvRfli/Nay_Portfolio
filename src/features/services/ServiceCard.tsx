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
}

export function ServiceCard({ bgGradient, title, description, align, isActive, onHover, onLeave, imageSrc }: ServiceCardProps) {
  return (
    <motion.div
      layout
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      initial={{ flex: 1 }}
      animate={{ flex: isActive ? 5 : 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={cn(
        "rounded-3xl overflow-hidden relative min-h-[300px] md:min-h-0 flex items-center justify-center p-8 cursor-pointer shadow-lg",
        bgGradient
      )}
    >
      <motion.div
        layout
        className="absolute inset-0 w-full h-full p-8 md:p-12 flex items-center justify-center"
        initial={false}
        animate={{
          x: isActive ? (align === "left" ? "30%" : align === "right" ? "-30%" : 0) : 0,
          scale: isActive ? (align === "center" ? 1.2 : 1.05) : 1,
          opacity: isActive && align === "center" ? 0.15 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-full object-contain drop-shadow-2xl"
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
            transition={{ duration: 0.3, delay: 0.05 }}
            className={cn(
              "absolute inset-0 flex flex-col justify-center p-8 md:p-12 z-10",
              align === "left" ? "items-start text-left w-[60%]" :
                align === "right" ? "items-end text-right w-[60%] ml-auto" :
                  "items-center text-center"
            )}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4">{title}</h3>
            <p className="text-white/90 text-sm md:text-lg leading-relaxed">{description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
