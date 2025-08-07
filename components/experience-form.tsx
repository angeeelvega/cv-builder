"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, X } from 'lucide-react'
import type { CVData } from "@/app/page"

interface ExperienceFormProps {
  data: CVData["experience"]
  onChange: (data: CVData["experience"]) => void
}

export function ExperienceForm({ data, onChange }: ExperienceFormProps) {
  const [newTech, setNewTech] = useState("")

  const addExperience = () => {
    const newExp = {
      id: Date.now().toString(),
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: [""],
      technologies: [],
    }
    onChange([...data, newExp])
  }

  const updateExperience = (id: string, field: string, value: any) => {
    onChange(data.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)))
  }

  const removeExperience = (id: string) => {
    onChange(data.filter((exp) => exp.id !== id))
  }

  const addDescription = (id: string) => {
    const exp = data.find((e) => e.id === id)
    if (exp) {
      updateExperience(id, "description", [...exp.description, ""])
    }
  }

  const updateDescription = (id: string, index: number, value: string) => {
    const exp = data.find((e) => e.id === id)
    if (exp) {
      const newDesc = [...exp.description]
      newDesc[index] = value
      updateExperience(id, "description", newDesc)
    }
  }

  const removeDescription = (id: string, index: number) => {
    const exp = data.find((e) => e.id === id)
    if (exp && exp.description.length > 1) {
      const newDesc = exp.description.filter((_, i) => i !== index)
      updateExperience(id, "description", newDesc)
    }
  }

  const addTechnology = (id: string, tech: string) => {
    if (tech.trim()) {
      const exp = data.find((e) => e.id === id)
      if (exp && !exp.technologies.includes(tech.trim())) {
        updateExperience(id, "technologies", [...exp.technologies, tech.trim()])
      }
    }
  }

  const removeTechnology = (id: string, tech: string) => {
    const exp = data.find((e) => e.id === id)
    if (exp) {
      updateExperience(
        id,
        "technologies",
        exp.technologies.filter((t) => t !== tech),
      )
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Professional Experience</h3>
        <Button onClick={addExperience} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Experience
        </Button>
      </div>

      {data.map((exp, index) => (
        <Card key={exp.id}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Experiencia {index + 1}</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => removeExperience(exp.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Company *</Label>
                <Input
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                  placeholder="Google"
                />
              </div>
              <div className="space-y-2">
                <Label>Position *</Label>
                <Input
                  value={exp.position}
                  onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
                  placeholder="Senior Software Engineer"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Location</Label>
                <Input
                  value={exp.location}
                  onChange={(e) => updateExperience(exp.id, "location", e.target.value)}
                  placeholder="San Francisco, CA"
                />
              </div>
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input
                  type="month"
                  value={exp.startDate}
                  onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>End Date</Label>
                <Input
                  type="month"
                  value={exp.endDate}
                  onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                  disabled={exp.current}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id={`current-${exp.id}`}
                checked={exp.current}
                onCheckedChange={(checked) => {
                  updateExperience(exp.id, "current", checked)
                  if (checked) {
                    updateExperience(exp.id, "endDate", "")
                  }
                }}
              />
              <Label htmlFor={`current-${exp.id}`}>Current job</Label>
            </div>

            <div className="space-y-2">
              <Label>Achievements and Responsibilities</Label>
              {exp.description.map((desc, descIndex) => (
                <div key={descIndex} className="flex gap-2">
                  <Textarea
                    value={desc}
                    onChange={(e) => updateDescription(exp.id, descIndex, e.target.value)}
                    placeholder="• Developed a web application that increased efficiency by 40%"
                    rows={2}
                  />
                  {exp.description.length > 1 && (
                    <Button variant="ghost" size="sm" onClick={() => removeDescription(exp.id, descIndex)}>
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => addDescription(exp.id)}>
                Add Achievement
              </Button>
            </div>

            <div className="space-y-2">
              <Label>Technologies Used</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {exp.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary" className="flex items-center gap-1">
                    {tech}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeTechnology(exp.id, tech)} />
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newTech}
                  onChange={(e) => setNewTech(e.target.value)}
                  placeholder="React, Node.js, AWS..."
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      addTechnology(exp.id, newTech)
                      setNewTech("")
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={() => {
                    addTechnology(exp.id, newTech)
                    setNewTech("")
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
          No experiences added. Click "Add Experience" to get started.
        </div>
      )}
    </div>
  )
}
