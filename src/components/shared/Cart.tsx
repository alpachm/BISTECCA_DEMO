import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, Minus, Plus, Trash2, X } from "lucide-react";

import img7Up from "../../assets/products/7UP-15L.png";
import imgMalta from "../../assets/products/Foto-51-de-53-scaled.jpg";
import imgQueso from "../../assets/products/DSC01857-600x400.jpg";

/** A single line item rendered inside the cart drawer. */
export interface CartItem {
  /** Stable identifier used as the React key and for mutations. */
  id: string;
  name: string;
  /** Short uppercase category label shown above the product name. */
  category: string;
  /** Unit price in dollars. */
  price: number;
  /** Number of units currently in the cart. */
  quantity: number;
  /** Thumbnail image URL. */
  image: string;
}

export interface CartProps {
  /** Whether the drawer is visible (controls the slide animation and backdrop). */
  open: boolean;
  /** Called when the drawer is closed via the backdrop, close button, or Escape. */
  onClose: () => void;
  /** Cart line items. Defaults to the demo seed data. */
  items?: CartItem[];
  /** Spend required to unlock free shipping. Defaults to 35. */
  freeShippingThreshold?: number;
  /** Spend required to unlock the discount reward. */
  discountThreshold?: number;
  /** Called when the user clicks "Continuar al checkout". */
  onCheckout?: () => void;
  /** Called after an item is removed from the cart. */
  onRemoveItem?: (id: string) => void;
  /** Called after an item's quantity changes. */
  onQuantityChange?: (id: string, quantity: number) => void;
}

const FREE_SHIPPING_THRESHOLD = 35;

// Threshold chosen so the default demo cart displays the reference message
// "Te faltan $25.25 para un descuento" (38.99 - 13.74 = 25.25).
const DISCOUNT_THRESHOLD = 38.99;

// Demo seed data used when the component is mounted without a live cart store.
// In production these items would be supplied through the `items` prop.
const DEFAULT_ITEMS: CartItem[] = [
  {
    id: "7up-15l",
    name: "7UP 1,5L",
    category: "Bebidas",
    price: 1.12,
    quantity: 1,
    image: img7Up,
  },
  {
    id: "malta-ligera",
    name: "Malta Ligera 24x",
    category: "Bebidas",
    price: 8.9,
    quantity: 1,
    image: imgMalta,
  },
  {
    id: "queso-blanco",
    name: "Queso Blanco Duro",
    category: "Lácteos",
    price: 3.72,
    quantity: 1,
    image: imgQueso,
  },
];

function formatMoney(value: number): string {
  return `$${value.toFixed(2)}`;
}

