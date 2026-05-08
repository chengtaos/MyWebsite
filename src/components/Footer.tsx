import { Lock, Unlock } from "lucide-react";
import { SITE } from "@/config/site";
import { useEditMode } from "@/hooks/useEditMode";
import { EDIT_MODE } from "@/constants/text";

const FOOTER_LINKS = [
  { label: "GitHub", href: SITE.github },
  { label: "邮箱", href: `mailto:${SITE.email}` },
] as const;

export default function Footer() {
  const { editMode, toggleEditMode } = useEditMode();

  return (
    <footer className="bg-black py-12 px-8 -mx-8 relative z-10 border-t-4 border-black">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-white flex items-center justify-center font-bold text-2xl text-white">
            {SITE.name.charAt(0)}
          </div>
          <p className="text-white text-xl font-bold">{SITE.name}</p>
        </div>
        <div className="flex items-center gap-8">
          {FOOTER_LINKS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-white font-bold hover:text-brand-pink transition-colors"
            >
              {item.label}
            </a>
          ))}
          <button
            onClick={toggleEditMode}
            className={`w-10 h-10 rounded-xl border-2 font-bold flex items-center justify-center transition-all ${
              editMode
                ? "border-brand-pink text-brand-pink bg-brand-pink/20"
                : "border-white text-white hover:border-brand-yellow hover:text-brand-yellow"
            }`}
            title={editMode ? EDIT_MODE.toggleOff : EDIT_MODE.toggleOn}
          >
            {editMode ? <Unlock size={18} /> : <Lock size={18} />}
          </button>
        </div>
        <p className="text-gray-500 font-bold">© {new Date().getFullYear()} {SITE.name} 个人主页</p>
      </div>
    </footer>
  );
}
