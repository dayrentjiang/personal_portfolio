# Smooth scrolling

Public pages use Lenis 1.3.26 through `SmoothScroll.tsx` in the root layout. Sanity Studio keeps its own native pane scrolling.

- `lerp: 0.1` controls wheel/trackpad easing; increase it for a quicker response.
- Touch gestures remain native (`syncTouch: false`). Lenis honors reduced-motion preferences.
- Same-page links preserve their hash and CSS scroll margins. Modified clicks keep browser behavior.
- Navigation cancels old momentum and leaves scroll restoration to Next.js/the browser.
- The navigation dialog stops Lenis and resumes it on close.
- Journey completion resets Lenis's position after its scroll track collapses; skipping goes straight past the collapsed scene.

Browser checks: journey completion and upward scrolling, skip link, menu lock/unlock and route navigation, portfolio keyboard anchor, launch-film anchor with its 110px offset, article keyboard scrolling at mobile width, and Studio without a Lenis instance. Production build and targeted lint checks pass. Actual touch hardware and an OS reduced-motion toggle were not exercised; native touch and reduced-motion support use the library's documented options.

Reference: https://github.com/darkroomengineering/lenis
