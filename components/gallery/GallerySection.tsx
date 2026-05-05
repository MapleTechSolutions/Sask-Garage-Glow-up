import { BeforeAfterSlider } from "./BeforeAfterSlider";
import { JobGrid } from "./JobGrid";
import { CustomerPhotoWall } from "./CustomerPhotoWall";

export function GallerySection() {
  return (
    <section className="py-20 sm:py-24 lg:py-32 bg-bg px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-text mb-6">
            The proof is in the before & after.
          </h2>
          <p className="text-xl text-text/70">
            A chaotic garage transforms into a clean, organized space. Slide to see the difference.
          </p>
        </div>

        <div className="mb-20">
          <BeforeAfterSlider />
        </div>

        <div className="mb-16 text-center">
          <h3 className="text-2xl font-bold text-text mb-2">Our Recent Projects</h3>
          <p className="text-text/60">Tap or click to see what we've been up to around town.</p>
        </div>

        <JobGrid />
        
        <CustomerPhotoWall />
      </div>
    </section>
  );
}
