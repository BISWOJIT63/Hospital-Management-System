import React from "react";
import { Camera, Image as ImageIcon } from "lucide-react";
import { Card, SectionHdr, StatCard } from "../components/AdminUI";

export default function GalleryPanel({ fac }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-4">
        <StatCard
          icon={Camera}
          label="Total Photos"
          value={fac.images.length}
          sub="Published images"
          color="green"
        />
        <StatCard
          icon={ImageIcon}
          label="Cover Image"
          value="Set"
          sub="Main profile photo"
          color="teal"
        />
      </div>
      <Card>
        <SectionHdr
          icon={Camera}
          title="Facility Gallery"
          sub="Manage your public photos"
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {fac.images.map((img, i) => (
            <div
              key={i}
              className="relative aspect-square rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 group shadow-sm"
            >
              <img
                src={img}
                alt=""
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {i === 0 && (
                <div className="absolute top-2 left-2 bg-green-600/90 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-sm">
                  COVER
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
