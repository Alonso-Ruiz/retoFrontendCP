export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--bg-deep)",
        surface: "var(--bg-surface)",
        elevated: "var(--bg-elevated)",
        void: "var(--bg-void)",
        brandRed: "var(--red-fire)",
        brandRedGlow: "var(--red-glow)",
        brandRedDeep: "var(--red-deep)",
        brandRedEmber: "var(--red-ember)",
        borderSubtle: "var(--border-subtle)",
        borderRed: "var(--border-red)",
        textBright: "var(--text-bright)",
        textPrimary: "var(--text-primary)",
        textSecondary: "var(--text-secondary)",
        textMuted: "var(--text-muted)",
        goldAccent: "var(--gold-accent)"
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        display: ['Bebas Neue', 'sans-serif']
      }
    },
  },
  plugins: [],
}
