"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Github, Linkedin, Mail, MapPin, Phone, Download, ExternalLink, 
  Code, Server, Database, Cloud, Cpu, Globe, Zap, Palette,
  GraduationCap, Briefcase, Award, Send, ChevronDown, Menu, X
} from "lucide-react";
import Image from "next/image";
import { toast } from "@/hooks/use-toast";

// Accent color options
const accentColors = [
  { name: "emerald", label: "Emerald", color: "#10b981" },
  { name: "blue", label: "Blue", color: "#3b82f6" },
  { name: "purple", label: "Purple", color: "#8b5cf6" },
  { name: "orange", label: "Orange", color: "#f97316" },
  { name: "pink", label: "Pink", color: "#ec4899" },
  { name: "cyan", label: "Cyan", color: "#06b6d4" },
];

// Tech stack data
const techStack = [
  { name: "Python", category: "Programming", icon: "🐍" },
  { name: "Java", category: "Programming", icon: "☕" },
  { name: "Go", category: "Programming", icon: "🔵" },
  { name: "TypeScript", category: "Programming", icon: "📘" },
  { name: "Vue.js", category: "Frontend", icon: "💚" },
  { name: "Bash", category: "Scripting", icon: "🐧" },
  { name: "Docker", category: "DevOps", icon: "🐳" },
  { name: "Linux", category: "DevOps", icon: "🖥️" },
  { name: "PostgreSQL", category: "Database", icon: "🐘" },
  { name: "Oracle DB", category: "Database", icon: "🔶" },
  { name: "Git", category: "Tools", icon: "📦" },
  { name: "AWS", category: "Cloud", icon: "☁️" },
];

// EDI & Integration skills
const ediSkills = [
  { name: "EDI (X12, EDIFACT, XML)", level: 95 },
  { name: "EDI Mapping", level: 90 },
  { name: "iPaaS", level: 85 },
  { name: "REST API", level: 95 },
  { name: "API Integration", level: 90 },
  { name: "Workflow Automation", level: 88 },
];

// Experience data
const experiences = [
  {
    title: "EDI Software Integrator / Consultant",
    company: "EDICOMGROUP",
    location: "Casablanca, Morocco",
    period: "Jan 2024 – Jan 2025",
    highlights: [
      "Managed 8–12 concurrent EDI projects end-to-end using Agile: scoping, mapping, testing, and production rollout",
      "Achieved 100% data accuracy across all EDI transactions by developing precise mapping docs and REST API validations",
      "Implemented custom EDI solutions (X12, EDIFACT, XML) for 6–10 international clients, improving exchange efficiency",
      "Resolved 15–30 transaction discrepancies per cycle via root-cause analysis, significantly cutting resolution time",
      "Raised client satisfaction 20–25% through proactive cross-functional collaboration and remote support"
    ]
  },
  {
    title: "Technical Support Engineer",
    company: "WhaleCloud Technology",
    location: "Budapest, Hungary",
    period: "Oct 2022 – Oct 2023",
    highlights: [
      "Cut system downtime by 30% through Linux Bash automation scripts targeting recurring alarm patterns",
      "Maintained 99% data accuracy executing Oracle DB reads/updates; resolved B2C and B2B issues on Zsmart platform",
      "Partnered with Agile development teams to diagnose and fix software defects across production environments"
    ]
  },
  {
    title: "Software Engineer Intern",
    company: "Ericsson Research",
    location: "Budapest, Hungary",
    period: "Jul 2021 – Sep 2021",
    highlights: [
      "Built REST API integrations with cloud systems using Vue.js, TypeScript, and Go; managed PostgreSQL databases",
      "Operated CI/CD pipelines and version control using Docker, Git, and Bash for the Storj cloud storage project"
    ]
  },
  {
    title: "Service Desk Analyst",
    company: "Tata Consultancy Services (TCS)",
    location: "Budapest, Hungary",
    period: "Apr 2021 – Jul 2021",
    highlights: [
      "Delivered trilingual IT support (EN/FR/AR) in ServiceNow Cloud within strict ITIL/SLA frameworks",
      "Maintained 95% first-call resolution (FCR) rate across hardware, software, and network incidents"
    ]
  }
];

