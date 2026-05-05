import { PHONE, PHONE_HREF, FACEBOOK_URL } from "@/lib/contact";

export function CTAButtons({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col sm:flex-row gap-4 w-full ${className}`}>
      <a 
        href={PHONE_HREF}
        className="flex items-center justify-center bg-accent text-white font-bold py-4 px-6 rounded-lg text-lg min-h-[56px] w-full sm:w-auto hover:bg-yellow-600 transition-colors shadow-lg"
      >
        Call Now — {PHONE}
      </a>
      <a 
        href={FACEBOOK_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center border-2 border-white text-white font-bold py-4 px-6 rounded-lg text-lg min-h-[56px] w-full sm:w-auto hover:bg-white/10 transition-colors"
      >
        Message Us on Facebook
      </a>
    </div>
  );
}
