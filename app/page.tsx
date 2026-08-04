import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { SupportedProviders } from "@/components/supported-providers";
import { Features } from "@/components/features";

export default function Page() {
  return (
    <>
      <Navbar />
      <Hero />
      <SupportedProviders />
      <Features />
    </>
  );
}