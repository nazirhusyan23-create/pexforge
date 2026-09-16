export default function ToolArticle({ heading, intro, steps, useCases, note }) {
  return (
    <article className="mt-16 border-t border-gray-100 pt-10">
      <h2 className="text-2xl font-extrabold text-gray-900">{heading}</h2>
      {intro.map((p, i) => (
        <p key={i} className="mt-4 leading-relaxed text-gray-600">{p}</p>
      ))}

      {steps && (
        <div className="mt-8">
          <h3 className="text-lg font-bold text-gray-900">How it works</h3>
          <ol className="mt-3 space-y-2">
            {steps.map((s, i) => (
              <li key={i} className="flex gap-3 text-sm text-gray-600">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-700">
                  {i + 1}
                </span>
                <span className="pt-0.5">{s}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {useCases && (
        <div className="mt-8">
          <h3 className="text-lg font-bold text-gray-900">Common use cases</h3>
          <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {useCases.map((u, i) => (
              <li key={i} className="flex gap-2 text-sm text-gray-600">
                <span className="text-brand-600">•</span>
                {u}
              </li>
            ))}
          </ul>
        </div>
      )}

      {note && <p className="mt-8 rounded-xl bg-brand-50 p-4 text-sm text-brand-800">{note}</p>}
    </article>
  );
}
