import { useState, useEffect } from "react";

export default function useHeader() {
    const [headerHeight, setHeaderHeight] = useState(false);

    useEffect(() => {
        const element = document.getElementById('header');
        const el_height = element.getBoundingClientRect().height
        setHeaderHeight(el_height)
    }, []);

    return { headerHeight };
}