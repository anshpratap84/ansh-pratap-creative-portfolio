/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Services } from './components/Services';
import { Toolkit } from './components/Toolkit';
import { Experience } from './components/Experience';
import { Certifications } from './components/Certifications';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ServiceInquiryModal } from './components/ServiceInquiryModal';
import { Marquee } from './components/Marquee';
import { VideoModal } from './components/VideoModal';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { BackToTop } from './components/BackToTop';
import { SectionDivider } from './components/SectionDivider';
import { CinematicSectionReveal } from './components/CinematicSectionReveal';
import { useSectionSEO } from './hooks/useSectionSEO';

export default function App() {
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [selectedInquiryService, setSelectedInquiryService] = useState<string | undefined>(undefined);
  const [activeCertId, setActiveCertId] = useState<string | null>(null);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  // Dynamic SEO Hook: updates title, meta description, and social graph tags as user explores sections
  useSectionSEO();

  const handleOpenInquiry = (serviceName?: string) => {
    setSelectedInquiryService(serviceName);
    setInquiryModalOpen(true);
  };

  const handleSelectCertificateFromExperience = (certId: string) => {
    setActiveCertId(certId);
    // Smooth scroll to certifications
    const element = document.getElementById('credentials');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#111318] text-stone-900 dark:text-[#F3F1EA] flex flex-col font-sans transition-colors duration-300 selection:bg-emerald-300/40 dark:selection:bg-[#C6F36B]/30 selection:text-stone-950 dark:selection:text-[#C6F36B] relative">
        {/* Cinematic Custom Cursor with Contextual States */}
        <CustomCursor />

        {/* Spring Scroll Progress Bar & Floating Chapter Status Indicator */}
        <ScrollProgressBar />

        {/* Top Navigation */}
        <Navbar onOpenInquiry={handleOpenInquiry} />

        {/* Main Content Sections */}
        <main className="flex-1">
          <Hero
            onOpenInquiry={handleOpenInquiry}
            onPlayShowreel={() => setVideoModalOpen(true)}
          />

          {/* Kinetic Horizontal Ribbon 1 */}
          <Marquee speed={32} />

          {/* Primary Section 02: About Ansh */}
          <CinematicSectionReveal delay={0.04} slideDistance={40}>
            <About />
          </CinematicSectionReveal>

          {/* Subtle Animated Decorative Divider: About -> Projects */}
          <SectionDivider
            variant="glow-line"
            accentFlavor="emerald"
            centerBadge="03 / WORK"
          />

          {/* Primary Section 03: Projects */}
          <CinematicSectionReveal delay={0.04} slideDistance={45}>
            <Projects
              onOpenInquiry={handleOpenInquiry}
              onPlayVideo={() => setVideoModalOpen(true)}
            />
          </CinematicSectionReveal>

          {/* Subtle Animated Decorative Divider: Projects -> Services */}
          <SectionDivider
            variant="beam"
            accentFlavor="emerald"
            centerBadge="04 / SERVICES"
          />

          {/* Primary Section 04: Services */}
          <CinematicSectionReveal delay={0.04} slideDistance={45}>
            <Services onOpenInquiry={handleOpenInquiry} />
          </CinematicSectionReveal>

          {/* Subtle Animated Decorative Divider: Services -> Toolkit */}
          <SectionDivider
            variant="geometric"
            accentFlavor="cyan"
            centerBadge="05 / TECH STACK"
          />

          {/* Primary Section 05: Toolkit */}
          <CinematicSectionReveal delay={0.04} slideDistance={45}>
            <Toolkit />
          </CinematicSectionReveal>

          {/* Kinetic Horizontal Ribbon 2 */}
          <Marquee
            text="VISUAL STORYTELLING · AUDIO DESIGN · MOTION GRAPHICS · GENAI EXPERIMENTATION · COLOR GRADING · BRAND CRAFT ·"
            speed={28}
          />

          {/* Subtle Animated Decorative Divider: Marquee -> Experience */}
          <SectionDivider
            variant="flow"
            accentFlavor="amber"
            centerBadge="06 / EXPERIENCE"
          />

          {/* Primary Section 06: Experience */}
          <CinematicSectionReveal delay={0.04} slideDistance={45}>
            <Experience
              onSelectCertificate={handleSelectCertificateFromExperience}
              onPlayVideo={() => setVideoModalOpen(true)}
            />
          </CinematicSectionReveal>

          {/* Subtle Animated Decorative Divider: Experience -> Certifications */}
          <SectionDivider
            variant="glow-line"
            accentFlavor="emerald"
            centerBadge="07 / CREDENTIALS"
          />

          {/* Primary Section 07: Certifications */}
          <CinematicSectionReveal delay={0.04} slideDistance={45}>
            <Certifications
              selectedCertId={activeCertId}
              onClearSelectedCert={() => setActiveCertId(null)}
            />
          </CinematicSectionReveal>

          {/* Subtle Animated Decorative Divider: Certifications -> Contact */}
          <SectionDivider
            variant="beam"
            accentFlavor="pink"
            centerBadge="08 / COLLABORATION"
          />

          {/* Primary Section 08: Contact */}
          <CinematicSectionReveal delay={0.04} slideDistance={45}>
            <Contact />
          </CinematicSectionReveal>
        </main>

        {/* Footer */}
        <Footer />

        {/* Floating Back To Top HUD with Radial Progress & Tactile Sound Toggle */}
        <BackToTop />

        {/* Interactive Service Inquiry Modal */}
        <ServiceInquiryModal
          isOpen={inquiryModalOpen}
          onClose={() => setInquiryModalOpen(false)}
          defaultService={selectedInquiryService}
        />

        {/* Global Video Modal for Stop Cyberbullying Project */}
        <VideoModal
          isOpen={videoModalOpen}
          onClose={() => setVideoModalOpen(false)}
          videoSrc="/assets/aistudio/Stop_Cyberbulling_dbaeb017_web.mp4"
          title="Stop Cyberbullying Awareness Video"
          subtitle="iStudio Video Editing Internship Final Project (50–60s)"
        />
      </div>
    </ThemeProvider>
  );
}
