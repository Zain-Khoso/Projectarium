// Lib Imports.
import { useRef, useState, useLayoutEffect } from 'react';

// Hook.
export default function useDarkmode() {
  const darkmodeValue = useRef(
    typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('darkmode') || 'false') : false
  );

  const [darkmode, setDarkmode] = useState(darkmodeValue.current);

  useLayoutEffect(() => {
    if (window) {
      if (darkmode) document.body.classList.add('dark');
      else document.body.classList.remove('dark');

      localStorage.setItem('darkmode', JSON.stringify(darkmode));
    }
  }, [darkmode]);

  return [darkmode, setDarkmode];
}
