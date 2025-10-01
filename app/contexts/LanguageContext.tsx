'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'ko' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguageState] = useState<Language>('ko');

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'ko' || savedLanguage === 'en')) {
      setLanguageState(savedLanguage);
      document.documentElement.lang = savedLanguage;
    }
  }, []);

  const t = (key: string): string => {
    const translations = getTranslations(language);
    return translations[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Translation function (will be moved to separate files)
const getTranslations = (lang: Language): Record<string, string> => {
  const translations = {
    ko: {
      // Navigation
      'nav.home': 'Home',
      'nav.about': 'About Us',
      'nav.artists': 'Artists',
      'nav.works': 'Our Works',
      'nav.contact': 'Contact Us',
      'nav.signin': 'Sign In',
      'nav.signup': 'Sign Up',

      // Common
      'common.search': '검색',
      'common.loading': '로딩 중...',
      'common.error': '오류가 발생했습니다.',
      'common.notFound': '결과를 찾을 수 없습니다.',

      // Artists page
      'artists.title': 'Our Artists',
      'artists.description': '세계적 수준의 전문 댄서들과 팀이 만들어내는 예술적 퍼포먼스를 만나보세요',
      'artists.searchPlaceholder': '댄서 이름을 검색하세요 (한국어 또는 영어)',
      'artists.allArtists': '모든 아티스트',
      'artists.soloDancers': '솔로 댄서',
      'artists.teamDancers': '팀 댄서',
      'artists.verified': '인증됨',
      'artists.monthlyListeners': '월간 청취자',
      'artists.followers': '팔로워',
      'artists.members': '멤버',
      'artists.formedIn': '결성',
      'artists.soloDancersSubtitle': '개성 있는 예술성을 선보이는 개인 퍼포머',
      'artists.teamDancersSubtitle': '동기화된 걸작을 만들어내는 협업 앙상블',

      // Hero section
      'hero.companyInfo': 'GRIGO 엔터테인먼트 | A Global Dance Company',
      'hero.danceWith': 'DANCE WITH',
      'hero.passion': 'PASSION',
      'hero.joinUs': 'JOIN US NOW',
      'hero.scrollDown': 'SCROLL DOWN',
      'hero.stats.artists': '아티스트',
      'hero.stats.projects': '프로젝트',
      'hero.stats.countries': '국가',
      'hero.stats.experience': '년 경력',

      // Services section
      'services.aboutUs': 'ABOUT US',
      'services.whatDoWeDo': 'WHAT DO WE DO?',
      'services.description': '저희는 세계적인 안무가들과 댄서들을 연결하여\n혁신적이고 감동적인 공연을 만들어갑니다.',
      'services.kpop.title': 'K-POP & 앨범 안무 제작',
      'services.kpop.description': '아이돌 그룹, 솔로 아티스트의 타이틀곡 및 수록곡 안무 제작',
      'services.movie.title': '영화 & 광고 안무',
      'services.movie.description': '영화, 드라마, 광고 CF 안무 제작 및 출연',
      'services.broadcast.title': '방송 & 행사 출연',
      'services.broadcast.description': 'TV 프로그램, 콘서트, 행사 댄서 및 팀 섭외',
      'services.workshop.title': '해외 & 국내 워크샵',
      'services.workshop.description': '전 세계 K-POP 댄스 레슨 및 워크샵 진행',
      'services.challenge.title': '댄스 챌린지',
      'services.challenge.description': '제품, 공감, 릴레이 홍보를 위한 댄스 챌린지 제작',
      'services.competition.title': '댄스 대회 & 행사',
      'services.competition.description': '댄스 대회 주최, 운영 및 다양한 행사 기획',

      // About section (Artists section)
      'about.title': 'About Us',
      'about.description': '그리고 엔터테인먼트는 댄서, 안무가 섭외, 안무제작, 뮤직비디오 제작, 광고를 진행하고 있습니다.',

      // Recent Works section
      'recentWorks.title': 'Recent Works',
      'recentWorks.description': '최신 작품들을 확인해보세요',

      // Contact section
      'contact.title': 'Contact Us',
      'contact.description': '프로젝트에 대해 문의하거나 댄서와의 협업을\n원하시면 언제든지 연락주세요.',
      'contact.form.name': '이름',
      'contact.form.emailOrPhone': '이메일 또는 전화번호',
      'contact.form.category': '문의 분야',
      'contact.form.subject': '문의 제목',
      'contact.form.content': '문의 내용',
      'contact.form.personalNumber': '개인번호 (선택)',
      'contact.form.submit': '문의하기',

      // Work With Us section
      'workWithUs.title': 'Work With Us',
      'workWithUs.description': '함께 일하고 싶으시면 연락주세요',

      // Footer section
      'footer.description': '그리고 엔터테인먼트와 함께 새로운 예술의 길을 만들어가세요',
    },
    en: {
      // Navigation
      'nav.home': 'Home',
      'nav.about': 'About Us',
      'nav.artists': 'Artists',
      'nav.works': 'Our Works',
      'nav.contact': 'Contact Us',
      'nav.signin': 'Sign In',
      'nav.signup': 'Sign Up',

      // Common
      'common.search': 'Search',
      'common.loading': 'Loading...',
      'common.error': 'An error occurred.',
      'common.notFound': 'No results found.',

      // Artists page
      'artists.title': 'Our Artists',
      'artists.description': 'Meet world-class professional dancers and teams creating artistic performances',
      'artists.searchPlaceholder': 'Search for dancers (Korean or English names)',
      'artists.allArtists': 'All Artists',
      'artists.soloDancers': 'Solo Dancers',
      'artists.teamDancers': 'Team Dancers',
      'artists.verified': 'Verified',
      'artists.monthlyListeners': 'Monthly Listeners',
      'artists.followers': 'Followers',
      'artists.members': 'Members',
      'artists.formedIn': 'Formed in',
      'artists.soloDancersSubtitle': 'Individual performers showcasing their unique artistry',
      'artists.teamDancersSubtitle': 'Collaborative ensembles creating synchronized masterpieces',

      // Hero section
      'hero.companyInfo': 'GRIGO Entertainment | A Global Dance Company',
      'hero.danceWith': 'DANCE WITH',
      'hero.passion': 'PASSION',
      'hero.joinUs': 'JOIN US NOW',
      'hero.scrollDown': 'SCROLL DOWN',
      'hero.stats.artists': 'Artists',
      'hero.stats.projects': 'Projects',
      'hero.stats.countries': 'Countries',
      'hero.stats.experience': 'Years Experience',

      // Services section
      'services.aboutUs': 'ABOUT US',
      'services.whatDoWeDo': 'WHAT DO WE DO?',
      'services.description': 'We connect world-class choreographers and dancers to create\ninnovative and inspiring performances.',
      'services.kpop.title': 'K-POP & Album Choreography',
      'services.kpop.description': 'Choreography creation for idol groups and solo artists title tracks and album songs',
      'services.movie.title': 'Film & Commercial Choreography',
      'services.movie.description': 'Choreography creation and performance for movies, dramas, and commercial ads',
      'services.broadcast.title': 'Broadcast & Event Performances',
      'services.broadcast.description': 'TV program, concert, and event dancer and team casting',
      'services.workshop.title': 'International & Domestic Workshops',
      'services.workshop.description': 'K-POP dance lessons and workshops conducted worldwide',
      'services.challenge.title': 'Dance Challenges',
      'services.challenge.description': 'Dance challenge creation for product, empathy, and relay promotions',
      'services.competition.title': 'Dance Competitions & Events',
      'services.competition.description': 'Dance competition hosting, management, and various event planning',

      // About section (Artists section)
      'about.title': 'About Us',
      'about.description': 'GRIGO Entertainment specializes in dancer and choreographer casting, choreography production, music video production, and advertising.',

      // Recent Works section
      'recentWorks.title': 'Recent Works',
      'recentWorks.description': 'Check out our latest works',

      // Contact section
      'contact.title': 'Contact Us',
      'contact.description': 'If you want to inquire about a project or collaborate\nwith dancers, please contact us anytime.',
      'contact.form.name': 'Name',
      'contact.form.emailOrPhone': 'Email or Phone Number',
      'contact.form.category': 'Inquiry Category',
      'contact.form.subject': 'Inquiry Subject',
      'contact.form.content': 'Inquiry Content',
      'contact.form.personalNumber': 'Personal Number (Optional)',
      'contact.form.submit': 'Submit Inquiry',

      // Work With Us section
      'workWithUs.title': 'Work With Us',
      'workWithUs.description': 'Contact us if you want to work together',

      // Footer section
      'footer.description': 'Create new paths in art with GRIGO Entertainment',
    }
  };

  return translations[lang] || translations.ko;
};