import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, Check, Clock, Copy, X } from "lucide-react";

import promoImage from "../../assets/products/chivo-para-guisar.webp";

export interface FlashOfferModalProps {
  /** Milliseconds to wait before the modal appears. Defaults to 5000. */
  delay?: number;
  /** Promotional image shown in the left banner panel. */
  imageSrc?: string;
  /** Accessible description of the promotional image. */
  imageAlt?: string;
  /** Promo code shown in the copy box. Defaults to "BIENVENIDO10". */
  promoCode?: string;
  /** Called when the user clicks the primary "Aprovechar oferta" action. */
  onAccept?: () => void;
  /** Called after the modal is dismissed. */
  onClose?: () => void;
}

export default function FlashOfferModal({
  delay = 5000,
  imageSrc = promoImage,
  imageAlt = "Vista previa de productos seleccionados de Bistecca",
  promoCode = "BIENVENIDO10",
  onAccept,
  onClose,
}: FlashOfferModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const copyResetTimerRef = useRef<number | null>(null);

  const close = useCallback(() => {
    setIsOpen(false);
    onClose?.();
  }, [onClose]);

  // Automatically reveal the offer 5 seconds after page load.
  useEffect(() => {
    const timer = window.setTimeout(() => setIsOpen(true), delay);
    return () => window.clearTimeout(timer);
  }, [delay]);

  // Focus management, body scroll lock, and Escape-to-close while open.
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    closeButtonRef.current?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, close]);

  // Clean up any pending "copied" reset when the component unmounts.
  useEffect(() => {
    return () => {
      if (copyResetTimerRef.current !== null) {
        window.clearTimeout(copyResetTimerRef.current);
      }
    };
  }, []);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(promoCode);
    } catch {
      // Fallback for environments where the Clipboard API is unavailable.
      const textarea = document.createElement("textarea");
      textarea.value = promoCode;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }

    setCopied(true);
    if (copyResetTimerRef.current !== null) {
      window.clearTimeout(copyResetTimerRef.current);
    }
    copyResetTimerRef.current = window.setTimeout(() => setCopied(false), 2000);
  }, [promoCode]);

  const handleAccept = useCallback(() => {
    onAccept?.();
    close();
  }, [onAccept, close]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          close();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="flash-offer-title"
        aria-describedby="flash-offer-description"
        className="relative mx-4 flex w-full max-w-3xl flex-col overflow-hidden rounded-none border border-border-color bg-white shadow-2xl sm:rounded-sm md:flex-row dark:bg-[#1E1919]"
      >
        {/* Dismiss control */}
        <button
          ref={closeButtonRef}
          type="button"
          onClick={close}
          aria-label="Cerrar oferta"
          className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white transition-colors hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        {/* Left side — promotional image / brand banner */}
        <div
          className="relative flex min-h-[220px] w-full flex-col justify-end bg-[#282222] bg-cover bg-center p-6 md:min-h-[380px] md:w-5/12"
          style={{ backgroundImage: `url(${imageSrc})` }}
        >
          <span className="sr-only" aria-hidden="true">
            {imageAlt}
          </span>
          {/* Readability overlay so the badge and subtitle stay legible */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10"
          />

          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-sm bg-accent/90 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-white">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              Oferta Flash
            </span>
            <p className="mt-3 text-sm text-white/80">Solo por hoy en Bistecca</p>
          </div>
        </div>

        {/* Right side — content & offer details */}
        <div className="flex flex-1 flex-col justify-center p-6 md:p-8">
          <p className="mb-2 text-xs font-bold uppercase text-primary">
            Beneficio exclusivo
          </p>

          <h2
            id="flash-offer-title"
            className="text-2xl font-bold tracking-tight text-primary-text sm:text-3xl"
          >
            10% de descuento en tu primera compra
          </h2>

          <p
            id="flash-offer-description"
            className="mt-2 text-sm text-secondary-text"
          >
            Descubre productos seleccionados y ahorra desde el primer pedido.
            Sin compras mínimas.
          </p>

          {/* Promo code box */}
          <div className="mt-5">
            <p className="text-xs font-bold uppercase tracking-widest text-primary">
              Código promocional
            </p>
            <div className="mt-2 flex items-stretch overflow-hidden rounded-sm border border-dashed border-border-color">
              <span className="flex flex-1 select-all items-center px-4 py-3 text-sm font-bold tracking-widest text-primary-text">
                {promoCode}
              </span>
              <button
                type="button"
                onClick={handleCopy}
                aria-live="polite"
                className={`flex items-center gap-1.5 border-l border-dashed border-border-color px-3 py-3 text-sm font-semibold transition-colors ${
                  copied
                    ? "text-green-600 dark:text-green-400"
                    : "text-primary hover:bg-surface"
                }`}
              >
                {copied ? (
                  <Check className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Copy className="h-4 w-4" aria-hidden="true" />
                )}
                <span>{copied ? "¡Copiado!" : "Copiar"}</span>
              </button>
            </div>
          </div>

          {/* Call to action */}
          <button
            type="button"
            onClick={handleAccept}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-none bg-primary py-3 font-semibold text-white transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#1E1919]"
          >
            Aprovechar oferta
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>

          {/* Secondary dismiss link */}
          <button
            type="button"
            onClick={close}
            className="mt-3 w-full text-center text-xs text-secondary-text underline-offset-4 transition-colors hover:text-primary-text hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            No, gracias. Prefiero pagar precio completo
          </button>

          {/* Footer note */}
          <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-secondary-text">
            <Check className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" />
            Aplicable una vez por cliente
          </p>
        </div>
      </div>
    </div>
  );
}
