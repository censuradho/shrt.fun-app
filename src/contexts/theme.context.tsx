import { ThemeProvider as NextThemeProvider, useTheme as useNextTheme } from "next-themes"
import { createContext, useContext } from "react"

interface ThemeContextValue {
  theme: string | undefined
  setTheme: (theme: string) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ThemeContextBridge>{children}</ThemeContextBridge>
    </NextThemeProvider>
  )
}

function ThemeContextBridge({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useNextTheme()

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error("useTheme must be used within ThemeProvider")
  return context
}
