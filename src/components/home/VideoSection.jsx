"use client";

import { useEffect, useState } from "react";
import { Play, Video } from "lucide-react";
import { storeRequest } from "@/lib/storeApi";
import { useLanguage } from "../../app/common/LanguageContext";

export default function VideoSection() {
  const { t, pick, formatNumber } = useLanguage();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    storeRequest("/video/all-video")
      .then((items) => {
        if (active) setVideos(items || []);
      })
      .catch(() => {
        if (active) setVideos([]);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  if (loading || !videos.length) return null;

  return (
    <section className="border-y border-slate-200 bg-slate-950 py-16 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
              <Video size={16} /> {t("home.videosEyebrow")}
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("home.videosTitle")}</h2>
            <p className="mt-2 max-w-xl text-slate-300">{t("home.videosSubtitle")}</p>
          </div>
          <span className="text-sm text-slate-400">{t("home.videosCount", { count: formatNumber(videos.length) })}</span>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => {
            const title = pick(video.title, video.titleBn);
            const description = pick(video.description, video.descriptionBn);
            return (
              <article key={video._id} className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900 shadow-xl">
                <div className="relative">
                  <video src={video.video} controls preload="metadata" className="aspect-video w-full bg-black object-cover" />
                  <span className="pointer-events-none absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-emerald-400 text-slate-950">
                    <Play size={15} fill="currentColor" />
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold">{title}</h3>
                  {description && <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-300">{description}</p>}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
