export default function Services() {
  const services = [
    {
      title: "댄스 레슨",
      description: "전문 강사진과 함께하는 맞춤형 댄스 교육",
      icon: "🎭"
    },
    {
      title: "안무 제작",
      description: "창의적이고 독창적인 안무 제작 서비스",
      icon: "💃"
    },
    {
      title: "이벤트 기획",
      description: "댄스 공연 및 이벤트 전문 기획",
      icon: "🎪"
    },
    {
      title: "오디션 준비",
      description: "체계적인 오디션 준비 프로그램",
      icon: "⭐"
    },
    {
      title: "영상 제작",
      description: "전문적인 댄스 영상 촬영 및 편집",
      icon: "🎬"
    },
    {
      title: "공연 기획",
      description: "무대 공연 기획 및 연출 서비스",
      icon: "🎨"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            WHAT DO WE DO?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            전문적인 댄스 교육부터 공연 기획까지, 다양한 서비스를 제공합니다
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}