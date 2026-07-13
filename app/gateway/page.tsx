import { Navbar } from "@/components/navbar";
import { PROVIDERS } from "@/lib/providers";
import { ProviderCard } from "@/components/provider-card";

export default function GatewayPage() {
  return (
    <>
      <Navbar />
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-semibold tracking-tight mb-3">Connect a provider</h1>
          <p className="text-muted max-w-lg mx-auto">
            Add your API key for any provider below to start routing requests through CostAI's gateway.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {PROVIDERS.map((p) => (
            <ProviderCard key={p.id} id={p.id} displayName={p.displayName} color={p.color} />
          ))}
        </div>
      </section>
    </>
  );
}
