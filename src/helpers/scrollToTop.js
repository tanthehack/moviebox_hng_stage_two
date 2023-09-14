import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
    // Get the current pathname from the location object
    const { pathname } = useLocation();

    // Use the useEffect hook to run code when the pathname changes
    useEffect(() => {
        // Scroll the document to the top
        document.documentElement.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant",
        });
    }, [pathname]); // Execute the effect when the pathname changes

    // This component doesn't render any content; it's used for its side effect
    return null;
}
