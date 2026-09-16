import Link from "next/link";

export default function ToolCard({ href, icon, title, description, badge }) {
  return (
    <Link
      href={href}
      className="group relative flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-brand-300 hover:shadow-md"
    >
      {badge && (
        <span className="absolute right-4 top-4 rounded-full bg-brand-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand-700">
          {badge}
        </span>
      )}
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-2xl">{icon}</div>
      <h3 className="text-lg font-bold text-gray-900 group-hover:text-brand-600">{title}</h3>
      <p className="text-sm leading-relaxed text-gray-600">{description}</p>
    </Link>
  );
}
