import { AnimatePresence } from "framer-motion";
import { Router } from "./routes";
import { useAuthState } from "./hooks";
import AuthContext from "./contexts/AuthContext"

function App() {
  const { authState, setAuthState } = useAuthState()

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <AnimatePresence mode="wait" initial={false}>
        <Router />
      </AnimatePresence>
    </AuthContext.Provider>
  )
}

export default App
