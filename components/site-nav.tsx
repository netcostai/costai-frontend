'use client'
import { Boxes } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function SiteNav() {
  const handleLaunch = async () => {
    // 1. Get data from the user
    const companyId = prompt("Enter your Company ID:")
    const apiKey = prompt("Enter your OpenAI API Key:")

    if (!companyId || !apiKey) return

    // 2. Send to your Render backend
    try {
      const response = await fetch('https://netcost-backend.onrender.com/v1/vault/store', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company_id: companyId,
          provider: 'openai',
          raw_provider_key: apiKey
        })
      })

      if (response.ok) {
        alert("Success! Your gateway is now connected.")
      } else {
        alert("Something went wrong. Please check your credentials.")
      }
    } catch (error) {
      console.error("Error:", error)
      alert("Could not connect to the backend.")
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="/" className="flex items-center gap-2.5" aria-label="CostAI home">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary/15 text-primary ring-1 ring-primary/30">
            <Boxes className="size-5" aria-hidden="true" />
          </span>
          <span className="text-lg font-semibold tracking-tight text-foreground">CostAI</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          <a href="#architecture" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Architecture
          </a>
          <a href="#pricing" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Pricing
          </a>
          <a href="#docs" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Docs
          </a>
        </nav>

        <Button 
          onClick={handleLaunch}
          className="bg-primary font-medium text-primary-foreground shadow-[0_0_0_1px_rgba(16,185,129,0.4)] hover:bg-primary/90"
        >
          Launch Pilot Gateway
        </Button>
      </div>
    </header>
  )
}