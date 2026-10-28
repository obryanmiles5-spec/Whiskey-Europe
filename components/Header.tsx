'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ShoppingBag, Menu, X, Award, MapPin, ChevronRight } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import BrandLogo from '@/components/BrandLogo';

export default function Header() {
  const { cartCount, setIsCartOpen, setIsSearchOpen, caskPoints } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/', id: 'nav-home' },
    { name: 'Shop', href: '/shop', id: 'nav-shop' },
    { name: 'How to Crypto', href: '/how-to-crypto', id: 'nav-how-to-crypto' },
    { name: 'About Us', href: '/about', id: 'nav-about' },
    { name: 'Contact', href: '/contact', id: 'nav-contact' },
  ];

  return (
    <header
      id="main-header"
      className={`sticky top-0 z-30 transition-all duration-300 border-b ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-black/15 shadow-sm py-3'
          : 'bg-white border-black/10 py-4'
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-12 2xl:px-16 flex items-center justify-between">
        
        {/* Mobile Menu Toggle & Brand */}
        <div className="flex items-center gap-3">
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-black hover:text-zinc-600 rounded-md focus:outline-none transition-colors hover:bg-zinc-100"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo */}
          <Link href="/" id="header-logo-link" className="flex items-center group">
            <BrandLogo size="md" variant="light" />
          </Link>
        </div>

        {/* Desktop Navigation Menu */}
        <nav id="desktop-nav-menu" className="hidden lg:flex items-center space-x-7 text-sm font-bold text-black tracking-wide">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              id={link.id}
              href={link.href}
              className="hover:text-zinc-500 transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-black hover:after:w-full after:transition-all uppercase text-xs tracking-wider"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Header Actions */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          
          {/* Cask Points Pill */}
          <a
            id="cask-points-badge"
            href="#cask-club"
            className="hidden sm:flex items-center gap-1.5 bg-zinc-100 hover:bg-zinc-200 border border-zinc-300 text-black px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-xs"
            title="Your Cask Club Rewards Points"
          >
            <Award className="w-3.5 h-3.5 text-black" />
            <span>{caskPoints} PTS</span>
          </a>

          {/* Search Trigger */}
          <button
            id="header-search-trigger-btn"
            onClick={() => setIsSearchOpen(true)}
            className="p-2 text-black hover:text-zinc-600 transition-colors rounded-full hover:bg-zinc-100 cursor-pointer"
            aria-label="Search Whiskeys"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Cart Drawer Trigger */}
          <button
            id="header-cart-drawer-trigger-btn"
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-black hover:text-zinc-600 transition-colors rounded-full hover:bg-zinc-100 cursor-pointer"
            aria-label="Open Shopping Cart Drawer"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-md animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* CTA Button: Order Now */}
          <Link
            id="header-order-now-cta-btn"
            href="/shop"
            className="hidden sm:flex items-center gap-1.5 bg-black hover:bg-zinc-800 text-white font-extrabold text-xs sm:text-sm px-4 sm:px-5 py-2.5 rounded-full shadow-md transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer uppercase tracking-wider border border-black"
          >
            <span>Order Now</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div id="mobile-drawer-menu" className="lg:hidden bg-white border-b-2 border-black px-4 pt-3 pb-6 space-y-4 animate-fadeIn shadow-2xl">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
            <div className="flex items-center gap-2 text-black text-xs font-bold">
              <Award className="w-4 h-4 text-black" />
              <span>Cask Club: {caskPoints} Points</span>
            </div>
            <span className="text-[10px] text-zinc-500 font-mono">domain: whiskeyeurope.org</span>
          </div>

          <div className="grid grid-cols-1 gap-1.5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                id={`mobile-${link.id}`}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-sm font-bold text-black hover:text-zinc-600 hover:bg-zinc-100 px-3 py-2 rounded-md transition-colors uppercase tracking-wider"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-zinc-200 flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <a
                href="#shipping-faq"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xs text-zinc-700 flex items-center gap-1 hover:text-black font-semibold"
              >
                <MapPin className="w-3.5 h-3.5 text-black" />
                <span>EU Bonded Transit (27 States)</span>
              </a>
              <button
                id="mobile-search-trigger-btn"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsSearchOpen(true);
                }}
                className="text-xs text-black font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search</span>
              </button>
            </div>

            <div className="flex gap-2 pt-1">
              <Link
                id="mobile-order-now-cta-btn"
                href="/shop"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex-1 bg-black hover:bg-zinc-800 text-white font-extrabold text-xs py-3 rounded-full text-center flex items-center justify-center gap-1 uppercase tracking-wider"
              >
                <span>Order Now</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
              <button
                id="mobile-view-cart-btn"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsCartOpen(true);
                }}
                className="bg-zinc-100 hover:bg-zinc-200 text-black font-bold text-xs px-4 py-3 rounded-full border border-black flex items-center gap-1"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-black" />
                <span>Cart ({cartCount})</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