// Education data
const education = [
  {
    degree: "Software Engineering Program",
    school: "42 Wolfsburg",
    location: "Wolfsburg, Germany",
    period: "Jan 2025 – Present",
    description: "Peer-to-peer curriculum: systems programming, algorithms, memory management, networking in C/C++ and Python"
  },
  {
    degree: "B.Sc. Computer Science",
    school: "Eötvös Loránd University (ELTE)",
    location: "Budapest, Hungary",
    period: "Graduated Jan 2022",
    description: "Comprehensive computer science education with focus on software development and algorithms"
  },
  {
    degree: "B.Prof. Geo-information & Territorial Modeling",
    school: "Moulay Ismail University",
    location: "Meknes, Morocco",
    period: "Graduated 2017",
    description: "Geographic information systems and spatial data analysis"
  }
];

// Projects data
const projects = [
  {
    title: "Custom Shell Implementation",
    description: "Building a custom Unix shell in C as part of 42 Wolfsburg curriculum. Features include command parsing, piping, redirections, and built-in commands.",
    tech: ["C", "Unix", "Systems Programming"],
    category: "Systems Programming"
  },
  {
    title: "Memory Allocator",
    description: "Implementing a custom memory allocator with malloc, free, and realloc functionality. Deep dive into memory management and optimization.",
    tech: ["C", "Memory Management", "Algorithms"],
    category: "Systems Programming"
  },
  {
    title: "EDI Integration Platform",
    description: "Developed and maintained EDI integration solutions for international clients using X12, EDIFACT, and XML formats. Achieved 100% data accuracy.",
    tech: ["EDI", "X12", "EDIFACT", "XML", "REST API"],
    category: "Enterprise Integration"
  },
  {
    title: "Cloud Storage Pipeline",
    description: "Built CI/CD pipelines and managed cloud storage infrastructure for the Storj project during Ericsson internship.",
    tech: ["Docker", "Git", "CI/CD", "Bash", "Go"],
    category: "DevOps"
  }
];

// Languages
const languages = [
  { name: "English", level: "Proficient", percentage: 90 },
  { name: "French", level: "Proficient", percentage: 90 },
  { name: "Arabic", level: "Native", percentage: 100 },
  { name: "German", level: "Beginner (A1–A2)", percentage: 25 },
];

