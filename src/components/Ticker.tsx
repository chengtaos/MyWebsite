import { Zap, Globe, Layout } from "lucide-react";

const TICKER_ITEMS = [
  { label: "SPICY FOOD LOVER", Icon: Zap },
  { label: "HARDCORE SURFING", Icon: Globe },
  { label: "VIBE CODER", Icon: Layout },
  { label: "PHOTOGRAPHY", Icon: Zap },
  { label: "COOK", Icon: Globe },
] as const;

const MARQUEE_ITEMS = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS];

export default function Ticker() {
  return (
    <div className="bg-black py-8 -mx-8 overflow-hidden -rotate-2 scale-105 border-y-4 border-black">
      <div className="animate-marquee">
        {MARQUEE_ITEMS.map((item, idx) => (
          <div key={idx} className="flex items-center gap-4 px-12 text-white transition-all hover:rotate-2 hover:text-brand-pink cursor-default group">
            <item.Icon className="w-8 h-8 group-hover:scale-110 transition-transform" />
            <span className="text-3xl font-extrabold uppercase tracking-tighter">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
