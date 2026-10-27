import { useEffect, useRef, useState } from "react";
import type { FormEvent, KeyboardEvent } from "react";
import { Menu, Search, ShoppingBag, User, X } from "lucide-react";

import logo from "../../assets/logo.png";

export interface NavItem {
  label: string;
  href: string;
  isActive?: boolean;
}

export interface HeaderProps {
  /** Number of items shown in the cart badge. Defaults to 3. */
  cartCount?: number;
  /** Navigation links rendered in the desktop nav and the mobile drawer. */
  navItems?: NavItem[];
  /** Called when a search is submitted with the current query. */
  onSearch?: (query: string) => void;
  /** Called when the user clicks the cart button to open the cart drawer. */
  onCartOpen?: () => void;
}

const DEFAULT_NAV_ITEMS: NavItem[] = [
  { label: "Tienda", href: "/", isActive: true },
  { label: "Categorías", href: "/categorias" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Contacto", href: "/contacto" },
];

interface SearchBarProps {
  /** Unique id linking the label to the input (desktop vs. mobile). */
  id: string;
  onSearch?: (query: string) => void;
  className?: string;
}

function SearchBar({ id, onSearch, className }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch?.(query);
  };

  return (
    <form role="search" onSubmit={handleSubmit} className={className}>
      <label htmlFor={id} className="sr-only">
        Buscar productos
      </label>
      <div className="relative w-full">
        <input
          id={id}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="¿Qué estás buscando hoy?"
          className="w-full rounded-full border border-transparent bg-white py-2 pl-4 pr-11 text-sm text-neutral-900 placeholder:text-neutral-600 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          type="submit"
          aria-label="Buscar"
          className="absolute inset-y-0 right-0 flex items-center px-3 text-neutral-500 transition-colors hover:text-neutral-700"
        >
          <Search className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </form>
  );
}

export default function Header({
  cartCount = 3,
  navItems = DEFAULT_NAV_ITEMS,
  onSearch,
  onCartOpen,
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const hasOpenedRef = useRef(false);

  const closeMenu = () => setIsMenuOpen(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  useEffect(() => {
    if (isMenuOpen) {
      hasOpenedRef.current = true;
      closeButtonRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else if (hasOpenedRef.current) {
      menuButtonRef.current?.focus();
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const handleDrawerKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-[#282222]">
        {/* Announcement bar */}
        <div className="bg-[#1E1919]">
          <p className="mx-auto max-w-7xl px-4 py-2 text-center text-xs font-medium tracking-wide text-white sm:text-sm">
            Envío gratis en todo Coro
          </p>
        </div>

        {/* Main navigation */}
        <nav
          aria-label="Navegación principal"
          className="border-b border-white/10"
        >
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
            {/* Logo */}
            <a
              href="/"
              aria-label="Bistecca — Ir al inicio"
              className="flex shrink-0 items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <img
                src={logo}
                alt="Logotipo de Bistecca"
                className="h-10 w-auto"
              />
            </a>

            {/* Desktop navigation links */}
            <ul className="hidden items-center gap-1 md:flex">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    aria-current={item.isActive ? "page" : undefined}
                    className={`group relative rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                      item.isActive
                        ? "font-semibold text-white"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-accent transition-opacity ${
                        item.isActive
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-60"
                      }`}
                    />
                  </a>
                </li>
              ))}
            </ul>

            {/* Right-side actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Desktop search */}
              <SearchBar
                id="site-search"
                onSearch={onSearch}
                className="hidden w-64 md:block lg:w-80"
              />

              {/* Profile */}
              <button
                type="button"
                aria-label="Mi cuenta"
                className="hidden h-11 w-11 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent md:flex"
              >
                <User className="h-5 w-5" aria-hidden="true" />
              </button>

              {/* Cart */}
              <button
                type="button"
                onClick={onCartOpen}
                aria-label={`Carrito, ${cartCount} ${
                  cartCount === 1 ? "artículo" : "artículos"
                }`}
                className="relative inline-flex items-center justify-center gap-2 rounded-none bg-primary p-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <ShoppingBag className="h-5 w-5" aria-hidden="true" />
                <span className="hidden md:inline">Carrito</span>
                <span
                  aria-hidden="true"
                  className="absolute -right-1.5 -top-1.5 flex h-6 min-w-6 items-center justify-center rounded-full bg-accent px-1.5 text-xs font-bold text-stone-900"
                >
                  {cartCount}
                </span>
              </button>

              {/* Mobile menu toggle */}
              <button
                ref={menuButtonRef}
                type="button"
                onClick={toggleMenu}
                aria-label={
                  isMenuOpen
                    ? "Cerrar menú de navegación"
                    : "Abrir menú de navegación"
                }
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                className="flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent md:hidden"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile drawer backdrop */}
      <div
        onClick={closeMenu}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 md:hidden ${
          isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Mobile navigation drawer */}
      <aside
        id="mobile-menu"
        aria-label="Menú de navegación móvil"
        inert={!isMenuOpen}
        onKeyDown={handleDrawerKeyDown}
        className={`fixed inset-y-0 right-0 z-50 flex w-80 max-w-[85vw] flex-col bg-[#282222] shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <span className="text-sm font-semibold text-white">Menú</span>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeMenu}
            aria-label="Cerrar menú de navegación"
            className="flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="flex flex-col overflow-y-auto p-4">
          <SearchBar
            id="mobile-search"
            onSearch={onSearch}
            className="mb-2 w-full"
          />

          <nav aria-label="Navegación móvil" className="mt-2">
            <ul className="flex flex-col gap-1">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={closeMenu}
                    aria-current={item.isActive ? "page" : undefined}
                    className={`flex items-center justify-between rounded-lg px-4 py-3 text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                      item.isActive
                        ? "bg-white/10 font-semibold text-white"
                        : "text-white/70 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {item.label}
                    {item.isActive ? (
                      <span
                        aria-hidden="true"
                        className="h-2 w-2 rounded-full bg-accent"
                      />
                    ) : null}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}
