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
    { name: 'About Us', href: '/about', id: 'nav-about' },
    { name: 'Distillery Map', href: '/#distillery-map', id: 'nav-distillery-map' },
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
          ? 'bg-[#0f0d0b]/95 backdrop-blur-md border-[#2b241d] shadow-2xl py-3'
          : 'bg-[#0f0d0b] border-[#221c17] py-4'
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-12 2xl:px-16 flex items-center justify-between">
        
        {/* Mobile Menu Toggle & Brand */}
        <div className="flex items-center gap-3">
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-[#d1c5b8] hover:text-amber-500 rounded-md focus:outline-none transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo */}
          <Link href="/" id="header-logo-link" className="flex items-center group">
            <BrandLogo size="md" />
          </Link>
        </div>

        {/* Desktop Navigation Menu */}
        <nav id="desktop-nav-menu" className="hidden lg:flex items-center space-x-6 text-sm font-medium text-[#c4b6a7]">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              id={link.id}
              href={link.href}
              className="hover:text-amber-400 transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-amber-500 hover:after:w-full after:transition-all"
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
            className="hidden sm:flex items-center gap-1.5 bg-[#1c1713] hover:bg-[#28211b] border border-amber-900/40 text-amber-400 px-3 py-1.5 rounded-full text-xs font-medium transition-all shadow-inner"
            title="Your Cask Club Rewards Points"
          >
            <Award className="w-3.5 h-3.5 text-amber-500" />
            <span>{caskPoints} PTS</span>
          </a>

          {/* Search Trigger */}
          <button
            id="header-search-trigger-btn"
            onClick={() => setIsSearchOpen(true)}
            className="p-2 text-[#c4b6a7] hover:text-amber-400 transition-colors rounded-full hover:bg-[#1a1612]"
            aria-label="Search Whiskeys"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Cart Drawer Trigger */}
          <button
            id="header-cart-drawer-trigger-btn"
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-[#c4b6a7] hover:text-amber-400 transition-colors rounded-full hover:bg-[#1a1612]"
            aria-label="Open Shopping Cart Drawer"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-amber-500 to-amber-700 text-black text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#0f0d0b] shadow-md animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* CTA Button: Order Now */}
          <Link
            id="header-order-now-cta-btn"
            href="/shop"
            className="hidden sm:flex items-center gap-1.5 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-black font-bold text-xs sm:text-sm px-3.5 sm:px-4 py-2 rounded-md shadow-lg hover:shadow-amber-900/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <span>Order Now</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div id="mobile-drawer-menu" className="lg:hidden bg-[#14100c] border-b border-[#2b241d] px-4 pt-3 pb-6 space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between pb-3 border-b border-[#241e17]">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold">
              <Award className="w-4 h-4 text-amber-500" />
              <span>Cask Club: {caskPoints} Points</span>
            </div>
            <span className="text-[10px] text-[#a39382] font-mono">domain: whiskeyeurope.org</span>
          </div>

          <div className="grid grid-cols-1 gap-1.5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                id={`mobile-${link.id}`}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-sm text-[#e3d8cb] hover:text-amber-400 hover:bg-[#1f1914] px-3 py-2 rounded-md transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-[#241e17] flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <a
                href="#shipping-faq"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xs text-[#a39382] flex items-center gap-1 hover:text-amber-400"
              >
                <MapPin className="w-3.5 h-3.5 text-amber-500" />
                <span>EU Bonded Transit (27 States)</span>
              </a>

              <button
                id="mobile-search-trigger-btn"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsSearchOpen(true);
                }}
                className="text-xs text-amber-400 hover:underline flex items-center gap-1"
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
                className="flex-1 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-black font-bold text-xs py-2.5 rounded-md text-center flex items-center justify-center gap-1"
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
                className="bg-[#1f1914] hover:bg-[#2b221a] text-amber-400 font-bold text-xs px-4 py-2.5 rounded-md border border-amber-900/40 flex items-center gap-1"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Cart ({cartCount})</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
