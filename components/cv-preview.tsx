"use client"

import type { CVData } from "@/app/page"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react'

interface CVPreviewProps {
  data: CVData
  language?: 'en' | 'es'
}

const translations = {
  en: {
    yourName: "Your Name",
    professionalSummary: "PROFESSIONAL SUMMARY",
    professionalExperience: "PROFESSIONAL EXPERIENCE",
    present: "Present",
    technologies: "Technologies:",
    featuredProjects: "FEATURED PROJECTS",
    education: "EDUCATION",
    specialization: "Specialization:",
    honors: "Honors:",
    grade: "GPA:",
    technicalSkills: "TECHNICAL SKILLS",
    programmingLanguages: "Programming Languages:",
    frameworksLibraries: "Frameworks & Libraries:",
    databases: "Databases:",
    tools: "Tools:",
    languages: "Languages:",
    certifications: "CERTIFICATIONS",
    id: "ID:"
  },
  es: {
    yourName: "Tu Nombre",
    professionalSummary: "RESUMEN PROFESIONAL",
    professionalExperience: "EXPERIENCIA PROFESIONAL",
    present: "Presente",
    technologies: "Tecnologías:",
    featuredProjects: "PROYECTOS DESTACADOS",
    education: "EDUCACIÓN",
    specialization: "Especialización:",
    honors: "Honores:",
    grade: "Nota:",
    technicalSkills: "HABILIDADES TÉCNICAS",
    programmingLanguages: "Lenguajes de Programación:",
    frameworksLibraries: "Frameworks y Librerías:",
    databases: "Bases de Datos:",
    tools: "Herramientas:",
    languages: "Idiomas:",
    certifications: "CERTIFICACIONES",
    id: "ID:"
  }
}

