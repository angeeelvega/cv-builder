import { jsPDF } from "jspdf"
import type { CVData } from "@/app/page"

export const generatePDF = async (data: CVData) => {
  const pdf = new jsPDF()
  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()
  const margin = 20
  let yPosition = margin

  // Helper functions
  const addText = (text: string, x: number, y: number, options: any = {}) => {
    const fontSize = options.fontSize || 10
    const fontStyle = options.fontStyle || "normal"
    const maxWidth = options.maxWidth || pageWidth - 2 * margin

    pdf.setFontSize(fontSize)
    pdf.setFont("helvetica", fontStyle)

    const lines = pdf.splitTextToSize(text, maxWidth)
    pdf.text(lines, x, y)

    return y + lines.length * fontSize * 0.4
  }

  const addSection = (title: string) => {
    yPosition += 10
    if (yPosition > pageHeight - 30) {
      pdf.addPage()
      yPosition = margin
    }

    pdf.setFontSize(12)
    pdf.setFont("helvetica", "bold")
    pdf.text(title.toUpperCase(), margin, yPosition)
    pdf.line(margin, yPosition + 2, pageWidth - margin, yPosition + 2)
    yPosition += 10
  }

  const checkPageBreak = (requiredSpace = 20) => {
    if (yPosition + requiredSpace > pageHeight - margin) {
      pdf.addPage()
      yPosition = margin
    }
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const [year, month] = dateString.split("-")
    const monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
    return `${monthNames[Number.parseInt(month) - 1]} ${year}`
  }

  // Header
  pdf.setFontSize(18)
  pdf.setFont("helvetica", "bold")
  const nameWidth = pdf.getTextWidth(data.personalInfo.fullName || "Tu Nombre")
  pdf.text(data.personalInfo.fullName || "Tu Nombre", (pageWidth - nameWidth) / 2, yPosition)
  yPosition += 15

  // Contact info
  pdf.setFontSize(9)
  pdf.setFont("helvetica", "normal")
  const contactInfo = []
  if (data.personalInfo.email) contactInfo.push(data.personalInfo.email)
  if (data.personalInfo.phone) contactInfo.push(data.personalInfo.phone)
  if (data.personalInfo.location) contactInfo.push(data.personalInfo.location)

  if (contactInfo.length > 0) {
    const contactText = contactInfo.join(" | ")
    const contactWidth = pdf.getTextWidth(contactText)
    pdf.text(contactText, (pageWidth - contactWidth) / 2, yPosition)
    yPosition += 8
  }

  // Links
  const links = []
  if (data.personalInfo.linkedin) links.push(data.personalInfo.linkedin)
  if (data.personalInfo.github) links.push(data.personalInfo.github)
  if (data.personalInfo.portfolio) links.push(data.personalInfo.portfolio)

  if (links.length > 0) {
    const linksText = links.join(" | ")
    const linksWidth = pdf.getTextWidth(linksText)
    pdf.text(linksText, (pageWidth - linksWidth) / 2, yPosition)
    yPosition += 10
  }

  // Summary
  if (data.personalInfo.summary) {
    addSection("Resumen Profesional")
    yPosition = addText(data.personalInfo.summary, margin, yPosition, { fontSize: 10 })
  }

  // Experience
  if (data.experience.length > 0) {
    addSection("Experiencia Profesional")

    data.experience.forEach((exp) => {
      checkPageBreak(30)

      // Position and company
      pdf.setFontSize(11)
      pdf.setFont("helvetica", "bold")
      yPosition = addText(exp.position, margin, yPosition, { fontSize: 11, fontStyle: "bold" })

      pdf.setFontSize(10)
      pdf.setFont("helvetica", "normal")
      yPosition = addText(exp.company, margin, yPosition, { fontSize: 10 })

      // Date and location
      const dateText = `${formatDate(exp.startDate)} - ${exp.current ? "Presente" : formatDate(exp.endDate)}`
      const locationText = exp.location ? ` | ${exp.location}` : ""
      const rightText = dateText + locationText

      pdf.text(rightText, pageWidth - margin - pdf.getTextWidth(rightText), yPosition - 5)

      // Description
      if (exp.description.filter((desc) => desc.trim()).length > 0) {
        yPosition += 3
        exp.description
          .filter((desc) => desc.trim())
          .forEach((desc) => {
            yPosition = addText(`• ${desc}`, margin + 5, yPosition, { fontSize: 9 })
          })
      }

      // Technologies
      if (exp.technologies.length > 0) {
        yPosition += 2
        const techText = `Tecnologías: ${exp.technologies.join(", ")}`
        yPosition = addText(techText, margin + 5, yPosition, { fontSize: 9 })
      }

      yPosition += 5
    })
  }

  // Projects
  if (data.projects.length > 0) {
    addSection("Proyectos Destacados")

    data.projects.forEach((project) => {
      checkPageBreak(25)

      pdf.setFontSize(11)
      pdf.setFont("helvetica", "bold")
      yPosition = addText(project.name, margin, yPosition, { fontSize: 11, fontStyle: "bold" })

      if (project.description) {
        pdf.setFontSize(10)
        pdf.setFont("helvetica", "normal")
        yPosition = addText(project.description, margin, yPosition, { fontSize: 10 })
      }

      // Highlights
      if (project.highlights.length > 0) {
        yPosition += 2
        project.highlights.forEach((highlight) => {
          yPosition = addText(`• ${highlight}`, margin + 5, yPosition, { fontSize: 9 })
        })
      }

      // Technologies
      if (project.technologies.length > 0) {
        yPosition += 2
        const techText = `Tecnologías: ${project.technologies.join(", ")}`
        yPosition = addText(techText, margin + 5, yPosition, { fontSize: 9 })
      }

      // Links
      if (project.github || project.demo) {
        yPosition += 2
        if (project.github) {
          yPosition = addText(`GitHub: ${project.github}`, margin + 5, yPosition, { fontSize: 8 })
        }
        if (project.demo) {
          yPosition = addText(`Demo: ${project.demo}`, margin + 5, yPosition, { fontSize: 8 })
        }
      }

      yPosition += 5
    })
  }

  // Education
  if (data.education.length > 0) {
    addSection("Educación")

    data.education.forEach((edu) => {
      checkPageBreak(20)

      pdf.setFontSize(11)
      pdf.setFont("helvetica", "bold")
      yPosition = addText(edu.degree, margin, yPosition, { fontSize: 11, fontStyle: "bold" })

      pdf.setFontSize(10)
      pdf.setFont("helvetica", "normal")
      yPosition = addText(edu.institution, margin, yPosition, { fontSize: 10 })

      // Date and location
      const dateText = `${formatDate(edu.startDate)} - ${formatDate(edu.endDate)}`
      const locationText = edu.location ? ` | ${edu.location}` : ""
      const gpaText = edu.gpa ? ` | Nota: ${edu.gpa}` : ""
      const rightText = dateText + locationText + gpaText

      pdf.text(rightText, pageWidth - margin - pdf.getTextWidth(rightText), yPosition - 10)

      if (edu.field) {
        yPosition = addText(`Especialización: ${edu.field}`, margin + 5, yPosition, { fontSize: 9 })
      }

      if (edu.honors.length > 0) {
        yPosition += 2
        const honorsText = `Honores: ${edu.honors.join(", ")}`
        yPosition = addText(honorsText, margin + 5, yPosition, { fontSize: 9 })
      }

      yPosition += 5
    })
  }

  // Skills
  addSection("Habilidades Técnicas")

  const skillCategories = [
    { label: "Lenguajes de Programación", skills: data.skills.technical },
    { label: "Frameworks y Librerías", skills: data.skills.frameworks },
    { label: "Bases de Datos", skills: data.skills.databases },
    { label: "Herramientas", skills: data.skills.tools },
    { label: "Idiomas", skills: data.skills.languages },
  ]

  skillCategories.forEach(({ label, skills }) => {
    if (skills.length > 0) {
      checkPageBreak(10)
      const skillText = `${label}: ${skills.join(", ")}`
      yPosition = addText(skillText, margin, yPosition, { fontSize: 9 })
      yPosition += 2
    }
  })

  // Certifications
  if (data.certifications.length > 0) {
    addSection("Certificaciones")

    data.certifications.forEach((cert) => {
      checkPageBreak(15)

      pdf.setFontSize(10)
      pdf.setFont("helvetica", "bold")
      yPosition = addText(cert.name, margin, yPosition, { fontSize: 10, fontStyle: "bold" })

      pdf.setFontSize(9)
      pdf.setFont("helvetica", "normal")
      yPosition = addText(cert.issuer, margin, yPosition, { fontSize: 9 })

      // Date and credential
      const dateText = cert.date ? formatDate(cert.date) : ""
      const credText = cert.credentialId ? ` | ID: ${cert.credentialId}` : ""
      const rightText = dateText + credText

      if (rightText.trim()) {
        pdf.text(rightText, pageWidth - margin - pdf.getTextWidth(rightText), yPosition - 10)
      }

      yPosition += 3
    })
  }

  // Save the PDF
  const fileName = `CV_${data.personalInfo.fullName?.replace(/\s+/g, "_") || "CV"}.pdf`
  pdf.save(fileName)
}
