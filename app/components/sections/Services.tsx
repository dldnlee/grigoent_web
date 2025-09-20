export default function Services() {
  const services = [
    {
      title: "K-POP & 앨범 안무 제작",
      description: "아이돌 그룹, 솔로 아티스트의 타이틀곡 및 수록곡 안무 제작"
    },
    {
      title: "영화 & 광고 안무",
      description: "영화, 드라마, 광고 CF 안무 제작 및 출연"
    },
    {
      title: "방송 & 행사 출연",
      description: "TV 프로그램, 콘서트, 행사 댄서 및 팀 섭외"
    },
    {
      title: "해외 & 국내 워크샵",
      description: "전 세계 K-POP 댄스 레슨 및 워크샵 진행"
    },
    {
      title: "댄스 챌린지",
      description: "제품, 공감, 릴레이 홍보를 위한 댄스 챌린지 제작"
    },
    {
      title: "댄스 대회 & 행사",
      description: "댄스 대회 주최, 운영 및 다양한 행사 기획"
    }
  ];

  return (
    <section className="py-24 bg-gray-50" id="about">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row w-full mb-20">
          <div className="mb-8 lg:mb-0 w-full">
            <p className="text-sm font-medium text-gray-500 mb-4 tracking-wide">ABOUT US</p>
            <div className="flex justify-between items-center">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-black leading-tight mr-12">
                WHAT DO WE DO?
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                저희는 세계적인 안무가들과 댄서들을 연결하여<br />
                혁신적이고 감동적인 공연을 만들어갑니다.
              </p>
            </div>
          </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:px-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gray-200 rounded-3xl p-8 hover:bg-gray-300 transition-all duration-300"
            >
              {/* Icon Placeholder */}
              <div className="w-16 h-16 bg-gray-400 rounded-full mb-8"></div>

              <h3 className="text-xl font-bold text-black mb-4 leading-tight">
                {service.title}
              </h3>
              <p className="text-gray-700 leading-relaxed max-w-[300px]">
                {service.description}
              </p>
            </div>
          ))}
        </div>
    </section>
  );
}