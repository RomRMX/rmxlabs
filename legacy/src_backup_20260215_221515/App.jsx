import React from 'react';
import FaultyTerminalBackground from './components/gemini/FaultyTerminalBackground';
import ScrambledText from './components/react-bits/ScrambledText';
import IdeaBox from './components/gemini/IdeaBox';
import ProductPortfolio from './components/gemini/ProductPortfolio';

const App = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-slate-100 overflow-x-hidden">
      {/* Background Layer */}
      <FaultyTerminalBackground />

      {/* Navigation / Header (Optional, subtle) */}
      <header className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-center pointer-events-none">
        <div className="text-[10px] font-black tracking-[0.5em] text-primary/40 uppercase pointer-events-auto">
          RMXLABS // PROTOCOL v4.0.1
        </div>
      </header>

      {/* Main Content Sections */}
      <main className="relative z-10 w-full flex flex-col items-center">

        {/* Section 1: Hero */}
        <section className="min-h-screen w-full flex flex-col items-center justify-center gap-12 px-6">
          <ScrambledText
            radius={300}
            duration={0.1}
            scrambleChars="RMXLABS.:+*%$&"
            speed={0.1}
            className="pro-gradient font-axope font-bold tracking-[0.2em] pointer-events-auto select-none"
            style={{ fontSize: 'clamp(3rem, 15vw, 12rem)', lineHeight: '1' }}
          >
            RMXLABS
          </ScrambledText>

          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 px-6 opacity-0 animate-[fadeIn_1s_ease-out_0.5s_forwards]">
            {[
              { name: 'RackStack Pro', url: 'https://rackstack-pro.vercel.app' },
              { name: 'OACommand', url: 'https://github.com/RomRMX/oacommand' }
            ].map((project) => (
              <a
                key={project.name}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 font-display text-xs md:text-sm tracking-[0.3em] uppercase hover:text-white hover:text-glow transition-all duration-300 cursor-pointer"
              >
                {project.name}
              </a>
            ))}
          </nav>
        </section>

        {/* Section 2: Product Portfolio */}
        <section className="w-full max-w-7xl px-6 py-24 border-t border-white/5 bg-black/20 backdrop-blur-sm">
          <ProductPortfolio />
        </section>

        {/* Section 3: Idea Box */}
        <section className="w-full max-w-3xl px-6 py-24 border-t border-white/5 bg-black/40 backdrop-blur-md">
          <div className="mb-12">
            <h2 className="text-2xl font-black flex items-baseline gap-2">
              <span className="text-primary">IDEA</span>
              <span className="bg-gradient-to-b from-primary to-primary/20 bg-clip-text text-transparent">BOX</span>
              <span className="text-slate-600 text-[10px] ml-3 font-bold tracking-[0.3em] uppercase opacity-60">Collaborative Innovation</span>
            </h2>
          </div>
          <IdeaBox />
        </section>

      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full py-16 border-t border-white/5 opacity-30">
        <p className="text-slate-500 text-[9px] uppercase font-black tracking-[0.5em] text-center">
          TERMINAL END // RMXLABS 2026
        </p>
      </footer>
    </div>
  );
};

export default App;
