import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { AnimatePresence, motion } from "motion/react";
import App from "./App.tsx";
import LandingPage from "./LandingPage.tsx";
import {
  buildExplorerPath,
  parseExplorerPath,
  type ExplorerRouteState,
} from "./routes";
import "./index.css";

function Root() {
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setPathname(window.location.pathname);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    if (pathname !== "/" && !parseExplorerPath(pathname)) {
      window.history.replaceState({}, "", "/");
      setPathname("/");
    }
  }, [pathname]);

  const navigateTo = (nextPath: string, replace = false, scrollToTop = !replace) => {
    if (window.location.pathname === nextPath) {
      return;
    }

    if (replace) {
      window.history.replaceState({}, "", nextPath);
    } else {
      window.history.pushState({}, "", nextPath);
    }

    setPathname(nextPath);

    if (scrollToTop) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  };

  const routeState = parseExplorerPath(pathname);
  const showingExplorer = Boolean(routeState);

  const syncRouteState = (nextState: ExplorerRouteState) => {
    navigateTo(buildExplorerPath(nextState), true);
  };

  return (
    <AnimatePresence mode="wait">
      {showingExplorer ? (
        <motion.div
          key="explorer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <App
            routeState={routeState ?? undefined}
            onBack={() => navigateTo("/")}
            onRouteStateChange={syncRouteState}
          />
        </motion.div>
      ) : (
        <motion.div
          key="landing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <LandingPage onNavigate={(nextPath) => navigateTo(nextPath)} />
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
