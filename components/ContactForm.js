export default function ContactForm({ embedUrl }) {
  return (
    <div className="mx-auto w-full max-w-4xl rounded-[2.5rem] border border-line bg-white p-3 shadow-xl md:p-5">
      <div className="relative w-full overflow-hidden rounded-3xl bg-panel">
        
        {embedUrl ? (
          <iframe
            src={embedUrl}
            style={{ width: "100%", border: "none", minHeight: "650px" }}
            className="w-full bg-white"
            id="booking-embed"
            scrolling="yes"
            title="Booking Calendar"
          ></iframe>
        ) : (
          <div className="flex min-h-[500px] flex-col items-center justify-center p-8 text-center text-muted">
            <span className="mb-6 grid h-16 w-16 place-items-center rounded-full bg-copper/10 text-copper">
              <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </span>
            <h3 className="font-display text-3xl font-extrabold text-navy">Calendar loading soon</h3>
            <p className="mt-3 text-lg">Our scheduling system is being updated.</p>
          </div>
        )}
        
      </div>
    </div>
  );
}