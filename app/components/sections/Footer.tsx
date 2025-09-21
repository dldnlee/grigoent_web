'use client';

export default function Footer() {
  const quickLinks = [
    { name: 'Home', href: '#' },
    { name: 'Artists', href: '#artists' },
    { name: 'About us', href: '#about' },
    { name: 'Contact us', href: '#contact' }
  ];

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-black text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-white">
              (주) 그리고 엔터테인먼트
            </h3>
            <div className="space-y-2 text-gray-400 text-sm leading-relaxed">
              <p>글로벌 댄스 컴퍼니로, 안무제작부터 댄서섭외까지 모든 것을 담당합니다.</p>
              <p>최고의 안무가들과 댄서들을 연결하여 세계적인 공연을 만들어냅니다.</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-white">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-white">
              Contact
            </h3>
            <div className="space-y-2 text-gray-400 text-sm">
              <p>
                <span className="text-white">Email:</span> contact@grigoent.co.kr
              </p>
              <p>
                <span className="text-white">Phone:</span> +82) 02-6229-9229
              </p>
              <p className="mt-4 text-gray-500">
                (주) 그리고 엔터테인먼트
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <p className="text-center text-gray-500 text-sm">
            © 2024 (주) 그리고 엔터테인먼트. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}