export default function Portfolio() {
  const [currentAccent, setCurrentAccent] = useState("emerald");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-accent", currentAccent);
  }, [currentAccent]);

  const handleAccentChange = (color: string) => {
    setCurrentAccent(color);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. I'll get back to you soon!",
    });
    
    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background grid-pattern">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <span className="text-xl font-bold gradient-text">YM</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {["About", "Skills", "Experience", "Projects", "Education", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-border">
              {["About", "Skills", "Experience", "Projects", "Education", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left py-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="about" className="min-h-screen flex items-center justify-center pt-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6 order-2 lg:order-1">
              <div className="space-y-2">
                <p className="text-lg text-muted-foreground flex items-center gap-2">
                  <span className="text-2xl">👋</span>
                  <span>Welcome to my</span>
                  <span className="font-semibold" style={{ color: "var(--accent-color)" }}>Portfolio</span>
                </p>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
                  Hi, I&apos;m{" "}
                  <span className="gradient-text">Yassin Marmoud</span>
                </h1>
                <h2 className="text-2xl sm:text-3xl font-semibold text-muted-foreground">
                  Software Engineer & EDI Specialist
                </h2>
              </div>
              
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-5 w-5" style={{ color: "var(--accent-color)" }} />
                <span>Based in Wolfsburg, Germany</span>
              </div>
              
              <p className="text-lg text-muted-foreground max-w-xl">
                Results-driven Software Engineer and Electronic Data Interchange (EDI) Integration Specialist 
                with 3+ years of experience in backend development, system integration, and technical support. 
                Currently deepening expertise in systems programming at 42 Wolfsburg.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button 
                  className="gap-2" 
                  style={{ backgroundColor: "var(--accent-color)", color: "white" }}
                  asChild
                >
                  <a href="/cv.pdf" download>
                    <Download className="h-4 w-4" />
                    Download CV
                  </a>
                </Button>
                <Button 
                  variant="outline" 
                  className="gap-2"
                  onClick={() => scrollToSection("contact")}
                >
                  <Mail className="h-4 w-4" />
                  Contact Me
                </Button>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-4 pt-4">
                <a 
                  href="https://github.com/Evil4eveR" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-full border border-border hover:border-foreground transition-all duration-300 hover:scale-110"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a 
                  href="https://linkedin.com/in/yassin-marmoud" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-full border border-border hover:border-foreground transition-all duration-300 hover:scale-110"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a 
                  href="mailto:ymarmond@gmail.com"
                  className="p-2 rounded-full border border-border hover:border-foreground transition-all duration-300 hover:scale-110"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Right Content - Profile Image */}
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="relative">
                <div 
                  className="absolute inset-0 rounded-full blur-3xl opacity-30"
                  style={{ backgroundColor: "var(--accent-color)" }}
                />
                <div 
                  className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 animate-pulse-glow"
                  style={{ borderColor: "var(--accent-color)" }}
                >
                  <Image
                    src="/profile.png"
                    alt="Yassin Marmoud"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="h-8 w-8 text-muted-foreground" />
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title">
              My <span className="gradient-text">Tech Stack</span>
            </h2>
            <p className="section-subtitle">Technologies I work with most</p>
          </div>

          {/* Tech Stack Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-16">
            {techStack.map((tech, index) => (
              <Card 
                key={index} 
                className="group hover:border-foreground transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <CardContent className="p-4 text-center">
                  <div className="text-3xl mb-2">{tech.icon}</div>
                  <p className="font-medium">{tech.name}</p>
                  <p className="text-xs text-muted-foreground">{tech.category}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* EDI & Integration Skills */}
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="h-5 w-5" style={{ color: "var(--accent-color)" }} />
                  EDI & Integration Skills
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {ediSkills.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{skill.name}</span>
                      <span className="text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-1000"
                        style={{ 
                          width: `${skill.level}%`,
                          backgroundColor: "var(--accent-color)"
                        }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" style={{ color: "var(--accent-color)" }} />
                  Languages
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {languages.map((lang, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="flex items-center gap-2">
                        {lang.name}
                        <Badge variant="outline" className="text-xs">{lang.level}</Badge>
                      </span>
                      <span className="text-muted-foreground">{lang.percentage}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-1000"
                        style={{ 
                          width: `${lang.percentage}%`,
                          backgroundColor: "var(--accent-color)"
                        }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title">
              Professional <span className="gradient-text">Experience</span>
            </h2>
            <p className="section-subtitle">My career journey and achievements</p>
          </div>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <Card 
                key={index} 
                className="border-border hover:border-foreground/50 transition-all duration-300 overflow-hidden"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Timeline */}
                  <div className="md:w-48 p-6 bg-secondary/30 flex flex-col justify-center items-center text-center md:border-r border-border">
                    <Briefcase className="h-8 w-8 mb-2" style={{ color: "var(--accent-color)" }} />
                    <p className="text-sm font-medium">{exp.period}</p>
                    <p className="text-xs text-muted-foreground">{exp.location}</p>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 p-6">
                    <CardHeader className="p-0 mb-4">
                      <CardTitle className="text-xl">{exp.title}</CardTitle>
                      <CardDescription className="text-base font-medium" style={{ color: "var(--accent-color)" }}>
                        {exp.company}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                      <ul className="space-y-2">
                        {exp.highlights.map((highlight, hIndex) => (
                          <li key={hIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <Zap className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: "var(--accent-color)" }} />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="section-subtitle">Showcase of my technical work and continuous learning</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <Card 
                key={index}
                className="group border-border hover:border-foreground/50 transition-all duration-300 hover:shadow-lg"
                style={{ "--hover-shadow": `0 0 30px var(--accent-color)` } as React.CSSProperties}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-muted-foreground/50">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <CardTitle className="text-xl group-hover:text-accent transition-colors">
                        {project.title}
                      </CardTitle>
                    </div>
                    <Badge variant="outline" style={{ borderColor: "var(--accent-color)", color: "var(--accent-color)" }}>
                      {project.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, tIndex) => (
                      <Badge key={tIndex} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* GitHub CTA */}
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              className="gap-2"
              asChild
            >
              <a href="https://github.com/Evil4eveR" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
                View More on GitHub
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title">
              Education & <span className="gradient-text">Certifications</span>
            </h2>
            <p className="section-subtitle">My academic background and continuous learning</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {education.map((edu, index) => (
              <Card 
                key={index}
                className="border-border hover:border-foreground/50 transition-all duration-300"
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div 
                      className="p-2 rounded-full"
                      style={{ backgroundColor: "rgba(16, 185, 129, 0.15)" }}
                    >
                      <GraduationCap className="h-5 w-5" style={{ color: "var(--accent-color)" }} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{edu.degree}</CardTitle>
                      <CardDescription className="font-medium" style={{ color: "var(--accent-color)" }}>
                        {edu.school}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-xs text-muted-foreground">{edu.location} • {edu.period}</p>
                  <p className="text-sm text-muted-foreground">{edu.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Certifications */}
          <div className="mt-12">
            <h3 className="text-xl font-semibold text-center mb-6">Certifications & Achievements</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                "EDI Specialist",
                "ITIL Foundation",
                "Agile/Scrum",
                "ServiceNow Cloud",
                "Docker Fundamentals",
                "AWS Basics"
              ].map((cert, index) => (
                <Badge 
                  key={index}
                  variant="outline"
                  className="px-4 py-2 text-sm"
                  style={{ borderColor: "var(--accent-color)" }}
                >
                  <Award className="h-4 w-4 mr-2" style={{ color: "var(--accent-color)" }} />
                  {cert}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title">
              Let&apos;s Get in <span className="gradient-text">Touch</span>
            </h2>
            <p className="section-subtitle">Have a project in mind? Want to collaborate? Just say hello!</p>
          </div>

          <Card className="border-border">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Your Name</label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="bg-secondary/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Your Email</label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="bg-secondary/50"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">Your Message</label>
                  <Textarea
                    id="message"
                    placeholder="Tell me about your project or just say hi..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={5}
                    className="bg-secondary/50 resize-none"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full gap-2"
                  style={{ backgroundColor: "var(--accent-color)", color: "white" }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-muted-foreground">
            <a href="mailto:ymarmond@gmail.com" className="flex items-center gap-2 hover:text-foreground transition-colors">
              <Mail className="h-5 w-5" style={{ color: "var(--accent-color)" }} />
              ymarmond@gmail.com
            </a>
            <a href="tel:+4915213154958" className="flex items-center gap-2 hover:text-foreground transition-colors">
              <Phone className="h-5 w-5" style={{ color: "var(--accent-color)" }} />
              +49 152 13154958
            </a>
            <span className="flex items-center gap-2">
              <MapPin className="h-5 w-5" style={{ color: "var(--accent-color)" }} />
              Wolfsburg, Germany
            </span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} Yassin Marmoud. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Built with Next.js, TypeScript, and Tailwind CSS
          </p>
        </div>
      </footer>

      {/* Accent Color Switcher */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative group">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full w-12 h-12 border-border hover:border-foreground"
          >
            <Palette className="h-5 w-5" />
          </Button>
          
          {/* Color Options */}
          <div className="absolute bottom-14 right-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
            <Card className="p-3 border-border">
              <p className="text-xs text-muted-foreground mb-2 text-center">Accent Color</p>
              <div className="flex gap-2">
                {accentColors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => handleAccentChange(color.name)}
                    className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${
                      currentAccent === color.name ? "border-white scale-110" : "border-transparent"
                    }`}
                    style={{ backgroundColor: color.color }}
                    title={color.label}
                  />
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
