import React, { useState, useEffect } from 'react';
import {
    collection,
    addDoc,
    onSnapshot,
    updateDoc,
    doc,
    increment,
    serverTimestamp
} from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';

const CATEGORIES = ['All', 'Operations', 'Client Experience', 'Office Life', 'Tech', 'Quick Wins'];
const appId = 'rmx-labs-idea-box';

export default function IdeaBox() {
    const [user, setUser] = useState(null);
    const [ideas, setIdeas] = useState([]);
    const [newIdea, setNewIdea] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Operations');
    const [filter, setFilter] = useState('All');
    const [votedIdeas, setVotedIdeas] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const initAuth = async () => {
            try {
                await signInAnonymously(auth);
            } catch (error) {
                console.error("Auth error:", error);
            }
        };
        initAuth();
        const unsubscribe = onAuthStateChanged(auth, setUser);
        const savedVotes = localStorage.getItem('origin_idea_votes');
        if (savedVotes) {
            setVotedIdeas(JSON.parse(savedVotes));
        }
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (!user) return;
        const ideasRef = collection(db, 'artifacts', appId, 'public', 'data', 'ideas');
        const unsubscribe = onSnapshot(
            ideasRef,
            (snapshot) => {
                const ideasData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setIdeas(ideasData.sort((a, b) => (b.score || 0) - (a.score || 0)));
            },
            (error) => console.error("Firestore error:", error)
        );
        return () => unsubscribe();
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newIdea.trim() || !user || isSubmitting) return;
        setIsSubmitting(true);
        try {
            await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'ideas'), {
                text: newIdea,
                category: selectedCategory,
                score: 0,
                createdAt: serverTimestamp(),
                authorId: user.uid
            });
            setNewIdea('');
        } catch (err) {
            console.error("Submission failed", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleVote = async (ideaId, direction) => {
        if (!user) return;
        const currentVote = votedIdeas[ideaId];
        if (currentVote === direction) return;
        const ideaRef = doc(db, 'artifacts', appId, 'public', 'data', 'ideas', ideaId);
        let scoreChange = !currentVote ? (direction === 'up' ? 1 : -1) : (direction === 'up' ? 2 : -2);
        try {
            await updateDoc(ideaRef, { score: increment(scoreChange) });
            const newVotes = { ...votedIdeas, [ideaId]: direction };
            setVotedIdeas(newVotes);
            localStorage.setItem('origin_idea_votes', JSON.stringify(newVotes));
        } catch (err) {
            console.error("Vote failed", err);
        }
    };

    const filteredIdeas = filter === 'All' ? ideas : ideas.filter(i => i.category === filter);

    return (
        <div className="w-full relative z-10 space-y-12">
            <div className="space-y-2 border-l-2 border-primary/50 pl-6 py-2">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60">System Protocol</p>
                <p className="text-slate-400 text-sm leading-relaxed max-w-xl">
                    A decentralized repository for internal innovation. Submit high-impact concepts, workflow optimizations, or cultural improvements. All entries are public and rankable by the collective.
                </p>
            </div>

            <section className="bg-white/[0.04] backdrop-blur-3xl p-6 rounded-none shadow-2xl shadow-black/50">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block italic">
                            "An idea, in the highest sense of that word, cannot be realized but as a symbol." — Victor Hugo
                        </label>
                        <textarea
                            value={newIdea}
                            onChange={(e) => setNewIdea(e.target.value)}
                            placeholder="What's on your mind?"
                            className="w-full min-h-[120px] p-4 bg-black/60 border-none rounded-none focus:ring-1 focus:ring-primary/50 transition-all outline-none text-slate-200 placeholder:text-slate-800 resize-none font-mono"
                            maxLength={300}
                        />
                        <div className="flex justify-end text-[10px] text-slate-700 font-mono">
                            {newIdea.length}/300
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="flex flex-wrap gap-2">
                            {CATEGORIES.slice(1).map(cat => (
                                <button
                                    key={cat}
                                    type="button"
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-4 py-1 text-[10px] font-bold uppercase transition-all ${selectedCategory === cat
                                            ? 'bg-primary text-white shadow-lg shadow-primary/40'
                                            : 'bg-white/5 text-slate-600 hover:bg-white/10 hover:text-slate-400'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                        <button
                            disabled={!newIdea.trim() || isSubmitting}
                            className="w-full bg-primary text-white py-3 font-black uppercase tracking-widest hover:bg-primary/80 disabled:opacity-20 transition-all shadow-xl shadow-primary/30"
                        >
                            {isSubmitting ? 'Syncing...' : 'Transmit Idea'}
                        </button>
                    </div>
                </form>
            </section>

            <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <h2 className="text-sm font-black uppercase tracking-widest text-primary/80">Collective Feed</h2>
                    <select
                        className="bg-black/60 backdrop-blur-md border-none text-[10px] font-bold uppercase tracking-wider p-2 outline-none focus:ring-1 focus:ring-primary/50 cursor-pointer text-slate-500"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        {CATEGORIES.map(cat => (
                            <option key={cat} value={cat} className="bg-[#111]">{cat}</option>
                        ))}
                    </select>
                </div>

                <div className="space-y-4">
                    {filteredIdeas.length === 0 ? (
                        <div className="text-center py-20 bg-white/[0.01] backdrop-blur-sm border border-dashed border-white/5">
                            <p className="text-slate-900 text-[10px] uppercase tracking-widest font-black">Null Set // Awaiting Data</p>
                        </div>
                    ) : (
                        filteredIdeas.map((idea) => (
                            <div key={idea.id} className="bg-white/[0.03] backdrop-blur-md p-6 flex gap-8 hover:bg-white/[0.06] transition-all group shadow-lg shadow-black/20">
                                <div className="flex flex-col items-center gap-2 shrink-0 pt-1">
                                    <button
                                        onClick={() => handleVote(idea.id, 'up')}
                                        className={`text-[10px] font-black p-1 transition-colors ${votedIdeas[idea.id] === 'up' ? 'text-primary' : 'text-slate-700 hover:text-primary/70'
                                            }`}
                                    >
                                        UP
                                    </button>
                                    <span className={`text-lg font-black tracking-tighter ${(idea.score || 0) > 0 ? 'text-primary' : (idea.score || 0) < 0 ? 'text-slate-600' : 'text-slate-800'
                                        }`}>
                                        {idea.score || 0}
                                    </span>
                                    <button
                                        onClick={() => handleVote(idea.id, 'down')}
                                        className={`text-[10px] font-black p-1 transition-colors ${votedIdeas[idea.id] === 'down' ? 'text-primary/50' : 'text-slate-700 hover:text-slate-500'
                                            }`}
                                    >
                                        DN
                                    </button>
                                </div>

                                <div className="flex-1 space-y-4">
                                    <div className="flex items-center gap-4">
                                        <span className="text-[9px] font-black uppercase text-primary/80 bg-primary/10 px-2 py-0.5 tracking-tighter">
                                            {idea.category}
                                        </span>
                                        <span className="text-[9px] text-slate-700 font-bold uppercase">
                                            {idea.createdAt?.toDate?.()?.toLocaleDateString() || 'LIVE'}
                                        </span>
                                    </div>
                                    <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap font-mono">
                                        {idea.text}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
