export function Navbar() {
  return (
    /* Added backdrop-blur and border-b for depth */
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-xl font-bold">CostAI</div>
        <div className="flex gap-8 text-sm text-neutral-400">
          <a href="#" className="hover:text-primary transition">Architecture</a>
          <a href="#" className="hover:text-primary transition">Pricing</a>
        </div>
        <button className="bg-primary text-white px-5 py-2 rounded-full text-sm font-medium hover:opacity-90 transition">
          Launch Pilot
        </button>
      </div>
    </nav>
  )
}
