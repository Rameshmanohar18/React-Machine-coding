// Step 1: Define BREAKPOINTS object with mobile (768) and tablet (1024) as width thresholds
// Step 2: getDeviceType is a helper function — accepts width and returns 'mobile', 'tablet', or 'desktop' based on BREAKPOINTS
// Step 3: useDeviceType initializes deviceType state with a lazy initializer — calls getDeviceType with current window.innerWidth on mount
// Step 4: Inside useEffect, define handleResize — on every window resize it recalculates deviceType by calling getDeviceType with the new window.innerWidth
// Step 5: Attach resize listener to window using handleResize, cleanup removes it on unmount
// Step 6: Return an object with deviceType string AND 3 pre-computed boolean helpers (isMobile, isTablet, isDesktop) so consumer doesn't have to manually compare strings

import { useState, useEffect } from 'react';

const BREAKPOINTS = { mobile: 768, tablet: 1024 };

function getDeviceType(width) {
  if (width < BREAKPOINTS.mobile) return 'mobile';
  if (width < BREAKPOINTS.tablet) return 'tablet';
  return 'desktop';
}

export default function useDeviceType() {
  const [deviceType, setDeviceType] = useState(() =>
    getDeviceType(window.innerWidth)
  );

  useEffect(() => {
    const handleResize = () => setDeviceType(getDeviceType(window.innerWidth));
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    deviceType,
    isMobile: deviceType === 'mobile',
    isTablet: deviceType === 'tablet',
    isDesktop: deviceType === 'desktop',
  };
}
