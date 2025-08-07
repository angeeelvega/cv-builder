"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, X } from 'lucide-react'
import type { CVData } from "@/app/page"

interface ProjectsFormProps {
  data: CVData["projects"]
  onChange: (data: CVData["projects"]) => void
}

export function ProjectsForm({ data, onChange }: ProjectsFormProps) {
  const [newTech, setNewTech] = useState("")
  const [newHighlight, setNewHighlight] = useState("")

  const addProject = () => {
    const newProject = {
      id: Date.now().toString(),
      name: "",
      description: "",
      technologies: [],
      github: "",
      demo: "",
      highlights: [],
    }
    onChange([...data, newProject])
  }

  const updateProject = (id: string, field: string, value: any) => {
    onChange(data.map((project) => (project.id === id ? { ...project, [field]: value } : project)))
  }

  const removeProject = (id: string) => {
    onChange(data.filter((project) => project.id !== id))
  }

  const addTechnology = (id: string, tech: string) => {
    if (tech.trim()) {
      const project = data.find((p) => p.id === id)
      if (project && !project.technologies.includes(tech.trim())) {
        updateProject(id, "technologies", [...project.technologies, tech.trim()])
      }
    }
  }

  const removeTechnology = (id: string, tech: string) => {
    const project = data.find((p) => p.id === id)
    if (project) {
      updateProject(
        id,
        "technologies",
        project.technologies.filter((t) => t !== tech),
      )
    }
  }

  const addHighlight = (id: string, highlight: string) => {
    if (highlight.trim()) {
      const project = data.find((p) => p.id === id)
      if (project && !project.highlights.includes(highlight.trim())) {
        updateProject(id, "highlights", [...project.highlights, highlight.trim()])
      }
    }
  }

  const removeHighlight = (id: string, highlight: string) => {
    const project = data.find((p) => p.id === id)
    if (project) {
      updateProject(
        id,
        "highlights",
        project.highlights.filter((h) => h !== highlight),
      )
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Featured Projects</h3>
        <Button onClick={addProject} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Project
        </Button>
      </div>

      {data.map((project, index) => (
        <Card key={project.id}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Proyecto {index + 1}</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => removeProject(project.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Project Name *</Label>
              <Input
                value={project.name}
                onChange={(e) => updateProject(project.id, "name", e.target.value)}
                placeholder="E-commerce Platform"
              />
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={project.description}
                onChange={(e) => updateProject(project.id, "description", e.target.value)}
                placeholder="Complete e-commerce platform with payment system, inventory management and admin panel..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>GitHub Repository</Label>
                <Input
                  value={project.github}
                  onChange={(e) => updateProject(project.id, "github", e.target.value)}
                  placeholder="https://github.com/usuario/proyecto"
                />
              </div>
              <div className="space-y-2">
                <Label>Demo/Live URL</Label>
                <Input
                  value={project.demo}
                  onChange={(e) => updateProject(project.id, "demo", e.target.value)}
                  placeholder="https://proyecto-demo.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Technologies Used</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary" className="flex items-center gap-1">
                    {tech}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeTechnology(project.id, tech)} />
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newTech}
                  onChange={(e) => setNewTech(e.target.value)}
                  placeholder="React, Node.js, PostgreSQL..."
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      addTechnology(project.id, newTech)
                      setNewTech("")
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={() => {
                    addTechnology(project.id, newTech)
                    setNewTech("")
                  }}
                >
                  Agregar
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Key Features and Achievements</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {project.highlights.map((highlight) => (
                  <Badge key={highlight} variant="outline" className="flex items-center gap-1">
                    {highlight}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeHighlight(project.id, highlight)} />
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newHighlight}
                  onChange={(e) => setNewHighlight(e.target.value)}
                  placeholder="Increased conversions by 25%, Processed 10k+ transactions..."
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      addHighlight(project.id, newHighlight)
                      setNewHighlight("")
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={() => {
                    addHighlight(project.id, newHighlight)
                    setNewHighlight("")
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
          No projects added. Click "Add Project" to get started.
        </div>
      )}
    </div>
  )
}
