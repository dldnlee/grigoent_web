export default function Artists() {
  const artists = [
    { name: "Artist 1", specialty: "Hip Hop" },
    { name: "Artist 2", specialty: "Contemporary" },
    { name: "Artist 3", specialty: "Jazz" },
    { name: "Artist 4", specialty: "Ballet" },
    { name: "Artist 5", specialty: "Street Dance" },
    { name: "Artist 6", specialty: "Latin" },
    { name: "Artist 7", specialty: "K-Pop" },
    { name: "Artist 8", specialty: "Modern" },
  ];

  return (
    <section className="py-20 bg-black text-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            OUR ARTISTS
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            세계적 수준의 전문 댄서들과 함께하는 그리고 엔터테인먼트
          </p>
        </div>

        {/* Artists Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {artists.map((artist, index) => (
            <div
              key={index}
              className="group cursor-pointer"
            >
              <div className="aspect-square bg-gray-800 rounded-2xl mb-4 overflow-hidden relative">
                {/* Placeholder for artist image */}
                <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                  <div className="text-6xl opacity-30">👤</div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4">
                    <div className="text-sm text-gray-300">{artist.specialty}</div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <h3 className="font-semibold text-lg">{artist.name}</h3>
                <p className="text-gray-400 text-sm">{artist.specialty}</p>
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