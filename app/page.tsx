"use client";

import React, { useState, ReactNode } from 'react';
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  Award,
  Briefcase,
  Star,
  Download,
  MessageCircle,
  ExternalLink,
  Code2,
  User
} from 'lucide-react';
import { motion } from 'framer-motion';
import MusicPlayer from './components/MusicPlayer';

// --- Portfolio Data ---
const portfolioData = {
  name: "ARUNKUMAR R",
  profilePicture: "/arun-profile.jpg",
  resumeUrl: "/ARUNR.pdf",
  summary: "Detail-oriented M.Sc. IT graduate with hands-on experience in designing and deploying full-stack web applications. Proficient in modern technologies like React, Next.js, and Supabase to build user-centric solutions.",
  contact: {
    email: "arunkumarr09032003@gmail.com",
    phone: "+919025604721",
    whatsapp: "+919025604721",
    linkedin: "https://www.linkedin.com/in/your-profile",
    github: "https://github.com/charlie-xo?tab=packages",
  },
  skills: {
    technical: ["Javascript", "React js", "Next.js", "Supabase", "HTML", "CSS", "MySQL", "GitHub", "Vercel"],
    soft: ["Problem Solving", "Detail-oriented", "Team Collaboration", "Adaptability"],
  },
  projects: [
    {
      title: "Uzhavar Sandhai - E-commerce App",
      description: "Developed a full-stack e-commerce platform for farmers. Implemented secure user authentication, dynamic product listing, and order management.",
      tech: ["Next.js", "React", "Supabase"],
      liveLink: "https://uzhavar-sandhai-cbe.vercel.app",
    },
    {
      title: "Notes Web Application",
      description: "Designed and built a secure, private notes application. Implemented robust user authentication to ensure each user's notes are private.",
      tech: ["Next.js", "Supabase"],
      liveLink: "https://notes-project-nine.vercel.app/login",
    },
    {
      title: "Text-to-Image Creation",
      description: "Built an application that integrates with the DALL-E API to generate images from user-provided text descriptions.",
      tech: ["React", "DALL-E API"],
    },
    {
      title: "Ecommerce Website",
      description: "Created a functional e-commerce site using fundamental web technologies focusing on a clean user interface with a MySQL backend.",
      tech: ["HTML", "CSS", "JavaScript", "MySQL"],
    },
  ],
  education: [
    {
      degree: "M.Sc. Information Technology",
      institution: "Hindusthan College of Arts and Science, Coimbatore",
      period: "2023-2025",
      cgpa: "7.9",
    },
    {
      degree: "B.Sc. Information Technology",
      institution: "Erode Arts and Science College, Erode",
      period: "2020-2023",
      cgpa: "7.5",
    },
  ],
};

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
};

// --- Reusable Components ---
const Section = ({ id, title, icon, children }: { id: string; title: string; icon: ReactNode; children: ReactNode }) => (
  <motion.section
    id={id}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
    variants={containerVariants}
    className="py-20 px-6"
  >
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center gap-4 mb-12">
        <div className="p-3 bg-indigo-500/20 rounded-2xl text-indigo-400">
          {icon}
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">{title}</h2>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-indigo-500/50 to-transparent ml-4 hidden md:block" />
      </div>
      {children}
    </div>
  </motion.section>
);

