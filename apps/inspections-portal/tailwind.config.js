/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Magenta brand identity.
        brand: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
        },
        ink: {
          50: '#f6f7f9',
          100: '#eceef2',
          200: '#d4d9e2',
          300: '#aeb7c7',
          400: '#8290a8',
          500: '#62718c',
          600: '#4d5a73',
          700: '#3f495d',
          800: '#373f4f',
          900: '#1c2230',
          950: '#11151d',
        },
        // Cool lavender-clay neutrals: a soft mauve base so raised "clay"
        // surfaces pop while keeping the magenta brand identity for accents.
        clay: {
          bg: '#efe7f3',
          surface: '#faf5fc',
          50: '#fbf7fd',
          100: '#f4eaf8',
          200: '#ecdcf2',
          300: '#dcc3e6',
          400: '#c9a6d6',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Segoe UI', 'sans-serif'],
      },
      borderRadius: {
        clay: '1.5rem',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(217,70,239,0.15), 0 10px 40px -10px rgba(217,70,239,0.35)',
        card: '0 1px 2px rgba(16,24,40,0.06), 0 12px 32px -12px rgba(16,24,40,0.18)',
        // Claymorphism (refined/subtle), cool mauve-tinted: dark bottom-right
        // drop + light top-left highlight. Inset variants for recessed inputs.
        clay: '6px 6px 14px rgba(168,140,184,0.40), -6px -6px 14px rgba(255,255,255,0.90)',
        'clay-sm': '3px 3px 8px rgba(168,140,184,0.35), -3px -3px 8px rgba(255,255,255,0.85)',
        'clay-inset':
          'inset 4px 4px 8px rgba(168,140,184,0.40), inset -4px -4px 8px rgba(255,255,255,0.90)',
        'clay-pressed':
          'inset 5px 5px 10px rgba(168,140,184,0.50), inset -4px -4px 8px rgba(255,255,255,0.80)',
        'clay-brand':
          '5px 5px 12px rgba(217,70,239,0.28), -5px -5px 12px rgba(255,255,255,0.75)',
      },
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseRing: {
          '0%': { boxShadow: '0 0 0 0 rgba(217,70,239,0.5)' },
          '70%': { boxShadow: '0 0 0 14px rgba(217,70,239,0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(217,70,239,0)' },
        },
      },
      animation: {
        shimmer: 'shimmer 2s infinite',
        float: 'float 6s ease-in-out infinite',
        pulseRing: 'pulseRing 2s infinite',
      },
    },
  },
  plugins: [],
}
