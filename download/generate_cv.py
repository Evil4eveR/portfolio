from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
from reportlab.lib.units import inch, cm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import registerFontFamily

# Register fonts
pdfmetrics.registerFont(TTFont('Times New Roman', '/usr/share/fonts/truetype/english/Times-New-Roman.ttf'))
registerFontFamily('Times New Roman', normal='Times New Roman', bold='Times New Roman')

# Create document
doc = SimpleDocTemplate(
    "/home/z/my-project/public/cv.pdf",
    pagesize=A4,
    rightMargin=1.5*cm,
    leftMargin=1.5*cm,
    topMargin=1.5*cm,
    bottomMargin=1.5*cm,
    title="Yassin_Marmoud_CV",
    author="Z.ai",
    creator="Z.ai",
    subject="Curriculum Vitae - Yassin Marmoud"
)

# Styles
styles = getSampleStyleSheet()

name_style = ParagraphStyle(
    'NameStyle',
    fontName='Times New Roman',
    fontSize=24,
    leading=30,
    alignment=TA_CENTER,
    textColor=colors.HexColor('#0a0a0a'),
)

title_style = ParagraphStyle(
    'TitleStyle',
    fontName='Times New Roman',
    fontSize=12,
    leading=16,
    alignment=TA_CENTER,
    textColor=colors.HexColor('#666666'),
)

section_style = ParagraphStyle(
    'SectionStyle',
    fontName='Times New Roman',
    fontSize=14,
    leading=18,
    textColor=colors.HexColor('#10b981'),
    spaceBefore=12,
    spaceAfter=6,
)

heading_style = ParagraphStyle(
    'HeadingStyle',
    fontName='Times New Roman',
    fontSize=11,
    leading=14,
    textColor=colors.HexColor('#0a0a0a'),
)

body_style = ParagraphStyle(
    'BodyStyle',
    fontName='Times New Roman',
    fontSize=10,
    leading=14,
    alignment=TA_JUSTIFY,
    textColor=colors.HexColor('#333333'),
)

bullet_style = ParagraphStyle(
    'BulletStyle',
    fontName='Times New Roman',
    fontSize=10,
    leading=13,
    leftIndent=15,
    bulletIndent=5,
    textColor=colors.HexColor('#333333'),
)

contact_style = ParagraphStyle(
    'ContactStyle',
    fontName='Times New Roman',
    fontSize=9,
    leading=12,
    alignment=TA_CENTER,
    textColor=colors.HexColor('#666666'),
)

story = []

# Header
story.append(Paragraph("YASSIN MARMOUD", name_style))
story.append(Paragraph("Software Engineer • EDI Integration Specialist • 42Wolfsburg Student", title_style))
story.append(Spacer(1, 6))

# Contact info
contact_info = "Wolfsburg, Germany | Driver's License (Class B) | ymarmond@gmail.com | +49 152 13154958"
story.append(Paragraph(contact_info, contact_style))
story.append(Paragraph("linkedin.com/in/yassin-marmoud | github.com/Evil4eveR", contact_style))
story.append(Spacer(1, 12))

# Horizontal line
story.append(Table([['']], colWidths=[18*cm], rowHeights=[1]))
story[-1].setStyle(TableStyle([('LINEABOVE', (0, 0), (-1, 0), 1, colors.HexColor('#10b981'))]))
story.append(Spacer(1, 12))

# Professional Summary
story.append(Paragraph("PROFESSIONAL SUMMARY", section_style))
story.append(Paragraph(
    "Results-driven Software Engineer and Electronic Data Interchange (EDI) Integration Specialist with 3+ years of hands-on experience in backend development, system integration, and technical support. Currently enrolled at 42 Wolfsburg (Germany), deepening expertise in systems programming, algorithms, and Agile software engineering. Proven record of 100% data accuracy across global EDI workflows and a strong track record of cross-functional collaboration with international teams. Trilingual (English, French, Arabic). Targeting mid-level Software Engineer, Backend Developer, or EDI Integration roles in Germany.",
    body_style
))
story.append(Spacer(1, 10))

# Technical Skills
story.append(Paragraph("TECHNICAL SKILLS", section_style))
skills_data = [
    ["EDI & Integration:", "EDI (X12, EDIFACT, XML), EDI Mapping, iPaaS, Workflow Automation, REST API, API Integration"],
    ["Programming:", "Python, Java, Go, TypeScript, Vue.js, Bash"],
    ["DevOps & Cloud:", "Linux, Docker, CI/CD, Git, Bash Scripting, AWS (basic), Azure (basic)"],
    ["Databases:", "Oracle DB, PostgreSQL, SQL"],
    ["Tools:", "ServiceNow, ITIL/SLA, Agile/Scrum, Storj, UpLink"],
    ["Soft Skills:", "Cross-functional collaboration, client communication, problem-solving, multilingual (EN/FR/AR)"],
]

