import { Show, SignInButton, useAuth, UserButton } from "@clerk/react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import {
  LogInIcon,
  PackageIcon,
  SettingsIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,

} from "lucide-react";

import { apiFetch } from "../lib/api";
import { useCart } from "../store/cart";

const Navbar = () => {
  const { getToken, isSignedIn } = useAuth();

  const { data: meData } = useQuery({
    queryKey: ["me"],
    queryFn: () => apiFetch("/api/me", { getToken }),
    enabled: isSignedIn,
  });

  const role = meData?.user?.role;

  const cartCount = useCart((s) =>
    s.items.reduce((n, line) => n + line.quantity, 0),
  );

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-[#F8F5F0]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}

        <Link
          to="/"
          className="text-3xl font-bold uppercase tracking-[0.3em] text-neutral-900 transition hover:text-neutral-600"
        >
          
          Furnixa
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-8">
          <Link
            to="/shop"
            className="flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-neutral-700 transition hover:text-black"
          >
            <ShoppingBagIcon size={18} />
            <span className="hidden md:inline">Shop</span>
          </Link>

          <Show when="signed-in">
            <Link
              to="/orders"
              className="flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-neutral-700 transition hover:text-black"
            >
              <PackageIcon size={18} />
              <span className="hidden md:inline">Orders</span>
            </Link>

            {role === "admin" && (
              <Link
                to="/admin"
                className="flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-neutral-700 transition hover:text-black"
              >
                <SettingsIcon size={18} />
                <span className="hidden md:inline">Admin</span>
              </Link>
            )}
          </Show>

          {/* Cart */}

          <Link
            to="/cart"
            className="relative flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-neutral-700 transition hover:text-black"
          >
            <ShoppingCartIcon size={20} />

            {cartCount > 0 && (
              <span className="absolute -right-3 -top-3 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] font-semibold text-white">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}

            <span className="hidden md:inline">Cart</span>
          </Link>

          {/* Sign In */}

          <Show when="signed-out">
            <SignInButton mode="modal">
              <button
                type="button"
                className="rounded-full border border-black px-5 py-2 text-sm font-medium transition-all duration-300 hover:bg-black hover:text-white"
              >
                <span className="flex items-center gap-2">
                  <LogInIcon size={16} />
                  Sign In
                </span>
              </button>
            </SignInButton>
          </Show>

          {/* User */}

          <Show when="signed-in">
            <div className="flex items-center gap-4 border-l border-neutral-300 pl-6">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "h-10 w-10 border border-neutral-300 shadow-sm",
                  },
                }}
              />

              {(role === "admin" || role === "support") && (
                <span className="rounded-full border border-neutral-300 px-3 py-1 text-xs font-medium uppercase tracking-widest text-neutral-700">
                  {role}
                </span>
              )}
            </div>
          </Show>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
