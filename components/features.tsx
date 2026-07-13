export function Features() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
      {[
        { title: "90% Savings", desc: "Drastically reduce overhead." },
        { title: "Prompt Caching", desc: "Lower data costs instantly." },
        { title: "Spend Limits", desc: "Control your budget daily." }
      ].map((feature, i) => (
        <div key={i} className="p-6 border border-neutral-800 rounded-2xl bg-neutral-900/30 hover:border-neutral-600 transition-all">
          <h3 className="font-semibold text-lg">{feature.title}</h3>
          <p className="text-sm text-gray-400 mt-2">{feature.desc}</p>
        </div>
      ))}
    </section>
  )
}
