import { customerPhotos } from "@/data/gallery";

export function CustomerPhotoWall() {
  return (
    <div className="mt-20 sm:mt-24 lg:mt-32">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text mb-4">
          Real Regina Garages.<br/>Real Results.
        </h3>
        <p className="text-lg text-text/70">
          Want to be next on this wall? Give us a call or shoot us a message — we&apos;d love to add you.
        </p>
      </div>

      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {customerPhotos.map((photo) => (
          <div key={photo.id} className="break-inside-avoid rounded-xl overflow-hidden shadow-sm relative group bg-bg-muted">
            <img
              src={photo.src}
              alt={photo.label}
              className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 pt-12">
              <p className="text-white font-bold text-sm">{photo.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
