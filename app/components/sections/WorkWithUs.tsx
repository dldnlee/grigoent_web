export default function WorkWithUs() {
  const opportunities = [
    {
      title: "개인 댄서",
      description: "개인으로 활동중인 댄서들과\n협업을 원하시는 경우",
      action: "댄서 찾기",
      shadowColor: "shadow-red-500/50"
    },
    {
      title: "댄스 팀",
      description: "개인으로 활동중인 댄서들과\n협업을 원하시는 경우",
      action: "팀 찾기",
      shadowColor: "shadow-green-500/50"
    },
    {
      title: "일반 제안",
      description: "개인으로 활동중인 댄서들과\n협업을 원하시는 경우",
      action: "제안하기",
      shadowColor: "shadow-purple-500/50"
    }
  ];

  return (
    <section className="py-32 bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-24">
          <p className="text-lg text-gray-400 mb-6 tracking-wide">프로젝트 제안</p>
          <h2 className="text-6xl md:text-8xl font-light mb-2">
            Work With Us
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            프로젝트 유형에 따라 적절한 제안 방법을 선택하세요
          </p>
        </div>

        {/* Opportunities Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {opportunities.map((opportunity, index) => (
            <div
              key={index}
              className={`bg-secondary rounded-3xl p-12 text-start shadow-2xl ${opportunity.shadowColor} hover:scale-105 transition-all duration-300`}
            >
              <h3 className="text-4xl font-bold text-secondary-foreground mb-8">
                {opportunity.title}
              </h3>
              <p className="text-xl text-secondary-foreground/70 mb-12 leading-relaxed whitespace-pre-line">
                {opportunity.description}
              </p>
              <button className="w-full bg-primary hover:bg-primary/80 text-primary-foreground py-6 rounded-2xl font-semibold text-lg transition-all duration-300">
                {opportunity.action}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}