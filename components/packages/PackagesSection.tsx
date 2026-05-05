import { PHONE_HREF } from "@/lib/contact";

export function PackagesSection() {
  return (
    <section className="py-20 sm:py-24 bg-bg-muted px-6 lg:px-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-text mb-4">
            Simple, honest pricing.
          </h2>
          <p className="text-xl text-text/70">
            No hidden fees. We come in, do the work, and leave you with a clean garage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Package 1 */}
          <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-lg border border-gray-100 flex flex-col">
            <h3 className="text-2xl font-bold text-text mb-2">The Glow-Up</h3>
            <p className="text-text/70 mb-8 min-h-[48px]">The essential cleanout and organization service.</p>
            
            <ul className="space-y-4 mb-10 flex-grow">
              {[
                "We clear everything out of your garage",
                "Sweep, vacuum, and wipe everything down",
                "Put it all back — organized and tidy",
                "You tell us how you want it, we make it happen"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-text/90 font-medium leading-tight">{item}</span>
                </li>
              ))}
            </ul>
            
            <a 
              href={PHONE_HREF}
              className="block text-center bg-primary text-white font-bold py-4 px-6 rounded-lg text-lg hover:bg-primary-dark transition-colors w-full"
            >
              Call to Book
            </a>
          </div>

          {/* Package 2 */}
          <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-xl border-2 border-accent relative flex flex-col transform md:-translate-y-4">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-white font-bold px-4 py-1 rounded-full text-sm tracking-wide shadow-sm">
              MOST POPULAR
            </div>
            <h3 className="text-2xl font-bold text-text mb-2">The Full Glow-Up</h3>
            <p className="text-text/70 mb-8 min-h-[48px]">A complete reset for your space. We haul the junk.</p>
            
            <ul className="space-y-4 mb-10 flex-grow">
              <li className="font-bold text-primary mb-2 flex items-center gap-2">
                Everything in The Glow-Up, PLUS:
              </li>
              {[
                "Pressure wash the garage floor",
                "Haul away junk you don't need",
                "Same team, same day"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-text/90 font-medium leading-tight">{item}</span>
                </li>
              ))}
            </ul>
            
            <a 
              href={PHONE_HREF}
              className="block text-center bg-accent text-white font-bold py-4 px-6 rounded-lg text-lg hover:bg-yellow-600 transition-colors w-full shadow-md"
            >
              Call to Book
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
