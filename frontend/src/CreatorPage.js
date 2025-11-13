import React from 'react';
import { ArrowLeft, Linkedin, Mail, Briefcase, GraduationCap, Award, Code } from 'lucide-react';

const CreatorPage = ({ onBack }) => {
  return (
    <div className="mh-root">
      <style>{styles}</style>

      {/* Header */}
      <header className="creator-page-header">
        <div className="mh-container">
          <button onClick={onBack} className="back-button">
            <ArrowLeft size={20} /> Back to Home
          </button>

          <div className="creator-hero">
            <div className="creator-hero-avatar">RD</div>
            <div className="creator-hero-info">
              <h1>Ranak Debnath</h1>
              <p className="creator-hero-title">
                Data Analyst | Software Developer | Automation Specialist
              </p>
              <p className="creator-hero-location">Narayanganj District, Dhaka, Bangladesh</p>
              <div className="creator-hero-links">
                <a href="https://www.linkedin.com/in/ranakdebnath-7644621b7" target="_blank" rel="noopener noreferrer" className="hero-link-btn">
                  <Linkedin size={18} /> LinkedIn
                </a>
                <a href="mailto:piyaldeb87@gmail.com" className="hero-link-btn">
                  <Mail size={18} /> piyaldeb87@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="creator-content">
        <div className="mh-container">
          {/* Summary */}
          <section className="creator-section">
            <h2>
              <Code size={28} /> About
            </h2>
            <div className="creator-card-white">
              <p>
                I'm Ranak Debnath, a passionate backend developer with a strong foundation in Computer Science and Engineering,
                specializing in Data Science (AI & ML). I hold a B.Tech degree and have honed my skills through hands-on experience
                developing robust APIs and scalable backend systems using Node.js, Express, SQL, and MongoDB.
              </p>
              <p>
                In my current role as a Backend Developer, I design, implement, and maintain the server-side logic that powers complex
                platforms like Cleverlyy and Edupy Academy. I also lead key initiatives—such as Carter's sample development at Tex
                Fasteners in Bangladesh—where I integrate technology with manufacturing processes to drive innovation, streamline
                operations, and enhance product precision.
              </p>
              <p>
                My technical toolkit extends to data analysis and visualization (using tools like Tableau and Power BI), and I excel in
                system architecture, database management, and project leadership. I thrive on solving challenging problems and continuously
                seek opportunities to optimize performance and scalability while ensuring robust security standards.
              </p>
            </div>
          </section>

          {/* Skills */}
          <section className="creator-section">
            <h2>
              <Award size={28} /> Top Skills
            </h2>
            <div className="skills-grid">
              <div className="skill-badge">Databases (SQL, MongoDB)</div>
              <div className="skill-badge">Python</div>
              <div className="skill-badge">Node.js & Express</div>
              <div className="skill-badge">Microsoft Excel</div>
              <div className="skill-badge">Data Analysis</div>
              <div className="skill-badge">Backend Development</div>
              <div className="skill-badge">System Architecture</div>
              <div className="skill-badge">API Development</div>
            </div>
          </section>

          {/* Experience */}
          <section className="creator-section">
            <h2>
              <Briefcase size={28} /> Experience
            </h2>

            <div className="experience-timeline">
              <div className="experience-item">
                <div className="experience-header">
                  <h3>Senior Backend Developer</h3>
                  <span className="experience-date">Sep 2025 - Present</span>
                </div>
                <p className="experience-company">Cleverlyy • Remote</p>
                <ul>
                  <li>Lead backend architecture and development for the Cleverlyy platform</li>
                  <li>Design and implement scalable APIs and server-side logic</li>
                  <li>Ensure optimal performance, security, and scalability</li>
                </ul>
              </div>

              <div className="experience-item">
                <div className="experience-header">
                  <h3>Back End Developer</h3>
                  <span className="experience-date">Mar 2025 - Oct 2025</span>
                </div>
                <p className="experience-company">Cleverlyy • Remote</p>
                <ul>
                  <li>Designed, implemented, and maintained APIs powering the Cleverlyy platform</li>
                  <li>Collaborated with frontend developers for seamless integration</li>
                  <li>Managed databases and data flows for efficient storage and retrieval</li>
                </ul>
              </div>

              <div className="experience-item">
                <div className="experience-header">
                  <h3>Graduate Engineering Trainee</h3>
                  <span className="experience-date">Dec 2024 - Present</span>
                </div>
                <p className="experience-company">Tex Fasteners • Bangladesh</p>
                <ul>
                  <li>Leading Carter's sample development ensuring efficiency and precision</li>
                  <li>Specializing in data analysis and software development</li>
                  <li>Focusing on automation to streamline operations and enhance productivity</li>
                </ul>
              </div>

              <div className="experience-item">
                <div className="experience-header">
                  <h3>.NET Intern Developer</h3>
                  <span className="experience-date">Oct 2024 - Jan 2025</span>
                </div>
                <p className="experience-company">Itransition Group • United States (Remote)</p>
                <ul>
                  <li>Worked with global software development company with 3,000+ professionals</li>
                  <li>Collaborated on cross-functional teams for high-quality solutions</li>
                  <li>Contributed to projects for clients including PayPal, Toyota, and Xerox</li>
                </ul>
              </div>

              <div className="experience-item">
                <div className="experience-header">
                  <h3>Back End Developer Intern</h3>
                  <span className="experience-date">Aug 2024 - Mar 2025</span>
                </div>
                <p className="experience-company">Cleverlyy • Bangladesh</p>
                <ul>
                  <li>Developed and maintained backend infrastructure</li>
                  <li>Participated in code reviews and best practices</li>
                  <li>Debugged and improved existing systems</li>
                </ul>
              </div>

              <div className="experience-item">
                <div className="experience-header">
                  <h3>Data Analyst</h3>
                  <span className="experience-date">Jul 2023 - Dec 2023</span>
                </div>
                <p className="experience-company">Commercial Bank of Ceylon PLC • Bangladesh</p>
                <ul>
                  <li>Performed data analysis and visualization</li>
                  <li>Generated insights for business decision-making</li>
                  <li>Worked with large datasets and reporting tools</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Education */}
          <section className="creator-section">
            <h2>
              <GraduationCap size={28} /> Education
            </h2>
            <div className="creator-card-white">
              <h3>Lovely Professional University</h3>
              <p className="education-degree">B.Tech in Computer Science & Engineering, Data Science</p>
              <p className="education-years">2020 - 2024</p>
            </div>
          </section>

          {/* Certifications */}
          <section className="creator-section">
            <h2>
              <Award size={28} /> Certifications
            </h2>
            <div className="certifications-grid">
              <div className="cert-card">Generative AI with Large Language Models</div>
              <div className="cert-card">Introduction to Large Language Model</div>
              <div className="cert-card">Prompt Engineering for ChatGPT</div>
              <div className="cert-card">GenAI for Everyone</div>
              <div className="cert-card">DSA Self Paced</div>
            </div>
          </section>

          {/* Contact CTA */}
          <section className="creator-section">
            <div className="contact-cta">
              <h2>Let's Connect!</h2>
              <p>Interested in collaboration or have questions? Feel free to reach out.</p>
              <div className="contact-buttons">
                <a href="mailto:piyaldeb87@gmail.com" className="contact-btn primary">
                  <Mail size={20} /> Email Me
                </a>
                <a href="https://www.linkedin.com/in/ranakdebnath-7644621b7" target="_blank" rel="noopener noreferrer" className="contact-btn secondary">
                  <Linkedin size={20} /> Connect on LinkedIn
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

const styles = `
  .mh-root {
    font-family: 'Inter', 'Segoe UI', sans-serif;
    background: #f8fafc;
    min-height: 100vh;
  }

  .mh-container {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }

  .creator-page-header {
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%);
    color: white;
    padding: 2rem 0 4rem;
  }

  .back-button {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(255,255,255,0.15);
    border: 1px solid rgba(255,255,255,0.3);
    color: white;
    padding: 0.6rem 1.2rem;
    border-radius: 9999px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    margin-bottom: 2rem;
  }

  .back-button:hover {
    background: rgba(255,255,255,0.25);
    transform: translateX(-2px);
  }

  .creator-hero {
    display: flex;
    gap: 2rem;
    align-items: center;
  }

  .creator-hero-avatar {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background: linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1));
    display: grid;
    place-items: center;
    font-size: 4rem;
    font-weight: 700;
    flex-shrink: 0;
    border: 3px solid rgba(255,255,255,0.3);
    box-shadow: 0 12px 32px rgba(0,0,0,0.2);
  }

  .creator-hero-info h1 {
    margin: 0 0 0.5rem 0;
    font-size: 2.75rem;
    font-weight: 800;
  }

  .creator-hero-title {
    font-size: 1.25rem;
    margin: 0 0 0.5rem 0;
    opacity: 0.95;
    font-weight: 600;
  }

  .creator-hero-location {
    margin: 0 0 1.5rem 0;
    opacity: 0.85;
  }

  .creator-hero-links {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .hero-link-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(255,255,255,0.2);
    border: 1px solid rgba(255,255,255,0.3);
    color: white;
    padding: 0.6rem 1.2rem;
    border-radius: 9999px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.2s;
  }

  .hero-link-btn:hover {
    background: rgba(255,255,255,0.3);
    transform: translateY(-2px);
  }

  .creator-content {
    padding: 3rem 0;
  }

  .creator-section {
    margin-bottom: 3rem;
  }

  .creator-section h2 {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 2rem;
    margin-bottom: 1.5rem;
    color: #F4C430;
  }

  .creator-card-white {
    background: white;
    border-radius: 1.25rem;
    padding: 2rem;
    box-shadow: 0 4px 16px rgba(15, 23, 42, 0.08);
    border: 1px solid #e2e8f0;
  }

  .creator-card-white p {
    line-height: 1.8;
    color: #475569;
    margin-bottom: 1rem;
  }

  .creator-card-white p:last-child {
    margin-bottom: 0;
  }

  .skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }

  .skill-badge {
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 0.75rem;
    text-align: center;
    font-weight: 600;
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
  }

  .experience-timeline {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .experience-item {
    background: white;
    border-radius: 1.25rem;
    padding: 2rem;
    border-left: 4px solid #6366f1;
    box-shadow: 0 4px 16px rgba(15, 23, 42, 0.08);
  }

  .experience-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 0.5rem;
  }

  .experience-header h3 {
    margin: 0;
    font-size: 1.5rem;
    color: #F4C430;
  }

  .experience-date {
    background: #e0e7ff;
    color: #4f46e5;
    padding: 0.4rem 0.8rem;
    border-radius: 9999px;
    font-size: 0.875rem;
    font-weight: 600;
    white-space: nowrap;
  }

  .experience-company {
    color: #6366f1;
    font-weight: 600;
    margin: 0 0 1rem 0;
  }

  .experience-item ul {
    margin: 0;
    padding-left: 1.5rem;
    color: #475569;
  }

  .experience-item li {
    margin-bottom: 0.5rem;
    line-height: 1.6;
  }

  .education-degree {
    font-weight: 600;
    color: #F4C430;
    margin: 0.5rem 0;
  }

  .education-years {
    color: #64748b;
    margin: 0;
  }

  .certifications-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
  }

  .cert-card {
    background: white;
    border: 2px solid #e0e7ff;
    border-radius: 0.75rem;
    padding: 1.25rem;
    text-align: center;
    font-weight: 600;
    color: #4f46e5;
    transition: all 0.2s;
  }

  .cert-card:hover {
    border-color: #6366f1;
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
    transform: translateY(-2px);
  }

  .contact-cta {
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: white;
    border-radius: 1.5rem;
    padding: 3rem;
    text-align: center;
  }

  .contact-cta h2 {
    margin: 0 0 1rem 0;
    font-size: 2.25rem;
    color: white;
  }

  .contact-cta p {
    margin: 0 0 2rem 0;
    font-size: 1.125rem;
    opacity: 0.95;
  }

  .contact-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  .contact-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.875rem 1.75rem;
    border-radius: 9999px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.2s;
    font-size: 1rem;
  }

  .contact-btn.primary {
    background: white;
    color: #6366f1;
  }

  .contact-btn.primary:hover {
    background: #f1f5f9;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(255,255,255,0.3);
  }

  .contact-btn.secondary {
    background: rgba(255,255,255,0.2);
    border: 2px solid white;
    color: white;
  }

  .contact-btn.secondary:hover {
    background: rgba(255,255,255,0.3);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    .creator-hero {
      flex-direction: column;
      text-align: center;
    }

    .creator-hero-avatar {
      width: 120px;
      height: 120px;
      font-size: 3rem;
    }

    .creator-hero-info h1 {
      font-size: 2rem;
    }

    .creator-hero-links {
      justify-content: center;
    }

    .experience-header {
      flex-direction: column;
      gap: 0.5rem;
    }

    .experience-date {
      align-self: flex-start;
    }

    .contact-cta {
      padding: 2rem 1.5rem;
    }
  }
`;

export default CreatorPage;
