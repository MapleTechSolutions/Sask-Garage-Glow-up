export type GalleryJob = {
  id: string;
  before: string;
  after: string;
  location: string;
  caption?: string;
};

export const heroJob: GalleryJob = {
  id: "hero",
  before: "/gallery/job1-before.jpg",
  after: "/gallery/job1-after.jpg",
  location: "Regina, SK",
  caption: "Full garage cleanout",
};

export const galleryJobs: GalleryJob[] = [
  {
    id: "job-2",
    before: "/gallery/job2-before.jpg",
    after: "/gallery/job2-after.jpg",
    location: "East Regina, SK",
    caption: "3-car garage, full clearout",
  },
  {
    id: "job-3",
    before: "/gallery/job3-before.jpg",
    after: "/gallery/job3-after.jpg",
    location: "White City, SK",
    caption: "Junk removal + shelving",
  },
  {
    id: "job-4",
    before: "/gallery/job4-before.jpg",
    after: "/gallery/job4-after.jpg",
    location: "Harbour Landing, Regina",
    caption: "Deep clean + full setup",
  },
  {
    id: "job-5",
    before: "/gallery/job5-before.jpg",
    after: "/gallery/job5-after.jpg",
    location: "Pilot Butte, SK",
    caption: "Total transformation",
  },
  {
    id: "job-6",
    before: "/gallery/job6-before.jpg",
    after: "/gallery/job6-after.jpg",
    location: "Lakeridge, Regina",
    caption: "Pressure washed floors",
  },
  {
    id: "job-7",
    before: "/gallery/job7-before.jpg",
    after: "/gallery/job7-after.jpg",
    location: "Emerald Park, SK",
    caption: "Junk hauled + organized",
  },
  {
    id: "job-8",
    before: "/gallery/job8-before.jpg",
    after: "/gallery/job8-after.jpg",
    location: "Rosemont, Regina",
    caption: "Same-day clearout",
  },
  {
    id: "job-9",
    before: "/gallery/job9-before.jpg",
    after: "/gallery/job9-after.jpg",
    location: "Albert Park, Regina",
    caption: "Full Glow-Up package",
  },
];

export type CustomerPhoto = {
  id: string;
  src: string;
  label: string;
};

export const customerPhotos: CustomerPhoto[] = [
  { id: "cust-1",  src: "/customers/mike.jpg",   label: "Happy Mike" },
  { id: "cust-2",  src: "/customers/linda.jpg",  label: "Satisfied Linda" },
  { id: "cust-3",  src: "/customers/tony.jpg",   label: "Stoked Tony" },
  { id: "cust-4",  src: "/customers/susan.jpg",  label: "Loving It Susan" },
  { id: "cust-5",  src: "/customers/jared.jpg",  label: "Joyful Jared" },
  { id: "cust-6",  src: "/customers/maria.jpg",  label: "Grateful Maria" },
  { id: "cust-7",  src: "/customers/jake.jpg",   label: "Pumped Jake" },
  { id: "cust-8",  src: "/customers/debbie.jpg", label: "Delighted Debbie" },
  { id: "cust-9",  src: "/customers/larry.jpg",  label: "Relieved Larry" },
  { id: "cust-10", src: "/customers/rick.jpg",   label: "Ecstatic Rick" },
];
