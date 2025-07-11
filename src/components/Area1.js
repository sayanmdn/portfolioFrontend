import gitLogo from "./../assets/github.svg";
import linkedinLogo from "./../assets/linkedin-logo.svg";

export function Area1(props) {
  return (
    <div className="body-backgroud">
      <div className="home-upper">
        <div className="Area1">
          <div>
            <h1 className="typeWritter">Hi, I am Sayantan Mishra</h1>
          </div>
        </div>
        <div className="home-social-links">
          <a href="https://github.com/sayanmdn" className="social-link">
            <img src={gitLogo} className="social-icon" alt="GitHub" />
          </a>
          <a href="https://www.linkedin.com/in/sayanmdn/" className="social-link">
            <img src={linkedinLogo} className="social-icon" alt="LinkedIn" />
          </a>
        </div>
      </div>
      
      {/* About Section */}
      <div className="about-section">
        <div className="glass-card">
          <h3>About Me</h3>
          <p>
            Passionate Full Stack Developer with expertise in modern web technologies. 
            I love creating innovative solutions and building applications that make a difference.
          </p>
        </div>
      </div>

      {/* Skills Section */}
      <div className="skills-section">
        <h3>Technologies I Work With</h3>
        
        <div className="tech-category">
          <h4>Programming Languages</h4>
          <div className="skills-grid">
            <div className="skill-card glass">
              <div className="skill-icon">🔷</div>
              <span>TypeScript</span>
            </div>
            <div className="skill-card glass">
              <div className="skill-icon">☕</div>
              <span>Java</span>
            </div>
            <div className="skill-card glass">
              <div className="skill-icon">🟨</div>
              <span>JavaScript</span>
            </div>
          </div>
        </div>

        <div className="tech-category">
          <h4>Databases</h4>
          <div className="skills-grid">
            <div className="skill-card glass">
              <div className="skill-icon">🐬</div>
              <span>MySQL</span>
            </div>
            <div className="skill-card glass">
              <div className="skill-icon">🍃</div>
              <span>MongoDB</span>
            </div>
            <div className="skill-card glass">
              <div className="skill-icon">🐘</div>
              <span>PostgreSQL</span>
            </div>
          </div>
        </div>

        <div className="tech-category">
          <h4>Web Frameworks</h4>
          <div className="skills-grid">
            <div className="skill-card glass">
              <div className="skill-icon">🚀</div>
              <span>Express.js</span>
            </div>
            <div className="skill-card glass">
              <div className="skill-icon">🌱</div>
              <span>Spring Boot</span>
            </div>
            <div className="skill-card glass">
              <div className="skill-icon">🌐</div>
              <span>Apollo GraphQL</span>
            </div>
          </div>
        </div>

        <div className="tech-category">
          <h4>Frontend Technologies</h4>
          <div className="skills-grid">
            <div className="skill-card glass">
              <div className="skill-icon">⚛️</div>
              <span>React.js</span>
            </div>
            <div className="skill-card glass">
              <div className="skill-icon">🔄</div>
              <span>Redux</span>
            </div>
          </div>
        </div>

        <div className="tech-category">
          <h4>Cloud Services</h4>
          <div className="skills-grid">
            <div className="skill-card glass">
              <div className="skill-icon">☁️</div>
              <span>AWS EC2</span>
            </div>
            <div className="skill-card glass">
              <div className="skill-icon">🗄️</div>
              <span>RDS</span>
            </div>
            <div className="skill-card glass">
              <div className="skill-icon">📦</div>
              <span>S3</span>
            </div>
            <div className="skill-card glass">
              <div className="skill-icon">⚡</div>
              <span>Lambda</span>
            </div>
            <div className="skill-card glass">
              <div className="skill-icon">🐳</div>
              <span>ECS</span>
            </div>
            <div className="skill-card glass">
              <div className="skill-icon">🔗</div>
              <span>EventBridge</span>
            </div>
            <div className="skill-card glass">
              <div className="skill-icon">🏗️</div>
              <span>Terraform</span>
            </div>
            <div className="skill-card glass">
              <div className="skill-icon">🔧</div>
              <span>Terragrunt</span>
            </div>
          </div>
        </div>

        <div className="tech-category">
          <h4>Testing Frameworks</h4>
          <div className="skills-grid">
            <div className="skill-card glass">
              <div className="skill-icon">🃏</div>
              <span>Jest</span>
            </div>
            <div className="skill-card glass">
              <div className="skill-icon">☕</div>
              <span>Mocha</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access Section */}
      <div className="quick-access-section">
        <h3>Quick Access</h3>
        <div className="quick-access-grid">
          <a href="/news" className="quick-card glass">
            <div className="quick-icon">📰</div>
            <h4>Latest News</h4>
            <p>Get condensed news summaries</p>
          </a>
          <a href="/stocks" className="quick-card glass">
            <div className="quick-icon">📈</div>
            <h4>Stock Insights</h4>
            <p>Smart investment suggestions</p>
          </a>
          <a href="/warehouse" className="quick-card glass">
            <div className="quick-icon">📊</div>
            <h4>Data Warehouse</h4>
            <p>HTTP request logging tool</p>
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer-section">
        <div className="footer-content glass">
          <div className="footer-links">
            <div className="footer-column">
              <h5>Quick Links</h5>
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/news">News</a></li>
                <li><a href="/stocks">Stock Insights</a></li>
                <li><a href="/warehouse">Data Warehouse</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h5>Connect</h5>
              <ul>
                <li><a href="https://github.com/sayanmdn" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                <li><a href="https://www.linkedin.com/in/sayanmdn/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h5>Technologies</h5>
              <ul>
                <li>Full Stack Development</li>
                <li>Cloud Architecture</li>
                <li>DevOps & CI/CD</li>
                <li>Modern Web Apps</li>
              </ul>
            </div>
          </div>
          <div className="footer-divider"></div>
          <div className="footer-bottom">
            <p>&copy; 2025 Sayantan Mishra. All rights reserved.</p>
            <p className="footer-love">Developed with ❤️ by ME</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function Writer2(props) {
  return (
    <div>
      <span>Full Stack Developer</span>
    </div>
  );
}
