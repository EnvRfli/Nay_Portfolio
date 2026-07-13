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
    <div className="w-full py-32 relative overflow-hidden bg-[#F4F5F7]">
      {/* Huge background text 'Aa' */}
      <div className="absolute top-0 left-0 -ml-16 -mt-25 pointer-events-none opacity-5">
        <span className="text-[30rem] font-bold leading-none select-none text-[#26263B]">Aa</span>
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10 flex flex-col lg:flex-row justify-between gap-12">
        {/* Font Section */}
        <div className="w-full lg:w-5/12">
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
          <div className="w-full lg:w-7/12 flex gap-3 lg:gap-4 flex-wrap items-center justify-center lg:justify-end mt-12 lg:mt-0">
            {project.main_colors.map((color, idx) => {
              // Map index to a label based on the mock image (Main, Secondary, Auxiliary)
              const labels = ["Main Color", "Secondary Color", "Auxiliary Color", "Accent Color"];
              const label = labels[idx] || `Color ${idx + 1}`;

              return (
                <div
                  key={idx}
                  className="flex flex-col items-center p-3 lg:p-4 rounded-[1rem] transition-all duration-300 hover:bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] cursor-default"
                >
                  <div
                    className="w-32 h-32 lg:w-38 lg:h-42 rounded-[2rem] mb-4 transition-transform duration-300"
                    style={{ backgroundColor: color, boxShadow: `0 10px 30px -10px ${color}` }}
                  />
                  <p className="text-primary-blue text-md lg:text-base font-medium mb-2">{label}</p>
                  <p className="text-slate-600 text-sm lg:text-md uppercase tracking-wider">{color}</p>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
