import { AnimatePresence } from "framer-motion";
import { Router } from "./routes";
import { useAuthState } from "./hooks";

function App() {
  const { authState } = useAuthState()
  console.log(authState)

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Router />
    </AnimatePresence>
  )
}

export default App
