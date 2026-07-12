import { SiteNav } from '@/components/site-nav'
import { Hero } from '@/components/hero'
import { SavingsCalculator } from '@/components/savings-calculator'
import { Features } from '@/components/features'
import { CtaFooter } from '@/components/cta-footer'

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <SiteNav />
      <Hero />
      <SavingsCalculator />
      <Features />
      <CtaFooter />
    </main>
  )
}