export default function Cart({
  open,
  onClose,
  items = DEFAULT_ITEMS,
  freeShippingThreshold = FREE_SHIPPING_THRESHOLD,
  discountThreshold = DISCOUNT_THRESHOLD,
  onCheckout,
  onRemoveItem,
  onQuantityChange,
}: CartProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>(items);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const total = subtotal; // shipping is calculated at checkout

  const remainingToDiscount = Math.max(0, discountThreshold - subtotal);
  const discountProgress = Math.min(
    100,
    Math.max(0, Math.round((subtotal / discountThreshold) * 100)),
  );

  const freeShippingUnlocked = subtotal >= freeShippingThreshold;
  const discountUnlocked = subtotal >= discountThreshold;
  useEffect(() => {
    if (!open) {
      return;
    }

    closeButtonRef.current?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  const changeQuantity = (id: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
    onQuantityChange?.(id, quantity);
  };

  const increment = (id: string) => {
    const item = cartItems.find((entry) => entry.id === id);
    if (item) {
      changeQuantity(id, item.quantity + 1);
    }
  };

  const decrement = (id: string) => {
    const item = cartItems.find((entry) => entry.id === id);
    if (item && item.quantity > 1) {
      changeQuantity(id, item.quantity - 1);
    }
  };

  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    onRemoveItem?.(id);
  };

  return (
    <>
      {/* Backdrop overlay */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Slide-over drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Carrito de compras"
        inert={!open}
        className={`fixed inset-y-0 right-0 z-50 flex h-full w-full flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out dark:bg-[#1E1919] sm:w-[420px] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Fixed header */}
        <header className="border-b border-border-color px-6 pb-5 pt-6">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-widest text-primary">
                Tu pedido
              </p>
              <h2 className="mt-1 text-xl font-bold tracking-tight text-primary-text">
                Carrito ({itemCount}{" "}
                {itemCount === 1 ? "artículo" : "artículos"})
              </h2>
            </div>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Cerrar carrito"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-secondary-text transition-colors hover:bg-surface hover:text-primary-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          {/* Free shipping badge */}
          <p className="mt-4 flex items-center gap-2 text-sm font-medium text-green-600 dark:text-green-400">
            <Check className="h-4 w-4 shrink-0" aria-hidden="true" />
            {freeShippingUnlocked
              ? "¡Envío gratis desbloqueado!"
              : `Envío gratis a partir de $${freeShippingThreshold}`}
          </p>

          {/* Incentive progress box */}
          <div className="mt-3 rounded-lg border border-border-color bg-surface p-4">
            <div className="flex items-center justify-between gap-3 text-sm">
              <span className="text-secondary-text">
                {discountUnlocked ? (
                  "¡Descuento desbloqueado!"
                ) : (
                  <>
                    Te faltan{" "}
                    <span className="font-semibold text-primary-text">
                      {formatMoney(remainingToDiscount)}
                    </span>{" "}
                    para un descuento
                  </>
                )}
              </span>
              <span className="shrink-0 font-bold text-primary-text">
                {discountProgress}%
              </span>
            </div>

            <div
              role="progressbar"
              aria-valuenow={discountProgress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Progreso hacia el descuento"
              className="mt-2 h-2 w-full overflow-hidden rounded-full bg-border-color"
            >
              <div
                className="h-full rounded-full bg-accent transition-[width] duration-300 ease-out"
                style={{ width: `${discountProgress}%` }}
              />
            </div>
          </div>
        </header>
        {/* Scrollable items */}
        <div className="flex-1 overflow-y-auto px-6 py-3">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-1 py-16 text-center">
              <p className="text-sm font-semibold text-primary-text">
                Tu carrito está vacío
              </p>
              <p className="text-sm text-secondary-text">
                Añade productos para comenzar tu pedido.
              </p>
            </div>
          ) : (
            <ul className="space-y-4">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="flex gap-4 border-b border-border-color pb-4"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="h-16 w-16 flex-shrink-0 rounded-md border border-border-color bg-white object-cover"
                  />

                  {/* Product info + quantity stepper */}
                  <div className="flex min-w-0 flex-1 flex-col">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-secondary-text">
                      {item.category}
                    </p>
                    <h3 className="mt-0.5 truncate text-sm font-semibold text-primary-text">
                      {item.name}
                    </h3>

                    <div className="mt-2 inline-flex w-fit items-center rounded-md border border-border-color">
                      <button
                        type="button"
                        onClick={() => decrement(item.id)}
                        disabled={item.quantity <= 1}
                        aria-label={`Disminuir cantidad de ${item.name}`}
                        className="flex h-7 w-7 items-center justify-center text-secondary-text transition-colors hover:text-primary-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                      <span
                        aria-live="polite"
                        className="w-8 text-center text-sm font-medium tabular-nums text-primary-text"
                      >
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => increment(item.id)}
                        aria-label={`Aumentar cantidad de ${item.name}`}
                        className="flex h-7 w-7 items-center justify-center text-secondary-text transition-colors hover:text-primary-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
                      >
                        <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                  {/* Delete + line total */}
                  <div className="flex shrink-0 flex-col items-end justify-between">
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      aria-label={`Eliminar ${item.name} del carrito`}
                      className="flex h-8 w-8 items-center justify-center rounded-md text-secondary-text transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <span className="text-sm font-semibold text-primary-text">
                      {formatMoney(item.price * item.quantity)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Fixed footer summary */}
        <footer className="border-t border-border-color px-6 py-5">
          <dl className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <dt className="text-secondary-text">Subtotal</dt>
              <dd className="font-medium text-primary-text">
                {formatMoney(subtotal)}
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-secondary-text">Envío</dt>
              <dd className="text-secondary-text">Calculado al finalizar</dd>
            </div>
            <div className="flex items-center justify-between border-t border-border-color pt-3 text-base">
              <dt className="font-semibold text-primary-text">Total estimado</dt>
              <dd className="font-bold text-primary-text">
                {formatMoney(total)}
              </dd>
            </div>
          </dl>

          <button
            type="button"
            onClick={onCheckout}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 font-medium text-white shadow-sm transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#1E1919]"
          >
            Continuar al checkout
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>

          <p className="mt-3 text-center text-xs text-secondary-text">
            Impuestos y envío se confirman antes de pagar.
          </p>
        </footer>
      </aside>
    </>
  );
}



