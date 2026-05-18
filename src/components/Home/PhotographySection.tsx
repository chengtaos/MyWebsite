import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Camera, ChevronDown, X } from "lucide-react";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import SectionHeader from "@/components/ui/SectionHeader";
import { albums } from "@/data/photos";

const PHOTO_LAYOUTS = [
  { w: 180, h: 220, rotate: -3 },
  { w: 200, h: 160, rotate: 2 },
  { w: 160, h: 200, rotate: -1 },
  { w: 220, h: 180, rotate: 4 },
  { w: 180, h: 180, rotate: -2 },
  { w: 200, h: 220, rotate: 1 },
];

function PhotoCard({ src, alt, layout }: { src: string; alt: string; layout: (typeof PHOTO_LAYOUTS)[number] }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: layout.rotate }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative cursor-pointer bg-white border-4 border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden transition-all duration-500 ease-out hover:z-50"
      style={{ width: layout.w, height: layout.h, rotate: `${layout.rotate}deg` }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.rotate = "0deg";
        el.style.transform = "scale(2.2)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.rotate = `${layout.rotate}deg`;
        el.style.transform = "scale(1)";
      }}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover pointer-events-none"
        loading="lazy"
        referrerPolicy="no-referrer"
      />
    </motion.div>
  );
}

export default function PhotographySection() {
  const [openAlbum, setOpenAlbum] = useState<string | null>(null);

  return (
    <div className="space-y-10">
      <SectionHeader icon={Camera} title="摄影" />

      <div className="flex flex-wrap justify-center gap-6">
        {albums.map((album, albumIdx) => {
          const isOpen = openAlbum === album.name;
          return (
            <RevealOnScroll key={album.name} staggerIndex={albumIdx} className="w-full">
              <div className="max-w-4xl mx-auto">

                <button
                  onClick={() => setOpenAlbum(isOpen ? null : album.name)}
                  className={`brutalist-card w-full text-left transition-all duration-300 group ${
                    isOpen ? "border-brand-pink" : ""
                  }`}
                >
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-2xl border-2 border-black overflow-hidden shrink-0 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      <img
                        src={album.cover}
                        alt={album.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-2xl font-extrabold">{album.name}</h3>
                      <p className="text-gray-400 font-semibold text-sm mt-1">
                        {album.photos.length} 张照片
                      </p>
                    </div>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="shrink-0"
                    >
                      {isOpen ? <X size={24} className="text-brand-pink" /> : <ChevronDown size={24} />}
                    </motion.div>
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      <div className="flex flex-wrap justify-center items-center gap-5 py-12">
                        {album.photos.map((photo, idx) => (
                          <PhotoCard
                            key={photo.src}
                            src={photo.src}
                            alt={photo.alt}
                            layout={PHOTO_LAYOUTS[idx % PHOTO_LAYOUTS.length]}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </RevealOnScroll>
          );
        })}
      </div>
    </div>
  );
}
