import { Github, Mail } from "lucide-react";
import { SITE } from "@/config/site";

const FOOTER_LINKS = [
  { label: "GitHub", href: SITE.github, Icon: Github },
  { label: "邮箱", href: `mailto:${SITE.email}`, Icon: Mail },
] as const;

export default function Footer() {
  return (
    <footer className="bg-black py-12 px-8 -mx-8 relative z-10 border-t-4 border-black">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="border-4 border-white rounded-xl px-4 py-2">
          <span className="text-white font-extrabold text-xl">{SITE.name}</span>
        </div>
        <div className="flex items-center gap-8">
          {FOOTER_LINKS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-white font-bold hover:text-brand-pink transition-colors flex items-center gap-2"
            >
              <item.Icon size={18} />
              {item.label}
            </a>
          ))}
        </div>
        <p className="text-gray-500 font-bold">© {new Date().getFullYear()} {SITE.name} 个人主页</p>
      </div>
    </footer>
  );
}
