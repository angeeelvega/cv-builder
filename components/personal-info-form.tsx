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
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            value={data.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            placeholder="John Doe"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="john.doe@email.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={data.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="+1 (555) 123-4567"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={data.location}
            onChange={(e) => handleChange("location", e.target.value)}
            placeholder="New York, NY"
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
            placeholder="linkedin.com/in/johndoe"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="github">GitHub</Label>
          <Input
            id="github"
            value={data.github}
            onChange={(e) => handleChange("github", e.target.value)}
            placeholder="github.com/johndoe"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="portfolio">Portfolio</Label>
          <Input
            id="portfolio"
            value={data.portfolio}
            onChange={(e) => handleChange("portfolio", e.target.value)}
            placeholder="johndoe.dev"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="summary">Professional Summary</Label>
        <Textarea
          id="summary"
          value={data.summary}
          onChange={(e) => handleChange("summary", e.target.value)}
          placeholder="Full Stack Developer with 5+ years of experience in React, Node.js and AWS. Specialized in scalable architectures and agile methodologies..."
          rows={4}
        />
        <p className="text-sm text-gray-500">
          Include relevant keywords for your target area (React, Python, AWS, etc.)
        </p>
      </div>
    </div>
  )
}
