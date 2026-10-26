import type { ReactNode } from "react";
import { MapPin } from "lucide-react";

import logo from "../../assets/logo.png";

interface QuickLink {
    label: string;
    href: string;
}

interface SocialLink {
    label: string;
    href: string;
    icon: ReactNode;
}

function TikTokIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="h-5 w-5"
        >
            <path d="M21 7.917v4.034a9.948 9.948 0 0 1 -5 -1.951v4.5a6.5 6.5 0 1 1 -8 -6.326v4.326a2.5 2.5 0 1 0 4 2v-11.5h4.083a6.005 6.005 0 0 0 4.917 4.917z" />
        </svg>
    );
}

function InstagramIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="h-5 w-5"
        >
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
    );
}

function FacebookIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="h-5 w-5"
        >
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
    );
}

const QUICK_LINKS: QuickLink[] = [
    { label: "Tienda", href: "/" },
    { label: "Categorías", href: "/categorias" },
    { label: "Nosotros", href: "/nosotros" },
    { label: "Contacto", href: "/contacto" },
];

const LOCATIONS: string[] = [
    "Calle Garcés esquina calle Federación, diagonal a la Gobernación de Falcón.",
    "Av. Manaure entre calle El Sol y calle Monzón, frente al centro comercial El Castillo.",
];

// TODO: replace with the real Bistecca social profile URLs.
const SOCIAL_LINKS: SocialLink[] = [
    {
        label: "TikTok",
        href: "https://www.tiktok.com/@bistecca",
        icon: <TikTokIcon />,
    },
    {
        label: "Instagram",
        href: "https://www.instagram.com/bistecca",
        icon: <InstagramIcon />,
    },
    {
        label: "Facebook",
        href: "https://www.facebook.com/bistecca",
        icon: <FacebookIcon />,
    },
];

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
    return (
        <footer className="bg-footer text-white">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {/* Brand & about */}
                    <div>
                        <a
                            href="/"
                            aria-label="Bistecca — Ir al inicio"
                            className="inline-flex rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                        >
                            <img
                                src={logo}
                                alt="Logotipo de Bistecca"
                                className="h-12 w-auto brightness-0 invert md:h-30"
                            />
                        </a>
                        <p className="mt-4 max-w-sm text-base leading-relaxed text-white/70">
                            Bistecca: Calidad, Frescura y Delicias para Todos. Ofrecemos una
                            experiencia integral con MiniMarket, Bodegón, Carnicería, Pescadería y
                            platos listos para llevar. Destacamos por frescura, excelente atención,
                            precios accesibles y un ambiente impecable.
                        </p>
                    </div>

                    {/* Locations */}
                    <div>
                        <h5 className="text-lg font-bold uppercase tracking-wider text-white md:text-xl">
                            Nuestras Sedes
                        </h5>
                        <ul className="mt-4 space-y-4">
                            {LOCATIONS.map((address) => (
                                <li key={address} className="flex items-start gap-3">
                                    <MapPin
                                        aria-hidden="true"
                                        className="mt-0.5 h-6 w-6 shrink-0 text-accent"
                                    />
                                    <span className="text-base leading-relaxed text-white/70">
                                        {address}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick links */}
                    <nav aria-label="Enlaces rápidos">
                        <h5 className="text-lg font-bold uppercase tracking-wider text-white md:text-xl">
                            Navegación
                        </h5>
                        <ul className="mt-4 space-y-2">
                            {QUICK_LINKS.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        className="rounded-sm text-base text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Social media */}
                    <div>
                        <h5 className="text-lg font-bold uppercase tracking-wider text-white md:text-xl">
                            Síguenos
                        </h5>
                        <ul className="mt-4 flex gap-3">
                            {SOCIAL_LINKS.map((social) => (
                                <li key={social.label}>
                                    <a
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`Bistecca en ${social.label}`}
                                        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-accent hover:bg-accent/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                                    >
                                        {social.icon}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-10 border-t border-white/10 pt-6 text-center sm:mt-12">
                    <p className="text-sm text-white/50">
                        © {CURRENT_YEAR} Bistecca. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
}
