import { useParams, Navigate } from "react-router-dom"
import { useEffect } from "react"
import { DetailHeader } from "../features/projects/detail/DetailHeader"
import { DetailStyleGuide } from "../features/projects/detail/DetailStyleGuide"
import { DetailMockups } from "../features/projects/detail/DetailMockups"
import { MOCK_PROJECTS } from "../lib/mockData"
import { useProjects } from "../hooks/useProjects"

import { FeaturedProjects } from "../features/projects/detail/FeaturedProjects"

export function ProjectDetail() {
  const { id } = useParams()
  const { projects: fetchedProjects, loading } = useProjects()
  
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-blue"></div>
      </div>
    )
  }

  // Combine fetched projects with mock projects for preview
  const allProjects = fetchedProjects.length > 0 ? fetchedProjects : MOCK_PROJECTS
  
  const project = allProjects.find((p) => p.id === id)

  if (!project) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="min-h-screen bg-white">
      <DetailHeader project={project} />
      
      {(project.font_family || (project.main_colors && project.main_colors.length > 0)) && (
        <DetailStyleGuide project={project} />
      )}
      
      {project.wide_images && project.wide_images.length > 0 && (
        <DetailMockups project={project} />
      )}
      
      <FeaturedProjects currentProjectId={project.id} />
    </div>
  )
}
