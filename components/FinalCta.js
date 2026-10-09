// components/FinalCta.js

export default function FinalCta() {
  return (
    // Changed py-24/py-32 to pt-4 pb-8 lg:pt-6 lg:pb-12 to cut the top & bottom gap
    <section className="relative bg-paper pt-4 pb-8 lg:pt-6 lg:pb-12">
      <div className="mx-auto max-w-container px-6">
        
        {/* Tightened internal padding from py-20/p-16 down to py-12 px-6 lg:py-16 lg:px-12 */}
        <div className="relative overflow-hidden rounded-[2.5rem] bg-navy py-12 px-6 text-center shadow-2xl lg:py-16 lg:px-12">
          
          <h2 className="mx-auto max-w-2xl font-display text-[clamp(2rem,3.5vw,3rem)] font-extrabold leading-[1.15] text-white">
            Book a call and get clarity on your next move
          </h2>
          
          <p className="mx-auto mt-4 max-w-md text-base text-gray-200 lg:text-lg">
            A short, no pressure conversation about where you are and what could come next.
          </p>
          
          <div className="mt-8 flex justify-center">
            <a 
              href="/book-a-call" 
              className="inline-block rounded-full bg-copper px-8 py-4 font-bold text-white shadow-lg shadow-copper/25 transition-all hover:-translate-y-0.5 hover:bg-copper-dark"
            >
              Book a call
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}