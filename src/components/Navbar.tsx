import { motion } from "motion/react";
import type { TabType, TabConfig } from "@/src/types";
import { SITE } from "@/src/config/site";

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const NAV_TABS: TabConfig[] = [
  { id: "home", label: "首页" },
  { id: "portfolio", label: "作品集" },
  { id: "about", label: "关于我" },
];

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  return (
    <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-3xl">
      <div className="bg-white border-4 border-black rounded-full px-6 py-3 flex items-center justify-center gap-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        <div
          className="flex items-center cursor-pointer shrink-0"
          onClick={() => setActiveTab("home")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && setActiveTab("home")}
        >
          <div className="w-8 h-8 rounded-full border-4 border-black flex items-center justify-center font-bold text-xl">
            {SITE.name.charAt(0)}
          </div>
        </div>

        <div className="flex items-center gap-6 md:gap-8">
          {NAV_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`font-semibold text-lg hover:text-brand-pink transition-colors relative ${
                activeTab === tab.id ? "text-brand-pink" : "text-black"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-pink"
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
