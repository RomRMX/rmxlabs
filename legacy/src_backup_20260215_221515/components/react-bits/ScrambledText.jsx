import { useEffect, useRef, useState } from 'react';

const ScrambledText = ({
    radius = 100,
    duration = 1.2,
    speed = 0.5,
    scrambleChars = '.:',
    className = '',
    style = {},
    children
}) => {
    const rootRef = useRef(null);
    const [chars, setChars] = useState([]);

    useEffect(() => {
        if (typeof children !== 'string') return;
        setChars(children.split('').map((char, i) => ({ char, id: i })));
    }, [children]);

    useEffect(() => {
        if (!rootRef.current) return;
        const el = rootRef.current;

        const handleMove = (e) => {
            const charElements = el.querySelectorAll('.scramble-char');
            charElements.forEach((c) => {
                const { left, top, width, height } = c.getBoundingClientRect();
                const dx = e.clientX - (left + width / 2);
                const dy = e.clientY - (top + height / 2);
                const dist = Math.hypot(dx, dy);

                if (dist < radius) {
                    if (c.dataset.scrambling === 'true') return;
                    c.dataset.scrambling = 'true';

                    const original = c.dataset.original;
                    let iteration = 0;
                    const maxIterations = 10;
                    const intervalDuration = (duration * 1000) / maxIterations;

                    const interval = setInterval(() => {
                        c.innerText = scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
                        iteration++;
                        if (iteration >= maxIterations) {
                            clearInterval(interval);
                            c.innerText = original;
                            setTimeout(() => {
                                c.dataset.scrambling = 'false';
                            }, 500); // Cooldown
                        }
                    }, intervalDuration);
                }
            });
        };

        el.addEventListener('pointermove', handleMove);
        return () => el.removeEventListener('pointermove', handleMove);
    }, [radius, duration, speed, scrambleChars]);

    return (
        <div ref={rootRef} className={`font-mono transition-opacity duration-500 whitespace-nowrap select-none ${className}`} style={style}>
            <p className="flex justify-center">
                {chars.map((item, i) => (
                    <span
                        key={i}
                        className="scramble-char inline-block text-center"
                        data-original={item.char}
                        style={{ width: item.char === ' ' ? '0.3em' : '1ch' }}
                    >
                        {item.char === ' ' ? '\u00A0' : item.char}
                    </span>
                ))}
            </p>
        </div>
    );
};

export default ScrambledText;
