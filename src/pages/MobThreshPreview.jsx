import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Galaxy from '../components/Galaxy';

const MobThreshPreview = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-black h-screen w-full text-white font-sans overflow-hidden relative flex flex-col items-center justify-center">
            {/* Background Animation */}
            <div className="absolute inset-0 z-0">
                <Galaxy
                    mouseRepulsion
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

            <div className="relative z-10 w-full max-w-5xl px-8 flex flex-col items-start bg-black/40 backdrop-blur-md p-10 border border-white/10 rounded-xl">
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8 text-sm tracking-widest uppercase"
                >
                    <ArrowLeft size={16} /> Back to Projects
                </button>

                <h1 className="text-4xl md:text-5xl font-[700] mb-4" style={{ fontFamily: 'Tomorrow, sans-serif' }}>
                    MOBTHRESH
                </h1>

                <p className="text-gray-300 font-light text-lg mb-8 max-w-2xl">
                    A powerful Photoshop UXP plugin for Mobbin users. Streamline your design workflow with advanced thresholding and image processing tools directly within Photoshop.
                </p>

                <div className="w-full aspect-[16/9] bg-black/60 border border-white/20 flex items-center justify-center rounded-lg overflow-hidden relative group">
                    {/* Placeholder for actual screenshot */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white/20 group-hover:text-white/40 transition-colors">
                        <span className="text-6xl font-thin mb-4">+</span>
                        <span className="tracking-[0.5em] text-xs uppercase font-bold">Preview Image Placeholder</span>
                    </div>
                </div>

                <div className="mt-8 flex gap-4">
                    <button className="px-8 py-3 bg-white text-black font-bold tracking-widest uppercase text-xs hover:bg-gray-200 transition-colors">
                        Request Access
                    </button>
                    <button className="px-8 py-3 border border-white/30 text-white font-bold tracking-widest uppercase text-xs hover:bg-white/10 transition-colors">
                        View Documentation
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MobThreshPreview;
