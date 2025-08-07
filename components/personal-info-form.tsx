"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { CVData } from "@/app/page"

interface PersonalInfoFormProps {
  data: CVData["personalInfo"]
  onChange: (data: CVData["personalInfo"]) => void
}

export function PersonalInfoForm({ data, onChange }: PersonalInfoFormProps) {
  const handleChange = (field: keyof CVData["personalInfo"], value: string) => {
    onChange({
      ...data,
      [field]: value,
    })
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Nombre Completo *</Label>
          <Input
            id="fullName"
            value={data.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            placeholder="Juan Pérez García"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="juan.perez@email.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Teléfono</Label>
          <Input
            id="phone"
            value={data.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="+34 600 123 456"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Ubicación</Label>
          <Input
            id="location"
            value={data.location}
            onChange={(e) => handleChange("location", e.target.value)}
            placeholder="Madrid, España"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn</Label>
          <Input
            id="linkedin"
            value={data.linkedin}
            onChange={(e) => handleChange("linkedin", e.target.value)}
            placeholder="linkedin.com/in/juanperez"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="github">GitHub</Label>
          <Input
            id="github"
            value={data.github}
            onChange={(e) => handleChange("github", e.target.value)}
            placeholder="github.com/juanperez"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="portfolio">Portfolio</Label>
          <Input
            id="portfolio"
            value={data.portfolio}
            onChange={(e) => handleChange("portfolio", e.target.value)}
            placeholder="juanperez.dev"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="summary">Resumen Profesional</Label>
        <Textarea
          id="summary"
          value={data.summary}
          onChange={(e) => handleChange("summary", e.target.value)}
          placeholder="Desarrollador Full Stack con 5+ años de experiencia en React, Node.js y AWS. Especializado en arquitecturas escalables y metodologías ágiles..."
          rows={4}
        />
        <p className="text-sm text-gray-500">
          Incluye palabras clave relevantes para tu área (React, Python, AWS, etc.)
        </p>
      </div>
    </div>
  )
}
