import type { LucideIcon } from "lucide-react";

export interface SectionHeaderProps {
  icon: LucideIcon;
  title: string;
}

export default function SectionHeader({ icon: Icon, title }: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-3">
      <Icon size={28} className="text-black shrink-0" />
      <h3 className="text-3xl font-extrabold">{title}</h3>
    </div>
  );
}
