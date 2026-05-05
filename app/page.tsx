import { HeroSection } from "@/components/hero/HeroSection";
import { GallerySection } from "@/components/gallery/GallerySection";
import { PackagesSection } from "@/components/packages/PackagesSection";
import { WhyUsSection } from "@/components/trust/WhyUsSection";
import { ContactSection } from "@/components/contact/ContactSection";
import { StickyMobileCTA } from "@/components/layout/StickyMobileCTA";

export default function Home() {
  return (
    <>
      <HeroSection />
      <GallerySection />
      <PackagesSection />
      <WhyUsSection />
      <ContactSection />
      <StickyMobileCTA />
    </>
  );
}
