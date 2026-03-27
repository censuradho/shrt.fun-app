import { BrowserRouter } from "react-router";
import { AppRoutes } from "./routes";
import { AuthProvider } from "./contexts/auth/auth.context";
import { ThemeProvider } from "./contexts/theme.context.tsx";
import { Toaster } from "sonner";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";

function App() {

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
