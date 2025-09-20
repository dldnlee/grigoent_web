import { ChevronDown } from 'lucide-react';

export default function Hero() {
  return (
    <section className="min-h-screen bg-primary text-primary-foreground flex items-center relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Side - Content */}
          <div className="space-y-8">
            {/* Company Info */}
            <div className="text-gray-400">
              <p className="text-xl md:text-2xl lg:text-3xl">GRIGO 엔터테인먼트 | A Global Dance Company</p>
            </div>

            {/* Main Heading */}
            <h1 className="leading-none">
              <p className='font-light text-5xl sm:text-6xl md:text-7xl lg:text-[3rem] xl:text-[7rem]'>DANCE WITH</p>
              <p className="text-primary-foreground font-extrabold text-7xl sm:text-9xl md:text-[7rem] lg:text-[10rem] xl:text-[12rem]">
                PASSION
              </p>
            </h1>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 md:gap-12 text-base font-medium">
              <div className="text-left">
                <div className="text-4xl md:text-5xl lg:text-6xl font-light">100+</div>
                <div className="text-gray-400 text-lg md:text-xl">아티스트</div>
              </div>
              <div className="text-left">
                <div className="text-4xl md:text-5xl lg:text-6xl font-light">500+</div>
                <div className="text-gray-400 text-lg md:text-xl">프로젝트</div>
              </div>
              <div className="text-left">
                <div className="text-4xl md:text-5xl lg:text-6xl font-light">30+</div>
                <div className="text-gray-400 text-lg md:text-xl">국가</div>
              </div>
              <div className="text-left">
                <div className="text-4xl md:text-5xl lg:text-6xl font-light">15+</div>
                <div className="text-gray-400 text-lg md:text-xl">년 경력</div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <button className="border border-primary-foreground/30 text-primary-foreground px-10 py-4 md:px-12 md:py-5 rounded-full hover:bg-primary-foreground hover:text-primary transition-all duration-300 font-medium text-lg md:text-xl">
                JOIN US NOW
              </button>
            </div>
          </div>

          {/* Right Side - Placeholder for 3D Design */}
          <div className="relative flex items-center justify-center">
            <div className="w-full h-96 lg:h-[500px] bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-blue-500/20 rounded-3xl border border-primary-foreground/10 flex items-center justify-center">
              <div className="text-gray-400 text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-pink-500 to-blue-500 rounded-full opacity-50"></div>
                <p>3D Design Placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-gray-400 text-sm mb-2">SCROLL DOWN</p>
        <ChevronDown className="w-6 h-6 text-gray-400 mx-auto animate-bounce" />
      </div>
    </section>
  );
}