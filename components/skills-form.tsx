"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X } from "lucide-react"
import type { CVData } from "@/app/page"

interface SkillsFormProps {
  data: CVData["skills"]
  onChange: (data: CVData["skills"]) => void
}

export function SkillsForm({ data, onChange }: SkillsFormProps) {
  const [newSkills, setNewSkills] = useState({
    technical: "",
    frameworks: "",
    databases: "",
    tools: "",
    languages: "",
    soft: "",
  })

  const skillCategories = [
    { key: "technical", label: "Lenguajes de Programación", placeholder: "JavaScript, Python, Java, TypeScript..." },
    { key: "frameworks", label: "Frameworks y Librerías", placeholder: "React, Node.js, Django, Spring..." },
    { key: "databases", label: "Bases de Datos", placeholder: "PostgreSQL, MongoDB, Redis, MySQL..." },
    { key: "tools", label: "Herramientas y Tecnologías", placeholder: "Docker, AWS, Git, Jenkins..." },
    { key: "languages", label: "Idiomas", placeholder: "Español (Nativo), Inglés (Avanzado)..." },
    { key: "soft", label: "Habilidades Blandas", placeholder: "Liderazgo, Trabajo en equipo, Comunicación..." },
  ]

  const addSkill = (category: keyof CVData["skills"], skill: string) => {
    if (skill.trim() && !data[category].includes(skill.trim())) {
      onChange({
        ...data,
        [category]: [...data[category], skill.trim()],
      })
    }
  }

  const removeSkill = (category: keyof CVData["skills"], skill: string) => {
    onChange({
      ...data,
      [category]: data[category].filter((s) => s !== skill),
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent, category: keyof CVData["skills"]) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addSkill(category, newSkills[category])
      setNewSkills((prev) => ({ ...prev, [category]: "" }))
    }
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Habilidades y Competencias</h3>

      {skillCategories.map(({ key, label, placeholder }) => (
        <Card key={key}>
          <CardHeader>
            <CardTitle className="text-base">{label}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2 mb-2">
              {data[key as keyof CVData["skills"]].map((skill) => (
                <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                  {skill}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => removeSkill(key as keyof CVData["skills"], skill)}
                  />
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newSkills[key as keyof typeof newSkills]}
                onChange={(e) =>
                  setNewSkills((prev) => ({
                    ...prev,
                    [key]: e.target.value,
                  }))
                }
                placeholder={placeholder}
                onKeyDown={(e) => handleKeyDown(e, key as keyof CVData["skills"])}
              />
              <Button
                type="button"
                onClick={() => {
                  addSkill(key as keyof CVData["skills"], newSkills[key as keyof typeof newSkills])
                  setNewSkills((prev) => ({ ...prev, [key]: "" }))
                }}
              >
                Agregar
              </Button>
            </div>
            {key === "technical" && (
              <p className="text-sm text-gray-500">Incluye los lenguajes más relevantes para tu área objetivo</p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
