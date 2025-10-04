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

      // About Us page
      'aboutPage.hero.tagline': '글로벌 댄스 엔터테인먼트 선도 기업',
      'aboutPage.hero.subtitle': '열정과 창의성으로 세계를 춤추게 합니다',

      'aboutPage.mission.title': '우리의 미션',
      'aboutPage.mission.content': '그리고 엔터테인먼트는 세계적 수준의 댄서와 안무가를 발굴하고 육성하여, 한국의 댄스 문화를 전 세계에 알리고 있습니다. 우리는 예술적 창의성과 전문성을 통해 댄스 산업의 새로운 기준을 만들어갑니다.',

      'aboutPage.vision.title': '우리의 비전',
      'aboutPage.vision.content': '댄스를 통한 문화 교류의 중심이 되어, 전 세계 사람들에게 감동과 영감을 전달하는 글로벌 엔터테인먼트 기업으로 성장하겠습니다.',

      'aboutPage.story.title': '우리의 이야기',
      'aboutPage.story.milestone1.year': '2018',
      'aboutPage.story.milestone1.title': '회사 설립',
      'aboutPage.story.milestone1.description': 'K-POP 댄스 문화를 세계에 알리겠다는 비전으로 시작',
      'aboutPage.story.milestone2.year': '2019',
      'aboutPage.story.milestone2.title': '첫 해외 워크샵',
      'aboutPage.story.milestone2.description': '아시아 5개국에서 K-POP 댄스 워크샵 성공적 개최',
      'aboutPage.story.milestone3.year': '2021',
      'aboutPage.story.milestone3.title': '글로벌 확장',
      'aboutPage.story.milestone3.description': '유럽과 미주 지역으로 사업 확장, 20개국 이상 협업',
      'aboutPage.story.milestone4.year': '2023',
      'aboutPage.story.milestone4.title': '산업 리더십',
      'aboutPage.story.milestone4.description': '메이저 엔터테인먼트 레이블과 파트너십 구축',
      'aboutPage.story.milestone5.year': '2025',
      'aboutPage.story.milestone5.title': '새로운 도약',
      'aboutPage.story.milestone5.description': '글로벌 댄스 플랫폼으로 진화하며 지속적인 성장',

      'aboutPage.stats.artists': '전속 아티스트',
      'aboutPage.stats.projects': '완료 프로젝트',
      'aboutPage.stats.countries': '활동 국가',
      'aboutPage.stats.awards': '수상 경력',

      'aboutPage.values.title': '핵심 가치',
      'aboutPage.values.passion.title': '열정',
      'aboutPage.values.passion.description': '댄스에 대한 순수한 열정으로 최고의 퍼포먼스를 만들어냅니다',
      'aboutPage.values.innovation.title': '혁신',
      'aboutPage.values.innovation.description': '끊임없는 도전과 창의적 사고로 댄스의 새로운 가능성을 탐구합니다',
      'aboutPage.values.collaboration.title': '협업',
      'aboutPage.values.collaboration.description': '서로를 존중하고 함께 성장하는 팀워크를 중요하게 생각합니다',
      'aboutPage.values.excellence.title': '탁월함',
      'aboutPage.values.excellence.description': '완벽을 추구하며 항상 최고 수준의 결과물을 제공합니다',

      'aboutPage.cta.title': '함께 춤추실 준비가 되셨나요?',
      'aboutPage.cta.description': '그리고 엔터테인먼트와 함께 새로운 도전을 시작하세요',
      'aboutPage.cta.joinUs': '지금 합류하기',
      'aboutPage.cta.contact': '문의하기',

      // Contact Us page
      'contactPage.hero.title': '문의하기',
      'contactPage.hero.subtitle': '프로젝트 협업이나 문의사항이 있으시면 언제든 연락주세요',

      'contactPage.form.title': '메시지 보내기',
      'contactPage.form.name': '이름',
      'contactPage.form.namePlaceholder': '홍길동',
      'contactPage.form.email': '이메일',
      'contactPage.form.emailPlaceholder': 'your@email.com',
      'contactPage.form.phone': '전화번호',
      'contactPage.form.phonePlaceholder': '010-1234-5678',
      'contactPage.form.subject': '제목',
      'contactPage.form.subjectPlaceholder': '문의 제목을 입력하세요',
      'contactPage.form.message': '메시지',
      'contactPage.form.messagePlaceholder': '문의 내용을 자세히 입력해주세요...',
      'contactPage.form.submit': '메시지 전송',
      'contactPage.form.sending': '전송 중...',
      'contactPage.form.success': '메시지가 성공적으로 전송되었습니다!',
      'contactPage.form.error': '전송 중 오류가 발생했습니다. 다시 시도해주세요.',

      'contactPage.info.title': '연락처 정보',
      'contactPage.info.email.label': '이메일',
      'contactPage.info.email.value': 'contact@grigo-ent.com',
      'contactPage.info.phone.label': '전화',
      'contactPage.info.phone.value': '+82 10-1234-5678',
      'contactPage.info.address.label': '주소',
      'contactPage.info.address.value': '서울특별시 강남구',
      'contactPage.info.hours.label': '운영 시간',
      'contactPage.info.hours.value': '월-금: 9:00 - 18:00',

      'contactPage.social.title': '소셜 미디어',
      'contactPage.social.followUs': '팔로우하세요',
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

      // About Us page
      'aboutPage.hero.tagline': 'Leading Global Dance Entertainment',
      'aboutPage.hero.subtitle': 'Making the world dance with passion and creativity',

      'aboutPage.mission.title': 'Our Mission',
      'aboutPage.mission.content': 'GRIGO Entertainment discovers and nurtures world-class dancers and choreographers, promoting Korean dance culture globally. Through artistic creativity and professionalism, we set new standards in the dance industry.',

      'aboutPage.vision.title': 'Our Vision',
      'aboutPage.vision.content': 'To become a global entertainment company that serves as a hub for cultural exchange through dance, delivering inspiration and emotion to people worldwide.',

      'aboutPage.story.title': 'Our Story',
      'aboutPage.story.milestone1.year': '2018',
      'aboutPage.story.milestone1.title': 'Company Founded',
      'aboutPage.story.milestone1.description': 'Started with a vision to spread K-POP dance culture worldwide',
      'aboutPage.story.milestone2.year': '2019',
      'aboutPage.story.milestone2.title': 'First International Workshop',
      'aboutPage.story.milestone2.description': 'Successfully hosted K-POP dance workshops in 5 Asian countries',
      'aboutPage.story.milestone3.year': '2021',
      'aboutPage.story.milestone3.title': 'Global Expansion',
      'aboutPage.story.milestone3.description': 'Expanded to Europe and Americas, collaborating with 20+ countries',
      'aboutPage.story.milestone4.year': '2023',
      'aboutPage.story.milestone4.title': 'Industry Leadership',
      'aboutPage.story.milestone4.description': 'Established partnerships with major entertainment labels',
      'aboutPage.story.milestone5.year': '2025',
      'aboutPage.story.milestone5.title': 'New Heights',
      'aboutPage.story.milestone5.description': 'Evolving into a global dance platform with continuous growth',

      'aboutPage.stats.artists': 'Artists',
      'aboutPage.stats.projects': 'Projects',
      'aboutPage.stats.countries': 'Countries',
      'aboutPage.stats.awards': 'Awards',

      'aboutPage.values.title': 'Core Values',
      'aboutPage.values.passion.title': 'Passion',
      'aboutPage.values.passion.description': 'Creating the best performances with pure passion for dance',
      'aboutPage.values.innovation.title': 'Innovation',
      'aboutPage.values.innovation.description': 'Exploring new possibilities in dance through constant challenges and creative thinking',
      'aboutPage.values.collaboration.title': 'Collaboration',
      'aboutPage.values.collaboration.description': 'Valuing teamwork that respects each other and grows together',
      'aboutPage.values.excellence.title': 'Excellence',
      'aboutPage.values.excellence.description': 'Pursuing perfection and always delivering top-quality results',

      'aboutPage.cta.title': 'Ready to Dance with Us?',
      'aboutPage.cta.description': 'Start a new challenge with GRIGO Entertainment',
      'aboutPage.cta.joinUs': 'Join Us Now',
      'aboutPage.cta.contact': 'Contact Us',

      // Contact Us page
      'contactPage.hero.title': 'Contact Us',
      'contactPage.hero.subtitle': 'Have a project or inquiry? We\'d love to hear from you',

      'contactPage.form.title': 'Send a Message',
      'contactPage.form.name': 'Name',
      'contactPage.form.namePlaceholder': 'John Doe',
      'contactPage.form.email': 'Email',
      'contactPage.form.emailPlaceholder': 'your@email.com',
      'contactPage.form.phone': 'Phone',
      'contactPage.form.phonePlaceholder': '+82 10-1234-5678',
      'contactPage.form.subject': 'Subject',
      'contactPage.form.subjectPlaceholder': 'Enter your inquiry subject',
      'contactPage.form.message': 'Message',
      'contactPage.form.messagePlaceholder': 'Tell us more about your project or inquiry...',
      'contactPage.form.submit': 'Send Message',
      'contactPage.form.sending': 'Sending...',
      'contactPage.form.success': 'Message sent successfully!',
      'contactPage.form.error': 'An error occurred. Please try again.',

      'contactPage.info.title': 'Contact Information',
      'contactPage.info.email.label': 'Email',
      'contactPage.info.email.value': 'contact@grigo-ent.com',
      'contactPage.info.phone.label': 'Phone',
      'contactPage.info.phone.value': '+82 10-1234-5678',
      'contactPage.info.address.label': 'Address',
      'contactPage.info.address.value': 'Gangnam-gu, Seoul, South Korea',
      'contactPage.info.hours.label': 'Business Hours',
      'contactPage.info.hours.value': 'Mon-Fri: 9:00 AM - 6:00 PM',

      'contactPage.social.title': 'Social Media',
      'contactPage.social.followUs': 'Follow Us',
    }
  };

  return translations[lang] || translations.ko;
};