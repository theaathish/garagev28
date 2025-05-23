"use client";
import React from "react";

export default function SearchBar({
  search,
  brand,
  style,
  sort,
  brands,
  styles,
}: {
  search: string;
  brand: string;
  style: string;
  sort: string;
  brands: string[];
  styles: string[];
}) {
  return (
    <form
      method="GET"
      className="flex flex-wrap md:flex-nowrap gap-4 bg-white p-4 rounded-xl shadow items-center border border-gray-200"
    >
      {/* Search with clear button */}
      <div className="flex items-center gap-2 flex-1 min-w-[160px] relative">
        <span className="text-gray-400">
          <svg width="20" height="20" fill="none" stroke="currentColor">
            <circle cx="9" cy="9" r="7" strokeWidth="2" />
            <path d="M16 16l-3-3" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
        <input
          type="text"
          name="search"
          defaultValue={search}
          placeholder="Search cars"
          className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-200 pr-8"
          id="car-search-input"
        />
        {/* Clear button */}
        {search && (
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            tabIndex={-1}
            onClick={() => {
              const input = document.getElementById(
                "car-search-input",
              ) as HTMLInputElement;
              if (input) input.value = "";
              const form = input?.form;
              if (form) {
                const els = Array.from(form.elements) as HTMLInputElement[];
                els.forEach((el) => {
                  if (el.name === "search") el.value = "";
                });
                form.submit();
              }
            }}
            aria-label="Clear search"
          >
            <svg
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="5" y1="5" x2="13" y2="13" />
              <line x1="13" y1="5" x2="5" y2="13" />
            </svg>
          </button>
        )}
      </div>
      {/* Brand */}
      <div className="flex items-center gap-2 min-w-[120px]">
        <span className="text-gray-400">
          <svg width="18" height="18" fill="none" stroke="currentColor">
            <rect x="3" y="5" width="12" height="8" rx="2" strokeWidth="2" />
            <circle cx="6" cy="14" r="1" />
            <circle cx="12" cy="14" r="1" />
          </svg>
        </span>
        <select
          name="brand"
          defaultValue={brand}
          className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none"
        >
          <option value="">Brand</option>
          {brands.filter(Boolean).map((b: string) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>
      {/* Style */}
      <div className="flex items-center gap-2 min-w-[120px]">
        <span className="text-gray-400">
          <svg width="18" height="18" fill="none" stroke="currentColor">
            <rect x="2" y="7" width="14" height="6" rx="2" strokeWidth="2" />
            <path d="M6 7V5a3 3 0 0 1 6 0v2" strokeWidth="2" />
          </svg>
        </span>
        <select
          name="style"
          defaultValue={style}
          className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none"
        >
          <option value="">Style</option>
          {styles.filter(Boolean).map((s: string) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      {/* Sort */}
      <div className="flex items-center gap-2 min-w-[120px]">
        <span className="text-gray-400">
          <svg width="18" height="18" fill="none" stroke="currentColor">
            <path
              d="M6 9l3 3 3-3"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <select
          name="sort"
          defaultValue={sort}
          className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none"
        >
          <option value="">Sort</option>
          <option value="price_asc">Price ↑</option>
          <option value="price_desc">Price ↓</option>
          <option value="year_desc">Year ↓</option>
          <option value="year_asc">Year ↑</option>
        </select>
      </div>
      {/* Submit */}
      <button
        type="submit"
        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded font-semibold transition"
      >
        Search
      </button>
    </form>
  );
}
