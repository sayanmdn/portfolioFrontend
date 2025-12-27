import React, { useEffect, useRef } from 'react';
import gitLogo from "./../assets/github.svg";
import linkedinLogo from "./../assets/linkedin-logo.svg";

export function Area1(props) {
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1 });

    const sections = document.querySelectorAll('.fade-in-section');
    sections.forEach((section) => observerRef.current.observe(section));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div className="font-sans text-slate-light max-w-[1200px] mx-auto px-6 md:px-12 lg:px-24">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-start fade-in-section is-visible">
        <h1 className="text-teal-300 font-mono text-base md:text-lg mb-5 ml-1">Hi, my name is</h1>
        <h2 className="big-heading text-slate-lightest font-bold tracking-tight">Sayantan Mishra.</h2>
        <h3 className="big-heading text-slate text-4xl md:text-6xl font-bold mt-2">I build things for the web.</h3>

        <p className="mt-6 max-w-[540px] text-lg text-slate leading-relaxed">
          I'm a Full Stack Developer specializing in building (and occasionally designing) exceptional digital experiences. Currently, I'm focused on building accessible, human-centered products.
        </p>

        <a href="mailto:sayanmdn@gmail.com" className="email-link mt-12">
          Check out my resume!
        </a>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 fade-in-section">
        <h2 className="numbered-heading">About Me</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="text-base text-slate space-y-4">
            <p>
              Hello! My name is Sayantan and I enjoy creating things that live on the internet. My interest in web development started back in 2020 when I decided to try building a custom tumblr theme — turns out hacking together buttons and HTML & CSS taught me a lot about HTML & CSS!
            </p>
            <p>
              Fast-forward to today, and I've had the privilege of working at <span className="text-teal-300">an innovative startup</span>, and <span className="text-teal-300">a huge corporation</span>. My main focus these days is building accessible, inclusive products and digital experiences for a variety of clients.
            </p>
            <p>Here are a few technologies I've been working with recently:</p>
            <ul className="grid grid-cols-2 gap-2 mt-4 font-mono text-sm max-w-[400px]">
              <li className="flex items-center before:content-['▹'] before:text-teal-300 before:mr-2">JavaScript (ES6+)</li>
              <li className="flex items-center before:content-['▹'] before:text-teal-300 before:mr-2">TypeScript</li>
              <li className="flex items-center before:content-['▹'] before:text-teal-300 before:mr-2">React</li>
              <li className="flex items-center before:content-['▹'] before:text-teal-300 before:mr-2">Java Spring Boot</li>
              <li className="flex items-center before:content-['▹'] before:text-teal-300 before:mr-2">Node.js</li>
              <li className="flex items-center before:content-['▹'] before:text-teal-300 before:mr-2">AWS</li>
            </ul>
          </div>
          <div className="flex justify-center md:justify-start group relative">
            <div className="relative w-[300px] h-[300px] transition-all duration-300 group-hover:-translate-y-2 group-hover:-translate-x-2">
              <div className="absolute inset-0 border-2 border-teal-300 rounded-lg translate-x-5 translate-y-5 transition-all duration-300 group-hover:translate-x-3 group-hover:translate-y-3"></div>
              <div className="absolute inset-0 bg-teal-300/20 rounded-lg z-10 transition-all duration-300 group-hover:bg-transparent"></div>
              <div className="w-full h-full bg-slate-lightest rounded-lg overflow-hidden relative z-0">
                {/* Placeholder for actual image if available, using a pattern for now */}
                <div className="w-full h-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-80"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience / Projects Section */}
      <section id="work" className="py-24 fade-in-section">
        <h2 className="numbered-heading">Some Things I've Built</h2>

        {/* Project 1 */}
        <div className="mb-24 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-7 bg-navy-700 rounded shadow-xl overflow-hidden relative group h-[300px] md:h-auto order-2 md:order-1">
            <div className="w-full h-full bg-teal-300/10 transition-colors group-hover:bg-transparent absolute inset-0 z-10"></div>
            <div className="w-full h-full bg-gradient-to-tr from-slate-800 to-slate-900 flex items-center justify-center">
              <span className="text-6xl">📊</span>
            </div>
          </div>
          <div className="md:col-span-5 text-left md:text-right z-20 order-1 md:order-2">
            <p className="font-mono text-teal-300 text-sm mb-2">Featured Project</p>
            <h3 className="text-2xl font-bold text-slate-lightest mb-4">Stock Insights</h3>
            <div className="bg-navy-800 p-6 rounded-md shadow-xl text-slate-light text-sm mb-4">
              A robust stock market analysis tool providing real-time data visualization and smart investment suggestions using advanced algorithms.
            </div>
            <ul className="flex flex-wrap justify-start md:justify-end gap-4 font-mono text-xs text-slate-light mb-8">
              <li>React</li>
              <li>D3.js</li>
              <li>Node.js</li>
              <li>Alpha Vantage API</li>
            </ul>
            <div className="flex justify-start md:justify-end gap-4">
              <a href="/stocks" className="text-slate-light hover:text-teal-300 transition-colors"><span className="sr-only">External Link</span>↗</a>
            </div>
          </div>
        </div>

        {/* Project 2 */}
        <div className="mb-24 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-5 text-left z-20 order-1">
            <p className="font-mono text-teal-300 text-sm mb-2">Featured Project</p>
            <h3 className="text-2xl font-bold text-slate-lightest mb-4">Data Warehouse</h3>
            <div className="bg-navy-800 p-6 rounded-md shadow-xl text-slate-light text-sm mb-4">
              A comprehensive logging and analytics platform for tracking HTTP requests and monitoring system performance in real-time.
            </div>
            <ul className="flex flex-wrap justify-start gap-4 font-mono text-xs text-slate-light mb-8">
              <li>Spring Boot</li>
              <li>PostgreSQL</li>
              <li>Docker</li>
              <li>AWS RDS</li>
            </ul>
            <div className="flex justify-start gap-4">
              <a href="/warehouse" className="text-slate-light hover:text-teal-300 transition-colors"><span className="sr-only">External Link</span>↗</a>
            </div>
          </div>
          <div className="md:col-span-7 bg-navy-700 rounded shadow-xl overflow-hidden relative group h-[300px] md:h-auto order-2">
            <div className="w-full h-full bg-teal-300/10 transition-colors group-hover:bg-transparent absolute inset-0 z-10"></div>
            <div className="w-full h-full bg-gradient-to-bl from-blue-900 to-slate-900 flex items-center justify-center">
              <span className="text-6xl">🗄️</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-10 fade-in-section">
        <div className="flex justify-center gap-8 mb-6">
          <a href="https://github.com/sayanmdn" className="text-slate hover:text-teal-300 transition-colors transform hover:-translate-y-1 block">
            <img src={gitLogo} className="w-6 h-6 filter invert opacity-70 hover:opacity-100" alt="GitHub" />
          </a>
          <a href="https://www.linkedin.com/in/sayanmdn/" className="text-slate hover:text-teal-300 transition-colors transform hover:-translate-y-1 block">
            <img src={linkedinLogo} className="w-6 h-6 filter invert opacity-70 hover:opacity-100" alt="LinkedIn" />
          </a>
        </div>
        <p className="font-mono text-xs text-slate-light hover:text-teal-300 cursor-default transition-colors">
          Designed & Built by Sayantan Mishra
        </p>
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
