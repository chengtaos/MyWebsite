import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { TabType } from "@/types";
import { EditModeProvider } from "@/hooks/useEditMode";
import { ContentProvider } from "@/contexts/ContentContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import Services from "@/components/Services";
import AboutSection from "@/components/AboutSection";
import Experience from "@/components/Experience";
import Portfolio from "@/components/Portfolio";

const Home = ({ onPortfolioClick }: { onPortfolioClick: () => void }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <Hero onPortfolioClick={onPortfolioClick} />
    <Ticker />
    <Services />
    <AboutSection />
    <Experience />
  </motion.div>
);

const About = () => (
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
      <ContentProvider>
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
      </ContentProvider>
    </EditModeProvider>
  );
}
