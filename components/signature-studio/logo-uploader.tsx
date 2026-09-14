'use client'

import { SignatureData } from '@/lib/signature-data'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FieldGroup, Field, FieldLabel } from '@/components/ui/field'
import { Upload, X } from 'lucide-react'
import { useRef, useState } from 'react'

interface LogoUploaderProps {
  data: SignatureData
  onChange: (field: keyof SignatureData, value: string) => void
}

export function LogoUploader({ data, onChange }: LogoUploaderProps) {
  const [previewUrl, setPreviewUrl] = useState<string>(data.companyLogo)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setError('')
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file')
        return
      }

      if (file.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB')
        return
      }

      setIsUploading(true)
      const formData = new FormData()
      formData.append('file', file)
      try {
        const response = await fetch('/api/upload-logo', { method: 'POST', body: formData })
        const result = await response.json()
        if (!response.ok) throw new Error(result.error || 'Upload failed')
        setPreviewUrl(result.url)
        onChange('companyLogo', result.url)
      } catch (uploadError) {
        setError(uploadError instanceof Error ? uploadError.message : 'Logo upload failed')
      } finally {
        setIsUploading(false)
      }
    }
  }

  const handleRemove = () => {
    setPreviewUrl('')
    onChange('companyLogo', '')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Company Logo</CardTitle>
        <CardDescription>Upload your company logo (max 5MB)</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <FieldGroup>
          <Field>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              aria-label="Upload logo"
            />

            {previewUrl ? (
              <div className="space-y-4">
                <div className="border-2 border-dashed rounded-lg p-4 bg-secondary/30 flex items-center justify-center">
                  <img
                    src={previewUrl}
                    alt="Logo preview"
                    className="max-h-32 max-w-full"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                  >
                    <Upload className="mr-2 size-4" />
                    {isUploading ? 'Uploading…' : 'Change Logo'}
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={handleRemove}
                  >
                    <X className="size-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full border-2 border-dashed rounded-lg p-8 text-center hover:bg-secondary/30 transition-colors group cursor-pointer"
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="p-3 rounded-lg bg-secondary group-hover:bg-secondary/80 transition-colors">
                    <Upload className="size-6 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Upload Logo</div>
                    <div className="text-sm text-muted-foreground">
                      PNG, JPG, or GIF (max 5MB)
                    </div>
                  </div>
                </div>
              </button>
            )}
            {error ? <p className="mt-3 text-sm text-destructive" role="alert">{error}</p> : null}
          </Field>
        </FieldGroup>
      </CardContent>
    </Card>
  )
}
