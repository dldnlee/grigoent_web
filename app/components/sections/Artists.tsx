export default function Artists() {
  const artists = [
    { koreanName: "김마린", englishName: "Marline Kim", specialty: "Hip Hop", image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80" },
    { koreanName: "박서연", englishName: "Sarah Park", specialty: "Contemporary", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80" },
    { koreanName: "이준호", englishName: "Alex Lee", specialty: "Jazz", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80" },
    { koreanName: "최루나", englishName: "Luna Choi", specialty: "Ballet", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80" },
    { koreanName: "강민수", englishName: "Marcus Kang", specialty: "Street Dance", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" },
    { koreanName: "정소피아", englishName: "Sofia Jung", specialty: "Latin", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" },
    { koreanName: "윤지원", englishName: "Jiwon Yoon", specialty: "K-Pop", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1176&q=80" },
    { koreanName: "한에밀리", englishName: "Emily Han", specialty: "Modern", image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80" },
  ];


  return (
    <section className="py-20 bg-primary text-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-light mb-4">
            OUR ARTISTS
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            세계적 수준의 전문 댄서들과 함께하는 그리고 엔터테인먼트
          </p>
        </div>

        {/* Artists Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {artists.map((artist, index) => (
            <div
              key={index}
              className="group cursor-pointer"
            >
              <div className="aspect-[3/4] bg-gray-800 rounded-3xl overflow-hidden relative shadow-2xl">
                {/* Background Image */}
                <div
                  className="w-full h-full bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url(${artist.image})`,
                  }}
                >
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20">
                    {/* Names - Bottom */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="font-bold text-2xl text-white leading-tight mb-1">
                        {artist.koreanName}
                      </h3>
                      <div className="text-white/90 text-lg font-medium">
                        {artist.englishName}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
            View All Artists
          </button>
        </div>
      </div>
    </section>
  );
}