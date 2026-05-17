import { createSystem, defaultConfig } from "@chakra-ui/react"

export const system = createSystem(defaultConfig, {
  theme: {
    semanticTokens: {
      colors: {
        brand: {
          ink: { value: "var(--theme-text)" },
          inkSoft: { value: "var(--theme-text-soft)" },
          paper: { value: "var(--theme-bg)" },
          paperDeep: { value: "var(--theme-bg-deep)" },
          cardBg: { value: "var(--theme-card-bg)" },
          markerYellow: { value: "var(--theme-marker-yellow)" },
          markerRed: { value: "var(--theme-marker-red)" },
          markerPink: { value: "var(--theme-marker-pink)" },
          markerGreen: { value: "var(--theme-marker-green)" },
          solana: { value: "var(--theme-solana)" },
          cyan: { value: "var(--theme-marker-green)" },
          purple: { value: "var(--theme-marker-yellow)" },
        },
      },
      fonts: {
        heading: { value: "var(--theme-font-heading)" },
        body: { value: "var(--theme-font-body)" },
        handwritten: { value: "var(--theme-font-heading)" },
      },
    },
  },
  globalCss: {
    "html, body": {
      /* Background and color handled by globals.css now for pure CSS transition */
    },
  },
})
