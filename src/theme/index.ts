import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const config = defineConfig({
    theme: {
        tokens: {
            colors: {
                brand: {
                    pink: { value: "#FF0080" },
                    cyan: { value: "#00BFFF" },
                    yellow: { value: "#FFE600" },
                    purple: { value: "#7928CA" },
                    dark: { value: "#1A0B2E" },
                },
            },
            fonts: {
                heading: { value: "'Bangers', system-ui" },
                subheading: { value: "'Fredoka', sans-serif" },
                body: { value: "'Outfit', sans-serif" },
            },
            radii: {
                xl: { value: "1.5rem" },
                "2xl": { value: "2rem" },
            },
        },
        semanticTokens: {
            colors: {
                bg: { value: "{colors.brand.dark}" },
                card: { value: "rgba(255, 255, 255, 0.05)" },
                text: { value: "white" },
            },
        },
        // We can add global styles or component recipes here if using Chakra v3 properly
    },
})

export const system = createSystem(defaultConfig, config)
