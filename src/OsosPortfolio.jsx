import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

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
      <section style={{ position: 'relative', height: '300vh', zIndex: 4, backgroundColor: 'var(--bg-color)' }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', alignItems: 'center', padding: '0 5vw', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '50%', left: '5%', transform: 'translateY(-50%)', zIndex: 1, pointerEvents: 'none' }}>
            <h1 className="text-huge text-outline" style={{ opacity: 0.2 }}>EXPERIENCE</h1>
          </div>
          <StickyContent scrollYProgress={scrollYProgress} />
        </div>
      </section>

      {/* Horizontal Projects Section */}
      <HorizontalProjects />

      {/* Education & Certifications Section */}
      <section className="section" style={{ minHeight: '100vh', backgroundColor: 'var(--bg-color)', zIndex: 4, position: 'relative', padding: '15vh 10vw' }}>
         <h1 className="text-large" style={{ marginBottom: '4rem' }}>03. ACADEMICS & CERTIFICATIONS</h1>
         
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
               <h2 style={{ fontSize: '2rem', marginBottom: '2rem', borderBottom: '2px solid var(--text-color)', paddingBottom: '1rem' }}>Certifications & Volunteer</h2>
               
               <div style={{ marginBottom: '2rem' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>AI and ML Learning Program</h3>
                  <p className="text-body" style={{ color: '#555', marginTop: '0.5rem' }}>Grras Solutions | Oct 2025</p>
               </div>

               <div style={{ marginBottom: '2rem' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Agentic AI: From Learner to Builder</h3>
                  <p className="text-body" style={{ color: '#555', marginTop: '0.5rem' }}>IBM SkillsBuild & CSRBOX | Aug 2025</p>
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
          <div style={{ position: 'relative', height: '85vh', pointerEvents: 'auto' }}>
            <img 
              src="portrait.png" 
              alt="Portrait" 
              onError={(e) => { 
                e.target.onerror = null; 
                e.target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop"; 
              }}
              style={{ 
                height: '100%', objectFit: 'contain', objectPosition: 'bottom',
                maskImage: 'linear-gradient(to top, transparent 0%, black 15%)',
                WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 15%)',
              }} 
            />

            {/* Funny Tea Marker */}
            <motion.div 
               className="tea-marker"
               initial={{ opacity: 0, scale: 0, rotate: -10 }}
               animate={{ opacity: 1, scale: 1, rotate: 0 }}
               transition={{ delay: 2, duration: 0.8, type: 'spring' }}
               style={{
                 position: 'absolute',
                 top: '55%',   /* Adjust this percentage to move up/down */
                 left: '25%',  /* Adjust this percentage to move left/right */
                 backgroundColor: 'rgba(17, 17, 17, 0.85)',
                 backdropFilter: 'blur(10px)',
                 padding: '0.8rem 1.2rem',
                 borderRadius: '20px',
                 border: '1px solid #444',
                 color: '#f6f4f0',
                 fontSize: '0.85rem',
                 fontWeight: 600,
                 display: 'flex',
                 alignItems: 'center',
                 gap: '0.8rem',
                 boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                 cursor: 'pointer',
                 zIndex: 10
               }}
            >
               <span style={{ fontSize: '1.2rem' }}>☕</span>
               <span>Fuel to keep me active 24/7</span>
               
               {/* Pulsing indicator dot */}
               <div style={{ position: 'absolute', bottom: '-15px', right: '-15px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                 <motion.div 
                   animate={{ scale: [1, 2], opacity: [1, 0] }} 
                   transition={{ duration: 1.5, repeat: Infinity }}
                   style={{ position: 'absolute', width: '10px', height: '10px', backgroundColor: '#E07A5F', borderRadius: '50%' }}
                 />
                 <div style={{ width: '8px', height: '8px', backgroundColor: '#E07A5F', borderRadius: '50%', zIndex: 1 }}></div>
               </div>
            </motion.div>
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
             VIBE CODER &<br/>OPERATIONS LEAD
           </p>
           <p className="text-body" style={{ marginTop: '1rem', fontWeight: 400, maxWidth: '200px', textAlign: 'right', fontSize: '0.8rem', color: '#555' }}>
             Udaipur, Rajasthan<br/>Willing to relocate: Anywhere
           </p>
        </motion.div>
      </div>
    </section>
  );
}

function StickyContent({ scrollYProgress }) {
  const y = useTransform(scrollYProgress, [0.3, 0.6], ['100vh', '-100vh']);
  const opacity = useTransform(scrollYProgress, [0.3, 0.45, 0.6], [0, 1, 0]);

  return (
    <motion.div style={{ y, opacity, zIndex: 2, marginLeft: 'auto', maxWidth: '600px', backgroundColor: 'var(--bg-color)', padding: '2rem' }}>
       <h2 className="text-large" style={{ marginBottom: '1rem', color: 'var(--accent-color)' }}>01.</h2>
       <h3 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', lineHeight: 1.1 }}>COO</h3>
       <h4 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#333' }}>The Popular Company (Feb 2025 – Mar 2026)</h4>
       
       <ul style={{ paddingLeft: '1.5rem', fontSize: '1.25rem', lineHeight: 1.6, color: '#555' }}>
         <li style={{ marginBottom: '1rem' }}>Scaled a creative house, actively overseeing day-to-day business operations, team management, and client relations as the primary face of the company.</li>
         <li>Served as lead Web Developer, successfully building, deploying, and maintaining client websites including <strong>thepopularcompany.com</strong>, <strong>foundicnetwork.com</strong>, and <strong>numberscart.com</strong>.</li>
       </ul>
    </motion.div>
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
