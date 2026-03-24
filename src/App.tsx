import { BrowserRouter } from "react-router";
import { AppRoutes } from "./routes";
import { AuthProvider } from "./contexts/auth/auth.context";
import { Toaster } from "sonner";

function App() {

  return (
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
  )
}

export default App
