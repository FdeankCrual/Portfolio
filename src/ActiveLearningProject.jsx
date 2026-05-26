import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ActiveLearningProject() {
  const [allCommits, setAllCommits] = useState([]);
  const [reposList, setReposList] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState('ALL');
  const [loading, setLoading] = useState(true);
  const [hoveredDay, setHoveredDay] = useState(null);

  useEffect(() => {
    // 1. Fetch all public repositories for the user
    fetch('https://api.github.com/users/FdeankCrual/repos?per_page=100&type=owner')
      .then(res => res.json())
      .then(async (repos) => {
        if (!Array.isArray(repos)) {
          setLoading(false);
          return;
        }
        
        const repoNames = repos.map(r => r.name);
        setReposList(repoNames);

        // 2. Fetch up to 100 recent commits for EVERY repository
        const commitPromises = repoNames.map(repoName => 
          fetch(`https://api.github.com/repos/FdeankCrual/${repoName}/commits?per_page=100`)
            .then(res => {
              if (res.ok) return res.json();
              return [];
            })
            .then(data => {
              if (!Array.isArray(data)) return [];
              // Tag each commit with its source repository
              return data.map(commit => ({ ...commit, repoName }));
            })
            .catch(() => [])
        );

        const results = await Promise.all(commitPromises);
        
        // 3. Flatten into a single master global timeline and sort by date descending
        const mergedCommits = results.flat().sort((a, b) => {
          return new Date(b.commit.author.date) - new Date(a.commit.author.date);
        });

        setAllCommits(mergedCommits);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch repositories or commits', err);
        setLoading(false);
      });
  }, []);

  // 4. Derive the matrix and terminal data dynamically based on the dropdown filter
  const { matrix, terminalCommits } = useMemo(() => {
    const filteredCommits = selectedRepo === 'ALL' 
      ? allCommits 
      : allCommits.filter(c => c.repoName === selectedRepo);

    // Save the first 5 commits for the terminal log on the right
    const terminal = filteredCommits.slice(0, 5);

    // Group the filtered commits by their exact date
    const commitsByDate = {};
    filteredCommits.forEach(commit => {
      const dateString = new Date(commit.commit.author.date).toISOString().split('T')[0];
      if (!commitsByDate[dateString]) commitsByDate[dateString] = [];
      commitsByDate[dateString].push(commit);
    });

    // Get the unique active dates, sorted newest first
    const sortedActiveDates = Object.keys(commitsByDate).sort((a, b) => b.localeCompare(a));
    
    // Grab exactly the last 7 days that actually had commits
    const activeMatrix = sortedActiveDates.slice(0, 7).map(dateString => {
      const dayCommits = commitsByDate[dateString];
      const count = dayCommits.length;
      
      let level = 0;
      if (count === 1) level = 1;
      if (count === 2) level = 2;
      if (count === 3) level = 3;
      if (count >= 4) level = 4;

      // Extract messages and tag them with their repo name if 'ALL' is selected
      const messages = dayCommits.map(c => ({
        text: c.commit.message.split('\n')[0],
        repo: c.repoName
      }));
      
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

    return { matrix: activeMatrix, terminalCommits: terminal };
  }, [allCommits, selectedRepo]);


  // Glowing aesthetic colors mapped to intensity levels
  const colors = ['rgba(255,255,255,0.03)', '#0e4429', '#006d32', '#26a641', '#39d353'];

  return (
    <section className="section" style={{ minHeight: '100vh', backgroundColor: '#0d0d0d', zIndex: 4, position: 'relative', padding: '5vh 5vw', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      
      {/* Header */}
      <div style={{ marginBottom: '2rem', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 className="text-large" style={{ color: 'var(--text-color)', marginBottom: '0.5rem' }}>04. ACTIVE DEVELOPMENT</h2>
          <h3 style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)', fontWeight: 800, color: '#f6f4f0', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
            CONSISTENCY IS <span style={{ color: '#4ade80' }}>EVERYTHING</span>
          </h3>
          <p style={{ color: 'rgba(246,244,240,0.6)', marginTop: '0.5rem', fontSize: '1rem', maxWidth: '800px' }}>
            My central hub for daily learning, algorithms, and projects. Hover over the 3D blocks below to view my exact, real-time commit messages from the last 7 active days.
          </p>
        </div>
        
        {/* Dropdown Filter */}
        <div style={{ position: 'relative', zIndex: 60 }}>
          <label style={{ display: 'block', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Track Repository:</label>
          <select 
            value={selectedRepo}
            onChange={(e) => setSelectedRepo(e.target.value)}
            style={{
              appearance: 'none',
              backgroundColor: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#4ade80',
              padding: '0.75rem 3rem 0.75rem 1.5rem',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: 'bold',
              fontFamily: 'monospace',
              cursor: 'pointer',
              outline: 'none',
              boxShadow: '0 4px 15px rgba(0,0,0,0.5)'
            }}
          >
            <option value="ALL" style={{ background: '#1a1a1a', color: '#fff' }}>[ ALL REPOSITORIES ]</option>
            {reposList.map(repo => (
              <option key={repo} value={repo} style={{ background: '#1a1a1a', color: '#fff' }}>{repo}</option>
            ))}
          </select>
          {/* Custom Arrow */}
          <div style={{ position: 'absolute', right: '1.5rem', bottom: '1rem', pointerEvents: 'none', color: '#4ade80' }}>▼</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem', alignItems: 'start' }}>
        
        {/* Left Side: Massive 14-Day 3D Matrix */}
        <div style={{ 
          background: 'rgba(255,255,255,0.02)', 
          border: '1px solid rgba(255,255,255,0.05)', 
          borderRadius: '24px', 
          padding: '2rem',
          boxShadow: '0 20px 80px rgba(0,0,0,0.5)',
          display: 'flex', flexDirection: 'column', height: '100%'
        }}>
          <h4 style={{ fontSize: '0.9rem', color: '#f6f4f0', marginBottom: '1.5rem', letterSpacing: '1px', textTransform: 'uppercase', display: 'flex', justifyContent: 'space-between' }}>
            <span>Last 7 Commit Days</span>
            <span style={{ color: '#4ade80', animation: 'pulse 2s infinite' }}>● REAL-TIME</span>
          </h4>
          
          {/* Vertical Connected Git Timeline */}
          <div style={{ 
            position: 'relative',
            display: 'flex', 
            flexDirection: 'column', 
            gap: '1.25rem', 
            width: '100%', 
            background: 'rgba(0,0,0,0.2)',
            padding: '2rem 1.5rem',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.03)',
            perspective: '1000px'
          }}>
            {/* The Main Vertical Branch Line */}
            <div style={{
              position: 'absolute',
              top: '2rem', bottom: '2rem',
              left: '2rem',
              width: '4px',
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderRadius: '2px',
              zIndex: 1
            }} />

            {loading ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', height: '100%' }}>
                Fetching live commits across GitHub...
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
                  whileInView={{ width: '1.5rem' }}
                  transition={{ delay: (i * 0.05) + 0.2 }}
                  style={{
                    height: '2px',
                    backgroundColor: day.level > 0 ? colors[day.level] : 'rgba(255,255,255,0.1)',
                    marginLeft: '0.75rem',
                    marginRight: '0.75rem',
                    zIndex: 1
                  }}
                />

                {/* The 3D Block Container */}
                <div style={{ position: 'relative', flex: 1, height: '45px' }}>
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
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1.25rem',
                      cursor: 'pointer',
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', fontFamily: 'monospace' }}>
                      {day.displayDate}
                    </span>
                    {day.count > 0 && (
                      <span style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'rgba(255,255,255,0.9)', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                        {day.count} {day.count === 1 ? 'Commit' : 'Commits'}
                      </span>
                    )}
                  </motion.div>

                  {/* Hover Tooltip with Live Commits */}
                  <AnimatePresence>
                    {hoveredDay === i && day.count > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: i === matrix.length - 1 ? 10 : -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: i === matrix.length - 1 ? 10 : -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        style={{
                          position: 'absolute',
                          top: i === matrix.length - 1 ? 'auto' : 'calc(100% + 12px)',
                          bottom: i === matrix.length - 1 ? 'calc(100% + 12px)' : 'auto',
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
                          {day.messages.map((msgObj, idx) => (
                            <div key={idx} style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.8rem', lineHeight: 1.4, wordBreak: 'break-word' }}>
                              <span style={{ color: '#4ade80', marginRight: '8px' }}>&gt;</span>
                              {selectedRepo === 'ALL' && (
                                <span style={{ color: '#38bdf8', marginRight: '5px' }}>[{msgObj.repo}]</span>
                              )}
                              {msgObj.text}
                            </div>
                          ))}
                        </div>
                        
                        {/* Tooltip Arrow (pointing UP or DOWN depending on position) */}
                        <div style={{
                          position: 'absolute', 
                          top: i === matrix.length - 1 ? '100%' : 'auto',
                          bottom: i === matrix.length - 1 ? 'auto' : '100%',
                          left: '50%', transform: 'translateX(-50%)',
                          width: 0, height: 0,
                          borderLeft: '8px solid transparent', borderRight: '8px solid transparent',
                          borderTop: i === matrix.length - 1 ? `8px solid ${colors[day.level > 0 ? day.level : 1]}` : 'none',
                          borderBottom: i === matrix.length - 1 ? 'none' : `8px solid ${colors[day.level > 0 ? day.level : 1]}`
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Project Status Panel */}
          <div style={{ 
            background: '#1a1a1a', 
            border: '1px solid rgba(198, 168, 124, 0.2)', 
            borderRadius: '20px', 
            padding: '1.5rem',
            position: 'relative'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f6f4f0' }}>Repository Status</h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '8px', height: '8px', backgroundColor: '#4ade80', borderRadius: '50%', boxShadow: '0 0 10px #4ade80' }}></span>
                <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: '#4ade80' }}>LIVE API</span>
              </div>
            </div>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '1rem' }}>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'rgba(246,244,240,0.4)', textTransform: 'uppercase', letterSpacing: '1px' }}>Scope</div>
                <div style={{ fontSize: '1rem', fontWeight: 600, color: '#c6a87c' }}>
                  {selectedRepo === 'ALL' ? 'Global Tracker' : 'Isolated Project'}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'rgba(246,244,240,0.4)', textTransform: 'uppercase', letterSpacing: '1px' }}>Current Repo</div>
                <a href={selectedRepo === 'ALL' ? 'https://github.com/FdeankCrual' : `https://github.com/FdeankCrual/${selectedRepo}`} target="_blank" rel="noreferrer" style={{ fontSize: '1rem', fontWeight: 600, color: '#38bdf8', textDecoration: 'none' }}>
                  {selectedRepo === 'ALL' ? 'FdeankCrual / * ↗' : `FdeankCrual/${selectedRepo} ↗`}
                </a>
              </div>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'rgba(246,244,240,0.7)', lineHeight: 1.5, margin: 0 }}>
              {selectedRepo === 'ALL' 
                ? "This section is actively streaming and merging commits across ALL of my public repositories into a master global timeline." 
                : `This section is currently tracking active commits exclusively from the ${selectedRepo} repository.`}
            </p>
          </div>

          {/* Terminal / Commits Log */}
          <div style={{ 
            background: 'rgba(0,0,0,0.4)', 
            border: '1px solid rgba(246,244,240,0.08)', 
            borderRadius: '20px', 
            padding: '1.5rem',
            fontFamily: 'monospace'
          }}>
            <h4 style={{ fontSize: '0.85rem', color: 'rgba(246,244,240,0.5)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between' }}>
              <span><span style={{ color: '#38bdf8' }}>$</span> git log --live</span>
              {selectedRepo !== 'ALL' && <span style={{ color: '#4ade80' }}>[{selectedRepo}]</span>}
            </h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {loading ? (
                <div style={{ color: 'rgba(246,244,240,0.4)', fontSize: '0.85rem' }}>Fetching commits from GitHub...</div>
              ) : terminalCommits.slice(0, 4).map((commitData, idx) => (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={commitData.sha} 
                  style={{ display: 'flex', gap: '1rem', borderBottom: idx === 3 ? 'none' : '1px solid rgba(246,244,240,0.05)', paddingBottom: idx === 3 ? '0' : '0.75rem' }}
                >
                  <div style={{ color: '#38bdf8', fontSize: '0.85rem' }}>
                    {commitData.sha.substring(0, 7)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: '#f6f4f0', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                      {selectedRepo === 'ALL' && (
                        <span style={{ color: '#c6a87c', marginRight: '5px' }}>[{commitData.repoName}]</span>
                      )}
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
