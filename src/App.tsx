import { BrowserRouter } from "react-router";
import { AppRoutes } from "./routes";
import { AuthProvider } from "./contexts/auth/auth.context";

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
