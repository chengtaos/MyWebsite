import { motion } from "motion/react";
import type { TabType } from "@/types";
import { NAV_LABELS } from "@/constants/text";

export interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const TABS: { id: TabType; label: string }[] = [
  { id: "home", label: NAV_LABELS.home },
  { id: "portfolio", label: NAV_LABELS.portfolio },
  { id: "about", label: NAV_LABELS.about },
];

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  return (
    <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-3xl">
      <div className="bg-white border-4 border-black rounded-full px-6 py-3 flex items-center justify-center gap-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex items-center gap-6 md:gap-8">
          {TABS.map((tab) => (
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
