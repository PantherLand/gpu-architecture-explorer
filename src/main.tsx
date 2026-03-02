import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { AnimatePresence, motion } from "motion/react";
import App from "./App.tsx";
import LandingPage from "./LandingPage.tsx";
import "./index.css";

function Root() {
  const [showExplorer, setShowExplorer] = useState(false);

  return (
    <AnimatePresence mode="wait">
      {showExplorer ? (
        <motion.div
          key="explorer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <App onBack={() => setShowExplorer(false)} />
        </motion.div>
      ) : (
        <motion.div
          key="landing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <LandingPage onEnter={() => setShowExplorer(true)} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
