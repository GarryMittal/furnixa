import { Link } from "react-router";
import { PlusIcon } from "lucide-react";
import { formatPrice } from "../utils/format.js";
import { IK_PRESETS, imageKitOptimizedUrl } from "../lib/imagekitUrl.js";
import { useCart } from "../store/cart.js";

export function CatalogProductCard({ product }) {
  const addItem = useCart((s) => s.addItem);

  return (
    <article className="card group h-full overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-amber-800/40 hover:shadow-lg">
      <Link to={`/product/${product.slug}`} className="relative block overflow-hidden">
        <figure className="aspect-[4/3] bg-base-300">
          {product.imageUrl ? (
            <img
              src={imageKitOptimizedUrl(product.imageUrl, IK_PRESETS.catalogCard)}
              alt=""
              className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
              loading="lazy"
              decoding="async"
            />
          ) : null}
        </figure>
        <span className="badge badge-sm absolute left-3 top-3 border-0 bg-white/90 px-2.5 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-neutral-700 backdrop-blur">
          {product.category ?? "General"}
        </span>
      </Link>

      <div className="card-body grow gap-3 p-5 text-left">
        <Link
          to={`/product/${product.slug}`}
          className="card-title line-clamp-2 text-base font-semibold text-neutral-900 transition group-hover:text-amber-800"
        >
          {product.name}
        </Link>
        <p className="line-clamp-2 text-sm leading-relaxed text-neutral-500">
          {product.description}
        </p>
        <div className="card-actions mt-auto items-center justify-between border-t border-base-200 pt-4">
          <span className="text-lg font-bold tabular-nums text-neutral-900">
            {formatPrice(product.priceCents, product.currency)}
          </span>
          <button
            type="button"
            onClick={() => addItem(product.id)}
            className="btn btn-sm gap-1.5 rounded-lg border-0 bg-neutral-900 text-white shadow-none hover:bg-black"
          >
            <PlusIcon className="size-4" aria-hidden />
            Add
          </button>
        </div>
      </div>
    </article>
  );
}