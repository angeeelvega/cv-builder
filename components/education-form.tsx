"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, X } from "lucide-react"
import type { CVData } from "@/app/page"

interface EducationFormProps {
  data: CVData["education"]
  onChange: (data: CVData["education"]) => void
}

export function EducationForm({ data, onChange }: EducationFormProps) {
  const [newHonor, setNewHonor] = useState("")

  const addEducation = () => {
    const newEdu = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      field: "",
      location: "",
      startDate: "",
      endDate: "",
      gpa: "",
      honors: [],
    }
    onChange([...data, newEdu])
  }

  const updateEducation = (id: string, field: string, value: any) => {
    onChange(data.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)))
  }

  const removeEducation = (id: string) => {
    onChange(data.filter((edu) => edu.id !== id))
  }

  const addHonor = (id: string, honor: string) => {
    if (honor.trim()) {
      const edu = data.find((e) => e.id === id)
      if (edu && !edu.honors.includes(honor.trim())) {
        updateEducation(id, "honors", [...edu.honors, honor.trim()])
      }
    }
  }

  const removeHonor = (id: string, honor: string) => {
    const edu = data.find((e) => e.id === id)
    if (edu) {
      updateEducation(
        id,
        "honors",
        edu.honors.filter((h) => h !== honor),
      )
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Educación</h3>
        <Button onClick={addEducation} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Agregar Educación
        </Button>
      </div>

      {data.map((edu, index) => (
        <Card key={edu.id}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Educación {index + 1}</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => removeEducation(edu.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Institución *</Label>
                <Input
                  value={edu.institution}
                  onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                  placeholder="Universidad Politécnica de Madrid"
                />
              </div>
              <div className="space-y-2">
                <Label>Título *</Label>
                <Input
                  value={edu.degree}
                  onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                  placeholder="Grado en Ingeniería Informática"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Especialización</Label>
                <Input
                  value={edu.field}
                  onChange={(e) => updateEducation(edu.id, "field", e.target.value)}
                  placeholder="Desarrollo de Software"
                />
              </div>
              <div className="space-y-2">
                <Label>Ubicación</Label>
                <Input
                  value={edu.location}
                  onChange={(e) => updateEducation(edu.id, "location", e.target.value)}
                  placeholder="Madrid, España"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Fecha Inicio</Label>
                <Input
                  type="month"
                  value={edu.startDate}
                  onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Fecha Fin</Label>
                <Input
                  type="month"
                  value={edu.endDate}
                  onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Nota Media (opcional)</Label>
                <Input
                  value={edu.gpa}
                  onChange={(e) => updateEducation(edu.id, "gpa", e.target.value)}
                  placeholder="8.5/10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Honores y Reconocimientos</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {edu.honors.map((honor) => (
                  <Badge key={honor} variant="secondary" className="flex items-center gap-1">
                    {honor}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeHonor(edu.id, honor)} />
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newHonor}
                  onChange={(e) => setNewHonor(e.target.value)}
                  placeholder="Magna Cum Laude, Beca de Excelencia..."
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      addHonor(edu.id, newHonor)
                      setNewHonor("")
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={() => {
                    addHonor(edu.id, newHonor)
                    setNewHonor("")
                  }}
                >
                  Agregar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {data.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No hay educación agregada. Haz clic en "Agregar Educación" para comenzar.
        </div>
      )}
    </div>
  )
}
