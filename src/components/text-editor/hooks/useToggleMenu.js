import {useState, useRef, useEffect} from 'react';

export default function useToggleMenu()
{
    const buttonRef = useRef(null);
    const menuRef = useRef(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        document.addEventListener("click", (e) => {
          e.stopPropagation();
          if (
            !menuRef.current?.contains(e.target) &&
            !buttonRef.current?.contains(e.target) &&
            isMenuOpen
          )
            setIsMenuOpen(false);
        });
      }, [isMenuOpen]);

    const toggle = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return {
        isMenuOpen,
        toggle,
        buttonRef,
        menuRef
    }
}
