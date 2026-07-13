export function Features() {
  const features = [
    { title: "90% Savings", desc: "Drastically reduce overhead." },
    { title: "Prompt Caching", desc: "Lower data costs instantly." },
    { title: "Daily Limits", desc: "Control your budget." }
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
      {features.map((f, i) => (
        <div key={i} className="p-8 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-primary transition-all duration-300">
          <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
            ✦
          </div>
          <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
          <p className="text-neutral-400 text-sm">{f.desc}</p>
        </div>
      ))}
    </section>
  )
}