skills_table = Table(skills_data, colWidths=[3.5*cm, 14.5*cm])
skills_table.setStyle(TableStyle([
    ('FONTNAME', (0, 0), (-1, -1), 'Times New Roman'),
    ('FONTSIZE', (0, 0), (-1, -1), 10),
    ('TEXTCOLOR', (0, 0), (0, -1), colors.HexColor('#10b981')),
    ('TEXTCOLOR', (1, 0), (1, -1), colors.HexColor('#333333')),
    ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ('LEFTPADDING', (0, 0), (-1, -1), 0),
    ('RIGHTPADDING', (0, 0), (-1, -1), 0),
    ('TOPPADDING', (0, 0), (-1, -1), 2),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 2),
]))
story.append(skills_table)
story.append(Spacer(1, 10))

# Professional Experience
story.append(Paragraph("PROFESSIONAL EXPERIENCE", section_style))

experiences = [
    {
        "title": "EDI Software Integrator / Consultant",
        "company": "EDICOMGROUP — Casablanca, Morocco",
        "period": "Jan 2024 – Jan 2025",
        "bullets": [
            "Managed 8–12 concurrent EDI projects end-to-end using Agile: scoping, mapping, testing, and production rollout.",
            "Achieved 100% data accuracy across all EDI transactions by developing precise mapping docs and REST API validations.",
            "Implemented custom EDI solutions (X12, EDIFACT, XML) for 6–10 international clients, improving exchange efficiency.",
            "Resolved 15–30 transaction discrepancies per cycle via root-cause analysis, significantly cutting resolution time.",
            "Raised client satisfaction 20–25% through proactive cross-functional collaboration and remote support."
        ]
    },
    {
        "title": "Technical Support Engineer",
        "company": "WhaleCloud Technology — Budapest, Hungary",
        "period": "Oct 2022 – Oct 2023",
        "bullets": [
            "Cut system downtime by 30% through Linux Bash automation scripts targeting recurring alarm patterns.",
            "Maintained 99% data accuracy executing Oracle DB reads/updates; resolved B2C and B2B issues on Zsmart platform.",
            "Partnered with Agile development teams to diagnose and fix software defects across production environments."
        ]
    },
    {
        "title": "Software Engineer Intern",
        "company": "Ericsson Research — Budapest, Hungary",
        "period": "Jul 2021 – Sep 2021",
        "bullets": [
            "Built REST API integrations with cloud systems using Vue.js, TypeScript, and Go; managed PostgreSQL databases.",
            "Operated CI/CD pipelines and version control using Docker, Git, and Bash for the Storj cloud storage project."
        ]
    },
    {
        "title": "Service Desk Analyst",
        "company": "Tata Consultancy Services (TCS) — Budapest, Hungary",
        "period": "Apr 2021 – Jul 2021",
        "bullets": [
            "Delivered trilingual IT support (EN/FR/AR) in ServiceNow Cloud within strict ITIL/SLA frameworks.",
            "Maintained 95% first-call resolution (FCR) rate across hardware, software, and network incidents."
        ]
    }
]

for exp in experiences:
    story.append(Paragraph(f"<b>{exp['title']}</b>", heading_style))
    story.append(Paragraph(f"{exp['company']} | {exp['period']}", contact_style))
    for bullet in exp['bullets']:
        story.append(Paragraph(f"• {bullet}", bullet_style))
    story.append(Spacer(1, 6))

# Education
story.append(Paragraph("EDUCATION", section_style))
education = [
    {
        "degree": "Software Engineering Program (Ongoing)",
        "school": "42 Wolfsburg — Wolfsburg, Germany",
        "period": "Jan 2025 – Present",
        "desc": "Peer-to-peer curriculum: systems programming, algorithms, memory management, networking in C/C++ and Python."
    },
    {
        "degree": "B.Sc. Computer Science",
        "school": "Eötvös Loránd University (ELTE) — Budapest, Hungary",
        "period": "Graduated Jan 2022",
        "desc": ""
    },
    {
        "degree": "B.Prof. Geo-information & Territorial Modeling",
        "school": "Moulay Ismail University — Meknes, Morocco",
        "period": "Graduated 2017",
        "desc": ""
    }
]

for edu in education:
    story.append(Paragraph(f"<b>{edu['degree']}</b>", heading_style))
    story.append(Paragraph(f"{edu['school']} | {edu['period']}", contact_style))
    if edu['desc']:
        story.append(Paragraph(edu['desc'], body_style))
    story.append(Spacer(1, 4))

# Projects & Continuous Learning
story.append(Paragraph("PROJECTS & CONTINUOUS LEARNING", section_style))
projects = [
    "• 42 Wolfsburg: Building low-level C projects — custom shell, memory allocator, and networking tools.",
    "• GitHub Portfolio: github.com/Evil4eveR — open-source contributions and personal projects.",
    "• Self-learning: Docker, cloud infrastructure (AWS basics), REST API design patterns."
]
for project in projects:
    story.append(Paragraph(project, bullet_style))
story.append(Spacer(1, 6))

# Languages
story.append(Paragraph("LANGUAGES", section_style))
story.append(Paragraph("English — Proficient | French — Proficient | Arabic — Native | German — Beginner (A1–A2, actively learning)", body_style))

# Build PDF
doc.build(story)
print("CV PDF created successfully!")
