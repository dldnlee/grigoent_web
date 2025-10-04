'use client';

import { useLanguage } from '../contexts/LanguageContext';

export default function WorksPage() {
  const { language } = useLanguage();

  return (
    <main className="min-h-screen bg-primary text-white pt-20 md:pt-24">
      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-6xl font-bold mb-8 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
          {language === 'en' ? 'Our Works' : '작품'}
        </h1>

        <div className="space-y-8 text-white/60">
          <p className="text-lg">
            {language === 'en'
              ? 'Coming soon...'
              : '준비중입니다...'}
          </p>
        </div>
      </div>
    </main>
  );
}
