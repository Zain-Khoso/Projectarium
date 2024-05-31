// Lib Imports.
import { useState, useLayoutEffect } from 'react';

// Hook.
export default function useDarkmode() {
  const [darkmode, setDarkmode] = useState(
    JSON.parse(window.localStorage.getItem('darkmode') || 'false')
  );

  useLayoutEffect(() => {
    if (darkmode) document.body.classList.add('dark');
    else document.body.classList.remove('dark');

    window.localStorage.setItem('darkmode', darkmode);
  }, [darkmode]);

  return [darkmode, setDarkmode];
}
