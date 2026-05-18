import { Code } from "lucide-react";
import { SITE } from "@/config/site";

export default function StatusBar() {
  return (
    <div className="max-w-4xl mx-auto bg-white border-4 border-black rounded-3xl p-6 flex items-center gap-6 shadow-[8px_8px_0px_0px_rgba(108,99,255,1)] hover:shadow-none transition-all group">
      <div className="bg-brand-yellow p-4 rounded-2xl border-4 border-black group-hover:rotate-12 transition-transform shrink-0">
        <Code size={32} className="text-black" />
      </div>
      <div className="space-y-1 flex-1 min-w-0">
        <h4 className="text-xl font-extrabold uppercase">近期在做</h4>
        <p className="text-gray-600 font-bold text-lg">
          {SITE.status}
        </p>
      </div>
    </div>
  );
}
