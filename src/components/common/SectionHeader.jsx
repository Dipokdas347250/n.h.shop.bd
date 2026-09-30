import Link from "next/link";
import { ArrowRight } from "lucide-react";

/** Shared eyebrow + heading block used by the home page sections. */
export default function SectionHeader({ eyebrow, title, subtitle, actionLabel, actionHref, centered = false }) {
  if (centered) {
    return (
      <div className="mb-4 text-center md:mb-10">
        {eyebrow && <p className="mb-1 text-xs font-semibold uppercase tracking-[0.22em] text-[#16863D] md:mb-2 md:text-sm">{eyebrow}</p>}
        <h2 className="text-2xl font-bold text-gray-900 md:text-4xl">{title}</h2>
        {subtitle && <p className="mx-auto mt-1.5 max-w-2xl text-sm text-gray-600 md:mt-3 md:text-base">{subtitle}</p>}
      </div>
    );
  }

  return (
    <div className="mb-4 flex items-end justify-between gap-3 md:mb-10 md:gap-4">
      <div className="min-w-0">
        {eyebrow && <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[#16863D] md:mb-2 md:text-sm">{eyebrow}</p>}
        <h2 className="text-2xl font-bold text-gray-900 md:text-4xl">{title}</h2>
        {subtitle && <p className="mt-1.5 max-w-2xl text-sm text-gray-600 md:mt-3 md:text-base">{subtitle}</p>}
      </div>
      {actionHref && (
        <Link
          href={actionHref}
          className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border-2 border-[#16863D] px-3 py-1.5 text-sm font-semibold text-[#062B63] transition hover:bg-[#16863D] hover:text-white md:gap-2 md:px-5 md:py-2.5 md:text-base"
        >
          {actionLabel}
          <ArrowRight size={18} />
        </Link>
      )}
    </div>
  );
}
