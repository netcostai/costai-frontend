export function Features() {
  const features = [
    { title: "90% Savings", desc: "Drastically reduce overhead by bypassing retail markups." },
    { title: "Prompt Caching", desc: "Lower data costs instantly." },
    { title: "Daily Limits", desc: "Control your budget." }
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 py-24">
      {features.map((f, i) => (
        <div key={i} className="group relative p-8 rounded-3xl bg-neutral-900 border border-neutral-800 overflow-hidden transition-all hover:border-primary/50">
          {/* Subtle glow on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <h3 className="text-lg font-semibold mb-2 relative z-10">{f.title}</h3>
          <p className="text-neutral-400 text-sm leading-relaxed relative z-10">{f.desc}</p>
        </div>
      ))}
    </section>
  )
}
