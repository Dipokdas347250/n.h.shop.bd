"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, BadgeCheck, Heart, ShoppingCart, Star, Zap } from "lucide-react";
import { useShop } from "../../common/ShopContext";
import { useStoreAuth } from "../../common/StoreAuthContext";
import { useLanguage } from "../../common/LanguageContext";
import AuthDialog from "../../common/AuthDialog";
import TrustBadges from "../../../components/common/TrustBadges";
import { ApiError, storeRequest } from "../../../lib/storeApi";
import { productEventData, trackMetaEvent } from "../../../lib/metaPixel";

export default function ProductDetailClient({ product }) {
  const router = useRouter();
  const { t, language, formatPrice, formatNumber } = useLanguage();
  const { addToCart, toggleWishlist, isWishlisted } = useShop();
  const { user } = useStoreAuth();

  const [activeImage, setActiveImage] = useState(product.images?.[0] || product.image);
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0] || null);
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState(product.reviewItems || []);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [shownProductId, setShownProductId] = useState(product.id);

  // Navigating from one product to another reuses this component, so reset the
  // picker state for the new product before it renders.
  if (product.id !== shownProductId) {
    setShownProductId(product.id);
    setActiveImage(product.images?.[0] || product.image);
    setSelectedVariant(product.variants?.[0] || null);
    setQuantity(1);
    setReviews(product.reviewItems || []);
    setStatus(null);
  }

  useEffect(() => {
    let active = true;

    storeRequest(`/review/product/${product.id}`)
      .then((items) => {
        if (active) setReviews(items || []);
      })
      .catch(() => {});
    trackMetaEvent("ViewContent", productEventData(product));

    return () => {
      active = false;
    };
  }, [product]);

  const add = (goToCheckout = false) => {
    if (product.variants?.length && !selectedVariant) {
      setStatus({ type: "error", message: t("products.selectVariantFirst") });
      return;
    }
    addToCart(product, selectedVariant, quantity);
    router.push(goToCheckout ? `/checkout?product=${product.id}` : "/cart");
  };

  const submitReview = async (event) => {
    event.preventDefault();
    setStatus(null);
    try {
      const review = await storeRequest("/review/add-review", {
        method: "POST",
        body: JSON.stringify({ product: product.id, rating, comment }),
      });
      trackMetaEvent("SubmitReview", { content_ids: [String(product.id)], rating }, true);
      setReviews((current) => [review, ...current]);
      setComment("");
      setStatus({ type: "success", message: t("reviews.submit") });
    } catch (error) {
      setStatus({
        type: "error",
        message: error instanceof ApiError ? error.localized(language) : error.message,
      });
    }
  };

  const saved = isWishlisted(product.id);

  return (
    <div className="bg-gray-50 py-10 text-gray-900">
      <div className="mx-auto max-w-6xl px-4">
        <Link href="/allproduct" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#16863D] hover:underline">
          <ArrowLeft size={16} />
          {t("products.backToAll")}
        </Link>

        <div className="grid gap-8 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:grid-cols-2 md:p-8">
          <div>
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100">
              <Image src={activeImage} alt={product.name} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" priority />
            </div>
            {product.images?.length > 1 && (
              <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
                {product.images.map((image) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setActiveImage(image)}
                    aria-label={product.name}
                    className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition ${
                      activeImage === image ? "border-[#16863D]" : "border-transparent"
                    }`}
                  >
                    <Image src={image} alt="" fill sizes="80px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center">
            {product.category && (
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#16863D]">{product.category}</p>
            )}
            <h1 className="mt-2 text-3xl font-bold md:text-4xl">{product.name}</h1>

            <div className="mt-4 flex items-center gap-2 text-yellow-500">
              <Star size={16} className="fill-current" />
              <span className="font-semibold text-gray-800">
                {product.rating > 0 ? formatNumber(product.rating) : t("common.new")}
              </span>
              <span className="text-sm text-gray-500">
                ({formatNumber(reviews.length)} {t("common.reviews")})
              </span>
            </div>

            <div className="mt-6 flex flex-wrap items-end gap-3">
              <span className="text-3xl font-extrabold text-[#062B63]">{formatPrice(product.price)}</span>
              {product.oldPrice > product.price && (
                <>
                  <span className="text-lg text-gray-400 line-through">{formatPrice(product.oldPrice)}</span>
                  <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-bold text-red-600">
                    -{formatNumber(product.discount)}%
                  </span>
                </>
              )}
            </div>

            {product.offer && (
              <div className="mt-2 flex items-center gap-1 text-sm font-semibold text-[#16863D]">
                <Zap size={15} className="fill-current" />
                {product.offer}
              </div>
            )}

            <p className="mt-6 whitespace-pre-line leading-7 text-gray-600">{product.description}</p>

            {product.variants?.length > 0 && (
              <div className="mt-6">
                <p className="mb-2 font-semibold">{t("products.chooseVariant")}</p>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((variant) => (
                    <button
                      key={variant._id}
                      type="button"
                      onClick={() => setSelectedVariant(variant)}
                      aria-pressed={selectedVariant?._id === variant._id}
                      className={`rounded-lg border px-3 py-2 text-sm transition ${
                        selectedVariant?._id === variant._id
                          ? "border-[#16863D] bg-[#16863D] text-white"
                          : "border-gray-300 hover:border-[#16863D]"
                      }`}
                    >
                      {[variant.size, variant.color].filter(Boolean).join(" / ")}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6 flex items-center gap-3">
              <label htmlFor="detail-quantity" className="text-sm font-medium text-gray-700">
                {t("common.qty")}
              </label>
              <input
                id="detail-quantity"
                type="number"
                min={1}
                value={quantity}
                onChange={(event) => setQuantity(Math.max(Number(event.target.value) || 1, 1))}
                className="w-20 rounded-lg border border-gray-200 p-2 text-center outline-none focus:border-[#16863D]"
              />
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => add()}
                className="inline-flex items-center gap-2 rounded-xl border-2 border-[#062B63] px-5 py-3 font-semibold text-[#062B63] transition hover:bg-[#062B63] hover:text-white"
              >
                <ShoppingCart size={18} />
                {t("products.addToCart")}
              </button>
              <button
                type="button"
                onClick={() => add(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-[#16863D] px-5 py-3 font-semibold text-white transition hover:bg-[#0f6d30]"
              >
                <Zap size={18} />
                {t("products.orderNow")}
              </button>
              <button
                type="button"
                onClick={() => toggleWishlist(product)}
                className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-5 py-3 font-semibold transition hover:border-[#16863D]"
              >
                <Heart size={18} className={saved ? "fill-red-500 text-red-500" : ""} />
                {saved ? t("wishlist.saved") : t("nav.wishlist")}
              </button>
            </div>

            {status && (
              <p className={`mt-3 text-sm ${status.type === "error" ? "text-red-600" : "text-[#16863D]"}`}>{status.message}</p>
            )}
          </div>
        </div>

        <section className="mt-8 rounded-3xl border border-gray-200 bg-white p-6 md:p-8">
          <h2 className="text-2xl font-bold">{t("reviews.title")}</h2>

          <div className="mt-5 space-y-4">
            {reviews.length ? (
              reviews.map((review) => (
                <article key={review._id} className="border-b border-gray-200 pb-4 last:border-0">
                  <div className="flex flex-wrap items-center gap-2 text-yellow-500">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} size={15} className={star <= review.rating ? "fill-current" : "text-gray-300"} />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">{review.user?.fullname || t("home.verifiedCustomer")}</span>
                    {review.verifiedPurchase && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#EAF7EF] px-2 py-0.5 text-[11px] font-semibold text-[#0f6d30]">
                        <BadgeCheck size={12} />
                        {t("reviews.verifiedPurchase")}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-gray-700">{review.comment}</p>
                </article>
              ))
            ) : (
              <p className="text-gray-500">{t("reviews.none")}</p>
            )}
          </div>

          {user ? (
            <form onSubmit={submitReview} className="mt-6 space-y-3">
              <h3 className="font-semibold text-gray-900">{t("reviews.write")}</h3>
              <select
                value={rating}
                onChange={(event) => setRating(Number(event.target.value))}
                aria-label={t("reviews.write")}
                className="rounded-lg border border-gray-200 p-3 text-gray-900 outline-none focus:border-[#16863D]"
              >
                {[5, 4, 3, 2].map((value) => (
                  <option key={value} value={value}>
                    {t("reviews.stars", { count: formatNumber(value) })}
                  </option>
                ))}
                <option value={1}>{t("reviews.star")}</option>
              </select>
              <textarea
                required
                rows={3}
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                placeholder={t("reviews.comment")}
                aria-label={t("reviews.comment")}
                className="w-full rounded-lg border border-gray-200 p-3 text-gray-900 outline-none focus:border-[#16863D]"
              />
              <button className="rounded-lg bg-[#062B63] px-4 py-3 font-semibold text-white transition hover:bg-[#041F4A]">
                {t("reviews.submit")}
              </button>
            </form>
          ) : (
            <button
              type="button"
              onClick={() => setLoginOpen(true)}
              className="mt-6 text-sm font-semibold text-[#16863D] hover:underline"
            >
              {t("reviews.loginToWrite")}
            </button>
          )}
        </section>
      </div>

      <TrustBadges className="mt-10" />
      <AuthDialog open={loginOpen} onClose={() => setLoginOpen(false)} />
    </div>
  );
}
