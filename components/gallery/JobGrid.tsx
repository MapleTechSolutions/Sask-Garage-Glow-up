import { galleryJobs } from "@/data/gallery";

export function JobGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {galleryJobs.map((job) => (
        <div key={job.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
          <div className="relative aspect-[4/3]">
            {/* Split layout inside the card for before/after */}
            <div className="absolute inset-0 flex">
              <div className="w-1/2 h-full relative border-r border-white/20 bg-bg-muted">
                <img src={job.before} alt="Before" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="w-1/2 h-full relative bg-bg-muted">
                <img src={job.after} alt="After" className="w-full h-full object-cover" loading="lazy" />
              </div>
            </div>
          </div>
          <div className="p-4 sm:p-5">
            <div className="flex items-center gap-1.5 text-primary font-bold text-sm mb-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {job.location}
            </div>
            {job.caption && <p className="text-text/80 text-sm font-medium">{job.caption}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}
