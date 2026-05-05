import { CTAButtons } from "./CTAButtons";
import { TrustBadges } from "./TrustBadges";

export function HeroSection() {
  return (
    <section id="hero" className="bg-primary min-h-[90vh] flex flex-col justify-center py-16 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Column */}
        <div className="flex flex-col text-white z-10">
          <img 
            src="/logo.png" 
            alt="Sask Garage Glow-Up Logo" 
            className="w-48 sm:w-56 mb-8 lg:mb-12"
            fetchPriority="high"
          />
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 tracking-tight">
            Your Garage. <br />Cleaned Out. <br />Organized. Done.
          </h1>
          <p className="text-xl sm:text-2xl text-white/90 font-medium mb-10 max-w-xl">
            Same-day service in Regina. We do the heavy lifting. You get your garage back.
          </p>
          <CTAButtons className="mb-10" />
          <TrustBadges />
        </div>

        {/* Right Column - Truck */}
        <div className="hidden lg:flex w-full h-[600px] items-center justify-center">
          <img
            src="/truck-logo.jpg"
            alt="Sask Garage Glow-Up truck"
            className="w-full h-full object-contain drop-shadow-2xl"
            fetchPriority="high"
          />
        </div>
      </div>
    </section>
  );
}
