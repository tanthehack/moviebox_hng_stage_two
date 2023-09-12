import { useEffect, useState } from "react";

export function useWindowScroll(pos) {
    const [matches, setMatches] = useState(false);

    const controlNavbar = () => {
        if (typeof window !== 'undefined') {
            if (window.scrollY < pos) { // if scroll down hide the navbar
                setMatches(false);
            } else { // if scroll up show the navbar
                setMatches(true);
            }
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', controlNavbar);

            // cleanup function
            return () => {
                window.removeEventListener('scroll', controlNavbar);
            };
        }
    }, [matches, pos]);

    return matches;
}