import { useState, useEffect } from "react"
import { Modal } from "../../../components/ui/Modal"
import { Button } from "../../../components/ui/Button"
import type { Project } from "../../../types/database.types"
import { useProjects } from "../../../hooks/useProjects"

interface ProjectFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  project?: Project | null;
}

export function ProjectFormModal({ isOpen, onClose, project }: ProjectFormModalProps) {
  const { addProject, updateProject, uploadImage } = useProjects()

  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    company_name: "",
    description: "",
    image_url: "",
    font_family: "",
    pills: "",
    main_colors: "",
  })
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [wideImageFiles, setWideImageFiles] = useState<File[]>([])

  useEffect(() => {
    if (project && isOpen) {
      setFormData({
        title: project.title || "",
        company_name: project.company_name || "",
        description: project.description || "",
        image_url: project.image_url || "",
        font_family: project.font_family || "",
        pills: project.pills ? project.pills.join(", ") : "",
        main_colors: project.main_colors ? project.main_colors.join(", ") : "",
      })
      setThumbnailFile(null)
      setWideImageFiles([])
    } else if (isOpen) {
      setFormData({
        title: "",
        company_name: "",
        description: "",
        image_url: "",
        font_family: "",
        pills: "",
        main_colors: "",
      })
      setThumbnailFile(null)
      setWideImageFiles([])
    }
  }, [project, isOpen])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      let finalImageUrl = formData.image_url
      if (thumbnailFile) {
        finalImageUrl = await uploadImage(thumbnailFile)
      }

      const wide_images = project?.wide_images || []
      if (wideImageFiles.length > 0) {
        for (const file of wideImageFiles) {
          const url = await uploadImage(file)
          wide_images.push(url)
        }
      }

      const dataToSave = {
        title: formData.title,
        company_name: formData.company_name,
        description: formData.description,
        image_url: finalImageUrl,
        font_family: formData.font_family,
        pills: formData.pills.split(",").map(p => p.trim()).filter(Boolean),
        main_colors: formData.main_colors.split(",").map(c => c.trim()).filter(Boolean),
        wide_images,
      }

      let success = false
      if (project?.id) {
        success = await updateProject(project.id, dataToSave)
      } else {
        success = await addProject(dataToSave)
      }

      if (success) {
        onClose()
        setTimeout(() => window.location.reload(), 500)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={project ? "Edit Project" : "Add New Project"}
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title *</label>
            <input required name="title" value={formData.title} onChange={handleChange} className="w-full border rounded-lg p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Company / Subtitle</label>
            <input name="company_name" value={formData.company_name} onChange={handleChange} className="w-full border rounded-lg p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Font Family</label>
            <input name="font_family" placeholder="e.g. Inter" value={formData.font_family} onChange={handleChange} className="w-full border rounded-lg p-2" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description *</label>
          <textarea required name="description" rows={3} value={formData.description} onChange={handleChange} className="w-full border rounded-lg p-2" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Pills (comma separated)</label>
          <input name="pills" placeholder="UI/UX, Mobile App" value={formData.pills} onChange={handleChange} className="w-full border rounded-lg p-2" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Main Colors (Hex, comma separated)</label>
          <input name="main_colors" placeholder="#FF0000, #00FF00" value={formData.main_colors} onChange={handleChange} className="w-full border rounded-lg p-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Thumbnail Image</label>
            <input type="file" accept="image/*" onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)} className="w-full border rounded-lg p-2 text-sm" />
            {formData.image_url && !thumbnailFile && <span className="text-xs text-slate-500">Current image exists. Uploading new will replace it.</span>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Add Wide Images (Detail Mockups)</label>
            <input type="file" accept="image/*" multiple onChange={(e) => setWideImageFiles(Array.from(e.target.files || []))} className="w-full border rounded-lg p-2 text-sm" />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
          <Button type="button" variant="outline" onClick={onClose} disabled={loading}>Cancel</Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Project"}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
