import React from 'react';
import Link from 'next/link';

const BlogSection = () => {
  const posts = [
    {
      id: 1,
      title: 'Como Manter a Casa Sempre Limpa: Dicas Práticas',
      excerpt: 'Descubra rotinas simples e eficazes para manter sua casa organizada e limpa todos os dias.',
      image: '🏠',
      date: '2024-01-15',
      readTime: '5 min',
      category: 'Dicas de Limpeza'
    },
    {
      id: 2,
      title: 'Produtos Eco-Friendly: O Futuro da Limpeza',
      excerpt: 'Conheça os benefícios dos produtos de limpeza sustentáveis e como eles ajudam o meio ambiente.',
      image: '🌱',
      date: '2024-01-10',
      readTime: '4 min',
      category: 'Sustentabilidade'
    },
    {
      id: 3,
      title: 'Limpeza Profissional vs DIY: Quando Contratar?',
      excerpt: 'Saiba quando vale a pena contratar serviços profissionais de limpeza.',
      image: '✨',
      date: '2024-01-05',
      readTime: '6 min',
      category: 'Guia Prático'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          📚 Blog & Dicas
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Conteúdo útil sobre limpeza, organização e cuidados com a casa
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.map((post) => (
          <article
            key={post.id}
            className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-slate-700 hover:shadow-xl transition-shadow"
          >
            <div className="h-48 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center text-6xl">
              {post.image}
            </div>

            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-semibold">
                  {post.category}
                </span>
                <span className="text-gray-500 dark:text-gray-400 text-sm">
                  {post.readTime} de leitura
                </span>
              </div>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                {post.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                {post.excerpt}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(post.date).toLocaleDateString('pt-BR')}
                </span>
                <Link href={`/blog/${post.id}`}>
                  <span className="text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 transition-colors cursor-pointer">
                    Ler mais →
                  </span>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link href="/blog">
          <span className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-lg hover:shadow-lg transition-all cursor-pointer">
            <span>📖</span>
            Ver Todos os Posts
          </span>
        </Link>
      </div>
    </div>
  );
};

export default BlogSection;