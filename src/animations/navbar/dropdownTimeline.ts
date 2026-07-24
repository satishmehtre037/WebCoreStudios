import { gsap, EASE } from "@/lib/gsap";

export function createDropdownTimeline(
  dropdownRef: HTMLElement,
  cardsRef: HTMLElement[]
) {
  const tl = gsap.timeline({ paused: true });

  // Reset state
  gsap.set(dropdownRef, { height: 0, opacity: 0, pointerEvents: "none" });
  gsap.set(cardsRef, { opacity: 0, y: 15 });

  // Sequence
  // Hover begins -> Dropdown container fades -> Height expands -> Blur decreases (CSS handle) -> Cards appear (stagger) -> Icons fade -> Descriptions appear
  tl.to(dropdownRef, {
    opacity: 1,
    pointerEvents: "auto",
    duration: 0.2,
    ease: "none",
  })
  .to(dropdownRef, {
    height: "auto",
    duration: 0.4,
    ease: EASE.smooth,
  }, "-=0.1")
  .to(cardsRef, {
    opacity: 1,
    y: 0,
    duration: 0.4,
    stagger: 0.02,
    ease: EASE.smooth,
  }, "-=0.2");

  return tl;
}
