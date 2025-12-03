"use client";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0A1A2F] via-[#0C2340] to-[#0A1A2F] text-white py-24">
      
      {/* Animated Gradient Mesh Blobs */}
      <div className="absolute -top-28 -left-32 w-[500px] h-[500px] bg-gradient-to-br from-blue-500 to-indigo-600 opacity-30 rounded-full blur-[140px] animate-slowblob"></div>
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-gradient-to-br from-purple-500 to-blue-600 opacity-30 rounded-full blur-[150px] animate-slowblob2"></div>
      
      {/* Floating Shapes */}
      <div className="absolute top-20 right-20 w-20 h-20 border-[3px] border-blue-400 rounded-full animate-float"></div>
      <div className="absolute left-10 bottom-24 w-14 h-14 border-[3px] border-indigo-400 rounded-2xl rotate-45 animate-floatdelay"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT TEXT */}
        <div className="animate-fadein">
          <div className="inline-block bg-blue-600/20 px-4 py-1 rounded-full text-blue-300 text-sm font-semibold border border-blue-500/40 backdrop-blur">
            🚀 Next-Gen E-Learning Platform
          </div>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight mt-6">
            Smart Learning  
            <span className="block bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
              For The Future
            </span>
          </h1>

          <p className="text-gray-300 mt-5 text-lg leading-relaxed max-w-lg">
            CourseMaster is a production-ready E-learning system designed for real-world
            scalability — empowering thousands of students, instructors, and admins with
            a seamless and powerful learning experience.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex items-center gap-4">
            <Link href="/courses">
              <button className="px-7 py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-500 to-blue-700 hover:opacity-90 transition-all shadow-lg shadow-blue-500/20">
                Browse Courses →
              </button>
            </Link>

            <Link href="/auth/register">
              <button className="px-7 py-3 rounded-xl font-semibold border border-white/30 hover:bg-white/10 transition-all">
                Start Free Trial
              </button>
            </Link>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative animate-fadein md:animate-slidein flex justify-center md:justify-end">
          <img
            src="/hero-girl.png"
            alt="Student"
            className="w-[340px] md:w-[430px] drop-shadow-2xl floating-img"
          />
        </div>

      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-blue-300">
        ↓ Scroll
      </div>

    </section>
  );
}
