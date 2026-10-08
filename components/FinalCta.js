import { site } from "@/lib/site";

export default function FinalCta() {
  return (
    <section className="bg-paper px-6 py-20 pb-32">
      <div className="mx-auto max-w-container">
        <div className="reveal flex flex-col items-center rounded-[2.5rem] bg-navy px-6 py-20 text-center shadow-2xl sm:px-12 sm:py-24">
          
          <h2 className="font-display text-4xl font-extrabold leading-[1.15] text-white sm:text-5xl">
            Book a call and get clarity on <br className="hidden sm:block" /> your next move
          </h2>
          
          {/* THE FIX: Changed text color to text-white/90 for maximum contrast and readability */}
          <p className="mt-6 max-w-2xl text-lg text-white/90 text-balance">
            A short, no pressure conversation about where you are and what could come next.
          </p>
          
          <a 
            href={site.bookingUrl} 
            className="mt-10 inline-block rounded-full bg-copper px-8 py-4 font-bold text-paper shadow-lg shadow-copper/20 transition-all hover:-translate-y-1 hover:shadow-xl hover:bg-copper-dark"
          >
            Book a call
          </a>
          
        </div>
      </div>
    </section>
  );
}