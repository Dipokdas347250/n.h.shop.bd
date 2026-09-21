"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, Heart, ShoppingCart, Star } from "lucide-react";
import { useShop } from "../../common/ShopContext";
import { storeRequest } from "../../../lib/storeApi";
import { useStoreAuth } from "../../common/StoreAuthContext";
import { productEventData, trackMetaEvent } from "../../../lib/metaPixel";

export default function ProductDetailClient({ product }) {
  const router = useRouter();
  const { addToCart, wishlist, toggleWishlist } = useShop();
  const { user } = useStoreAuth();
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0] || null);
  const [reviews, setReviews] = useState(product.reviewItems || []);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [reviewStatus, setReviewStatus] = useState("");

  useEffect(() => {
    storeRequest(`/review/product/${product.id}`).then(setReviews).catch(() => {});
    trackMetaEvent("ViewContent", productEventData(product));
  }, [product]);

  const add = (checkout = false) => {
    if (product.variants?.length && !selectedVariant) return setReviewStatus("Select a size and color first.");
    addToCart(product, selectedVariant);
    if (checkout) router.push(`/checkout?product=${product.id}`);
    else router.push("/cart");
  };

  const submitReview = async (event) => {
    event.preventDefault();
    setReviewStatus("Submitting review...");
    try {
      const review = await storeRequest("/review/add-review", { method: "POST", body: JSON.stringify({ product: product.id, rating, comment }) });
      trackMetaEvent("SubmitReview", { content_ids: [String(product.id)], rating }, true);
      setReviews((current) => [review, ...current]);
      setComment("");
      setReviewStatus("Review submitted.");
    } catch (error) {
      setReviewStatus(error.message);
    }
  };

  return <main className="bg-gray-50 py-10 text-gray-900 dark:bg-gray-950 dark:text-white"><div className="mx-auto max-w-6xl px-4"><Link href="/allproduct" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-600"><ArrowLeft size={16} />Back to all products</Link><div className="grid gap-8 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 md:grid-cols-2 md:p-8"><div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100"><Image src={product.image} alt={product.name} fill className="object-cover" priority /></div><div className="flex flex-col justify-center"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">{product.category}</p><h1 className="mt-2 text-3xl font-bold md:text-4xl">{product.name}</h1><div className="mt-4 flex items-center gap-2 text-yellow-500"><Star size={16} className="fill-current" /><span>{product.rating || "New"}</span><span className="text-sm text-gray-500">({reviews.length} reviews)</span></div><div className="mt-6 flex items-end gap-3"><span className="text-3xl font-extrabold text-blue-600">৳{product.price.toLocaleString()}</span>{product.oldPrice > product.price && <span className="text-lg text-gray-400 line-through">৳{product.oldPrice.toLocaleString()}</span>}</div><p className="mt-6 leading-7 text-gray-600 dark:text-gray-300">{product.description}</p>{product.variants?.length > 0 && <div className="mt-6"><p className="mb-2 font-semibold">Choose size and color</p><div className="flex flex-wrap gap-2">{product.variants.map((variant) => <button key={variant._id} onClick={() => setSelectedVariant(variant)} className={`rounded-lg border px-3 py-2 text-sm ${selectedVariant?._id === variant._id ? "border-blue-600 bg-blue-600 text-white" : "border-gray-300"}`}>{variant.size} / {variant.color}</button>)}</div></div>}<div className="mt-6 flex flex-wrap gap-3"><button onClick={() => add()} className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white"><ShoppingCart size={18} />Add to Cart</button><button onClick={() => add(true)} className="rounded-xl bg-green-600 px-5 py-3 font-semibold text-white">Order Now</button><button onClick={() => toggleWishlist(product)} className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-5 py-3 font-semibold"><Heart size={18} />{wishlist.some((item) => item.id === product.id) ? "Saved" : "Wishlist"}</button></div>{reviewStatus && <p className="mt-3 text-sm text-blue-600">{reviewStatus}</p>}</div></div><section className="mt-8 rounded-3xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900"><h2 className="text-2xl font-bold">Customer reviews</h2><div className="mt-5 space-y-4">{reviews.map((review) => <article key={review._id} className="border-b border-gray-200 pb-4 dark:border-gray-800"><div className="flex items-center gap-2 text-yellow-500">{[1, 2, 3, 4, 5].map((star) => <Star key={star} size={15} className={star <= review.rating ? "fill-current" : "text-gray-300"} />)}<span className="ml-2 text-sm text-gray-500">{review.user?.fullname || "Customer"}</span></div><p className="mt-2 text-gray-700 dark:text-gray-300">{review.comment}</p></article>)}{!reviews.length && <p className="text-gray-500">No reviews yet.</p>}</div>{user ? <form onSubmit={submitReview} className="mt-6 space-y-3"><select value={rating} onChange={(event) => setRating(Number(event.target.value))} className="rounded-lg border p-3 text-gray-900"><option value="5">5 stars</option><option value="4">4 stars</option><option value="3">3 stars</option><option value="2">2 stars</option><option value="1">1 star</option></select><textarea required value={comment} onChange={(event) => setComment(event.target.value)} placeholder="Write your review" className="w-full rounded-lg border p-3 text-gray-900" /><button className="rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white">Submit review</button></form> : <p className="mt-6 text-sm text-gray-500">Login to write a review.</p>}</section></div></main>;
}
