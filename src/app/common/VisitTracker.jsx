"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1/api"}/admin/visits`;
const VISITOR_KEY = "nh-shop-visitor-key";
const SESSION_KEY = "nh-shop-visit-session";
// A visit ends after this long without activity; coming back later starts a new one.
const SESSION_IDLE_MS = 30 * 60 * 1000;
const PING_MS = 15 * 1000;
// A tab left open on the screen with nobody touching it stops counting as time on site.
const ACTIVE_WINDOW_MS = 5 * 60 * 1000;

let lastInteraction = Date.now();

const read = (storage, key) => {
  try {
    return storage.getItem(key);
  } catch {
    return null;
  }
};

const write = (storage, key, value) => {
  try {
    storage.setItem(key, value);
  } catch {
    // Private mode or blocked storage: tracking just becomes per-page.
  }
};

const visitorKey = () => {
  let key = read(localStorage, VISITOR_KEY);
  if (!key) {
    key = crypto.randomUUID();
    write(localStorage, VISITOR_KEY, key);
  }
  return key;
};

/** The current visit's id, starting a new one after a long pause. */
const currentSession = () => {
  let session = null;
  try {
    session = JSON.parse(read(localStorage, SESSION_KEY) || "null");
  } catch {
    session = null;
  }
  const fresh = !session?.id || Date.now() - session.last > SESSION_IDLE_MS;
  if (fresh) session = { id: crypto.randomUUID() };
  session.last = Date.now();
  write(localStorage, SESSION_KEY, JSON.stringify(session));
  return { id: session.id, fresh };
};

const send = (body) => {
  const session = currentSession();
  // Coming back to an open tab after a long pause starts a new visit on this page.
  const payload = session.fresh && body.event === "ping" ? { event: "page", path: window.location.pathname } : body;
  return fetch(ENDPOINT, {
    method: "POST",
    // The session cookie lets the dashboard show signed-in customers by name.
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ visitorKey: visitorKey(), sessionId: session.id, ...payload }),
  }).catch(() => {});
};

/** Records each page the visitor opens and, while they are active, how long they stay. */
export default function VisitTracker() {
  const pathname = usePathname();

  useEffect(() => {
    send({
      event: "page",
      path: pathname || window.location.pathname,
      referrer: document.referrer && !document.referrer.startsWith(window.location.origin) ? document.referrer : "",
      screen: `${window.screen.width}x${window.screen.height}`,
      touch: navigator.maxTouchPoints || 0,
    });
  }, [pathname]);

  useEffect(() => {
    const touched = () => {
      lastInteraction = Date.now();
    };
    const events = ["pointerdown", "keydown", "scroll", "touchstart", "mousemove"];
    events.forEach((name) => window.addEventListener(name, touched, { passive: true }));

    const timer = window.setInterval(() => {
      if (document.visibilityState === "visible" && Date.now() - lastInteraction < ACTIVE_WINDOW_MS) send({ event: "ping" });
    }, PING_MS);

    // Returning to the tab counts as activity straight away.
    const onVisible = () => {
      if (document.visibilityState === "visible") touched();
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      events.forEach((name) => window.removeEventListener(name, touched));
      document.removeEventListener("visibilitychange", onVisible);
      window.clearInterval(timer);
    };
  }, []);

  return null;
}
