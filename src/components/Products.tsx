import { useState } from "react";
import { Check, ChevronDown, Heart, SlidersHorizontal, Star } from "lucide-react";

import img7Up from "../assets/products/7UP-15L.png";
import imgAceite from "../assets/products/ACEITE-DE-SOYA-NATUROIL.png";
import imgArroz from "../assets/products/ARROZ-PRIMOR-TRADICIONAL-1KG.png";
import imgChivo from "../assets/products/chivo-para-guisar.webp";
import imgDsc from "../assets/products/DSC01857-600x400.jpg";
import imgFoto from "../assets/products/Foto-51-de-53-scaled.jpg";

type ProductCategory =
  | "Carnes"
  | "Víveres"
  | "Bebidas"
  | "Lácteos"
  | "Limpieza";

type FilterCategory = "Todos" | ProductCategory;

interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  rating: number;
  badge?: string;
  image: string;
}

const CATEGORIES: readonly FilterCategory[] = [
  "Todos",
  "Carnes",
  "Víveres",
  "Bebidas",
  "Lácteos",
  "Limpieza",
];

type SortOption = "relevancia" | "precio-asc" | "precio-desc" | "rating";

const SORT_OPTIONS: readonly { value: SortOption; label: string }[] = [
  { value: "relevancia", label: "Relevancia" },
  { value: "precio-asc", label: "Precio: menor a mayor" },
  { value: "precio-desc", label: "Precio: mayor a menor" },
  { value: "rating", label: "Mejor calificación" },
];

const PRODUCTS: Product[] = [
  {
    id: "chivo-guisar",
    name: "Chivo para Guisar",
    category: "Carnes",
    price: 4.09,
    rating: 4.8,
    badge: "Más vendido",
    image: imgChivo,
  },
  {
    id: "lomo-res-premium",
    name: "Lomo de Res Premium",
    category: "Carnes",
    price: 6.49,
    rating: 4.7,
    image: imgDsc,
  },
  {
    id: "pechuga-pollo",
    name: "Pechuga de Pollo Fresca",
    category: "Carnes",
    price: 3.29,
    rating: 4.6,
    badge: "Oferta",
    image: imgFoto,
  },
  {
    id: "costillas-cerdo",
    name: "Costillas de Cerdo Ahumadas",
    category: "Carnes",
    price: 5.49,
    rating: 4.6,
    badge: "Oferta",
    image: imgDsc,
  },
  {
    id: "aceite-soya",
    name: "Aceite de Soya Naturoil",
    category: "Víveres",
    price: 1.12,
    rating: 4.5,
    badge: "Ahorra 10%",
    image: imgAceite,
  },
  {
    id: "arroz-primor",
    name: "Arroz Primor Tradicional 1kg",
    category: "Víveres",
    price: 2.35,
    rating: 4.9,
    badge: "Más vendido",
    image: imgArroz,
  },
  {
    id: "azucar-blanca",
    name: "Azúcar Blanca 1kg",
    category: "Víveres",
    price: 1.05,
    rating: 4.4,
    image: imgDsc,
  },
  {
    id: "pasta-spaghetti",
    name: "Pasta Larga Spaghetti 400g",
    category: "Víveres",
    price: 1.25,
    rating: 4.4,
    image: imgFoto,
  },
  {
    id: "7up-15l",
    name: "7UP 1.5L",
    category: "Bebidas",
    price: 1.12,
    rating: 4.7,
    image: img7Up,
  },
  {
    id: "malta-ligera",
    name: "Malta Ligera 24x",
    category: "Bebidas",
    price: 8.9,
    rating: 4.5,
    image: imgFoto,
  },
  {
    id: "jugo-naranja",
    name: "Jugo de Naranja Natural 1L",
    category: "Bebidas",
    price: 2.15,
    rating: 4.6,
    image: imgDsc,
  },
  {
    id: "queso-blanco",
    name: "Queso Blanco Duro",
    category: "Lácteos",
    price: 3.2,
    rating: 4.6,
    image: imgDsc,
  },
  {
    id: "leche-entera",
    name: "Leche Entera 1L",
    category: "Lácteos",
    price: 1.4,
    rating: 4.5,
    image: imgFoto,
  },
  {
    id: "yogur-natural",
    name: "Yogur Natural 1kg",
    category: "Lácteos",
    price: 2.6,
    rating: 4.7,
    image: imgFoto,
  },
  {
    id: "jabon-polvo",
    name: "Jabón en Polvo 1kg",
    category: "Limpieza",
    price: 2.1,
    rating: 4.2,
    badge: "Oferta",
    image: imgDsc,
  },
  {
    id: "cloro-multiuso",
    name: "Cloro Multiuso 1L",
    category: "Limpieza",
    price: 1.05,
    rating: 4.1,
    image: imgFoto,
  },
];

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border-color bg-background shadow-sm transition-shadow duration-300 hover:shadow-lg">
      {/* Image container */}
      <div className="relative overflow-hidden bg-surface">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {product.badge ? (
          <span className="absolute left-3 top-3 rounded-sm bg-primary px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-white">
            {product.badge}
          </span>
        ) : null}

        <button
          type="button"
          onClick={() => setIsFavorite((prev) => !prev)}
          aria-label={
            isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"
          }
          aria-pressed={isFavorite}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-border-color bg-background/90 text-secondary-text shadow-sm backdrop-blur transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <Heart
            aria-hidden="true"
            className={`h-4 w-4 transition-colors ${
              isFavorite ? "fill-primary text-primary" : ""
            }`}
          />
        </button>
      </div>

      {/* Product info */}
      <div className="flex flex-1 flex-col gap-1 p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-secondary-text">
          {product.category}
        </p>
        <h3 className="text-base font-semibold text-primary-text">
          {product.name}
        </h3>
        <div className="mt-auto flex items-center gap-1 pt-2 text-sm">
          <Star aria-hidden="true" className="h-4 w-4 fill-accent text-accent" />
          <span className="font-medium text-primary-text">
            {product.rating.toFixed(1)}
          </span>
        </div>
      </div>

      {/* Pricing / action footer */}
      <div className="flex items-center justify-between gap-3 border-t border-border-color p-4">
        <span className="text-lg font-bold text-primary-text">
          ${product.price.toFixed(2)}
        </span>
        <button
          type="button"
          className="rounded-sm bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Añadir
        </button>
      </div>
    </article>
  );
}

