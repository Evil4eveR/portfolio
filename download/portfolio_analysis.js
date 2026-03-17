const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, ImageRun,
        Header, Footer, AlignmentType, HeadingLevel, BorderStyle, WidthType, 
        ShadingType, VerticalAlign, PageNumber, ExternalHyperlink, PageBreak, LevelFormat } = require('docx');
const fs = require('fs');

// Color scheme - Midnight Code style
const colors = {
  primary: "020617",
  body: "1E293B",
  secondary: "64748B",
  accent: "94A3B8",
  tableBg: "F8FAFC"
};

// Read screenshots
const screenshot1 = fs.readFileSync('/home/z/my-project/download/portfolio_screenshot_1.png');
const screenshot2 = fs.readFileSync('/home/z/my-project/download/portfolio_screenshot_2.png');
const screenshot3 = fs.readFileSync('/home/z/my-project/download/portfolio_screenshot_3.png');
const screenshotColor = fs.readFileSync('/home/z/my-project/download/portfolio_screenshot_color.png');
const screenshotMobile = fs.readFileSync('/home/z/my-project/download/portfolio_screenshot_mobile.png');

// Table border style
const tableBorder = { style: BorderStyle.SINGLE, size: 1, color: colors.accent };
const cellBorders = { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder };

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Times New Roman", size: 24 } } },
    paragraphStyles: [
      { id: "Title", name: "Title", basedOn: "Normal",
        run: { size: 56, bold: true, color: colors.primary, font: "Times New Roman" },
        paragraph: { spacing: { before: 240, after: 120 }, alignment: AlignmentType.CENTER } },
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 36, bold: true, color: colors.primary, font: "Times New Roman" },
        paragraph: { spacing: { before: 400, after: 200 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, color: colors.primary, font: "Times New Roman" },
        paragraph: { spacing: { before: 300, after: 150 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 24, bold: true, color: colors.body, font: "Times New Roman" },
        paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 2 } }
    ]
  },
  numbering: {
    config: [
      { reference: "bullet-list",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "numbered-features",
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "numbered-tech",
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "numbered-impl",
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] }
    ]
  },
  sections: [{
    properties: {
      page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } }
    },
    headers: {
      default: new Header({ children: [new Paragraph({ 
        alignment: AlignmentType.RIGHT,
        children: [new TextRun({ text: "Portfolio Website Analysis - Ayoub Kadi", color: colors.secondary, size: 20 })]
      })] })
    },
    footers: {
      default: new Footer({ children: [new Paragraph({ 
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "Page ", size: 20 }), new TextRun({ children: [PageNumber.CURRENT], size: 20 }), new TextRun({ text: " of ", size: 20 }), new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 20 })]
      })] })
    },
    children: [
      // Title
      new Paragraph({ heading: HeadingLevel.TITLE, children: [new TextRun("Portfolio Website Analysis")] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 400 },
        children: [new TextRun({ text: "https://ayoub-ka.vercel.app/", italics: true, color: colors.secondary, size: 22 })] }),
      
      // Executive Summary
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Executive Summary")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("This document provides a comprehensive analysis of Ayoub Kadi's personal portfolio website hosted at "),
        new ExternalHyperlink({ children: [new TextRun({ text: "https://ayoub-ka.vercel.app/", style: "Hyperlink" })], link: "https://ayoub-ka.vercel.app/" }),
        new TextRun(". The website serves as a professional showcase for a Frontend Developer based in Morocco, featuring an impressive collection of 8 projects, professional experience, educational background, certifications, and a contact form. The site demonstrates modern web development practices with a clean, minimalist design that emphasizes user experience and visual appeal. Built with Vite and React, the portfolio showcases proficiency in various frontend technologies including React, Next.js, TypeScript, and Tailwind CSS. The website features smooth animations, responsive design, and an innovative accent color switcher that allows visitors to customize their viewing experience.")
      ]}),
      
      // Screenshot 1
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Website Screenshots")] }),
      new Paragraph({ spacing: { after: 200 }, children: [new TextRun("The following screenshots capture the website's visual design and layout across different sections and viewport sizes:")] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 },
        children: [new ImageRun({ type: "png", data: screenshot1, transformation: { width: 550, height: 350 },
          altText: { title: "Hero Section", description: "Portfolio hero section screenshot", name: "hero-screenshot" } })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 400 },
        children: [new TextRun({ text: "Figure 1: Hero Section with Introduction", italics: true, size: 20, color: colors.secondary })] }),
      
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 },
        children: [new ImageRun({ type: "png", data: screenshot2, transformation: { width: 550, height: 350 },
          altText: { title: "Projects Section", description: "Projects section screenshot", name: "projects-screenshot" } })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 400 },
        children: [new TextRun({ text: "Figure 2: Projects Showcase Section", italics: true, size: 20, color: colors.secondary })] }),
      
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 },
        children: [new ImageRun({ type: "png", data: screenshot3, transformation: { width: 550, height: 350 },
          altText: { title: "Contact Section", description: "Contact and experience section screenshot", name: "contact-screenshot" } })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 400 },
        children: [new TextRun({ text: "Figure 3: Experience, Certificates & Contact Section", italics: true, size: 20, color: colors.secondary })] }),
      
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 },
        children: [new ImageRun({ type: "png", data: screenshotColor, transformation: { width: 550, height: 350 },
          altText: { title: "Accent Color", description: "Accent color switcher demo", name: "color-screenshot" } })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 400 },
        children: [new TextRun({ text: "Figure 4: Accent Color Variation", italics: true, size: 20, color: colors.secondary })] }),
      
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 },
        children: [new ImageRun({ type: "png", data: screenshotMobile, transformation: { width: 280, height: 500 },
          altText: { title: "Mobile View", description: "Mobile responsive view screenshot", name: "mobile-screenshot" } })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 400 },
        children: [new TextRun({ text: "Figure 5: Mobile Responsive View", italics: true, size: 20, color: colors.secondary })] }),
      
      // Website Structure
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Website Structure & Sections")] }),
      new Paragraph({ spacing: { after: 200 }, children: [new TextRun("The portfolio website is organized into six main sections, each serving a specific purpose in showcasing the developer's skills, experience, and work. The single-page application design ensures smooth navigation and a cohesive user experience without page reloads. The following subsections detail each component of the website structure:")] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("1. Hero Section (Introduction)")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("The hero section serves as the first impression for visitors, featuring a welcoming message with an emoji wave (👋), the developer's name prominently displayed as \"Ayoub Kadi\", and the professional title \"Frontend Developer\". The location \"Based in Morocco\" provides geographical context, while a brief tagline describes the passion for building smooth, responsive web experiences. The section includes a prominent \"Download CV\" button that links to a PDF resume, along with social media links to GitHub, LinkedIn, and Instagram. A personal photograph adds a human touch, making the portfolio more personal and approachable. The hero section is designed to capture attention immediately and encourage visitors to explore further.")
      ]}),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("2. Tech Stack Section")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("This section displays the developer's technical proficiencies through a visually appealing grid of technology icons with labels. The technologies showcased include Tailwind CSS, Next.js, React, JavaScript, TypeScript, HTML5, CSS3, and Node.js. Each technology is represented by its official logo, creating instant recognition for technical recruiters and potential clients. The section communicates breadth of expertise across the frontend development ecosystem, from foundational web technologies (HTML, CSS) to modern frameworks and tools. The presentation style reinforces technical credibility while maintaining visual consistency with the overall design.")
      ]}),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("3. Projects Section")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("The projects section is the centerpiece of the portfolio, showcasing 8 diverse projects that demonstrate practical skills and experience. Each project card features a numbered index (01-08), project title, detailed description, a \"View Project\" link, and a screenshot preview. The projects range from Web3 applications to e-commerce sites and development tools, demonstrating versatility across different domains. The detailed descriptions highlight technical implementations, user experience considerations, and the specific technologies used in each project. This comprehensive presentation allows potential employers to evaluate the developer's capabilities through concrete examples.")
      ]}),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("4. Experience & Education Section")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("This section chronicles the developer's professional journey and educational background through a timeline-style presentation. The experience section highlights an internship at AZNAY TECHNOLOGIES where the developer maintained an ERP system and built scalable interfaces using React.js. The education section lists credentials including an IT Software Developer Certificate from School 1337 (a prestigious coding school), a degree in Industrial Electronics and Computing from Ecole supérieure de technologie, and a Bachelor's degree with Science option. Each entry includes a description of skills gained and work performed, providing context for the qualifications.")
      ]}),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("5. Professional Certificates Section")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("The certificates section showcases verified professional credentials through clickable card elements. Featured certifications include Front-end (React.js) from HackerRank (May 2024), Programming in Python from Meta via Coursera (June 2025), and Programming in C from OpenClassroom (December 2021). Each certificate card displays the certification name, issuing organization, and date obtained. The cards link to the actual credential pages, allowing verification by interested parties. This section validates the developer's commitment to continuous learning and professional development.")
      ]}),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("6. Contact Section")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("The contact section provides a straightforward way for visitors to reach out through a functional contact form. The form includes three required fields: Name, Email, and Message, each with appropriate input validation. A \"Send Message\" button with an icon initiates form submission. The section header \"Let's Get in Touch\" and subtitle \"Have a project in mind? Want to collaborate? Just say hello.\" create a friendly, approachable tone. The form likely integrates with an email service or backend API to process submissions, making it a practical tool for lead generation and professional inquiries.")
      ]}),
      
      // Feature Analysis
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Key Features & Functionality")] }),
      new Paragraph({ spacing: { after: 200 }, children: [new TextRun("The portfolio website incorporates several notable features that enhance user experience and demonstrate advanced frontend development capabilities:")] }),
      
      new Paragraph({ numbering: { reference: "numbered-features", level: 0 }, spacing: { after: 100 },
        children: [new TextRun({ text: "Accent Color Switcher: ", bold: true }), new TextRun("A unique floating button allows visitors to customize the website's accent color. This feature uses CSS custom properties (variables) to dynamically change the color scheme, demonstrating proficiency in modern CSS techniques and state management. The color preference could be persisted across sessions using localStorage.")] }),
      new Paragraph({ numbering: { reference: "numbered-features", level: 0 }, spacing: { after: 100 },
        children: [new TextRun({ text: "Smooth Scroll Navigation: ", bold: true }), new TextRun("The website implements smooth scrolling behavior for navigation, creating a fluid user experience when moving between sections. This is achieved through CSS scroll-behavior property or JavaScript scroll animations.")] }),
      new Paragraph({ numbering: { reference: "numbered-features", level: 0 }, spacing: { after: 100 },
        children: [new TextRun({ text: "Responsive Design: ", bold: true }), new TextRun("The layout adapts seamlessly to different screen sizes, from desktop monitors to mobile devices. Media queries and flexible grid systems ensure content remains accessible and visually appealing across all viewport sizes.")] }),
      new Paragraph({ numbering: { reference: "numbered-features", level: 0 }, spacing: { after: 100 },
        children: [new TextRun({ text: "Interactive Project Cards: ", bold: true }), new TextRun("Project cards feature hover effects and clickable links that open live demos or repositories. The visual hierarchy with numbered indices helps visitors track their progress through the portfolio.")] }),
      new Paragraph({ numbering: { reference: "numbered-features", level: 0 }, spacing: { after: 100 },
        children: [new TextRun({ text: "Toast Notifications: ", bold: true }), new TextRun("The website uses the Sonner library for toast notifications, providing user feedback for actions like form submissions. The toast system supports different notification types (success, error, info) with appropriate styling.")] }),
      new Paragraph({ numbering: { reference: "numbered-features", level: 0 }, spacing: { after: 200 },
        children: [new TextRun({ text: "CV Download: ", bold: true }), new TextRun("A direct download link for the CV/Resume in PDF format allows recruiters to save the document locally. The CV is stored at /cv.pdf and served directly by the hosting platform.")] }),
      
      // Design Analysis
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Design Analysis")] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Color Scheme")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("The website employs a modern, dark-themed color palette that appeals to developers and tech professionals. The background uses dark gray/charcoal tones that reduce eye strain and create contrast for content. Accent colors are used strategically for buttons, links, and interactive elements, with the color switcher allowing personalization. The color scheme demonstrates understanding of contemporary web design trends and accessibility considerations, ensuring sufficient contrast for readability.")
      ]}),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Typography")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("The typography system creates clear visual hierarchy through strategic use of font sizes and weights. Large, bold headings capture attention while body text remains highly readable. The font choices align with modern web standards, likely using system fonts or a web font service for optimal loading performance. Line heights and letter spacing are calibrated for comfortable reading, and text contrast against the dark background ensures accessibility compliance.")
      ]}),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Layout & Spacing")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("The single-column layout provides a focused reading experience, guiding visitors through content sequentially. Generous white space (padding and margins) prevents visual clutter and improves content scanning. Section separators create natural breaks between content areas without jarring transitions. The layout adapts fluidly to different screen widths, maintaining proportion and readability across devices. Grid systems are employed for the tech stack icons and project cards, creating visual consistency.")
      ]}),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Visual Elements")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("Project screenshots provide visual evidence of work quality and serve as previews for the linked demos. Icon graphics for technologies and social platforms add visual interest while communicating information quickly. The personal photograph in the hero section humanizes the portfolio, creating an emotional connection with visitors. Subtle animations and transitions enhance interactivity without overwhelming the user interface or affecting performance negatively.")
      ]}),
      
      // Projects Table
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Project Details")] }),
      new Paragraph({ spacing: { after: 200 }, children: [new TextRun("The following table provides a comprehensive overview of all 8 projects showcased in the portfolio, including their descriptions, technologies used, and live links:")] }),
      
      new Table({
        columnWidths: [800, 2000, 4000, 2560],
        margins: { top: 100, bottom: 100, left: 120, right: 120 },
        rows: [
          new TableRow({
            tableHeader: true,
            children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "#", bold: true, size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Project", bold: true, size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Description", bold: true, size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Link", bold: true, size: 20 })] })] })
            ]
          }),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "01", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Anita", bold: true, size: 20 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Official platform for ANITA token on InkonChain - Web3 project showcase", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new ExternalHyperlink({ children: [new TextRun({ text: "anita.ink", style: "Hyperlink", size: 20 })], link: "https://anita.ink/" })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "02", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Finowl", bold: true, size: 20 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "AI copilot for crypto - scans markets, tracks sentiment, delivers alpha every 4 hours", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "External link", size: 20, color: colors.secondary })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "03", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Trustybite", bold: true, size: 20 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Restaurant discovery with blockchain transparency - cleanliness scores & verified quality", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "External link", size: 20, color: colors.secondary })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "04", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Json-v", bold: true, size: 20 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "JSON to interactive graph/tree visualization using Reaflow and react-json-tree", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "External link", size: 20, color: colors.secondary })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "05", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Fruitables", bold: true, size: 20 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Online fruits & vegetables store - responsive HTML/CSS design", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "External link", size: 20, color: colors.secondary })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "06", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "BookSearch", bold: true, size: 20 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "React app for searching books with real-time results and responsive interface", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "External link", size: 20, color: colors.secondary })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "07", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Uoni Watch", bold: true, size: 20 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Online watch store with clean, minimalist design - HTML/CSS", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "External link", size: 20, color: colors.secondary })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "08", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Digitf", bold: true, size: 20 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Online furniture store (chairs & tables) - modern, responsive design", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "External link", size: 20, color: colors.secondary })] })] })
          ]})
        ]
      }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 100, after: 400 },
        children: [new TextRun({ text: "Table 1: Complete Projects Overview", italics: true, size: 20, color: colors.secondary })] }),
      
      // Technical Stack
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Technical Implementation Details")] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Frontend Technologies Used")] }),
      new Paragraph({ spacing: { after: 200 }, children: [new TextRun("The portfolio is built with a modern frontend stack optimized for performance and developer experience:")] }),
      
      new Table({
        columnWidths: [2500, 6860],
        margins: { top: 100, bottom: 100, left: 120, right: 120 },
        rows: [
          new TableRow({
            tableHeader: true,
            children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Technology", bold: true, size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Purpose & Implementation", bold: true, size: 20 })] })] })
            ]
          }),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Vite", bold: true, size: 20 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Build tool and development server - provides fast hot module replacement and optimized production builds", size: 20 })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "React", bold: true, size: 20 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "UI library for component-based architecture - handles state management, routing, and view rendering", size: 20 })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Tailwind CSS", bold: true, size: 20 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Utility-first CSS framework - enables rapid styling with consistent design tokens and responsive utilities", size: 20 })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Sonner", bold: true, size: 20 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Toast notification library - provides elegant notification components for user feedback", size: 20 })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "React Icons", bold: true, size: 20 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Icon library - provides consistent iconography from popular icon sets (Feather, Font Awesome, etc.)", size: 20 })] })] })
          ]})
        ]
      }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 100, after: 400 },
        children: [new TextRun({ text: "Table 2: Technology Stack", italics: true, size: 20, color: colors.secondary })] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Hosting & Deployment")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("The website is deployed on Vercel, a cloud platform optimized for frontend frameworks and static sites. Vercel provides automatic HTTPS, global CDN distribution, continuous deployment from Git repositories, and preview deployments for pull requests. The choice of Vercel aligns with modern frontend development practices and ensures optimal performance with edge caching and serverless functions. The domain (ayoub-ka.vercel.app) is a Vercel-provided subdomain, though custom domain configuration is possible for branding purposes.")
      ]}),
      
      // Social Links
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("External Links & Resources")] }),
      new Paragraph({ spacing: { after: 200 }, children: [new TextRun("The portfolio connects to various external platforms and resources:")] }),
      
      new Table({
        columnWidths: [2500, 3500, 3360],
        margins: { top: 100, bottom: 100, left: 120, right: 120 },
        rows: [
          new TableRow({
            tableHeader: true,
            children: [
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Resource", bold: true, size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "URL", bold: true, size: 20 })] })] }),
              new TableCell({ borders: cellBorders, shading: { fill: colors.tableBg, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Purpose", bold: true, size: 20 })] })] })
            ]
          }),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "GitHub", bold: true, size: 20 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new ExternalHyperlink({ children: [new TextRun({ text: "github.com/KD-ayoub", style: "Hyperlink", size: 20 })], link: "https://github.com/KD-ayoub" })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Code repositories & projects", size: 20 })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "LinkedIn", bold: true, size: 20 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new ExternalHyperlink({ children: [new TextRun({ text: "linkedin.com/in/ayoubkadi", style: "Hyperlink", size: 20 })], link: "https://www.linkedin.com/in/ayoubkadi/" })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Professional network profile", size: 20 })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Instagram", bold: true, size: 20 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new ExternalHyperlink({ children: [new TextRun({ text: "instagram.com/ayoub_ka20", style: "Hyperlink", size: 20 })], link: "https://www.instagram.com/ayoub_ka20/" })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Social media presence", size: 20 })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "CV/Resume", bold: true, size: 20 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "/cv.pdf", size: 20 })] })] }),
            new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Downloadable resume PDF", size: 20 })] })] })
          ]})
        ]
      }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 100, after: 400 },
        children: [new TextRun({ text: "Table 3: External Links", italics: true, size: 20, color: colors.secondary })] }),
      
      // Implementation Guide
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Implementation Guide for Recreating the Website")] }),
      new Paragraph({ spacing: { after: 200 }, children: [new TextRun("To create a similar portfolio website, follow these implementation steps:")] }),
      
      new Paragraph({ numbering: { reference: "numbered-impl", level: 0 }, spacing: { after: 100 },
        children: [new TextRun({ text: "Project Setup: ", bold: true }), new TextRun("Initialize a new Vite project with React template using 'npm create vite@latest portfolio -- --template react'. Install Tailwind CSS and configure it according to the official documentation. Set up the project structure with components folder for reusable UI elements.")] }),
      new Paragraph({ numbering: { reference: "numbered-impl", level: 0 }, spacing: { after: 100 },
        children: [new TextRun({ text: "Design System: ", bold: true }), new TextRun("Define CSS custom properties for colors, spacing, and typography in Tailwind configuration. Create a dark theme color palette with accent colors that can be switched dynamically. Implement responsive breakpoints for mobile, tablet, and desktop views.")] }),
      new Paragraph({ numbering: { reference: "numbered-impl", level: 0 }, spacing: { after: 100 },
        children: [new TextRun({ text: "Component Architecture: ", bold: true }), new TextRun("Create modular React components: Hero, TechStack, Projects, Experience, Certificates, Contact, and Footer. Each component should be self-contained with its own styling and logic. Use props for customization and content injection.")] }),
      new Paragraph({ numbering: { reference: "numbered-impl", level: 0 }, spacing: { after: 100 },
        children: [new TextRun({ text: "State Management: ", bold: true }), new TextRun("Implement React useState for local component state (form inputs, UI interactions). Use useEffect for side effects like localStorage persistence for color preferences. Consider Context API for global state like theme settings.")] }),
      new Paragraph({ numbering: { reference: "numbered-impl", level: 0 }, spacing: { after: 100 },
        children: [new TextRun({ text: "Animations & Interactions: ", bold: true }), new TextRun("Add smooth scroll behavior with CSS scroll-behavior: smooth. Implement hover effects on cards and buttons using CSS transitions. Consider using Framer Motion for more complex scroll-triggered animations.")] }),
      new Paragraph({ numbering: { reference: "numbered-impl", level: 0 }, spacing: { after: 100 },
        children: [new TextRun({ text: "Form Handling: ", bold: true }), new TextRun("Create a contact form with controlled inputs. Implement client-side validation for required fields. Set up form submission with a service like EmailJS, Formspree, or a custom backend API endpoint.")] }),
      new Paragraph({ numbering: { reference: "numbered-impl", level: 0 }, spacing: { after: 100 },
        children: [new TextRun({ text: "Asset Optimization: ", bold: true }), new TextRun("Optimize images using modern formats (WebP, AVIF) with fallbacks. Implement lazy loading for images below the fold. Use SVG icons where possible for scalability and small file sizes.")] }),
      new Paragraph({ numbering: { reference: "numbered-impl", level: 0 }, spacing: { after: 200 },
        children: [new TextRun({ text: "Deployment: ", bold: true }), new TextRun("Connect the repository to Vercel for automatic deployments. Configure custom domain if needed. Set up environment variables for any API keys or sensitive configuration.")] }),
      
      // Conclusion
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Summary")] }),
      new Paragraph({ spacing: { after: 200 }, children: [
        new TextRun("Ayoub Kadi's portfolio website represents a well-executed modern portfolio that effectively showcases frontend development skills. The clean design, comprehensive project showcase, and thoughtful features like the accent color switcher demonstrate both technical proficiency and attention to user experience. The single-page application architecture provides smooth navigation, while the responsive design ensures accessibility across devices. For developers looking to create similar portfolios, this website serves as an excellent reference for structure, content organization, and feature implementation. The combination of Vite, React, and Tailwind CSS provides a solid foundation that balances performance, developer experience, and maintainability.")
      ]})
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync('/home/z/my-project/download/portfolio_website_analysis.docx', buffer);
  console.log('Document created successfully!');
});
