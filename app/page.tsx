"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Eye, FileText, Languages } from 'lucide-react'
import { PersonalInfoForm } from "@/components/personal-info-form"
import { ExperienceForm } from "@/components/experience-form"
import { EducationForm } from "@/components/education-form"
import { SkillsForm } from "@/components/skills-form"
import { ProjectsForm } from "@/components/projects-form"
import { CertificationsForm } from "@/components/certifications-form"
import { CVPreview } from "@/components/cv-preview"
import { generatePDF } from "@/lib/pdf-generator"

export interface CVData {
  personalInfo: {
    fullName: string
    email: string
    phone: string
    location: string
    linkedin: string
    github: string
    portfolio: string
    summary: string
  }
  experience: Array<{
    id: string
    company: string
    position: string
    location: string
    startDate: string
    endDate: string
    current: boolean
    description: string[]
    technologies: string[]
  }>
  education: Array<{
    id: string
    institution: string
    degree: string
    field: string
    location: string
    startDate: string
    endDate: string
    gpa: string
    honors: string[]
  }>
  skills: {
    technical: string[]
    frameworks: string[]
    databases: string[]
    tools: string[]
    languages: string[]
    soft: string[]
  }
  projects: Array<{
    id: string
    name: string
    description: string
    technologies: string[]
    github: string
    demo: string
    highlights: string[]
  }>
  certifications: Array<{
    id: string
    name: string
    issuer: string
    date: string
    credentialId: string
    url: string
  }>
}

const initialData: CVData = {
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    portfolio: "",
    summary: "",
  },
  experience: [],
  education: [],
  skills: {
    technical: [],
    frameworks: [],
    databases: [],
    tools: [],
    languages: [],
    soft: [],
  },
  projects: [],
  certifications: [],
}

export default function CVBuilder() {
  const [cvData, setCvData] = useState<CVData>(initialData)
  const [activeTab, setActiveTab] = useState("personal")
  const [showPreview, setShowPreview] = useState(false)
  const [previewLanguage, setPreviewLanguage] = useState<'en' | 'es'>('en')

  const updateCVData = (section: keyof CVData, data: any) => {
    setCvData((prev) => ({
      ...prev,
      [section]: data,
    }))
  }

  const handleExportPDF = async (language: 'en' | 'es' = 'en') => {
    try {
      await generatePDF(cvData, language)
    } catch (error) {
      console.error("Error generating PDF:", error)
    }
  }

  const handleExportBoth = async () => {
    try {
      await generatePDF(cvData, 'en')
      // Small delay to avoid conflicts
      setTimeout(async () => {
        await generatePDF(cvData, 'es')
      }, 1000)
    } catch (error) {
      console.error("Error generating PDFs:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Professional CV Builder</h1>
          <p className="text-lg text-gray-600">Create your professional CV optimized for ATS and tech-oriented</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  CV Information
                </CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowPreview(!showPreview)}
                    className="flex items-center gap-2"
                  >
                    <Eye className="h-4 w-4" />
                    {showPreview ? "Hide" : "Preview"}
                  </Button>
                  <Button onClick={() => handleExportPDF('en')} variant="outline" className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Export EN
                  </Button>
                  <Button onClick={() => handleExportPDF('es')} variant="outline" className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Export ES
                  </Button>
                  <Button onClick={handleExportBoth} className="flex items-center gap-2">
                    <Languages className="h-4 w-4" />
                    Export Both
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-6">
                    <TabsTrigger value="personal">Personal</TabsTrigger>
                    <TabsTrigger value="experience">Experience</TabsTrigger>
                    <TabsTrigger value="education">Education</TabsTrigger>
                    <TabsTrigger value="skills">Skills</TabsTrigger>
                    <TabsTrigger value="projects">Projects</TabsTrigger>
                    <TabsTrigger value="certifications">Certifications</TabsTrigger>
                  </TabsList>

                  <TabsContent value="personal" className="mt-6">
                    <PersonalInfoForm
                      data={cvData.personalInfo}
                      onChange={(data) => updateCVData("personalInfo", data)}
                    />
                  </TabsContent>

                  <TabsContent value="experience" className="mt-6">
                    <ExperienceForm data={cvData.experience} onChange={(data) => updateCVData("experience", data)} />
                  </TabsContent>

                  <TabsContent value="education" className="mt-6">
                    <EducationForm data={cvData.education} onChange={(data) => updateCVData("education", data)} />
                  </TabsContent>

                  <TabsContent value="skills" className="mt-6">
                    <SkillsForm data={cvData.skills} onChange={(data) => updateCVData("skills", data)} />
                  </TabsContent>

                  <TabsContent value="projects" className="mt-6">
                    <ProjectsForm data={cvData.projects} onChange={(data) => updateCVData("projects", data)} />
                  </TabsContent>

                  <TabsContent value="certifications" className="mt-6">
                    <CertificationsForm
                      data={cvData.certifications}
                      onChange={(data) => updateCVData("certifications", data)}
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-1">
            {showPreview && (
              <Card className="sticky top-4">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Preview</CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant={previewLanguage === 'en' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setPreviewLanguage('en')}
                    >
                      EN
                    </Button>
                    <Button
                      variant={previewLanguage === 'es' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setPreviewLanguage('es')}
                    >
                      ES
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <CVPreview data={cvData} language={previewLanguage} />
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
