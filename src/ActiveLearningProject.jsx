import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ActiveLearningProject() {
  const [commits, setCommits] = useState([]);
  const [matrix, setMatrix] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredDay, setHoveredDay] = useState(null);

  useEffect(() => {
    // Fetch up to 100 recent commits from the repo to guarantee we have data for the last 14 days
    fetch('https://api.github.com/repos/FdeankCrual/Learning_stay_tuned/commits?per_page=100')
      .then(res => res.json())
      .then(data => {
        if (!Array.isArray(data)) {
          setLoading(false);
          return;
        }
        
        // Save the first 5 commits for the terminal log on the right
        setCommits(data.slice(0, 5));

        // Group all fetched commits by their exact date
        const commitsByDate = {};
        data.forEach(commit => {
          const dateString = new Date(commit.commit.author.date).toISOString().split('T')[0];
          if (!commitsByDate[dateString]) commitsByDate[dateString] = [];
          commitsByDate[dateString].push(commit);
        });

        // Get the unique active dates, sorted newest first
        const sortedActiveDates = Object.keys(commitsByDate).sort((a, b) => b.localeCompare(a));
        
        // Grab exactly the last 7 days that actually had commits
        const last7ActiveDays = sortedActiveDates.slice(0, 7).map(dateString => {
          const dayCommits = commitsByDate[dateString];
          const count = dayCommits.length;
          
          let level = 0;
          if (count === 1) level = 1;
          if (count === 2) level = 2;
          if (count === 3) level = 3;
          if (count >= 4) level = 4;

          const messages = dayCommits.map(c => c.commit.message.split('\n')[0]);
          
          // To ensure safe timezone parsing for display, we split and reconstruct
          const [year, month, day] = dateString.split('-');
          const d = new Date(year, month - 1, day);

          return {
            date: dateString,
            displayDate: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            count,
            level,
            messages
          };
        });
        
        setMatrix(last7ActiveDays);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch commits', err);
        setLoading(false);
      });
  }, []);

  // Glowing aesthetic colors mapped to intensity levels
  const colors = ['rgba(255,255,255,0.03)', '#0e4429', '#006d32', '#26a641', '#39d353'];

  return (
    <section className="section" style={{ minHeight: '100vh', backgroundColor: '#0d0d0d', zIndex: 4, position: 'relative', padding: '10vh 5vw', display: 'flex', flexDirection: 'column' }}>
      
      {/* Header */}
      <div style={{ marginBottom: '4rem', textAlign: 'left' }}>
        <h2 className="text-large" style={{ color: 'var(--text-color)', marginBottom: '1rem' }}>04. ACTIVE DEVELOPMENT</h2>
        <h3 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, color: '#f6f4f0', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          CONSISTENCY IS <span style={{ color: '#4ade80' }}>EVERYTHING</span>
        </h3>
        <p style={{ color: 'rgba(246,244,240,0.6)', marginTop: '1rem', fontSize: '1.2rem', maxWidth: '800px' }}>
          My central hub for daily learning, algorithms, and projects. Hover over the 3D blocks below to view my exact, real-time commit messages from the last 7 active days.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem', alignItems: 'start' }}>
        
        {/* Left Side: Massive 14-Day 3D Matrix */}
        <div style={{ 
          background: 'rgba(255,255,255,0.02)', 
          border: '1px solid rgba(255,255,255,0.05)', 
          borderRadius: '24px', 
          padding: '3rem',
          boxShadow: '0 20px 80px rgba(0,0,0,0.5)',
          display: 'flex', flexDirection: 'column', height: '100%'
        }}>
          <h4 style={{ fontSize: '1rem', color: '#f6f4f0', marginBottom: '2rem', letterSpacing: '1px', textTransform: 'uppercase', display: 'flex', justifyContent: 'space-between' }}>
            <span>Last 7 Commit Days</span>
            <span style={{ color: '#4ade80', animation: 'pulse 2s infinite' }}>● REAL-TIME</span>
          </h4>
          
          {/* Vertical Connected Git Timeline */}
          <div style={{ 
            position: 'relative',
            display: 'flex', 
            flexDirection: 'column', 
            gap: '2rem', 
            width: '100%', 
            background: 'rgba(0,0,0,0.2)',
            padding: '3rem 2rem',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.03)',
            perspective: '1000px'
          }}>
            {/* The Main Vertical Branch Line */}
            <div style={{
              position: 'absolute',
              top: '3rem', bottom: '3rem',
              left: '3rem',
              width: '4px',
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderRadius: '2px',
              zIndex: 1
            }} />

            {loading ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', height: '100%' }}>
                Fetching live commits from GitHub...
              </div>
            ) : matrix.map((day, i) => (
              <div 
                key={i} 
                style={{ position: 'relative', display: 'flex', alignItems: 'center', width: '100%', paddingLeft: '1.25rem' }}
                onMouseEnter={() => setHoveredDay(i)}
                onMouseLeave={() => setHoveredDay(null)}
              >
                
                {/* Branch Node (Dot on the vertical line) */}
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  style={{
                    position: 'absolute',
                    left: '0.65rem',
                    width: '16px', height: '16px',
                    borderRadius: '50%',
                    backgroundColor: colors[day.level > 0 ? day.level : 1],
                    border: '4px solid #1a1a1a',
                    zIndex: 2,
                    boxShadow: day.level > 0 ? `0 0 10px ${colors[day.level > 0 ? day.level : 1]}` : 'none'
                  }}
                />

                {/* Horizontal Connection Line */}
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '2rem' }}
                  transition={{ delay: (i * 0.05) + 0.2 }}
                  style={{
                    height: '2px',
                    backgroundColor: day.level > 0 ? colors[day.level] : 'rgba(255,255,255,0.1)',
                    marginLeft: '1rem',
                    marginRight: '1rem',
                    zIndex: 1
                  }}
                />

                {/* The 3D Block Container */}
                <div style={{ position: 'relative', flex: 1, height: '60px' }}>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.05, type: 'spring', stiffness: 100 }}
                    whileHover={{ scale: 1.05, zIndex: 20, x: -5 }}
                    style={{
                      width: '100%', height: '100%',
                      backgroundColor: colors[day.level],
                      borderRadius: '8px',
                      border: day.level === 0 ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(255,255,255,0.2)',
                      boxShadow: day.level > 0 
                        ? `0 10px 20px rgba(0,0,0,0.5), 0 0 15px ${colors[day.level]}60, inset 0 2px 5px rgba(255,255,255,0.3)` 
                        : '0 5px 15px rgba(0,0,0,0.5), inset 0 2px 5px rgba(255,255,255,0.05)',
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1.5rem',
                      cursor: 'pointer',
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', fontFamily: 'monospace' }}>
                      {day.displayDate}
                    </span>
                    {day.count > 0 && (
                      <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'rgba(255,255,255,0.9)', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                        {day.count} {day.count === 1 ? 'Commit' : 'Commits'}
                      </span>
                    )}
                  </motion.div>

                  {/* Hover Tooltip with Live Commits */}
                  <AnimatePresence>
                    {hoveredDay === i && day.count > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        style={{
                          position: 'absolute',
                          top: 'calc(100% + 12px)',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: '100%',
                          minWidth: '280px',
                          backgroundColor: '#1a1a1a',
                          border: `1px solid ${colors[day.level > 0 ? day.level : 1]}`,
                          borderRadius: '12px',
                          padding: '1.5rem',
                          boxShadow: '0 20px 40px rgba(0,0,0,0.8)',
                          zIndex: 50,
                          pointerEvents: 'none'
                        }}
                      >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                          {day.messages.map((msg, idx) => (
                            <div key={idx} style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.8rem', lineHeight: 1.4, wordBreak: 'break-word' }}>
                              <span style={{ color: '#4ade80', marginRight: '8px' }}>&gt;</span>{msg}
                            </div>
                          ))}
                        </div>
                        
                        {/* Tooltip Arrow (pointing UP towards the block) */}
                        <div style={{
                          position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)',
                          width: 0, height: 0,
                          borderLeft: '8px solid transparent', borderRight: '8px solid transparent',
                          borderBottom: `8px solid ${colors[day.level > 0 ? day.level : 1]}`
                        }} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: GitHub Integration */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Project Status Panel */}
          <div style={{ 
            background: '#1a1a1a', 
            border: '1px solid #c6a87c33', 
            borderRadius: '20px', 
            padding: '2rem',
            position: 'relative'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#f6f4f0' }}>Repository Status</h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '8px', height: '8px', backgroundColor: '#4ade80', borderRadius: '50%', boxShadow: '0 0 10px #4ade80' }}></span>
                <span style={{ fontSize: '0.8rem', fontFamily: 'monospace', color: '#4ade80' }}>LIVE API</span>
              </div>
            </div>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2rem' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(246,244,240,0.4)', textTransform: 'uppercase', letterSpacing: '1px' }}>Primary Focus</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#c6a87c' }}>Python / AI / Scripts</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(246,244,240,0.4)', textTransform: 'uppercase', letterSpacing: '1px' }}>Branch</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#f6f4f0' }}>main</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(246,244,240,0.4)', textTransform: 'uppercase', letterSpacing: '1px' }}>Repo</div>
                <a href="https://github.com/FdeankCrual/Learning_stay_tuned" target="_blank" rel="noreferrer" style={{ fontSize: '1.1rem', fontWeight: 600, color: '#38bdf8', textDecoration: 'none' }}>FdeankCrual/Learning_stay_tuned ↗</a>
              </div>
            </div>

            <p style={{ fontSize: '0.9rem', color: 'rgba(246,244,240,0.7)', lineHeight: 1.6 }}>
              This section streams directly from my master learning repository. The massive 14-day grid visualizes my recent commitment, storing every real-time commit message directly inside the 3D blocks.
            </p>
          </div>

          {/* Terminal / Commits Log */}
          <div style={{ 
            background: 'rgba(0,0,0,0.4)', 
            border: '1px solid rgba(246,244,240,0.08)', 
            borderRadius: '20px', 
            padding: '2rem',
            fontFamily: 'monospace'
          }}>
            <h4 style={{ fontSize: '0.9rem', color: 'rgba(246,244,240,0.5)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1.5rem' }}>
              <span style={{ color: '#38bdf8' }}>$</span> git log --live
            </h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {loading ? (
                <div style={{ color: 'rgba(246,244,240,0.4)', fontSize: '0.85rem' }}>Fetching commits from GitHub...</div>
              ) : commits.map((commitData, idx) => (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={commitData.sha} 
                  style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid rgba(246,244,240,0.05)', paddingBottom: '1rem' }}
                >
                  <div style={{ color: '#38bdf8', fontSize: '0.85rem' }}>
                    {commitData.sha.substring(0, 7)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: '#f6f4f0', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                      {commitData.commit.message.split('\n')[0]}
                    </div>
                    <div style={{ color: 'rgba(246,244,240,0.4)', fontSize: '0.75rem' }}>
                      {new Date(commitData.commit.author.date).toLocaleDateString()} by {commitData.commit.author.name}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
