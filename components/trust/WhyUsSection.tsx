export function WhyUsSection() {
  return (
    <section className="py-20 sm:py-24 bg-primary text-white px-6 lg:px-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">
            We're from Regina. <br/>We get it.
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-lg">
            You don't want a massive corporation treating you like a ticket number. You just want guys who show up when they say they will, work hard, and don't leave until the job is done right. That's us. We live here, we work here, and we guarantee you'll love your clean garage.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white/10 p-6 rounded-xl border border-white/20 backdrop-blur-sm">
            <div className="text-accent mb-3">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h4 className="text-xl font-bold mb-1">100+ Garages</h4>
            <p className="text-white/80 text-sm">Transformed across the city.</p>
          </div>
          
          <div className="bg-white/10 p-6 rounded-xl border border-white/20 backdrop-blur-sm">
            <div className="text-accent mb-3">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="text-xl font-bold mb-1">Same-Day Service</h4>
            <p className="text-white/80 text-sm">When you need it done now.</p>
          </div>
          
          <div className="bg-white/10 p-6 rounded-xl border border-white/20 backdrop-blur-sm">
            <div className="text-accent mb-3">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="text-xl font-bold mb-1">Local Regina</h4>
            <p className="text-white/80 text-sm">Plus Emerald Park & surrounding.</p>
          </div>
          
          <div className="bg-white/10 p-6 rounded-xl border border-white/20 backdrop-blur-sm">
            <div className="text-accent mb-3">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="text-xl font-bold mb-1">100% Satisfaction</h4>
            <p className="text-white/80 text-sm">Or we come back. Guaranteed.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
