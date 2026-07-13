import Link from "next/link";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Cost<span className="text-primary">AI</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm text-muted">
          <Link href="#architecture" className="hover:text-foreground transition-colors">
            Architecture
          </Link>
          <Link href="#pricing" className="hover:text-foreground transition-colors">
            Pricing
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/sign-in"
            className="text-sm text-muted hover:text-foreground transition-colors hidden sm:block"
          >
            Sign in
          </Link>
          <Link
            href="/pilot"
            className="text-sm font-medium bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg transition-colors"
          >
            Launch Pilot
          </Link>
        </div>
      </div>
    </header>
  );
}
