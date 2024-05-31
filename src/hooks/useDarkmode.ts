'use client';

// Lib Imports.
import { useState, useLayoutEffect } from 'react';

// Hook.
export default function useDarkmode() {
  const [darkmode, setDarkmode] = useState(JSON.parse(localStorage.getItem('darkmode') || 'false'));

  useLayoutEffect(() => {
    if (darkmode) document.body.classList.add('dark');
    else document.body.classList.remove('dark');

    localStorage.setItem('darkmode', darkmode);
  }, [darkmode]);

  return [darkmode, setDarkmode];
}
