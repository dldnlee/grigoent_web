export default function WorkWithUs() {
  const opportunities = [
    {
      title: "댄서 모집",
      description: "전문 댄서로 함께 성장할 기회",
      action: "지원하기",
      icon: "💃",
      gradient: "from-pink-500 to-red-500"
    },
    {
      title: "강사 모집",
      description: "경험을 나누고 가르칠 강사진",
      action: "지원하기",
      icon: "👨‍🏫",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "협업 제안",
      description: "함께 만들어갈 파트너십",
      action: "제안하기",
      icon: "🤝",
      gradient: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Work With Us
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            그리고 엔터테인먼트와 함께 꿈을 이루어보세요
          </p>
        </div>

        {/* Opportunities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {opportunities.map((opportunity, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
            >
              <div className="text-6xl mb-6">{opportunity.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {opportunity.title}
              </h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                {opportunity.description}
              </p>
              <button className={`w-full bg-gradient-to-r ${opportunity.gradient} text-white py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300`}>
                {opportunity.action}
              </button>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-black rounded-3xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">
              Ready to Start Your Journey?
            </h3>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              지금 바로 그리고 엔터테인먼트의 일원이 되어 함께 성장해보세요
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
                오디션 참가
              </button>
              <button className="border border-gray-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors duration-300">
                더 알아보기
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}