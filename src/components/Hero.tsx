import type { LucideIcon } from "lucide-react";
import { ArrowRight, ShieldCheck, Star, Truck } from "lucide-react";

import logo from "../assets/logo.png";

interface Feature {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  iconClassName: string;
}

const FEATURES: Feature[] = [
  {
    icon: Truck,
    title: "Entrega rápida",
    subtitle: "Recibe hoy en Coro",
    iconClassName: "bg-primary/10 text-primary",
  },
  {
    icon: Star,
    title: "Calidad garantizada",
    subtitle: "Selección premium",
    iconClassName: "bg-accent/10 text-accent",
  },
  {
    icon: ShieldCheck,
    title: "Compra segura",
    subtitle: "Paga como prefieras",
    iconClassName: "bg-primary/10 text-primary",
  },
];

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="space-y-4 pb-8 sm:space-y-6 sm:pb-12"
    >
      {/* Main banner — full width with sharp corners */}
      <div className="relative isolate w-full overflow-hidden rounded-none bg-[#282222]">
        {/* Decorative watermark logo */}
        <img
          src={logo}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -right-8 top-1/2 h-[120%] w-auto max-w-none -translate-y-1/2 select-none object-contain opacity-10"
        />

        <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-20">
          {/* Left content */}
          <div className="max-w-xl">
            <span className="inline-flex items-center rounded-sm border border-accent px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent">
              Calidad que se siente
            </span>

            <h1
              id="hero-heading"
              className="mt-6 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl"
            >
              Lo mejor de tu despensa, en un solo lugar.
            </h1>

            <p className="mt-4 max-w-lg text-base text-white/70 sm:text-lg">
              Productos seleccionados, precios honestos y la comodidad de
              recibirlos en casa.
            </p>

            <a
              href="/tienda"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-none bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#282222]"
            >
              Comprar ahora
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          {/* Right logo — subtle floating watermark */}
          <div className="hidden lg:flex lg:items-center lg:justify-center">
            <img
              src={logo}
              alt="Logotipo de Bistecca"
              className="h-44 w-auto object-contain opacity-50 drop-shadow-lg lg:h-52 xl:h-60"
            />
          </div>
        </div>
      </div>

      {/* Feature highlights — aligned to the site layout grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, subtitle, iconClassName }) => (
            <article
              key={title}
              className="flex items-start gap-4 rounded-xl border border-border-color bg-surface p-5 shadow-sm sm:p-6"
            >
              <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${iconClassName}`}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h2 className="text-base font-semibold text-primary-text">
                  {title}
                </h2>
                <p className="mt-1 text-sm text-secondary-text">{subtitle}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
