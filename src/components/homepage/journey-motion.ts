// Each chapter gets a reading interval independent of the distance to the next stop.
// Pixel lengths scale with the viewport, with a useful minimum on small screens.
export function journeyTiming(stopCount: number, viewportHeight: number) {
  const hold = Math.max(360, viewportHeight * .7);
  const travel = Math.max(360, viewportHeight * .8);
  return { hold, travel, total: stopCount * hold + Math.max(0, stopCount - 1) * travel };
}

export function journeyProgress(offset: number, stopCount: number, viewportHeight: number) {
  if (stopCount < 2) return 0;
  const { hold, travel, total } = journeyTiming(stopCount, viewportHeight);
  const position = Math.max(0, Math.min(total, offset));
  const index = Math.min(stopCount - 1, Math.floor(position / (hold + travel)));
  const local = position - index * (hold + travel);
  if (local <= hold || index === stopCount - 1) return index / (stopCount - 1);
  const t = (local - hold) / travel;
  const eased = t * t * (3 - 2 * t);
  return (index + eased) / (stopCount - 1);
}

export function journeyStopOffset(index: number, stopCount: number, viewportHeight: number) {
  const { hold, travel } = journeyTiming(stopCount, viewportHeight);
  // Land in the middle of the reading interval, leaving room to scroll either way.
  return Math.max(0, Math.min(stopCount - 1, index)) * (hold + travel) + hold / 2;
}

export function journeyLayout(stopCount: number) {
  const spacing = 3.85;
  const startX = -7.7;
  const points = Array.from({ length: stopCount }, (_, index) => ({ x: startX + index * spacing, z: index % 2 ? -2.4 : 2.6 }));
  const endX = points.at(-1)?.x ?? startX;
  return { points, startX, endX, centerX: (startX + endX) / 2, width: Math.max(21, endX - startX + 5.6) };
}

export function journeyOverviewX(x: number, startX: number, endX: number) {
  // Keep the same viewing scale. An extended road slides through this window.
  const inset = 7.7;
  if (endX - startX <= inset * 2) return (startX + endX) / 2;
  return Math.max(startX + inset, Math.min(endX - inset, x));
}
