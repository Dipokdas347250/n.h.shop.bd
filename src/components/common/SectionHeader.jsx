import Link from "next/link";
import { ArrowRight } from "lucide-react";

/** Shared eyebrow + heading block used by the home page sections. */
export default function SectionHeader({ eyebrow, title, subtitle, actionLabel, actionHref, centered = false }) {
  if (centered) {
    return (
      <div className="mb-10 text-center">
        {eyebrow && <p className="mb-2 text-sm font-semibold uppercase tracking-[0.22em] text-[#16863D]">{eyebrow}</p>}
        <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">{title}</h2>
        {subtitle && <p className="mx-auto mt-3 max-w-2xl text-gray-600">{subtitle}</p>}
      </div>
    );
  }

  return (
    <div className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
      <div>
        {eyebrow && <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#16863D]">{eyebrow}</p>}
        <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">{title}</h2>
        {subtitle && <p className="mt-3 max-w-2xl text-gray-600">{subtitle}</p>}
      </div>
      {actionHref && (
        <Link
          href={actionHref}
          className="inline-flex items-center gap-2 self-start rounded-full border-2 border-[#16863D] px-5 py-2.5 font-semibold text-[#062B63] transition hover:bg-[#16863D] hover:text-white"
        >
          {actionLabel}
          <ArrowRight size={18} />
        </Link>
      )}
    </div>
  );
}
