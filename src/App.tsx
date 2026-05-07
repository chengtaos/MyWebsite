import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { TabType } from "@/src/types";
import { EditModeProvider } from "@/src/hooks/useEditMode";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import Hero from "@/src/components/Hero";
import Ticker from "@/src/components/Ticker";
import Services from "@/src/components/Services";
import AboutSection from "@/src/components/AboutSection";
import Experience from "@/src/components/Experience";
import Portfolio from "@/src/components/Portfolio";

const Home = ({ onPortfolioClick }: { onPortfolioClick: () => void; key?: string }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <Hero onPortfolioClick={onPortfolioClick} />
    <Ticker />
    <Services />
    <AboutSection />
    <Experience />
  </motion.div>
);

const About = ({ key: _key }: { key?: string }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="pt-40 pb-24"
  >
    <AboutSection />
    <Experience />
  </motion.div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>("home");

  return (
    <EditModeProvider>
      <div className="min-h-screen relative overflow-x-hidden font-sans">
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="container mx-auto px-4">
          <AnimatePresence mode="wait">
            {activeTab === "home" && (
              <Home key="home" onPortfolioClick={() => setActiveTab("portfolio")} />
            )}
            {activeTab === "about" && <About key="about" />}
            {activeTab === "portfolio" && <Portfolio key="portfolio" />}
          </AnimatePresence>
        </main>

        <Footer />
      </div>
    </EditModeProvider>
  );
}
