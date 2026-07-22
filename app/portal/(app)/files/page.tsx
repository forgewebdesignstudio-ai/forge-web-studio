'use client'

import { useRef, useState } from 'react'
import { Download, FileText, Trash2, UploadCloud } from 'lucide-react'
import { PortalPageHeader } from '@/components/portal/page-header'
import { EmptyState } from '@/components/portal/portal-ui'

interface UploadedFile {
  id: string
  name: string
  size: string
  type: string
  url: string
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function FilesPage() {
  const [uploads, setUploads] = useState<UploadedFile[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  function addFiles(fileList: FileList | null) {
    if (!fileList) return
    const next = Array.from(fileList).map((f) => ({
      id: `${f.name}-${f.size}-${Math.random().toString(36).slice(2, 6)}`,
      name: f.name,
      size: formatSize(f.size),
      type: f.type || 'File',
      url: URL.createObjectURL(f),
    }))
    setUploads((cur) => [...next, ...cur])
  }

  function removeFile(id: string) {
    setUploads((cur) => {
      const target = cur.find((f) => f.id === id)
      if (target) URL.revokeObjectURL(target.url)
      return cur.filter((f) => f.id !== id)
    })
  }

  return (
    <>
      <PortalPageHeader
        title="Files"
        description="Upload and access assets, designs, and documents for your projects."
      />

      {/* Upload area */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault()
          addFiles(e.dataTransfer.files)
        }}
        className="mb-6 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/50 px-6 py-10 text-center transition-colors hover:border-primary/40"
      >
        <span className="mb-3 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <UploadCloud className="size-6" />
        </span>
        <p className="text-sm font-medium text-foreground">Drag & drop files here</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Logos, brand guides, photos, videos, PDFs, and documents
        </p>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="mt-4 rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          Browse files
        </button>
        <input
          ref={inputRef}
          type="file"
          multiple
          className="sr-only"
          onChange={(e) => {
            addFiles(e.target.files)
            e.target.value = ''
          }}
        />
      </div>

      {uploads.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No files yet"
          description="Files you upload will appear here. Shared deliverables from your Forge team will show up here too once your project begins."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {uploads.map((file) => (
            <div
              key={file.id}
              className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-primary/40"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FileText className="size-6" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">{file.name}</p>
                <p className="text-xs text-muted-foreground">{file.size}</p>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <a
                  href={file.url}
                  download={file.name}
                  className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
                  aria-label={`Download ${file.name}`}
                >
                  <Download className="size-4" />
                </a>
                <button
                  type="button"
                  onClick={() => removeFile(file.id)}
                  className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-destructive"
                  aria-label={`Remove ${file.name}`}
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="mt-6 text-center text-xs text-muted-foreground">
        Uploads are held in your browser for this session. Persistent file storage connects when your account is activated.
      </p>
    </>
  )
}
