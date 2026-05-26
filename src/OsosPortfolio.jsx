import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionTemplate, useSpring } from 'framer-motion';
import ActiveLearningProject from './ActiveLearningProject';

const revealVariants = {
  hidden: { y: "100%", opacity: 0 },
  visible: (i) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.1,
      duration: 1,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export default function OsosPortfolio() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();

  return (
    <div ref={containerRef}>
      <div className="noise-overlay"></div>

      <nav className="nav-bar">
        <div className="nav-logo">BB.</div>

        {/* Live Project Blinker */}
        <div className="live-badge-container">
          <motion.div
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ width: '8px', height: '8px', backgroundColor: '#4ade80', borderRadius: '50%', boxShadow: '0 0 10px #4ade80' }}
          />
          <span style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: '#f6f4f0' }}>Live Project</span>

          <div className="live-tooltip" style={{
            position: 'absolute', top: '2rem', right: 0, width: '250px',
            backgroundColor: '#1a1a1a', padding: '1rem', borderRadius: '10px',
            border: '1px solid #333', color: '#f6f4f0', opacity: 0, visibility: 'hidden',
            transition: 'opacity 0.2s, visibility 0.2s', zIndex: 100,
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
          }}>
            <p style={{ fontSize: '0.8rem', color: '#4ade80', marginBottom: '0.5rem', fontWeight: 600 }}>CURRENTLY BUILDING</p>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.4 }}>Hardcoding a Machine Learning Chess Engine from scratch in Python to master ML fundamentals.</p>
          </div>
        </div>

        <div className="nav-contact">
          <span>+91 89491 92672</span>
          <span>bhavik2k4@gmail.com</span>
        </div>
      </nav>

      <StickyHero />

      {/* Intro Section */}
      <section className="section" style={{ alignItems: 'center', textAlign: 'center', minHeight: '80vh', zIndex: 4, position: 'relative', backgroundColor: 'var(--bg-color)' }}>
        <motion.p
          className="text-body"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1 }}
          style={{ fontSize: '1.8rem', maxWidth: '1000px', lineHeight: 1.5 }}
        >
          Results-driven COO, Operations Lead, and Vibe Coder with 2 years of experience managing creative operations, technical projects, and client relations. While I started with a strong foundation in Vibe Coding to build rapid solutions, I am currently actively transitioning into rigorous <strong>hardcoding</strong>—diving deep into Python and Machine Learning fundamentals from scratch.

        </motion.p>

        {/* Core Skills Summary */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
          style={{ marginTop: '3rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '800px' }}
        >
          {['Python', 'C/C++', 'MySQL', 'Vibe Coding', 'Machine Learning', 'AI', 'Team Management', 'Client Relations', 'Business Operations'].map(skill => (
            <span key={skill} style={{ padding: '10px 20px', border: '1px solid var(--text-color)', borderRadius: '30px', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase' }}>
              {skill}
            </span>
          ))}
        </motion.div>
      </section>

      {/* Experience Section */}
      <ExperienceSection />

      {/* Horizontal Projects Section */}
      <HorizontalProjects />

      {/* Vibe Coding Lab */}
      <TransitionBridge />
      <VibeCodingLab />

      {/* Active Learning Project */}
      <ActiveLearningProject />

      {/* Education & Certifications Section */}
      <section className="section" style={{ minHeight: '100vh', backgroundColor: 'var(--bg-color)', zIndex: 4, position: 'relative', padding: '15vh 10vw' }}>
        <h1 className="text-large" style={{ marginBottom: '4rem' }}>05. ACADEMICS &amp; CERTIFICATIONS</h1>

        <div className="grid-2-col">
          {/* Education */}
          <div>
            <h2 style={{ fontSize: '2rem', marginBottom: '2rem', borderBottom: '2px solid var(--text-color)', paddingBottom: '1rem' }}>Education</h2>

            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>B.Tech / B.E. in Computer Science</h3>
              <p className="text-body" style={{ color: '#555', marginTop: '0.5rem' }}>Geetanjali University, Udaipur | Apr 2023 – Present</p>
              <p style={{ fontWeight: 600, marginTop: '0.5rem' }}>CGPA: 8.5</p>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>12th Grade (CBSE)</h3>
              <p className="text-body" style={{ color: '#555', marginTop: '0.5rem' }}>Kendriya Vidhyalya No. 1, Udaipur | Passed 2023</p>
              <p style={{ fontWeight: 600, marginTop: '0.5rem' }}>Score: 88%</p>
            </div>

            <div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>10th Grade (CBSE)</h3>
              <p className="text-body" style={{ color: '#555', marginTop: '0.5rem' }}>Central Public School, Udaipur | Passed 2021</p>
              <p style={{ fontWeight: 600, marginTop: '0.5rem' }}>Score: 83%</p>
            </div>
          </div>

          {/* Certifications & Volunteer */}
          <div>
            <h2 style={{ fontSize: '2rem', marginBottom: '2rem', borderBottom: '2px solid var(--text-color)', paddingBottom: '1rem' }}>Certifications &amp; Volunteer</h2>

            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>AI and ML Learning Program</h3>
              <p className="text-body" style={{ color: '#555', marginTop: '0.5rem' }}>Grras Solutions | Oct 2025</p>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Agentic AI: From Learner to Builder</h3>
              <p className="text-body" style={{ color: '#555', marginTop: '0.5rem' }}>IBM SkillsBuild &amp; CSRBOX | Aug 2025</p>
            </div>

            <div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Scientific Volunteer</h3>
              <p className="text-body" style={{ color: '#555', marginTop: '0.5rem' }}>DAE Platinum Jubilee Plasma Exhibition (IPR) | Apr 2024</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="section" style={{ minHeight: '60vh', alignItems: 'center', backgroundColor: '#111', color: '#f6f4f0', zIndex: 4, position: 'relative' }}>
        <motion.h1
          className="text-huge"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          LET'S CREATE
        </motion.h1>

        <div className="footer-links">
          <a
            href="mailto:bhavik2k4@gmail.com"
            style={{
              padding: '1.5rem 4rem',
              borderRadius: '50px',
              border: '1px solid #f6f4f0',
              color: '#f6f4f0',
              textDecoration: 'none',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              fontWeight: 500
            }}
          >
            Contact Me
          </a>
          <a
            href="https://linkedin.com/in/bhavik-bhardwaj-3b0b0a278"
            target="_blank"
            rel="noreferrer"
            style={{
              padding: '1.5rem 4rem',
              borderRadius: '50px',
              border: '1px solid #f6f4f0',
              color: '#111',
              backgroundColor: '#f6f4f0',
              textDecoration: 'none',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              fontWeight: 600
            }}
          >
            LinkedIn
          </a>
        </div>
      </section>
    </div>
  );
}

function StickyHero() {
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });

  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const portraitScale = useTransform(scrollYProgress, [0, 0.8], [0.9, 1.1]);
  const portraitY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <section ref={targetRef} style={{ height: '300vh', position: 'relative' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

        {/* Layer 1: Background Typography */}
        <motion.div style={{ position: 'absolute', zIndex: 1, opacity: textOpacity, scale: textScale, textAlign: 'center', width: '100%' }}>
          <div style={{ overflow: 'hidden', display: 'flex', justifyContent: 'center' }}>
            <motion.h1 className="text-huge" custom={0} initial="hidden" animate="visible" variants={revealVariants}>
              BHAVIK
            </motion.h1>
          </div>
          <div style={{ overflow: 'hidden', display: 'flex', justifyContent: 'center', marginTop: '-4vw' }}>
            <motion.h1 className="text-huge text-outline" custom={1} initial="hidden" animate="visible" variants={revealVariants}>
              BHARDWAJ
            </motion.h1>
          </div>
        </motion.div>

        {/* Layer 2: The Portrait Image */}
        <motion.div
          style={{
            position: 'absolute', bottom: 0, zIndex: 2, scale: portraitScale, y: portraitY,
            width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', pointerEvents: 'none'
          }}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        >
          <div style={{ position: 'relative', height: '85vh', display: 'inline-block', pointerEvents: 'auto' }}>
            <img
              src="portrait.png"
              alt="Portrait"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop";
              }}
              style={{
                height: '100%', width: 'auto', objectFit: 'contain', objectPosition: 'bottom',
                maskImage: 'linear-gradient(to top, transparent 0%, black 15%)',
                WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 15%)',
              }}
            />

            {/* Minimalist Tea Marker (Mobile Optimized) */}
            <div style={{ position: 'absolute', top: '70%', left: '71%', zIndex: 10 }}>

              {/* Sleek Text Pointer (Points to the LEFT, over the dark suit to avoid mobile overflow) */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2, duration: 0.8, ease: "easeOut" }}
                style={{
                  position: 'absolute',
                  bottom: '-8px',
                  right: '25px', /* Pushes the text to the left side of the dot */
                  color: '#f6f4f0',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  whiteSpace: 'nowrap',
                  pointerEvents: 'none'
                }}
              >
                <span style={{ opacity: 0.8 }}>Fuel to keep me active 24/7</span>
                {/* Connecting horizontal line */}
                <div style={{ width: '40px', height: '1px', backgroundColor: 'rgba(246, 244, 240, 0.4)' }}></div>
              </motion.div>

              {/* Pulsing indicator dot (Pinned exactly to cup) */}
              <div style={{ position: 'absolute', display: 'flex', justifyContent: 'center', alignItems: 'center', transform: 'translate(-50%, -50%)' }}>
                <motion.div
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  style={{ width: '10px', height: '10px', backgroundColor: '#E07A5F', borderRadius: '50%' }}
                />
              </div>

            </div>
          </div>
        </motion.div>

        {/* Layer 3: Foreground Subtitle */}
        <motion.div
          className="hero-subtitle"
          style={{ position: 'absolute', bottom: '10%', right: '10%', zIndex: 3, opacity: textOpacity }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          <p className="text-body" style={{ fontWeight: 600, maxWidth: '200px', textAlign: 'right' }}>
            VIBE CODER &<br />OPERATIONS LEAD
          </p>
          <p className="text-body" style={{ marginTop: '1rem', fontWeight: 400, maxWidth: '200px', textAlign: 'right', fontSize: '0.8rem', color: '#555' }}>
            Udaipur, Rajasthan<br />Willing to relocate: Anywhere
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // Apply a spring physics layer to make the scroll feel incredibly smooth and eliminate lag
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Smoother, more continuous mapping so it doesn't feel 'stuck' in the middle
  const y = useTransform(smoothProgress, [0, 0.3, 0.7, 1], ['100vh', '25vh', '-25vh', '-100vh']);
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={targetRef} style={{ position: 'relative', height: '400vh', zIndex: 4, backgroundColor: 'var(--bg-color)' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', alignItems: 'center', padding: '0 5vw', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '5%', transform: 'translateY(-50%)', zIndex: 1, pointerEvents: 'none' }}>
          <h1 className="text-huge text-outline" style={{ opacity: 0.2 }}>EXPERIENCE</h1>
        </div>
        
        <motion.div style={{ y, opacity, zIndex: 2, marginLeft: 'auto', maxWidth: '600px', backgroundColor: 'var(--bg-color)', padding: '2rem' }}>
          <h2 className="text-large" style={{ marginBottom: '1rem', color: 'var(--accent-color)' }}>01.</h2>
          <h3 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', lineHeight: 1.1 }}>COO</h3>
          <h4 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#333' }}>The Popular Company (Feb 2025 – Mar 2026)</h4>
          
          <ul style={{ paddingLeft: '1.5rem', fontSize: '1.25rem', lineHeight: 1.6, color: '#555' }}>
            <li style={{ marginBottom: '1rem' }}>Scaled a creative house, actively overseeing day-to-day business operations, team management, and client relations as the primary face of the company.</li>
            <li>Served as lead Web Developer, successfully building, deploying, and maintaining client websites including <strong>thepopularcompany.com</strong>, <strong>foundicnetwork.com</strong>, and <strong>numberscart.com</strong>.</li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

function HorizontalProjects() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Calculate X translation based on the number of cards. 
  // We have 5 project cards + 1 intro panel.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-85%"]);

  return (
    <section ref={targetRef} style={{ position: 'relative', height: '500vh', backgroundColor: '#111', zIndex: 4 }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>

        {/* Timeline Connector Line (Background) */}
        <div style={{ position: 'absolute', top: '50%', left: 0, width: '100vw', height: '2px', backgroundColor: '#333', zIndex: 0 }}></div>

        <motion.div style={{ x, display: 'flex', gap: '10vw', padding: '0 10vw', zIndex: 1 }}>

          {/* Intro Panel */}
          <div style={{ width: '80vw', flexShrink: 0, color: '#f6f4f0', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h1 className="text-huge text-outline" style={{ WebkitTextStrokeColor: '#f6f4f0', opacity: 0.5 }}>02.</h1>
            <h1 className="text-large">PROJECTS</h1>
            <p className="text-body" style={{ marginTop: '2rem', maxWidth: '400px' }}>Scroll horizontally to journey through my technical innovations, machine learning experiments, and future AI ambitions.</p>
          </div>

          <ProjectCard
            title="Eye Tracking Control"
            desc="Engineered an accessibility system mapping eye movements and blink clicks to control computer navigation."
            imgSrc="eye.png"
            status="COMPLETED"
          />
          <ProjectCard
            title="Pitch Analytics ML"
            desc="Developed a machine learning application designed to track and analyze football movements on the pitch."
            imgSrc="football.png"
            status="COMPLETED"
          />
          <ProjectCard
            title="Shows Watchlist System"
            desc="Created a database application utilizing Python and MySQL to efficiently manage media consumption."
            imgSrc="watchlist.png"
            status="COMPLETED"
          />
          <ProjectCard
            title="Machine Learning Chess"
            desc="Currently building a chess engine from scratch. Training an ML model to act as my opponent to master Python and Machine Learning fundamentals."
            imgSrc="chess.png"
            status="CURRENTLY BUILDING"
            link="https://github.com/FdeankCrual/Learning_stay_tuned"
            linkText="View on GitHub"
          />
          <ProjectCard
            title="Jarvis Assistant Vision"
            desc="Upcoming project: A natural language AI assistant that understands context and reacts intelligently to facial and hand gestures via camera vision."
            imgSrc="jarvis.png"
            status="FUTURE PROJECT"
          />

        </motion.div>

      </div>
    </section>
  );
}

function ProjectCard({ title, desc, imgSrc, status, link, linkText }) {
  return (
    <div className="project-card" style={{
      height: '60vh',
      flexShrink: 0,
      backgroundColor: '#1a1a1a',
      borderRadius: '20px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      color: '#f6f4f0',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
    }}>
      {/* Background Image Layer */}
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
        backgroundImage: `url(${imgSrc})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: 0
      }}></div>

      {/* Dark Gradient Overlay for text readability */}
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
        background: 'linear-gradient(to top, rgba(17,17,17,1) 0%, rgba(17,17,17,0.8) 40%, rgba(17,17,17,0) 100%)',
        zIndex: 1
      }}></div>

      {/* Timeline Node Connector */}
      <div style={{
        position: 'absolute', top: '50%', left: '-10vw', width: '10vw', height: '2px', backgroundColor: '#E07A5F', zIndex: 2
      }}></div>
      <div style={{
        position: 'absolute', top: 'calc(50% - 6px)', left: '-6px', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#E07A5F', zIndex: 3
      }}></div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <p style={{ fontSize: '0.8rem', letterSpacing: '2px', color: '#E07A5F', fontWeight: 600, marginBottom: '1rem' }}>{status}</p>
        <h2 style={{ fontSize: '3rem', marginBottom: '1rem', lineHeight: 1.1 }}>{title}</h2>
        <p className="text-body" style={{ color: '#ccc', maxWidth: '600px', marginBottom: link ? '2rem' : '0' }}>{desc}</p>

        {link && (
          <a href={link} target="_blank" rel="noreferrer" style={{
            display: 'inline-block',
            padding: '1rem 2.5rem',
            border: '1px solid #f6f4f0',
            borderRadius: '30px',
            color: '#f6f4f0',
            textDecoration: 'none',
            textTransform: 'uppercase',
            fontSize: '0.9rem',
            fontWeight: 500,
            transition: 'background-color 0.3s, color 0.3s'
          }}
            onMouseEnter={(e) => { e.target.style.backgroundColor = '#f6f4f0'; e.target.style.color = '#111'; }}
            onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#f6f4f0'; }}
          >
            {linkText}
          </a>
        )}
      </div>
    </div>
  );
}

// ─── VIBE CODING LAB ────────────────────────────────────────────────────

const PROJECTS = [
  {
    id: 'tpc',
    number: '01',
    name: 'The Popular Company',
    tagline: 'Premium Digital Agency',
    url: 'https://thepopularcompany.com',
    year: '2025–2026',
    role: 'Lead Dev + COO',
    palette: { bg: '#0d0d0d', accent: '#E07A5F', glow: 'rgba(224,122,95,0.25)', text: '#f6f4f0' },
    tags: ['React', 'Framer Motion', 'Custom CSS', 'Deployment'],
    summary: 'The flagship digital identity of a creative agency. As both COO and Lead Developer, I architected and shipped the entire frontend from scratch—premium aesthetics, fluid micro-animations, and a fully bespoke visual system that positioned TPC at the top of its market.',
    stats: [{ label: 'Role', val: 'COO + Dev' }, { label: 'Status', val: 'Live' }, { label: 'Type', val: 'Agency' }],
  },
  {
    id: 'welocity',
    number: '02',
    name: 'Welocity Genetics (Advanced)',
    tagline: 'Genomic Wellness Platform',
    url: './websites/welocity/index.html',
    year: '2025',
    role: 'Full Stack Dev',
    palette: { bg: '#030712', accent: '#38bdf8', glow: 'rgba(56,189,248,0.2)', text: '#f8fafc' },
    tags: ['Three.js', 'TailwindCSS', 'WebGL Particles', 'Dark Mode'],
    summary: 'An advanced genomic wellness landing page with a live Three.js particle system that morphs between DNA helixes, spheres, and molecular tori as the user scrolls. Built to make hard science feel beautiful and approachable for India\'s growing wellness market.',
    stats: [{ label: 'Tech', val: 'Three.js + Tailwind' }, { label: 'Status', val: 'Live' }, { label: 'Sector', val: 'HealthTech' }],
  },
  {
    id: 'foundic',
    number: '03',
    name: 'Foundic Network',
    tagline: 'Execution-Driven Startup Consulting',
    url: 'https://foundicnetwork.com',
    year: '2025',
    role: 'Lead Web Developer',
    palette: { bg: '#0a1628', accent: '#14b8a6', glow: 'rgba(20,184,166,0.2)', text: '#f0fdfa' },
    tags: ['Custom CSS', 'Vanilla JS', 'SEO', 'Schema Markup'],
    summary: 'A bold, founder-focused platform that bridges the gap between startup advice and real execution. Built an animated services roadmap, founder profiles, WhatsApp community integrations, and a fully optimized SEO structure with JSON-LD schema markup—zero frameworks, pure code.',
    stats: [{ label: 'Stack', val: 'Vanilla JS + CSS' }, { label: 'Status', val: 'Live' }, { label: 'Sector', val: 'B2B SaaS' }],
  },
  {
    id: 'wignet',
    number: '04',
    name: 'WIGNET Institute',
    tagline: 'Genomic Wellness Education',
    url: './websites/wignet/index.html',
    year: '2024',
    role: 'Frontend Developer',
    palette: { bg: '#1c1917', accent: '#0d9488', glow: 'rgba(13,148,136,0.2)', text: '#fafaf9' },
    tags: ['Tailwind CSS', 'Playfair Display', 'Lucide Icons', 'Multi-page'],
    summary: 'A premium multi-page institute website for India\'s first Certificate Course in Nutritional Genomics. Features organic card hover animations, animated blob backgrounds, floating social proof cards, and a comprehensive footer system. Designed around the philosophy of making advanced science feel warm.',
    stats: [{ label: 'Pages', val: '5+ Pages' }, { label: 'Status', val: 'Live' }, { label: 'Sector', val: 'EdTech' }],
  },
  {
    id: 'hines',
    number: '05',
    name: 'Hines Real Estate (V2)',
    tagline: 'Global Real Estate Platform',
    url: './websites/hines/index.html',
    year: '2024',
    role: 'Frontend Developer',
    palette: { bg: '#0f0f0f', accent: '#6366f1', glow: 'rgba(99,102,241,0.2)', text: '#f8fafc' },
    tags: ['Custom CSS', 'Vanilla JS', 'SVG Maps', 'Counter Animations'],
    summary: 'A replica and redesign study of the Hines Global Real Estate platform. Features a 3D building hero with parallax tilt interaction, animated statistics counters that fire on scroll, an interactive project modal system, and a live SVG world map with geo-pins marking 30+ countries.',
    stats: [{ label: 'AUM', val: '$91.8B+' }, { label: 'Type', val: 'UI Study' }, { label: 'Sector', val: 'Real Estate' }],
  },
  {
    id: 'hines-v1',
    number: '06',
    name: 'Hines Real Estate (V1)',
    tagline: 'Architectural Minimalist Study',
    url: './websites/hines-v1/index.html',
    year: '2024',
    role: 'Frontend Developer',
    palette: { bg: '#1a1a1a', accent: '#c6a87c', glow: 'rgba(198,168,124,0.2)', text: '#ffffff' },
    tags: ['Architecture UI', 'CSS Grid', 'Minimalism', 'Vanilla JS'],
    summary: 'The initial version of the Hines UI study focusing heavily on architectural minimalism. Uses a restrained gold and charcoal palette with strict grid alignments to emphasize premium property imagery.',
    stats: [{ label: 'Focus', val: 'Grid Layouts' }, { label: 'Type', val: 'Concept' }, { label: 'Sector', val: 'Real Estate' }],
  },
];

function TransitionBridge() {
  return (
    <section style={{ height: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 5, backgroundColor: '#0d0d0d' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ margin: "-100px", once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ textAlign: 'center', padding: '0 5vw' }}
      >
        <p style={{ fontFamily: 'monospace', fontSize: '0.9rem', letterSpacing: '4px', color: '#E07A5F', textTransform: 'uppercase', marginBottom: '2rem' }}>
          03 // Execution over Theory
        </p>
        <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)', fontWeight: 800, color: '#f6f4f0', lineHeight: 1.1, letterSpacing: '-0.03em' }}>
          BUT WHAT ABOUT<br/>
          <span style={{ color: 'transparent', WebkitTextStroke: '2px rgba(246,244,240,0.5)' }}>REAL DEPLOYMENTS?</span>
        </h2>
        <p style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: 'rgba(246,244,240,0.6)', marginTop: '2.5rem', maxWidth: '650px', marginInline: 'auto', lineHeight: 1.8 }}>
          Keep scrolling. No templates. No safety nets. Just raw vibe-coded precision shipped under pressure for real clients.
        </p>
      </motion.div>
    </section>
  );
}

const VibeCard = ({ i, n, progress, ...proj }) => {
  // Parallax shrink and translate for cards to create a "stacked file" look
  const targetScale = 1 - ((n - 1 - i) * 0.05);
  const scale = useTransform(progress, [i / n, 1], [1, targetScale]);
  
  // Offset Y so older cards move up and peek out from behind newer cards
  const targetY = -((n - 1 - i) * 25);
  const y = useTransform(progress, [i / n, 1], [0, targetY]);

  return (
    <div style={{ 
      position: 'sticky', top: 0, height: '100vh', 
      display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
      padding: '15vh 4vw 0 4vw' // Increased top padding to push the entire stack lower into the center
    }}>
      <motion.div style={{ 
        scale, y,
        transformOrigin: 'top center',
        width: '100%', maxWidth: '1000px', maxHeight: '85vh',
        background: proj.palette.bg,
        border: `1px solid ${proj.palette.accent}33`,
        borderTop: `2px solid ${proj.palette.accent}80`, // Highlight top edge for the file stack effect
        borderRadius: '24px', padding: 'clamp(1.5rem, 3vw, 2rem)',
        position: 'relative', overflow: 'hidden',
        boxShadow: `0 -10px 40px rgba(0,0,0,0.5), 0 20px 80px ${proj.palette.glow}`,
        display: 'flex', flexWrap: 'wrap', gap: 'clamp(1rem, 2vw, 2rem)', alignItems: 'center'
      }}>
        {/* Internal Ambient Glow */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: '120%', height: '120%',
          background: `radial-gradient(ellipse at center, ${proj.palette.glow} 0%, transparent 50%)`,
          pointerEvents: 'none', zIndex: 0
        }} />

        {/* Number watermark */}
        <div style={{
          position: 'absolute', top: '-1rem', right: '1rem',
          fontSize: 'clamp(6rem, 15vw, 12rem)', fontWeight: 900, lineHeight: 1,
          color: 'transparent', WebkitTextStroke: `1px ${proj.palette.accent}20`,
          letterSpacing: '-0.05em', pointerEvents: 'none', userSelect: 'none', zIndex: 0
        }}>
          {proj.number}
        </div>

        {/* Left Content */}
        <div style={{ position: 'relative', zIndex: 1, flex: '1 1 450px' }}>
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
            <span style={{
              padding: '4px 10px', borderRadius: '20px',
              background: `${proj.palette.accent}15`,
              border: `1px solid ${proj.palette.accent}40`,
              fontSize: '0.65rem', fontWeight: 700, fontFamily: 'monospace',
              color: proj.palette.accent, letterSpacing: '1px', textTransform: 'uppercase',
            }}>
              {proj.role}
            </span>
            <span style={{ fontSize: '0.7rem', color: 'rgba(246,244,240,0.4)', fontFamily: 'monospace' }}>
              {proj.year}
            </span>
          </div>

          <p style={{ fontSize: '0.75rem', letterSpacing: '3px', textTransform: 'uppercase', color: proj.palette.accent, marginBottom: '0.5rem', fontFamily: 'monospace' }}>
            {proj.tagline}
          </p>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.8rem)', fontWeight: 800, color: proj.palette.text, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '1rem' }}>
            {proj.name}
          </h2>

          <p style={{ fontSize: 'clamp(0.85rem, 1.5vw, 0.95rem)', lineHeight: 1.6, color: 'rgba(246,244,240,0.65)', marginBottom: '1.5rem' }}>
            {proj.summary}
          </p>

          {/* Stats strip */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '1.5rem', paddingTop: '1rem', borderTop: `1px solid ${proj.palette.accent}20` }}>
            {proj.stats.map(s => (
              <div key={s.label}>
                <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'rgba(246,244,240,0.4)', fontFamily: 'monospace', marginBottom: '0.2rem' }}>{s.label}</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: proj.palette.text }}>{s.val}</div>
              </div>
            ))}
          </div>

          {/* Tech Tags */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            {proj.tags.map(t => (
              <span key={t} style={{
                padding: '4px 10px', borderRadius: '6px',
                border: `1px solid rgba(246,244,240,0.08)`,
                fontSize: '0.7rem', fontFamily: 'monospace', color: 'rgba(246,244,240,0.55)',
                backgroundColor: 'rgba(246,244,240,0.02)',
              }}>{t}</span>
            ))}
          </div>

          {/* CTA */}
          <a
            href={proj.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '12px 28px', borderRadius: '50px',
              backgroundColor: proj.palette.accent, color: '#000',
              fontWeight: 800, fontSize: '0.8rem', textDecoration: 'none',
              textTransform: 'uppercase', letterSpacing: '1.5px',
              transition: 'transform 0.2s, box-shadow 0.2s',
              boxShadow: `0 10px 30px ${proj.palette.glow}`,
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 20px 40px ${proj.palette.glow}`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = `0 10px 30px ${proj.palette.glow}`; }}
          >
            Visit Live Site ↗
          </a>
        </div>

        {/* Right Decorative Area */}
        <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ padding: '2rem', borderRadius: '16px', border: '1px solid rgba(246,244,240,0.08)', backgroundColor: 'rgba(0,0,0,0.3)', width: '100%', maxWidth: '350px', backdropFilter: 'blur(10px)' }}>
            <p style={{ fontFamily: 'monospace', fontSize: '0.85rem', lineHeight: 1.8, color: 'rgba(246,244,240,0.4)' }}>
              <span style={{ color: 'rgba(246,244,240,0.2)' }}>$</span> <span style={{ color: '#4ade80' }}>git</span> log --oneline<br />
              <span style={{ color: 'rgba(246,244,240,0.5)' }}>fe3c2a1</span> shipped: {proj.name.split(' ')[0].toLowerCase()}<br />
              <span style={{ color: 'rgba(246,244,240,0.3)' }}>a9d11f4</span> vibe coded seamlessly<br />
              <span style={{ color: proj.palette.accent }}>▋</span>
            </p>
          </div>
        </div>

      </motion.div>
    </div>
  )
}

function VibeCodingLab() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const n = PROJECTS.length;

  return (
    <section ref={containerRef} style={{ position: 'relative', backgroundColor: '#0d0d0d', zIndex: 4, paddingBottom: '10vh' }}>
      {PROJECTS.map((proj, i) => (
        <VibeCard key={proj.id} i={i} n={n} progress={scrollYProgress} {...proj} />
      ))}
    </section>
  );
}
