"use client";

import { useEffect, useState } from "react";
import { PHONE_HREF, SMS_HREF } from "@/lib/contact";

export function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`md:hidden fixed bottom-0 left-0 right-0 z-50 bg-primary-dark text-white border-t border-white/10 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex px-4 pt-3 pb-3 gap-3">
        <a
          href={PHONE_HREF}
          className="flex-1 bg-accent hover:bg-yellow-600 transition-colors text-white font-bold rounded flex items-center justify-center min-h-[56px] shadow-sm text-[15px] gap-2"
        >
          <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          Call Now
        </a>
        <a
          href={SMS_HREF}
          className="flex-1 bg-transparent border-2 border-white hover:bg-white/10 transition-colors text-white font-bold rounded flex items-center justify-center min-h-[56px] text-[15px] gap-2"
        >
          <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          Text Us
        </a>
      </div>
    </div>
  );
}
