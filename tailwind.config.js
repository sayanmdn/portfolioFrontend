module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        // Glassmorphism 2.0 Dark Mode Variables
        'bg-primary': '#0a0a0f',
        'bg-secondary': '#151520',
        'bg-tertiary': '#1a1a2e',
        'surface-glass': 'rgba(255, 255, 255, 0.05)',
        'surface-glass-hover': 'rgba(255, 255, 255, 0.08)',
        'surface-glass-active': 'rgba(255, 255, 255, 0.12)',
        'text-primary': '#ffffff',
        'text-secondary': 'rgba(255, 255, 255, 0.8)',
        'text-muted': 'rgba(255, 255, 255, 0.6)',
        'accent-primary': '#6366f1',
        'accent-secondary': '#8b5cf6',
        'border-glass': 'rgba(255, 255, 255, 0.1)',
        'border-glass-strong': 'rgba(255, 255, 255, 0.2)',
      },
      backgroundImage: {
        'accent-gradient': 'linear-gradient(135deg, #6366f1, #8b5cf6)',
        'glass-bg': `
          radial-gradient(circle at 20% 30%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 80%, rgba(59, 130, 246, 0.05) 0%, transparent 50%)
        `,
      },
      backdropBlur: {
        'glass': '16px',
        'glass-strong': '24px',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0, 0, 0, 0.3)',
        'glass-strong': '0 20px 60px rgba(0, 0, 0, 0.4)',
      },
      borderRadius: {
        'glass': '16px',
        'glass-strong': '20px',
      },
      fontFamily: {
        'sans': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'],
        'mono': ['JetBrains Mono', 'source-code-pro', 'Menlo', 'Monaco', 'Consolas', 'Courier New', 'monospace'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 2s ease-out forwards',
        'pulse-slow': 'pulse 2s infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}