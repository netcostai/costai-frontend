import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { SavingsCalculator } from "@/components/savings-calculator";
import { Features } from "@/components/features";

export default function Page() {
  return (
    <>
      <Navbar />
      <Hero />
      <SavingsCalculator />
      <Features />
    </>
  );
}
