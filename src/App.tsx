import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "./components/Navbar.tsx";
import Hero from "./components/Hero.tsx";
import Ticker, { Services } from "./components/Services.tsx";
import { AboutSection, Experience } from "./components/AboutSection.tsx";
import Portfolio from "./components/Portfolio.tsx";

const FOOTER_LINKS = [
  { label: "GitHub", href: "https://github.com/chengtaos" },
  { label: "邮箱", href: "mailto:2833909302@qq.com" }
] as const;

const Footer = () => (
  <footer className="bg-black py-12 px-8 -mx-8 relative z-10 border-t-4 border-black">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-white flex items-center justify-center font-bold text-2xl text-white">
          W
        </div>
        <p className="text-white text-xl font-bold">汪汪队记大过</p>
      </div>
      <div className="flex gap-8">
        {FOOTER_LINKS.map((item) => (
          <a 
            key={item.label} 
            href={item.href} 
            className="text-white font-bold hover:text-brand-pink transition-colors"
          >
            {item.label}
          </a>
        ))}
      </div>
      <p className="text-gray-500 font-bold">© 2026 汪汪队记大过 个人主页</p>
    </div>
  </footer>
);

const Home = ({ onPortfolioClick }: { onPortfolioClick: () => void; key?: string }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <Hero onPortfolioClick={onPortfolioClick} />
    <Ticker />
    <Services />
    <AboutSection />
    <Experience />
  </motion.div>
);

const About = ({}: { key?: string }) => (
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
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="min-h-screen relative overflow-x-hidden font-sans">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="container mx-auto px-4">
        <AnimatePresence mode="wait">
          {activeTab === "home" && (
            <Home key="home" onPortfolioClick={() => setActiveTab("portfolio")} />
          )}
          {activeTab === "about" && (
            <About key="about" />
          )}
          {activeTab === "portfolio" && (
            <Portfolio key="portfolio" />
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

