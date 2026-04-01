import { BrowserRouter } from "react-router";
import { AppRoutes } from "./routes";
import { AuthProvider } from "./contexts/auth/auth.context";
import { ThemeProvider } from "./contexts/theme.context.tsx";
import { Toaster } from "sonner";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { useEffect } from "react";
import { ping } from "./services/api/index.ts";
import ReactGA from "react-ga4";

function App() {

  useEffect(() => {
    ping()
      .then(() => console.log('API is healthy'))
      .catch(() => console.error('API is not healthy'))
  }, [])

  useEffect(() => {
    if (!import.meta.env.VITE_GA_TRACKING_ID) return;

    ReactGA.initialize(import.meta.env.VITE_GA_TRACKING_ID || "")
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <BrowserRouter>
          <AuthProvider>
            <Toaster
              theme="dark"
              richColors
              position="bottom-right"
              closeButton
            />
            <AppRoutes />
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
