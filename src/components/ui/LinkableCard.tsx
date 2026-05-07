import { type ReactNode } from "react";
import { ExternalLink } from "lucide-react";

interface LinkableCardProps {
  href?: string;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  hoverColor?: string;
}

export default function LinkableCard({
  href,
  title,
  children,
  footer,
  hoverColor = "hover:bg-brand-yellow/20",
}: LinkableCardProps) {
  const isLink = Boolean(href);
  const Tag = isLink ? "a" : "div";
  const linkProps = isLink
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : {};

  const content = (
    <>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className={`text-2xl font-extrabold ${isLink ? "group-hover:underline" : ""}`}>
            {title}
          </h4>
          {isLink && (
            <ExternalLink
              size={20}
              className="text-gray-400 group-hover:text-black transition-colors shrink-0"
            />
          )}
        </div>
        {children}
      </div>
      {footer}
    </>
  );

  return (
    <Tag
      {...linkProps}
      className={`brutalist-card p-8 flex flex-col justify-between gap-6 ${
        isLink ? `cursor-pointer group ${hoverColor}` : ""
      }`}
    >
      {content}
    </Tag>
  );
}
