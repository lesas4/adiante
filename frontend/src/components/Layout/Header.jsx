import React, { useState } from 'react';
import Link from 'next/link';
import ThemeSelector from '../UI/ThemeSelector';

/**
 * Header Component - Premium com logo visual
 */
export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home', icon: '🏠' },
    { href: '/servicos', label: 'Servicos', icon: '✨' },
    { href: '/agendar', label: 'Agendar', icon: '📅' },
    { href: '/dashboard', label: 'Minha Conta', icon: '👤' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 shadow-md desktop-only">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24">
          {/* Logo + Brand */}
          <Link href="/">
            <div className="flex items-center gap-3 hover:opacity-80 transition-opacity group">
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg group-hover:shadow-xl transition-shadow">
                🧹
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-black bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  Leidy Cleaner
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium">
                  Limpeza Profissional Premium
                </p>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <div className="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-all font-medium flex items-center gap-2 group">
                  <span className="group-hover:scale-125 transition-transform">{link.icon}</span>
                  {link.label}
                </div>
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            <ThemeSelector />
            <Link href="/agendar">
              <div className="hidden sm:inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:shadow-lg hover:scale-105 transition-all font-bold text-sm shadow-md">
                <span>📅</span>
                Agendar
              </div>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-3 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition-all"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="lg:hidden pb-4 space-y-2 border-t border-gray-200 dark:border-slate-700 pt-4 animate-in fade-in slide-up">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <div 
                  className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg transition-colors font-medium flex items-center gap-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span>{link.icon}</span>
                  {link.label}
                </div>
              </Link>
            ))}
            <Link href="/agendar">
              <div 
                className="block px-4 py-3 mt-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-bold text-center hover:shadow-lg transition-all"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Agendar Agora
              </div>
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
