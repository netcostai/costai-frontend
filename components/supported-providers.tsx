import { PROVIDERS } from "@/lib/providers";

export function SupportedProviders() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <p className="text-center text-sm text-muted mb-6">
        Bring your own key for the AI tools you already use
      </p>
      <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
        {PROVIDERS.map((p) => (
          <div key={p.id} className="flex items-center gap-2.5">
            <div
              className="h-8 w-8 rounded-lg flex items-center justify-center text-sm font-bold"
              style={{
                backgroundColor: `${p.color}1a`,
                border: `1px solid ${p.color}40`,
                color: p.color,
              }}
            >
              {p.displayName[0]}
            </div>
            <span className="text-lg font-semibold" style={{ color: p.color }}>
              {p.displayName}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
