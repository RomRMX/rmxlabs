import React, { useEffect, useState } from 'react';

import ProjectList from '../components/ProjectList';

import Galaxy from '../components/Galaxy';

const LandingPage = () => {
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        // Simulate intro sequence duration or wait for a specific event
        // For now, let's show content after a delay, or we can keep it as just the intro for now
        // based on "intro sequence" name.
        const timer = setTimeout(() => {
            setShowContent(true);
        }, 5000); // Adjust timing as needed

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="bg-black h-screen w-full text-white font-sans selection:bg-purple-500 selection:text-white overflow-hidden relative flex flex-col">
            {/* Background Animation */}
            <div className="absolute inset-0 z-0">
                <Galaxy
                    mouseRepulsion={false}
                    mouseInteraction
                    density={0.7}
                    glowIntensity={0.2}
                    saturation={0.4}
                    hueShift={160}
                    twinkleIntensity={0.6}
                    rotationSpeed={0}
                    repulsionStrength={0.5}
                    autoCenterRepulsion={2}
                    starSpeed={0.8}
                    speed={0.2}
                />
            </div>

            {/* Title Section */}
            <div className="relative z-10 pt-[1000px] pb-4 px-8 flex-shrink-0">
                <h1 className="text-[12vw] md:text-[8vw] font-[700] text-transparent bg-clip-text bg-[linear-gradient(to_bottom,white_30%,transparent_100%)] tracking-[-0.05em] select-none mix-blend-difference text-center leading-none" style={{ fontFamily: 'Tomorrow, sans-serif' }}>
                    RMXLABS
                </h1>
            </div>

            {/* Projects Section */}
            <div className="relative z-10 flex-1 flex items-center justify-center px-8 pb-12 overflow-hidden">
                <div className="w-full max-w-7xl">
                    <ProjectList />
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
