// client/src/components/shared/ScrollToHash.jsx
// Smooth-scrolls to a matching DOM id when the URL hash changes. React Router v6 doesn't
// do this for us. Mount once at the App level. A short rAF delay lets the target route
// render before we try to scroll to its anchor.

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToHash = () => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
      return;
    }
    const id = hash.slice(1);
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, [hash, pathname]);

  return null;
};

export default ScrollToHash;
