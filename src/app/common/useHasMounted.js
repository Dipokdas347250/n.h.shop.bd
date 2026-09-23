"use client";

import { useSyncExternalStore } from "react";

// Nothing ever changes after the first client render, so the store never emits.
const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

/**
 * `false` while rendering on the server and during the first client render,
 * `true` afterwards.
 *
 * Use it to hold back anything that cannot run until the browser exists —
 * `localStorage`, `window`, or a carousel that measures the DOM — without the
 * server markup and the first client render disagreeing.
 */
export function useHasMounted() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
