import { useEffect } from "react"
import type { Project } from "../../../types/database.types"

export function DetailStyleGuide({ project }: { project: Project }) {
  // Dynamically load Google Font if font_family is provided
  useEffect(() => {
    if (!project.font_family) return;

    const fontName = project.font_family.replace(/ /g, "+");
    const linkId = `google-font-${fontName}`;

    if (!document.getElementById(linkId)) {
      const link = document.createElement("link");
      link.id = linkId;
      link.rel = "stylesheet";
      link.href = `https://fonts.googleapis.com/css2?family=${fontName}:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap`;
      document.head.appendChild(link);
    }
  }, [project.font_family]);

  const fontStyle = project.font_family ? { fontFamily: `"${project.font_family}", sans-serif` } : {};

  return (
    <div className="w-full py-16 relative overflow-hidden bg-[#F4F5F7] mb-12">
      {/* Huge background text 'Aa' */}
      <div className="absolute top-0 left-0 -ml-10 -mt-20 pointer-events-none opacity-5">
        <span className="text-[30rem] font-bold leading-none select-none text-[#26263B]">Aa</span>
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10 flex flex-col md:flex-row gap-16 md:gap-24">
        {/* Font Section */}
        <div className="flex-1">
          {project.font_family ? (
            <>
              <h2 className="text-4xl md:text-5xl font-bold text-[#26263B] mb-4" style={fontStyle}>
                {project.font_family}
              </h2>
              <p className="text-primary-blue text-lg mb-8">Font Style</p>

              <div className="text-[#3B4168] space-y-6 text-lg md:text-xl" style={fontStyle}>
                <p>Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq</p>
                <p>! @ # $ % ^ & * ( ) - {'< >'} ? : " {'{ } | + , . / ; \` [ ] \\ = _'}</p>
                <p>1 2 3 4 5 6 7 8 9 0</p>
              </div>
            </>
          ) : (
            <div className="text-slate-500 italic">No font specified.</div>
          )}
        </div>

        {/* Colors Section */}
        {project.main_colors && project.main_colors.length > 0 && (
          <div className="flex-1 flex gap-8 md:gap-12 flex-wrap items-center justify-center md:justify-end mt-12 md:mt-0">
            {project.main_colors.map((color, idx) => {
              // Map index to a label based on the mock image (Main, Secondary, Auxiliary)
              const labels = ["Main Color", "Secondary Color", "Auxiliary Color", "Accent Color"];
              const label = labels[idx] || `Color ${idx + 1}`;

              return (
                <div key={idx} className="flex flex-col items-center">
                  <div
                    className="w-24 h-24 md:w-32 md:h-32 rounded-3xl shadow-lg mb-4"
                    style={{ backgroundColor: color, boxShadow: `0 10px 30px -10px ${color}` }}
                  />
                  <p className="text-primary-blue text-sm md:text-base font-medium mb-1">{label}</p>
                  <p className="text-slate-600 text-sm md:text-base uppercase tracking-wider">{color}</p>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
