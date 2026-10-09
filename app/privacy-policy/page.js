import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy | Sunblock Property",
  description: "Privacy policy and data protection practices for Sunblock Property.",
};

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-paper py-12 lg:py-16">
        <div className="mx-auto max-w-3xl px-6">
          
          {/* Header */}
          <div className="mb-10 border-b border-line pb-8">
            <Link 
              href="/" 
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-copper transition-colors hover:text-copper-dark"
            >
              ← Back to Home
            </Link>
            <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Privacy Policy
            </h1>
            <p className="mt-3 text-base text-muted leading-relaxed">
              We respect your privacy and are committed to protecting your personal information[cite: 20]. This policy outlines how we collect, use, and protect your information when you interact with us[cite: 20].
            </p>
          </div>

          {/* Policy Content */}
          <div className="space-y-8 text-ink">
            
            <section>
              <h2 className="font-display text-xl font-bold text-ink">1. Information We Collect</h2>
              <p className="mt-2 text-muted leading-relaxed">
                We may collect personal information including[cite: 20]:
              </p>
              <ul className="mt-2 list-inside list-disc space-y-1 text-muted">
                <li>Name[cite: 20]</li>
                <li>Email address[cite: 20]</li>
                <li>Phone number[cite: 20]</li>
                <li>Financial or property-related information you provide[cite: 20]</li>
                <li>Any other information submitted through forms, calls, or communication[cite: 20]</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-ink">2. How We Collect Information</h2>
              <p className="mt-2 text-muted leading-relaxed">
                We collect information when you[cite: 20]:
              </p>
              <ul className="mt-2 list-inside list-disc space-y-1 text-muted">
                <li>Fill out forms on our website or landing pages[cite: 20]</li>
                <li>Book a call[cite: 20]</li>
                <li>Communicate with us via email, phone, or messaging platforms[cite: 20]</li>
                <li>Engage with our content or advertisements[cite: 20]</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-ink">3. How We Use Your Information</h2>
              <p className="mt-2 text-muted leading-relaxed">
                We use your information to[cite: 20]:
              </p>
              <ul className="mt-2 list-inside list-disc space-y-1 text-muted">
                <li>Provide property advisory services[cite: 20]</li>
                <li>Contact you regarding your enquiry[cite: 20]</li>
                <li>Book and manage appointments[cite: 20]</li>
                <li>Send updates, insights, or relevant opportunities[cite: 20]</li>
                <li>Improve our services and marketing[cite: 20]</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-ink">4. Sharing Your Information</h2>
              <p className="mt-2 text-muted leading-relaxed">
                We may share your information with trusted third parties where necessary, including mortgage brokers, accountants, legal or conveyancing professionals, and service providers supporting our operations[cite: 20]. We do not sell your personal information[cite: 20].
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-ink">5. Data Security</h2>
              <p className="mt-2 text-muted leading-relaxed">
                We take reasonable steps to protect your personal information from misuse, loss, or unauthorized access[cite: 20].
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-ink">6. Marketing & Opt-Out</h2>
              <p className="mt-2 text-muted leading-relaxed">
                We may contact you with relevant updates or offers[cite: 20]. You can opt out at any time by clicking unsubscribe in emails or contacting us directly[cite: 20].
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-ink">7. Access & Updates</h2>
              <p className="mt-2 text-muted leading-relaxed">
                You may request access to or correction of your personal information at any time[cite: 20].
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-ink">8. Changes to This Policy</h2>
              <p className="mt-2 text-muted leading-relaxed">
                We may update this policy from time to time[cite: 20]. The latest version will always be available on our website[cite: 20].
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-ink">9. Contact</h2>
              <p className="mt-2 text-muted leading-relaxed">
                If you have any questions, please contact us at:  
                <br />
                Email:{" "}
                <a href="mailto:sunblockproperty@gmail.com" className="font-medium text-copper hover:underline">
                  sunblockproperty@gmail.com
                </a>[cite: 20]
              </p>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}