"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";

const options = {
  autoRaf: true,
  lerp: 0.1,
  allowNestedScroll: true,
  stopInertiaOnNavigate: true,
  respectReducedMotion: true,
  syncTouch: false,
};

function NavigationSync() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    // Cancel momentum without overriding Next.js scroll restoration.
    if (!lenis) return;
    const sync = () => {
      const wasStopped = lenis.isStopped;
      lenis.stop();
      lenis.resize();
      if (!wasStopped) lenis.start();
    };
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, [pathname, lenis]);

  useEffect(() => {
    if (!lenis) return;
    const onAnchorClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || lenis.isStopped) return;
      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
      if (!link || link.hasAttribute("download") || (link.target && link.target !== "_self")) return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || url.search !== window.location.search || !url.hash) return;
      let target: HTMLElement | null;
      try { target = document.getElementById(decodeURIComponent(url.hash.slice(1))); }
      catch { return; }
      if (!target) return;
      event.preventDefault();
      // Native focus/scroll restoration may have moved the page since the last frame.
      lenis.stop();
      lenis.resize();
      lenis.start();
      if (window.location.hash !== url.hash) window.history.pushState(null, "", url.hash);
      lenis.scrollTo(target);
    };
    document.addEventListener("click", onAnchorClick);
    return () => document.removeEventListener("click", onAnchorClick);
  }, [lenis]);

  return null;
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  // Sanity manages its own pane scrolling.
  if (pathname === "/studio" || pathname.startsWith("/studio/")) return children;

  return (
    <ReactLenis root options={options}>
      <NavigationSync />
      {children}
    </ReactLenis>
  );
}
