export default function RecentWorks() {
  const works = [
    {
      title: "Music Video Production",
      client: "Famous Artist",
      year: "2024",
      category: "Music Video"
    },
    {
      title: "Concert Performance",
      client: "Major Label",
      year: "2024",
      category: "Live Performance"
    },
    {
      title: "Commercial Campaign",
      client: "Global Brand",
      year: "2023",
      category: "Commercial"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            RECENT WORKS
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            최근 진행한 프로젝트들을 확인해보세요
          </p>
        </div>

        {/* Works Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {works.map((work, index) => (
            <div
              key={index}
              className="group cursor-pointer"
            >
              <div className="aspect-video bg-gray-200 rounded-2xl mb-6 overflow-hidden relative">
                {/* Placeholder for work thumbnail */}
                <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                  <div className="text-4xl text-gray-500">🎬</div>
                </div>

                {/* Play button overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                    <div className="w-0 h-0 border-l-[12px] border-l-black border-y-[8px] border-y-transparent ml-1"></div>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-xl text-gray-900">{work.title}</h3>
                  <span className="text-sm text-gray-500">{work.year}</span>
                </div>
                <p className="text-gray-600 mb-2">{work.client}</p>
                <span className="inline-block bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                  {work.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <button className="bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors duration-300">
            View All Works
          </button>
        </div>
      </div>
    </section>
  );
}