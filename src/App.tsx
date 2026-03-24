import { BrowserRouter } from "react-router";
import { AppRoutes } from "./routes";
import { AuthProvider } from "./contexts/auth/auth.context";
import { Toaster } from "sonner";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";

function App() {

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  )
}

export default App
