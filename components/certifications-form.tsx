"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"
import type { CVData } from "@/app/page"

interface CertificationsFormProps {
  data: CVData["certifications"]
  onChange: (data: CVData["certifications"]) => void
}

export function CertificationsForm({ data, onChange }: CertificationsFormProps) {
  const addCertification = () => {
    const newCert = {
      id: Date.now().toString(),
      name: "",
      issuer: "",
      date: "",
      credentialId: "",
      url: "",
    }
    onChange([...data, newCert])
  }

  const updateCertification = (id: string, field: string, value: string) => {
    onChange(data.map((cert) => (cert.id === id ? { ...cert, [field]: value } : cert)))
  }

  const removeCertification = (id: string) => {
    onChange(data.filter((cert) => cert.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Certificaciones</h3>
        <Button onClick={addCertification} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Agregar Certificación
        </Button>
      </div>

      {data.map((cert, index) => (
        <Card key={cert.id}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Certificación {index + 1}</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => removeCertification(cert.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nombre de la Certificación *</Label>
                <Input
                  value={cert.name}
                  onChange={(e) => updateCertification(cert.id, "name", e.target.value)}
                  placeholder="AWS Certified Solutions Architect"
                />
              </div>
              <div className="space-y-2">
                <Label>Emisor *</Label>
                <Input
                  value={cert.issuer}
                  onChange={(e) => updateCertification(cert.id, "issuer", e.target.value)}
                  placeholder="Amazon Web Services"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Fecha de Obtención</Label>
                <Input
                  type="month"
                  value={cert.date}
                  onChange={(e) => updateCertification(cert.id, "date", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>ID de Credencial</Label>
                <Input
                  value={cert.credentialId}
                  onChange={(e) => updateCertification(cert.id, "credentialId", e.target.value)}
                  placeholder="ABC123DEF456"
                />
              </div>
              <div className="space-y-2">
                <Label>URL de Verificación</Label>
                <Input
                  value={cert.url}
                  onChange={(e) => updateCertification(cert.id, "url", e.target.value)}
                  placeholder="https://verify.cert.com/123"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {data.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No hay certificaciones agregadas. Haz clic en "Agregar Certificación" para comenzar.
        </div>
      )}
    </div>
  )
}
