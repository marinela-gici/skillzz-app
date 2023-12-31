import React, { useState, useEffect } from 'react';

const ScrollToTop = ({scrollRef}) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        scrollRef.current.addEventListener('scroll', (e) => {
            if (scrollRef.current.scrollTop > 100) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        });
    }, []);

    const goTop = () => {
        scrollRef.current.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <button className="fixed bottom-5 z-10 cursor-pointer right-5" style={{display: isVisible ? 'block':'none'}} onClick={goTop}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10 text-emerald-400 dark:text-rose-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>

        </button>
    );
}

export default ScrollToTop;