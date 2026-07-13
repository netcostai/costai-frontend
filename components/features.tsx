export function Features() {
  const features = [
    { title: "90% Savings", desc: "Drastically reduce overhead by bypassing retail markups." },
    { title: "Prompt Caching", desc: "Lower data costs instantly with our gateway." },
    { title: "Daily Limits", desc: "Control your budget with strict usage caps." }
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 py-12">
      {features.map((f, i) => (
        <div key={i} className="p-8 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-neutral-600 transition-all">
          <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
          <p className="text-neutral-400 text-sm leading-relaxed">{f.desc}</p>
        </div>
      ))}
    </section>
  )
}