export default function Products() {
  const [activeCategory, setActiveCategory] =
    useState<FilterCategory>("Todos");
  const [sortOption, setSortOption] = useState<SortOption>("relevancia");
  const [isSortOpen, setIsSortOpen] = useState(false);

  const filteredProducts =
    activeCategory === "Todos"
      ? PRODUCTS
      : PRODUCTS.filter((product) => product.category === activeCategory);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "precio-asc":
        return a.price - b.price;
      case "precio-desc":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  return (
    <section aria-labelledby="products-heading" className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <p className="text-xs font-bold uppercase tracking-widest text-primary">
          Explora la tienda
        </p>
        <h2
          id="products-heading"
          className="mt-2 text-3xl font-bold tracking-tight text-primary-text sm:text-4xl"
        >
          Compra por categoría
        </h2>

        {/* Category filter pills */}
        <div
          role="group"
          aria-label="Filtrar productos por categoría"
          className="mt-6 flex flex-wrap gap-2"
        >
          {CATEGORIES.map((category) => {
            const isActive = category === activeCategory;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                aria-pressed={isActive}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                  isActive
                    ? "bg-primary-text text-background"
                    : "bg-surface text-secondary-text hover:bg-border-color hover:text-primary-text"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Meta row */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-b border-border-color pb-6">
          <p className="text-sm text-secondary-text">
            {filteredProducts.length === 1
              ? "1 producto disponible"
              : `${filteredProducts.length} productos disponibles`}
          </p>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsSortOpen((prev) => !prev)}
              aria-haspopup="listbox"
              aria-expanded={isSortOpen}
              className="inline-flex items-center gap-2 rounded-full border border-border-color bg-background px-4 py-2 text-sm font-medium text-primary-text transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <SlidersHorizontal aria-hidden="true" className="h-4 w-4" />
              Filtrar y ordenar
              <ChevronDown
                aria-hidden="true"
                className={`h-4 w-4 text-secondary-text transition-transform ${
                  isSortOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isSortOpen ? (
              <>
                <div
                  aria-hidden="true"
                  onClick={() => setIsSortOpen(false)}
                  className="fixed inset-0 z-10"
                />
                <ul
                  role="listbox"
                  aria-label="Ordenar productos"
                  className="absolute right-0 z-20 mt-2 w-60 overflow-hidden rounded-xl border border-border-color bg-background py-1 shadow-lg"
                >
                  {SORT_OPTIONS.map((option) => (
                    <li
                      key={option.value}
                      role="option"
                      aria-selected={sortOption === option.value}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setSortOption(option.value);
                          setIsSortOpen(false);
                        }}
                        className={`flex w-full items-center justify-between gap-2 px-4 py-2 text-left text-sm transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary ${
                          sortOption === option.value
                            ? "font-semibold text-primary-text"
                            : "text-secondary-text"
                        }`}
                      >
                        <span>{option.label}</span>
                        {sortOption === option.value ? (
                          <Check
                            aria-hidden="true"
                            className="h-4 w-4 text-primary"
                          />
                        ) : null}
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>
        </div>

        {/* Product grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
