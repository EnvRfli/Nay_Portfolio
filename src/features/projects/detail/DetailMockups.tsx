import type { Project } from "../../../types/database.types"

export function DetailMockups({ project }: { project: Project }) {
  if (!project.wide_images || project.wide_images.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      <div className="flex flex-col w-full">
        {project.wide_images.map((img, idx) => (
          <div key={idx} className="w-full flex">
            <img
              src={img}
              alt={`Mockup ${idx + 1}`}
              className="w-full h-auto object-cover block"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
