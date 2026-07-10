import { useState, useEffect, useCallback } from "react"
import { supabase } from "../lib/supabase"
import type { Project } from "../types/database.types"
import { useToast } from "../contexts/ToastContext"

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const { showToast } = useToast()

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) throw error

      if (data) {
        setProjects(data)
      }
    } catch (err: any) {
      console.error("Error fetching projects:", err)
      showToast(err.message || "Failed to fetch projects.", "error")
    } finally {
      setLoading(false)
    }
  }, [showToast])

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  // Helpers for file uploads
  const uploadImage = useCallback(async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random()}.${fileExt}`
    const filePath = `uploads/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('project picture')
      .upload(filePath, file)

    if (uploadError) {
      throw uploadError
    }

    const { data } = supabase.storage
      .from('project picture')
      .getPublicUrl(filePath)

    return data.publicUrl
  }, [])

  const addProject = useCallback(async (projectData: Omit<Project, 'id' | 'created_at'>) => {
    try {
      const { error } = await supabase
        .from("projects")
        .insert([projectData])
      
      if (error) throw error
      
      showToast("Project added successfully!", "success")
      await fetchProjects()
      return true
    } catch (err: any) {
      console.error(err)
      showToast(err.message || "Failed to add project", "error")
      return false
    }
  }, [showToast, fetchProjects])

  const updateProject = useCallback(async (id: string, projectData: Partial<Project>) => {
    try {
      const { error } = await supabase
        .from("projects")
        .update(projectData)
        .eq('id', id)
      
      if (error) throw error
      
      showToast("Project updated successfully!", "success")
      await fetchProjects()
      return true
    } catch (err: any) {
      console.error(err)
      showToast(err.message || "Failed to update project", "error")
      return false
    }
  }, [showToast, fetchProjects])

  const deleteProject = useCallback(async (id: string) => {
    try {
      const { error } = await supabase
        .from("projects")
        .delete()
        .eq('id', id)
      
      if (error) throw error
      
      showToast("Project deleted successfully!", "success")
      await fetchProjects()
      return true
    } catch (err: any) {
      console.error(err)
      showToast(err.message || "Failed to delete project", "error")
      return false
    }
  }, [showToast, fetchProjects])

  return { projects, loading, addProject, updateProject, deleteProject, uploadImage, fetchProjects }
}