export default function PortfolioPage() {
  const [formData, setFormData] = useState({ name: '', message: '' });

  const sendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const url = `https://wa.me/${portfolioData.contact.whatsapp}?text=Hi Arun, I am ${formData.name}. ${formData.message}`;
    window.open(url, '_blank');
  };

  const sendEmail = () => {
    const mailtoUrl = `mailto:${portfolioData.contact.email}?subject=Inquiry from ${formData.name}&body=${formData.message}`;
    window.location.href = mailtoUrl;
  };

  return (
    <div className="bg-[#030712] min-h-screen font-sans text-gray-300 selection:bg-indigo-500/30 selection:text-white overflow-x-hidden">

      {/* --- Floating Music Player --- */}
      <MusicPlayer />

      {/* --- Hero Section --- */}
      <header className="relative min-h-screen flex items-center justify-center pt-20 pb-10 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent -z-10" />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl text-center"
        >
          <div className="relative inline-block mb-8">
            <motion.img
              initial={{ rotate: -10 }}
              animate={{ rotate: 0 }}
              src={portfolioData.profilePicture}
              alt={portfolioData.name}
              className="w-44 h-44 md:w-52 md:h-52 rounded-[2.5rem] mx-auto ring-2 ring-indigo-500/30 shadow-[0_0_50px_-12px_rgba(99,102,241,0.5)] object-cover"
              onError={(e) => { e.currentTarget.src = 'https://placehold.co/200x200/1e293b/818cf8?text=AR'; }}
            />
            <div className="absolute -bottom-2 -right-2 bg-indigo-600 p-3 rounded-2xl shadow-xl">
              <Code2 size={24} className="text-white" />
            </div>
          </div>

          <motion.h1
            className="text-6xl md:text-8xl font-black mb-6 text-white tracking-tighter"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {portfolioData.name.split(' ')[0]} <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">{portfolioData.name.split(' ')[1]}</span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {portfolioData.summary}
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-5"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <motion.a
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(79, 70, 229, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              href={portfolioData.resumeUrl}
              className="flex items-center gap-2 bg-white text-black px-10 py-4 rounded-2xl font-bold transition-all"
            >
              <Download size={20} /> Resume
            </motion.a>

            <div className="flex items-center gap-3 bg-gray-900/80 backdrop-blur-md p-2 px-4 rounded-2xl border border-gray-800">
              {[
                { icon: <Github size={22} />, link: portfolioData.contact.github },
                { icon: <Linkedin size={22} />, link: portfolioData.contact.linkedin },
                { icon: <Mail size={22} />, link: `mailto:${portfolioData.contact.email}` }
              ].map((social, i) => (
                <a key={i} href={social.link} className="hover:text-indigo-400 transition-colors p-2 text-gray-400" target="_blank" rel="noopener noreferrer">
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </header>

      <main className="pb-20">

        {/* --- Skills --- */}
        <Section id="skills" title="Expertise" icon={<Star size={28} />}>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div variants={itemVariants} className="group bg-gray-900/40 p-8 rounded-[2rem] border border-gray-800 hover:border-indigo-500/50 transition-all duration-500 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Code2 size={20} className="text-indigo-400" /> Technical Stack
              </h3>
              <div className="flex flex-wrap gap-3">
                {portfolioData.skills.technical.map(skill => (
                  <span key={skill} className="px-4 py-2 bg-indigo-500/5 text-indigo-300 rounded-xl border border-indigo-500/20 text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="group bg-gray-900/40 p-8 rounded-[2rem] border border-gray-800 hover:border-cyan-500/50 transition-all duration-500 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <User size={20} className="text-cyan-400" /> Professional Qualities
              </h3>
              <div className="flex flex-wrap gap-3">
                {portfolioData.skills.soft.map(skill => (
                  <span key={skill} className="px-4 py-2 bg-cyan-500/5 text-cyan-300 rounded-xl border border-cyan-500/20 text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </Section>

        {/* --- Projects --- */}
        <Section id="projects" title="Featured Work" icon={<Briefcase size={28} />}>
          <div className="grid md:grid-cols-2 gap-8">
            {portfolioData.projects.map((project, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="group relative bg-gray-900/50 p-8 rounded-[2.5rem] border border-gray-800 flex flex-col overflow-hidden transition-all"
              >
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Briefcase size={80} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-indigo-400 transition-colors">{project.title}</h3>
                <p className="text-gray-400 leading-relaxed mb-8 flex-1">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map(t => <span key={t} className="text-xs uppercase tracking-widest text-gray-500 font-bold">{t}</span>)}
                </div>
                {project.liveLink && (
                  <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white font-bold group/link">
                    Explore Project <ExternalLink size={16} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </Section>

        {/* --- Education --- */}
        <Section id="education" title="Education" icon={<Award size={28} />}>
          <div className="space-y-6">
            {portfolioData.education.map((edu, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative pl-8 border-l-2 border-indigo-500/30 py-4"
              >
                <div className="absolute w-4 h-4 bg-[#030712] border-2 border-indigo-500 rounded-full -left-[9px] top-6" />
                <span className="text-indigo-400 font-mono text-sm">{edu.period}</span>
                <h3 className="text-2xl font-bold text-white mt-1">{edu.degree}</h3>
                <p className="text-gray-400 mt-1">{edu.institution}</p>
                <div className="inline-block mt-3 px-3 py-1 bg-gray-800 rounded-lg text-sm text-indigo-300 font-bold">
                  CGPA: {edu.cgpa}
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* --- Contact --- */}
        <Section id="contact" title="Get In Touch" icon={<MessageCircle size={28} />}>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10 items-start">
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-2xl font-bold text-white">Let&apos;s build something amazing together.</h3>
              <p className="text-gray-400">Feel free to reach out for collaborations or just a friendly hello!</p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors">
                  <div className="p-3 bg-gray-900 rounded-xl"><Mail size={20} /></div>
                  <span>{portfolioData.contact.email}</span>
                </div>
                <div className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors">
                  <div className="p-3 bg-gray-900 rounded-xl"><Phone size={20} /></div>
                  <span>{portfolioData.contact.phone}</span>
                </div>
              </div>
            </motion.div>

            <motion.form
              variants={itemVariants}
              onSubmit={sendWhatsApp}
              className="bg-gray-900/60 p-8 rounded-[2rem] border border-gray-800 shadow-2xl space-y-4"
            >
              <input
                type="text"
                placeholder="Name"
                required
                className="w-full bg-[#030712] border border-gray-800 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <textarea
                placeholder="How can I help you?"
                rows={4}
                required
                className="w-full bg-[#030712] border border-gray-800 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              ></textarea>

              <div className="grid grid-cols-2 gap-4">
                <button type="submit" className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-4 rounded-2xl transition-all shadow-lg text-sm">
                  <MessageCircle size={18} /> WhatsApp
                </button>
                <button type="button" onClick={sendEmail} className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-2xl transition-all shadow-lg text-sm">
                  <Mail size={18} /> Gmail
                </button>
              </div>
            </motion.form>
          </div>
        </Section>
      </main>

      <footer className="py-12 text-center border-t border-gray-900">
        <p className="text-gray-500 text-sm font-medium">&copy; {new Date().getFullYear()} {portfolioData.name} • Designed for Excellence</p>
      </footer>
    </div>
  );
}