export function CVPreview({ data, language = 'en' }: CVPreviewProps) {
  const t = translations[language]
  
  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const [year, month] = dateString.split("-")
    const monthNames = language === 'en' 
      ? ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      : ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
    return `${monthNames[Number.parseInt(month) - 1]} ${year}`
  }

  return (
    <div className="bg-white p-6 text-sm leading-relaxed max-h-[800px] overflow-y-auto border rounded-lg">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{data.personalInfo.fullName || t.yourName}</h1>

        <div className="flex flex-wrap justify-center gap-4 text-gray-600 text-xs">
          {data.personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="h-3 w-3" />
              {data.personalInfo.email}
            </div>
          )}
          {data.personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              {data.personalInfo.phone}
            </div>
          )}
          {data.personalInfo.location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {data.personalInfo.location}
            </div>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-4 text-gray-600 text-xs mt-2">
          {data.personalInfo.linkedin && (
            <div className="flex items-center gap-1">
              <Linkedin className="h-3 w-3" />
              {data.personalInfo.linkedin}
            </div>
          )}
          {data.personalInfo.github && (
            <div className="flex items-center gap-1">
              <Github className="h-3 w-3" />
              {data.personalInfo.github}
            </div>
          )}
          {data.personalInfo.portfolio && (
            <div className="flex items-center gap-1">
              <Globe className="h-3 w-3" />
              {data.personalInfo.portfolio}
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-2 border-b border-gray-300 pb-1">{t.professionalSummary}</h2>
          <p className="text-gray-700 text-justify">{data.personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">
            {t.professionalExperience}
          </h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h3 className="font-bold text-gray-900">{exp.position}</h3>
                  <p className="text-gray-700">{exp.company}</p>
                </div>
                <div className="text-right text-gray-600 text-xs">
                  <p>
                    {formatDate(exp.startDate)} - {exp.current ? t.present : formatDate(exp.endDate)}
                  </p>
                  {exp.location && <p>{exp.location}</p>}
                </div>
              </div>

              {exp.description.filter((desc) => desc.trim()).length > 0 && (
                <ul className="list-disc list-inside text-gray-700 mb-2 ml-2">
                  {exp.description
                    .filter((desc) => desc.trim())
                    .map((desc, index) => (
                      <li key={index} className="mb-1">
                        {desc}
                      </li>
                    ))}
                </ul>
              )}

              {exp.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-2">
                  <span className="text-xs font-semibold text-gray-600">{t.technologies}</span>
                  {exp.technologies.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs px-1 py-0">
                      {tech}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">{t.featuredProjects}</h2>
          {data.projects.map((project) => (
            <div key={project.id} className="mb-4">
              <h3 className="font-bold text-gray-900">{project.name}</h3>
              {project.description && <p className="text-gray-700 mb-2">{project.description}</p>}

              {project.highlights.length > 0 && (
                <ul className="list-disc list-inside text-gray-700 mb-2 ml-2">
                  {project.highlights.map((highlight, index) => (
                    <li key={index} className="mb-1">
                      {highlight}
                    </li>
                  ))}
                </ul>
              )}

              {project.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-2">
                  <span className="text-xs font-semibold text-gray-600">{t.technologies}</span>
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs px-1 py-0">
                      {tech}
                    </Badge>
                  ))}
                </div>
              )}

              <div className="text-xs text-gray-600">
                {project.github && <p>GitHub: {project.github}</p>}
                {project.demo && <p>Demo: {project.demo}</p>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">{t.education}</h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                  <p className="text-gray-700">{edu.institution}</p>
                  {edu.field && <p className="text-gray-600 text-xs">{t.specialization} {edu.field}</p>}
                </div>
                <div className="text-right text-gray-600 text-xs">
                  <p>
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </p>
                  {edu.location && <p>{edu.location}</p>}
                  {edu.gpa && <p>{t.grade} {edu.gpa}</p>}
                </div>
              </div>

              {edu.honors.length > 0 && (
                <div className="mt-1">
                  <span className="text-xs font-semibold text-gray-600">{t.honors} </span>
                  <span className="text-xs text-gray-700">{edu.honors.join(", ")}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">{t.technicalSkills}</h2>

        {data.skills.technical.length > 0 && (
          <div className="mb-2">
            <span className="font-semibold text-gray-900 text-xs">{t.programmingLanguages} </span>
            <span className="text-gray-700 text-xs">{data.skills.technical.join(", ")}</span>
          </div>
        )}

        {data.skills.frameworks.length > 0 && (
          <div className="mb-2">
            <span className="font-semibold text-gray-900 text-xs">{t.frameworksLibraries} </span>
            <span className="text-gray-700 text-xs">{data.skills.frameworks.join(", ")}</span>
          </div>
        )}

        {data.skills.databases.length > 0 && (
          <div className="mb-2">
            <span className="font-semibold text-gray-900 text-xs">{t.databases} </span>
            <span className="text-gray-700 text-xs">{data.skills.databases.join(", ")}</span>
          </div>
        )}

        {data.skills.tools.length > 0 && (
          <div className="mb-2">
            <span className="font-semibold text-gray-900 text-xs">{t.tools} </span>
            <span className="text-gray-700 text-xs">{data.skills.tools.join(", ")}</span>
          </div>
        )}

        {data.skills.languages.length > 0 && (
          <div className="mb-2">
            <span className="font-semibold text-gray-900 text-xs">{t.languages} </span>
            <span className="text-gray-700 text-xs">{data.skills.languages.join(", ")}</span>
          </div>
        )}
      </div>

      {/* Certifications */}
      {data.certifications.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">{t.certifications}</h2>
          {data.certifications.map((cert) => (
            <div key={cert.id} className="mb-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">{cert.name}</h3>
                  <p className="text-gray-700 text-xs">{cert.issuer}</p>
                </div>
                <div className="text-right text-gray-600 text-xs">
                  {cert.date && <p>{formatDate(cert.date)}</p>}
                  {cert.credentialId && <p>{t.id} {cert.credentialId}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
