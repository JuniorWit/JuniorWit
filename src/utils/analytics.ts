/**
 * Google Analytics 4 (GA4) Custom Event Tracking Utilities
 */

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

const SCROLL_SESSION_KEY = 'juniorwit_ga_scroll_depth';
const SECTION_SESSION_KEY = 'juniorwit_ga_section_view';

/**
 * Safely dispatches a GA event via window.gtag
 */
export function trackEvent(eventName: string, params?: Record<string, any>): void {
  if (typeof window === 'undefined') return;

  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  } else if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push(['event', eventName, params]);
  }

  // Debug log in dev mode for easy verification
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[GA4 Track] ${eventName}:`, params);
  }
}

function getStoredSet(key: string): Set<string> {
  try {
    const raw = sessionStorage.getItem(key);
    if (raw) {
      return new Set(JSON.parse(raw));
    }
  } catch {
    // Fallback for private mode or sandboxed iframes
  }
  return new Set();
}

function saveStoredSet(key: string, set: Set<string>): void {
  try {
    sessionStorage.setItem(key, JSON.stringify(Array.from(set)));
  } catch {
    // Fallback for private mode or sandboxed iframes
  }
}

/**
 * Tracks page scroll depth at 25%, 50%, 75%, 90%
 * Each threshold is fired once per session to prevent duplicates.
 */
export function initScrollDepthTracking(): () => void {
  if (typeof window === 'undefined') return () => {};

  const THRESHOLDS = [25, 50, 75, 90] as const;
  const sentSet = getStoredSet(SCROLL_SESSION_KEY);

  let ticking = false;

  const checkScroll = () => {
    const doc = document.documentElement;
    const scrollHeight = doc.scrollHeight - window.innerHeight;
    if (scrollHeight <= 0) return;

    const scrollTop = window.scrollY || doc.scrollTop;
    const percent = Math.floor((scrollTop / scrollHeight) * 100);

    for (const threshold of THRESHOLDS) {
      const thresholdStr = threshold.toString();
      if (percent >= threshold && !sentSet.has(thresholdStr)) {
        sentSet.add(thresholdStr);
        saveStoredSet(SCROLL_SESSION_KEY, sentSet);
        trackEvent('scroll_depth', { percent: threshold });
      }
    }
  };

  const handleScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        checkScroll();
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  // Check once on initial mount
  checkScroll();

  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}

/**
 * Tracks section entries:
 * - 히어로 섹션 -> { section: '히어로' }
 * - 견적 계산기 -> { section: '계산기' }
 * - 티어 진입 (기존 선택지와의 차이) -> { section: '티어' }
 * - 견적상담받기 -> { section: '견적상담받기' }
 * 
 * Each section is fired once per session when entered.
 */
export function initSectionViewTracking(): () => void {
  if (typeof window === 'undefined') return () => {};

  const sectionsToTrack: { id: string; name: string }[] = [
    { id: 'hero', name: '히어로' },
    { id: 'work-calculator', name: '계산기' },
    { id: 'tier-comparison', name: '티어' },
    { id: 'subscription-section', name: '견적상담받기' },
  ];

  const sentSections = getStoredSet(SECTION_SESSION_KEY);

  if (!('IntersectionObserver' in window)) {
    return () => {};
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const matched = sectionsToTrack.find((s) => s.id === entry.target.id);
          if (matched && !sentSections.has(matched.name)) {
            sentSections.add(matched.name);
            saveStoredSet(SECTION_SESSION_KEY, sentSections);
            trackEvent('section_view', { section: matched.name });
            observer.unobserve(entry.target);
          }
        }
      });
    },
    {
      threshold: 0.15, // When 15% of section enters viewport
    }
  );

  const observeElements = () => {
    sectionsToTrack.forEach(({ id, name }) => {
      if (!sentSections.has(name)) {
        const el = document.getElementById(id);
        if (el) {
          observer.observe(el);
        }
      }
    });
  };

  // Immediate observe + delayed observe for dynamically rendered parts
  observeElements();
  const timer = setTimeout(observeElements, 250);

  return () => {
    clearTimeout(timer);
    observer.disconnect();
  };
}
