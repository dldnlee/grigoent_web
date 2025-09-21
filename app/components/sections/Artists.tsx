export default function Artists() {
  const artists = [
    { name: "Marline Bettye", specialty: "Hip Hop", status: "Available", username: "user291057", image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80" },
    { name: "Sarah Kim", specialty: "Contemporary", status: "Connecting", username: "sarahk_dance", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80" },
    { name: "Alex Chen", specialty: "Jazz", status: "Available", username: "alexc_moves", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80" },
    { name: "Luna Park", specialty: "Ballet", status: "Busy", username: "luna_ballet", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80" },
    { name: "Marcus Lee", specialty: "Street Dance", status: "Available", username: "marcus_street", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" },
    { name: "Sofia Rodriguez", specialty: "Latin", status: "Connecting", username: "sofia_latin", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" },
    { name: "Jiwon Kim", specialty: "K-Pop", status: "Available", username: "jiwon_kpop", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1176&q=80" },
    { name: "Emma Wilson", specialty: "Modern", status: "Busy", username: "emma_modern", image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-green-500";
      case "Connecting":
        return "bg-blue-500";
      case "Busy":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

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
                    {/* Artist Name and Status - Top */}
                    <div className="absolute top-6 left-6 right-6">
                      <h3 className="font-bold text-2xl text-white mb-1 leading-tight">
                        {artist.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(artist.status)}`}></div>
                        <span className="text-white/90 text-sm font-medium">{artist.status}</span>
                      </div>
                    </div>

                    {/* Bottom Section */}
                    <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                      {/* User Profile Section */}
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
                          <div
                            className="w-full h-full bg-cover bg-center"
                            style={{
                              backgroundImage: `url(${artist.image})`,
                            }}
                          ></div>
                        </div>
                        <div>
                          <div className="text-white text-sm font-medium">@{artist.username}</div>
                          <div className="text-white/70 text-xs">23m ago</div>
                        </div>
                      </div>

                      {/* Add Member Button */}
                      <button className="bg-white text-black px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center gap-1">
                        <span className="text-lg">+</span>
                        <span>Add Member</span>
                      </button>
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