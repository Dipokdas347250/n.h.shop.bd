"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Play, ShoppingBag, Video } from "lucide-react";
import { normalizeProduct, storeRequest } from "@/lib/storeApi";
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
    <section className="border-y border-slate-200 bg-slate-950 py-6 text-white md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end md:mb-8 md:gap-4">
          <div>
            <p className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
              <Video size={16} /> {t("home.videosEyebrow")}
            </p>
            <h2 className="text-2xl font-bold tracking-tight md:text-4xl">{t("home.videosTitle")}</h2>
            <p className="mt-1.5 max-w-xl text-sm text-slate-300 md:mt-2 md:text-base">{t("home.videosSubtitle")}</p>
          </div>
          <span className="text-sm text-slate-400">{t("home.videosCount", { count: formatNumber(videos.length) })}</span>
        </div>

        <div className="grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {videos.map((video) => {
            const title = pick(video.title, video.titleBn);
            const description = pick(video.description, video.descriptionBn);
            return (
              <article key={video._id} className="flex flex-col overflow-hidden rounded-xl border border-slate-800 bg-slate-900 shadow-xl">
                {video.source === "youtube" && video.youtubeId ? (
                  <YoutubePlayer id={video.youtubeId} title={title} playLabel={t("home.videoPlay")} />
                ) : (
                  <div className="relative">
                    <video src={video.video} controls preload="metadata" className="aspect-video w-full bg-black object-cover" />
                    <span className="pointer-events-none absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-emerald-400 text-slate-950">
                      <Play size={15} fill="currentColor" />
                    </span>
                  </div>
                )}
                <div className="flex flex-1 flex-col p-4 md:p-5">
                  <h3 className="text-lg font-bold md:text-xl">{title}</h3>
                  {description && <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-300">{description}</p>}
                  {video.products?.length > 0 && <VideoProducts products={video.products} label={t("home.videoShop")} />}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** Horizontally scrolling strip of the products featured in a video. */
function VideoProducts({ products, label }) {
  const { formatPrice } = useLanguage();

  return (
    <div className="mt-auto pt-4">
      <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-300">
        <ShoppingBag size={14} /> {label}
      </p>
      <div className="scrollbar-hide -mx-4 flex snap-x gap-3 overflow-x-auto px-4 md:-mx-5 md:px-5">
        {products.map((raw) => {
          const product = normalizeProduct(raw);
          return (
            <Link
              key={product.id}
              href={`/allproduct/${product.slug || product.id}`}
              className="flex w-44 shrink-0 snap-start items-center gap-2.5 rounded-lg border border-slate-700 bg-slate-800 p-2 transition hover:border-emerald-400"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={product.image} alt="" loading="lazy" className="h-12 w-12 shrink-0 rounded-md bg-white object-contain p-0.5" />
              <span className="min-w-0">
                <span className="line-clamp-2 text-xs font-medium leading-4 text-white">{product.title}</span>
                <span className="mt-1 block text-sm font-bold text-emerald-300">
                  {formatPrice(product.price)}
                  {product.discount > 0 && <span className="ml-1.5 text-xs font-normal text-slate-400 line-through">{formatPrice(product.oldPrice)}</span>}
                </span>
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Shows the YouTube thumbnail and only loads the player once it is clicked, so
 * a row of videos does not pull in several YouTube players on page load.
 */
function YoutubePlayer({ id, title, playLabel }) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="aspect-video w-full bg-black"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`${playLabel}: ${title}`}
      className="group relative block aspect-video w-full overflow-hidden bg-black"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
        alt=""
        loading="lazy"
        className="h-full w-full object-cover opacity-90 transition group-hover:scale-105 group-hover:opacity-100"
      />
      <span className="absolute inset-0 m-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-400 text-slate-950 shadow-lg transition group-hover:scale-110">
        <Play size={26} fill="currentColor" />
      </span>
    </button>
  );
}
