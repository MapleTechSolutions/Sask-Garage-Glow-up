import { PHONE, PHONE_HREF, FACEBOOK_URL } from "@/lib/contact";

export function ContactSection() {
  return (
    <section className="py-24 sm:py-32 bg-bg px-6 lg:px-12 text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-text mb-6">
          Ready to get your garage back?
        </h2>
        <p className="text-xl text-text/70 mb-12">
          Give us a call. We'll tell you how it works and get you booked in.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <a 
            href={PHONE_HREF}
            className="flex items-center justify-center bg-accent text-white font-bold py-5 px-8 rounded-lg text-xl w-full sm:w-auto hover:bg-yellow-600 transition-colors shadow-xl"
          >
            Call Now — {PHONE}
          </a>
          <a 
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center bg-white text-text border-2 border-gray-200 font-bold py-5 px-8 rounded-lg text-xl w-full sm:w-auto hover:bg-gray-50 transition-colors"
          >
            Message on Facebook
          </a>
        </div>
        
        <p className="text-sm font-semibold text-primary mb-4 flex items-center justify-center gap-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Serving Regina, White City, Emerald Park, Pilot Butte & surrounding area
        </p>
        <p className="text-xs text-text/40">
          &copy; {new Date().getFullYear()} Sask Garage Glow-Up. All rights reserved.
        </p>
      </div>
    </section>
  );
}
