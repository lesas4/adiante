import React from 'react';
import Link from 'next/link';

/**
 * 📄 Footer Component - Moderno e responsivo
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-slate-900 border-t border-gray-200 dark:border-slate-700 mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-lg flex items-center justify-center text-white font-bold">
                🧹
              </div>
              <span className="font-bold text-lg text-primary dark:text-primary-light">
                Limpeza Pro
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Serviços profissionais de limpeza para residências e comerciais.
            </p>
            {/* Social Links */}
            <div className="flex gap-3 mt-4">
              <a href="#" className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:opacity-80 transition-opacity">
                f
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:opacity-80 transition-opacity">
                🔗
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:opacity-80 transition-opacity">
                📧
              </a>
            </div>
          </div>

          {/* Produto */}
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Produto</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/servicos">
                  <a className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                    Serviços
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/agendar">
                  <a className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                    Agendar
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/precos">
                  <a className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                    Preços
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/blog">
                  <a className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                    Blog
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Empresa</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/sobre">
                  <a className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                    Sobre Nós
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/contato">
                  <a className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                    Contato
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/carreiras">
                  <a className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                    Carreiras
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/imprensa">
                  <a className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                    Imprensa
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacidade">
                  <a className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                    Privacidade
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/termos">
                  <a className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                    Termos de Uso
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/cookies">
                  <a className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                    Cookies
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/licenças">
                  <a className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                    Licenças
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-slate-700 pt-8 mb-8">
          {/* Newsletter */}
          <div className="mb-8">
            <h3 className="font-bold text-gray-900 dark:text-white mb-3">Fique Atualizado</h3>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="seu@email.com"
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:border-primary"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-semibold"
              >
                Inscrever
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-200 dark:border-slate-700 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          <p>© {currentYear} Limpeza Pro. Todos os direitos reservados.</p>
          <div className="flex gap-4">
            <span>Status: ✅ Online</span>
            <span>•</span>
            <span>Versão: 1.0.0</span>
          </div>
        </div>
          <div>
            <h4 className="font-bold mb-4">Navegação</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li><a href="/servicos" className="hover:text-white">Serviços</a></li>
              <li><a href="/agendar" className="hover:text-white">Agendar</a></li>
              <li><a href="/dashboard" className="hover:text-white">Minha Conta</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">Contato</h4>
            <ul className="space-y-2 text-gray-300">
              <li>📞 +55 51 98030-3740</li>
              <li>📧 contato@leidycleaner.com</li>
              <li>📍 Porto Alegre, RS</li>
            </ul>
          </div>

          {/* Payment */}
          <div>
            <h4 className="font-bold mb-4">Pagamento</h4>
            <div className="space-y-2 text-gray-300">
              <p>PIX • Cartão • Mercado Pago</p>
              <p className="text-sm muted">Transações seguras e rápidas</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} Leidy Cleaner. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
