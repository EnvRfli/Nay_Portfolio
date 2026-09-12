import { useState, useEffect, useRef } from "react"
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
  const [wideImage1Url, setWideImage1Url] = useState("")
  const [wideImage2Url, setWideImage2Url] = useState("")
  const [wideFile1, setWideFile1] = useState<File | null>(null)
  const [wideFile2, setWideFile2] = useState<File | null>(null)

  const thumbnailRef = useRef<HTMLInputElement>(null)
  const wide1Ref = useRef<HTMLInputElement>(null)
  const wide2Ref = useRef<HTMLInputElement>(null)

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
      setWideImage1Url(project.wide_images?.[0] || "")
      setWideImage2Url(project.wide_images?.[1] || "")
      setWideFile1(null)
      setWideFile2(null)
      if (thumbnailRef.current) thumbnailRef.current.value = ""
      if (wide1Ref.current) wide1Ref.current.value = ""
      if (wide2Ref.current) wide2Ref.current.value = ""
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
      setWideImage1Url("")
      setWideImage2Url("")
      setWideFile1(null)
      setWideFile2(null)
      if (thumbnailRef.current) thumbnailRef.current.value = ""
      if (wide1Ref.current) wide1Ref.current.value = ""
      if (wide2Ref.current) wide2Ref.current.value = ""
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

      let finalWide1 = wideImage1Url
      if (wideFile1) {
        finalWide1 = await uploadImage(wideFile1)
      }

      let finalWide2 = wideImage2Url
      if (wideFile2) {
        finalWide2 = await uploadImage(wideFile2)
      }

      const wide_images: string[] = []
      if (finalWide1) wide_images.push(finalWide1)
      if (finalWide2) wide_images.push(finalWide2)

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

        <div>
          <label className="block text-sm font-medium mb-1">Thumbnail Image</label>
          <input
            ref={thumbnailRef}
            type="file"
            accept="image/*"
            onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
            className="w-full border rounded-lg p-2 text-sm"
          />
          {formData.image_url && !thumbnailFile && (
            <div className="flex items-center gap-2 mt-2 p-2 bg-slate-50 border rounded-lg">
              <img src={formData.image_url} alt="Current thumbnail" className="w-10 h-10 object-cover rounded" />
              <span className="text-xs text-slate-600 flex-1 truncate">Thumbnail saat ini tersimpan.</span>
              <span className="text-xs text-slate-400">Pilih file baru untuk mengganti</span>
            </div>
          )}
          {thumbnailFile && (
            <div className="flex items-center justify-between text-xs text-blue-600 mt-1">
              <span className="truncate">File dipilih: {thumbnailFile.name}</span>
              <button
                type="button"
                onClick={() => {
                  setThumbnailFile(null)
                  if (thumbnailRef.current) thumbnailRef.current.value = ""
                }}
                className="text-slate-400 hover:text-red-500 ml-2"
              >
                Batal
              </button>
            </div>
          )}
        </div>

        <div className="pt-3 border-t border-slate-200">
          <label className="block text-sm font-semibold text-slate-800 mb-0.5">
            Add Wide Images (Detail Mockups - Maksimal 2 Gambar)
          </label>
          <p className="text-xs text-slate-500 mb-3">
            Gambar akan ditampilkan berurutan dari Gambar 1 (atas) ke Gambar 2 (bawah).
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Wide Image 1 (Gambar Pertama)
              </label>
              <input
                ref={wide1Ref}
                type="file"
                accept="image/*"
                onChange={(e) => setWideFile1(e.target.files?.[0] || null)}
                className="w-full border rounded-lg p-2 text-sm"
              />
              {wideImage1Url && !wideFile1 && (
                <div className="flex items-center gap-2 mt-2 p-2 bg-slate-50 border rounded-lg">
                  <img src={wideImage1Url} alt="Wide 1" className="w-10 h-10 object-cover rounded" />
                  <span className="text-xs text-slate-600 flex-1 truncate">Gambar 1 saat ini</span>
                  <button
                    type="button"
                    onClick={() => setWideImage1Url("")}
                    className="text-xs text-red-500 hover:text-red-700 font-medium"
                  >
                    Hapus
                  </button>
                </div>
              )}
              {wideFile1 && (
                <div className="flex items-center justify-between text-xs text-blue-600 mt-1">
                  <span className="truncate">File baru: {wideFile1.name}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setWideFile1(null)
                      if (wide1Ref.current) wide1Ref.current.value = ""
                    }}
                    className="text-slate-400 hover:text-red-500 ml-2"
                  >
                    Batal
                  </button>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Wide Image 2 (Gambar Kedua)
              </label>
              <input
                ref={wide2Ref}
                type="file"
                accept="image/*"
                onChange={(e) => setWideFile2(e.target.files?.[0] || null)}
                className="w-full border rounded-lg p-2 text-sm"
              />
              {wideImage2Url && !wideFile2 && (
                <div className="flex items-center gap-2 mt-2 p-2 bg-slate-50 border rounded-lg">
                  <img src={wideImage2Url} alt="Wide 2" className="w-10 h-10 object-cover rounded" />
                  <span className="text-xs text-slate-600 flex-1 truncate">Gambar 2 saat ini</span>
                  <button
                    type="button"
                    onClick={() => setWideImage2Url("")}
                    className="text-xs text-red-500 hover:text-red-700 font-medium"
                  >
                    Hapus
                  </button>
                </div>
              )}
              {wideFile2 && (
                <div className="flex items-center justify-between text-xs text-blue-600 mt-1">
                  <span className="truncate">File baru: {wideFile2.name}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setWideFile2(null)
                      if (wide2Ref.current) wide2Ref.current.value = ""
                    }}
                    className="text-slate-400 hover:text-red-500 ml-2"
                  >
                    Batal
                  </button>
                </div>
              )}
            </div>
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
