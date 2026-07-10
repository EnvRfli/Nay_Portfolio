import { Sparkles } from "lucide-react"

const MARQUEE_ITEMS = [
  "Wireframe",
  "App Design",
  "UX Research",
  "Analyst",
]

export function Marquee() {
  return (
    <div className="relative w-full h-32 flex flex-col items-center justify-center -mt-10 mb-10 overflow-visible z-20">
      {/* The background orange band, slanted downwards */}
      <div className="absolute w-[110%] h-16 bg-accent-orange rotate-2 translate-y-3 z-0" />
      
      {/* The foreground dark navy band, slanted upwards */}
      <div className="absolute w-[110%] h-16 flex items-center bg-dark-navy -rotate-2 z-10 overflow-hidden shadow-xl">
        <div className="flex whitespace-nowrap animate-[marquee_20s_linear_infinite]">
          {/* We duplicate the items a few times to create the infinite scroll effect */}
          {[...Array(4)].map((_, arrayIndex) => (
            <div key={arrayIndex} className="flex items-center">
              {MARQUEE_ITEMS.map((item, index) => (
                <div key={`${arrayIndex}-${index}`} className="flex items-center text-white px-8">
                  <span className="text-xl font-medium">{item}</span>
                  <Sparkles className="w-6 h-6 text-accent-orange ml-8" fill="currentColor" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
