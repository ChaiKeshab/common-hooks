import { useRef, useEffect, Dispatch, SetStateAction } from 'react';


export const useMenu = (setToggle: Dispatch<SetStateAction<boolean>>) => {
    const menuRef = useRef<HTMLDivElement>(null);
    const disableMenuRef = useRef(true);

    useEffect(() => {
        setTimeout(() => {
            disableMenuRef.current = false;
        }, 500);
    }, []);

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (!disableMenuRef.current && menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setToggle((prev) => !prev);
            }
        };

        document.addEventListener('click', handleClick);

        return () => document.removeEventListener('click', handleClick);
    }, [setToggle]);

    return menuRef;
};

// for overlay menu

// Usage: const menuRef = useClickOutside(your_setter_function);
// attach the returned menuRef to parent div of menu: <div ref={menuRef}...
// does not work if used for menu inside another meny