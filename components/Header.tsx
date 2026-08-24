'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ShoppingBag, Menu, X, Award, MapPin, Wine, ChevronRight, Shield } from 'lucide-react';
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

  const handleOrderNow = () => {
    setIsMobileMenuOpen(false);
    const collection = document.getElementById('collection');
    if (collection) {
      collection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/shop';
    }
  };

  return (
    <header
      id="main-header"
      className={`sticky top-0 z-30 transition-all duration-300 border-b ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-slate-200 shadow-md py-3'
          : 'bg-white border-slate-200 py-4'
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-12 2xl:px-16 flex items-center justify-between">
        
        {/* Mobile Menu Toggle & Brand */}
        <div className="flex items-center gap-3">
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:text-amber-700 rounded-md focus:outline-none transition-colors hover:bg-slate-100"
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
        <nav id="desktop-nav-menu" className="hidden lg:flex items-center space-x-6 text-sm font-semibold text-slate-700">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              id={link.id}
              href={link.href}
              className="hover:text-amber-700 transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-amber-600 hover:after:w-full after:transition-all"
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
            className="hidden sm:flex items-center gap-1.5 bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 px-3 py-1.5 rounded-full text-xs font-semibold transition-all shadow-xs"
            title="Your Cask Club Rewards Points"
          >
            <Award className="w-3.5 h-3.5 text-amber-600" />
            <span>{caskPoints} PTS</span>
          </a>

          {/* Search Trigger */}
          <button
            id="header-search-trigger-btn"
            onClick={() => setIsSearchOpen(true)}
            className="p-2 text-slate-700 hover:text-amber-700 transition-colors rounded-full hover:bg-slate-100 cursor-pointer"
            aria-label="Search Whiskeys"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Cart Drawer Trigger */}
          <button
            id="header-cart-drawer-trigger-btn"
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-slate-700 hover:text-amber-700 transition-colors rounded-full hover:bg-slate-100 cursor-pointer"
            aria-label="Open Shopping Cart Drawer"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-amber-600 to-amber-700 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-md animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* CTA Button: Order Now */}
          <Link
            id="header-order-now-cta-btn"
            href="/shop"
            className="hidden sm:flex items-center gap-1.5 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-xs sm:text-sm px-3.5 sm:px-4 py-2 rounded-md shadow-md hover:shadow-amber-900/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <span>Order Now</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div id="mobile-drawer-menu" className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-4 animate-fadeIn shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2 text-amber-800 text-xs font-semibold">
              <Award className="w-4 h-4 text-amber-600" />
              <span>Cask Club: {caskPoints} Points</span>
            </div>
            <span className="text-[10px] text-slate-500 font-mono">domain: whiskeyeurope.org</span>
          </div>

          <div className="grid grid-cols-1 gap-1.5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                id={`mobile-${link.id}`}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-sm font-medium text-slate-800 hover:text-amber-700 hover:bg-slate-50 px-3 py-2 rounded-md transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <a
                href="#shipping-faq"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xs text-slate-600 flex items-center gap-1 hover:text-amber-700"
              >
                <MapPin className="w-3.5 h-3.5 text-amber-600" />
                <span>EU Bonded Transit (27 States)</span>
              </a>

              <button
                id="mobile-search-trigger-btn"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsSearchOpen(true);
                }}
                className="text-xs text-amber-700 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
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
                className="flex-1 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-xs py-2.5 rounded-md text-center flex items-center justify-center gap-1"
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
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs px-4 py-2.5 rounded-md border border-slate-300 flex items-center gap-1"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-slate-700" />
                <span>Cart ({cartCount})</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
