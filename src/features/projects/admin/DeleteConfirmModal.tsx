import { useState } from "react"
import { Modal } from "../../../components/ui/Modal"
import { Button } from "../../../components/ui/Button"
import { useProjects } from "../../../hooks/useProjects"

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
  projectTitle: string;
}

export function DeleteConfirmModal({ isOpen, onClose, projectId, projectTitle }: DeleteConfirmModalProps) {
  const { deleteProject } = useProjects()
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    setLoading(true)
    const success = await deleteProject(projectId)
    setLoading(false)
    if (success) {
      onClose()
      setTimeout(() => window.location.reload(), 500)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Project">
      <div className="space-y-6">
        <p className="text-slate-600">
          Are you sure you want to delete the project <strong>"{projectTitle}"</strong>? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleDelete} disabled={loading} className="bg-red-500 hover:bg-red-600 text-white border-transparent">
            {loading ? "Deleting..." : "Delete Project"}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
