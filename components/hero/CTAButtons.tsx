import { PHONE, PHONE_HREF, SMS_HREF, FACEBOOK_URL } from "@/lib/contact";

export function CTAButtons({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col gap-3 w-full ${className}`}>
      <div className="flex flex-col sm:flex-row gap-3 w-full">
        <a
          href={SMS_HREF}
          className="flex items-center justify-center bg-accent text-white font-bold py-4 px-6 rounded-lg text-lg min-h-[56px] w-full sm:w-auto hover:bg-yellow-600 transition-colors shadow-lg"
        >
          Text Now for a Free Quote
        </a>
        <a
          href={PHONE_HREF}
          className="flex items-center justify-center border-2 border-white text-white font-bold py-4 px-6 rounded-lg text-lg min-h-[56px] w-full sm:w-auto hover:bg-white/10 transition-colors"
        >
          Call Now
        </a>
      </div>
      <p className="text-white/70 text-sm">
        Or text us directly at{" "}
        <a href={SMS_HREF} className="text-white font-semibold underline underline-offset-2">{PHONE}</a>
        {" "}— or{" "}
        <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="text-white font-semibold underline underline-offset-2">message on Facebook</a>
      </p>
    </div>
  );
}
