import React, { useState } from 'react';
import { Lock, ArrowRight, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const projects = [
    { name: 'MobThresh', description: 'Photoshop Plug-In for Mobbin', id: 'mobthresh', localRoute: '/mobthresh-preview' },
    { name: 'BellyFiller', description: 'Restaurant discovery and meal planning', id: 'bellyfiller', url: 'https://bellyfiller.vercel.app/' },
    { name: 'Ground Command', description: 'Strategic mapping and territory management', id: 'groundcommand', url: 'https://territory-ten.vercel.app', protected: true },
    { name: 'IdeaBox', description: 'Collective intelligence and innovation management tool.', id: 'ideabox', url: 'https://ideabox-virid.vercel.app/' },
    { name: 'OA Product Profile', description: 'Sales operations dashboard', id: 'oa-portfolio', url: 'https://oa-portfolio-sigma.vercel.app', protected: true },
    { name: 'TrakkinDemDollaz', description: 'Financial monitoring and capital tracking.', id: 'trakkindemdollaz', url: 'https://trakkindemdollaz.vercel.app', protected: true },
];

const ProjectList = () => {
    const [passwordPrompt, setPasswordPrompt] = useState(null); // stores project if prompted
    const [passwordInput, setPasswordInput] = useState('');
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleProjectClick = (e, project) => {
        if (project.protected) {
            e.preventDefault();
            setPasswordPrompt(project);
            setPasswordInput('');
            setError(false);
        } else if (project.localRoute) {
            e.preventDefault();
            navigate(project.localRoute);
        }
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (passwordInput === '4321') {
            window.open(passwordPrompt.url, '_blank', 'noopener,noreferrer');
            setPasswordPrompt(null);
        } else {
            setError(true);
            setPasswordInput('');
        }
    };

    return (
        <div className="text-white flex flex-col items-center relative z-20">
            <h2 className="text-2xl md:text-3xl font-[700] mb-8 tracking-wider text-center" style={{ fontFamily: 'Tomorrow, sans-serif' }}>
                PROJECTS
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl w-full">
                {projects.map((project) => (
                    <a
                        key={project.id}
                        href={project.url || project.localRoute}
                        target={project.localRoute ? "_self" : "_blank"}
                        rel="noopener noreferrer"
                        onClick={(e) => handleProjectClick(e, project)}
                        className="group border border-white/20 p-6 hover:bg-white/10 transition-all duration-300 cursor-pointer backdrop-blur-md bg-black/20 block relative overflow-hidden"
                    >
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-[700] text-white group-hover:text-blue-300 transition-colors uppercase" style={{ fontFamily: 'Tomorrow, sans-serif' }}>
                                {project.name}
                            </h3>
                            {project.protected && <Lock size={14} className="text-white/40 group-hover:text-blue-300 transition-colors" />}
                        </div>
                        <p className="text-gray-400 font-light text-xs tracking-wide group-hover:text-white transition-colors line-clamp-2">
                            {project.description}
                        </p>
                    </a>
                ))}
            </div>

            {/* Simplified Password Modal */}
            {passwordPrompt && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm">
                    <div className="w-full max-w-sm p-8 text-center">
                        <form onSubmit={handlePasswordSubmit} className="flex flex-col items-center gap-6">
                            <div className="text-white/40 text-[10px] tracking-[0.3em] uppercase font-bold">
                                {passwordPrompt.name} // RESTRICTED
                            </div>

                            <input
                                type="password"
                                value={passwordInput}
                                onChange={(e) => {
                                    setPasswordInput(e.target.value);
                                    setError(false);
                                }}
                                placeholder="ENTER PASSWORD"
                                autoFocus
                                className={`w-full bg-transparent border-b ${error ? 'border-red-500 text-red-500' : 'border-white/20 text-white'} py-2 text-center text-xl tracking-[0.5em] focus:outline-none focus:border-white/60 transition-colors placeholder:text-white/10`}
                            />

                            {error && (
                                <div className="text-red-500 text-[10px] tracking-widest uppercase animate-pulse">
                                    ACCESS DENIED
                                </div>
                            )}

                            <button
                                type="button"
                                onClick={() => setPasswordPrompt(null)}
                                className="text-white/20 hover:text-white/60 text-[10px] tracking-widest uppercase transition-colors"
                            >
                                [ CANCEL ]
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <footer className="mt-12 text-white/40 text-[10px] tracking-[0.4em] uppercase font-bold">
                rmxlabs ©2026
            </footer>
        </div>
    );
};

export default ProjectList;
