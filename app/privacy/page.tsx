export default function PrivacyPage() {
  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h1 className="text-3xl font-semibold tracking-tight mb-2">NetCost.ai — Privacy Policy</h1>
      <p className="text-sm text-muted mb-10">Effective Date: August 3, 2026</p>

      <p className="text-muted mb-8">
        At NetCost.ai, we respect your data sovereignty. Because we operate a Bring-Your-Own-Key
        (BYOK) wholesale gateway, our architecture is designed to minimize data retention and
        protect your organization's privacy.
      </p>

      <h2 className="text-xl font-semibold mt-10 mb-3">1. Information We Collect</h2>
      <p className="text-muted mb-3">To operate and maintain the Service, we collect limited categories of data:</p>
      <ul className="list-disc list-outside pl-5 text-muted space-y-3 mb-6">
        <li>
          <span className="text-foreground font-medium">Account Information:</span> Basic
          registration details, including your name, corporate email address, and authentication
          identifiers.
        </li>
        <li>
          <span className="text-foreground font-medium">Operational Metadata:</span> Technical
          logs necessary for billing, rate limiting, and debugging (such as timestamps, user IDs,
          model selection, token counts, and request status codes like 200 OK or 500 Error).
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-10 mb-3">2. How We Handle Prompt &amp; Response Data (The Gateway Role)</h2>
      <ul className="list-disc list-outside pl-5 text-muted space-y-3 mb-6">
        <li>
          <span className="text-foreground font-medium">In-Transit Processing:</span> When your
          team sends a prompt through NetCost.ai, our gateway acts as a transparent proxy. The
          payload passes through our system's volatile memory (RAM) exclusively to route the
          request to your chosen upstream provider (OpenAI, Anthropic, Google) and return the
          response.
        </li>
        <li>
          <span className="text-foreground font-medium">Zero-Retention Policy for Prompts:</span>{" "}
          We do not log, store, index, or retain the content of your prompts or AI-generated
          responses in our permanent databases or logs. Your proprietary data is not saved by
          NetCost.ai.
        </li>
        <li>
          <span className="text-foreground font-medium">No Model Training:</span> NetCost.ai
          never uses your prompts, outputs, or API keys to train machine learning models.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-10 mb-3">3. Third-Party AI Providers</h2>
      <p className="text-muted mb-6">
        When your queries pass through our gateway to providers like OpenAI, Anthropic, or Google,
        those requests are governed by the respective privacy policies and data governance terms
        of those specific providers. We encourage you to review your enterprise agreements with
        those vendors to ensure they meet your internal compliance needs.
      </p>

      <h2 className="text-xl font-semibold mt-10 mb-3">4. Data Security Measures</h2>
      <p className="text-muted mb-6">
        We implement robust organizational and technical security safeguards, including encrypted
        data transport (TLS/SSL) and strict access controls to production systems, to protect your
        account metadata and ensure secure API key handling.
      </p>

      <h2 className="text-xl font-semibold mt-10 mb-3">5. Contact Us</h2>
      <p className="text-muted mb-6">
        If you have any questions regarding these Terms or our Privacy Policy, you can reach our
        team at{" "}
        <a href="mailto:support@netcost.ai" className="text-primary hover:underline">
          support@netcost.ai
        </a>
        .
      </p>
    </section>
  );
}
