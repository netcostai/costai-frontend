export function Navbar() {
  return (
    <nav className="flex items-center justify-between py-6 border-b border-neutral-800 mb-12">
      <div className="text-xl font-bold tracking-tighter">CostAI</div>
      <div className="flex gap-8 text-sm text-neutral-400">
        <a href="#" className="hover:text-white transition">Architecture</a>
        <a href="#" className="hover:text-white transition">Pricing</a>
        <a href="#" className="hover:text-white transition">Docs</a>
      </div>
      <button className="bg-white text-black px-4 py-2 rounded-lg text-sm font-semibold hover:bg-neutral-200 transition">
        Launch Pilot
      </button>
    </nav>
  )
}
