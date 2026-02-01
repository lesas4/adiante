import React, { useState } from 'react';
import Link from 'next/link';
import ThemeSelector from '../UI/ThemeSelector';

/**
 * 📱 Header Component - Responsivo e moderno
 * Suporta light/dark mode e modo mobile
 */
export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo + Brand */}
          <Link href="/">
            <a className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary to-primary-dark rounded-lg flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-md">
                🧹
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl font-bold text-primary dark:text-primary-light">
                  Limpeza Pro
                </h1>
                <p className="hidden sm:block text-xs text-gray-600 dark:text-gray-400">
                  Limpeza profissional
                </p>
              </div>
            </a>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/"><a className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors font-medium">Home</a></Link>
            <Link href="/servicos"><a className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors font-medium">Serviços</a></Link>
            <Link href="/agendar"><a className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors font-medium">Agendar</a></Link>
            <Link href="/dashboard"><a className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors font-medium">Dashboard</a></Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <ThemeSelector />
            <Link href="/agendar">
              <a className="hidden sm:inline-flex px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors font-semibold text-sm">
                Agendar Agora
              </a>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="lg:hidden pb-4 space-y-2 animate-in fade-in slide-up">
            <Link href="/">
              <a className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                Home
              </a>
            </Link>
            <Link href="/servicos">
              <a className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                Serviços
              </a>
            </Link>
            <Link href="/agendar">
              <a className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                Agendar
              </a>
            </Link>
            <Link href="/dashboard">
              <a className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                Dashboard
              </a>
            </Link>
            <Link href="/agendar">
              <a className="block px-4 py-3 rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors font-semibold text-center">
                Agendar Agora
              </a>
            </Link>
          </nav>
        )}
      )}
    </header>
  )
}
