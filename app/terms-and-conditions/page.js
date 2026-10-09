import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Terms & Conditions | Sunblock Property",
  description: "Terms and conditions for Sunblock Property advisory services.",
};

export default function TermsAndConditions() {
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
              Terms & Conditions
            </h1>
            <p className="mt-3 text-base text-muted leading-relaxed">
              By accessing our services, booking a call, or engaging with us, you agree to the following terms[cite: 19].
            </p>
          </div>

          {/* Policy Content */}
          <div className="space-y-8 text-ink">
            
            <section>
              <h2 className="font-display text-xl font-bold text-ink">1. Services</h2>
              <p className="mt-2 text-muted leading-relaxed">
                We provide property advisory and related services[cite: 19]. We do not guarantee specific financial outcomes or investment returns[cite: 19].
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-ink">2. No Financial Advice Disclaimer</h2>
              <p className="mt-2 text-muted leading-relaxed">
                Information provided is general in nature and does not constitute personal financial advice[cite: 19]. You should seek independent advice before making any decisions[cite: 19].
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-ink">3. Client Responsibility</h2>
              <p className="mt-2 text-muted leading-relaxed">You are responsible for[cite: 19]:</p>
              <ul className="mt-2 list-inside list-disc space-y-1 text-muted">
                <li>Providing accurate information[cite: 19]</li>
                <li>Making final decisions regarding property purchases[cite: 19]</li>
                <li>Conducting your own due diligence[cite: 19]</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-ink">4. Third-Party Services</h2>
              <p className="mt-2 text-muted leading-relaxed">
                We may refer you to third parties such as mortgage brokers, accountants, and legal professionals[cite: 19]. We are not responsible for their services or outcomes[cite: 19].
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-ink">5. Booking & Communication</h2>
              <p className="mt-2 text-muted leading-relaxed">
                By booking a call, you agree to be contacted via phone, email, or SMS, and to receive reminders and follow-ups[cite: 19].
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-ink">6. Fees & Agreements</h2>
              <p className="mt-2 text-muted leading-relaxed">
                Any fees, if applicable, will be outlined separately in a formal agreement[cite: 19].
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-ink">7. Limitation of Liability</h2>
              <p className="mt-2 text-muted leading-relaxed">
                We are not liable for financial losses, investment performance, or decisions made based on our guidance[cite: 19].
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-ink">8. Changes</h2>
              <p className="mt-2 text-muted leading-relaxed">
                We may update these terms at any time[cite: 19].
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-ink">9. Contact</h2>
              <p className="mt-2 text-muted leading-relaxed">
                For any questions:  
                <br />
                Email:{" "}
                <a href="mailto:sunblockproperty@gmail.com" className="font-medium text-copper hover:underline">
                  sunblockproperty@gmail.com
                </a>[cite: 19]
              </p>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}