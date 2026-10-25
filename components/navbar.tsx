"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";

const navigationLinks = [
  { name: "Orthomoleculair", href: "/orthomoleculair" },
  { name: "Homeopathie", href: "/homeopathie" },
  { name: "Mycotherapie", href: "/mycotherapie" },
  { name: "Qest4", href: "/qest" },
];

const dropdownItems = [
  { name: "Contact & over mij", href: "/contact" },
  { name: "Tarieven", href: "/tarieven" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isActive = (href: string) => pathname === href;
  const isDropdownActive = dropdownItems.some((item) => isActive(item.href));

  // Menu's sluiten bij navigeren
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  }, [pathname]);

  // Schaduw onder de navbar zodra er gescrold wordt
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Dropdown sluiten bij klik buiten het menu of Escape
  useEffect(() => {
    if (!isDropdownOpen) return;
    const onClick = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) setIsDropdownOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsDropdownOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [isDropdownOpen]);

  const linkClass = (active: boolean) =>
    `relative py-1 text-lg font-medium transition-colors duration-200 after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-sage after:transition-all after:duration-300 ${
      active ? "text-gray-900 after:w-full" : "text-gray-600 hover:text-gray-900 after:w-0 hover:after:w-full"
    }`;

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled || isMobileMenuOpen ? "bg-cream/90 backdrop-blur-md shadow-sm" : "bg-cream"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 lg:h-22">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center" aria-label="Praktijk Kim Dreef - home">
              <Image
                src="/logopraktijkkimdreef.svg"
                alt="Praktijk Kim Dreef"
                width={500}
                height={200}
                className={`w-auto transition-all duration-300 ${isScrolled ? "h-16 lg:h-18" : "h-20 lg:h-24"}`}
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navigationLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={linkClass(isActive(link.href))}
                aria-current={isActive(link.href) ? "page" : undefined}
              >
                {link.name}
              </Link>
            ))}

            {/* Dropdown Menu */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`${linkClass(isDropdownActive)} flex items-center cursor-pointer`}
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
              >
                Praktijkinformatie
                <ChevronDown
                  className={`ml-1 w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-3 w-56 rounded-2xl border border-gray-100 bg-white p-2 shadow-xl shadow-black/5 animate-in fade-in slide-in-from-top-2 duration-200">
                  {dropdownItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`block rounded-xl px-4 py-2.5 text-base transition-colors duration-200 ${
                        isActive(item.href)
                          ? "bg-sage-50 text-sage-dark font-medium"
                          : "text-gray-700 hover:bg-sage-50 hover:text-gray-900"
                      }`}
                      aria-current={isActive(item.href) ? "page" : undefined}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden lg:flex items-center">
            <Link
              href="/afspraak-maken"
              className="group inline-flex items-center px-6 py-2.5 rounded-full text-lg font-medium text-white bg-sage hover:bg-sage-dark shadow-sm transition-colors duration-200"
            >
              Afspraak maken
              <ArrowUpRight className="ml-2 w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-xl text-gray-700 hover:text-gray-900 hover:bg-white transition-colors duration-200"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <span className="sr-only">{isMobileMenuOpen ? "Menu sluiten" : "Menu openen"}</span>
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pt-2 pb-5 space-y-1 border-t border-gray-200/70">
          {navigationLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`block px-3 py-2.5 text-lg font-medium rounded-xl transition-colors duration-200 ${
                isActive(link.href) ? "bg-white text-gray-900" : "text-gray-700 hover:bg-white"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          {/* Mobile Dropdown Items */}
          <div className="border-t border-gray-200/70 pt-2 mt-2">
            <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Praktijkinformatie
            </div>
            {dropdownItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-3 py-2.5 text-lg font-medium rounded-xl transition-colors duration-200 ${
                  isActive(item.href) ? "bg-white text-gray-900" : "text-gray-700 hover:bg-white"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="pt-4">
            <Link
              href="/afspraak-maken"
              className="flex items-center justify-center px-4 py-3 rounded-full text-lg font-medium text-white bg-sage hover:bg-sage-dark transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Afspraak maken
              <ArrowUpRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
