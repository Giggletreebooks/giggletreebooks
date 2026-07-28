/**
 * One IntersectionObserver for the entire page, shared by every Reveal.
 * A per-component observer would mean dozens of them competing for the same
 * scroll work; this keeps it to a single callback.
 */

type Callback = () => void;

const callbacks = new WeakMap<Element, Callback>();
let observer: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver | null {
  if (typeof IntersectionObserver === "undefined") return null;

  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        callbacks.get(entry.target)?.();
        /* Reveal is one-way: stop watching as soon as it has fired. */
        unobserve(entry.target);
      }
    },
    /* Fire slightly before the element is fully on screen. */
    { rootMargin: "0px 0px -10% 0px", threshold: 0.01 },
  );

  return observer;
}

export function observe(element: Element, onEnter: Callback): () => void {
  const instance = getObserver();

  /* No IntersectionObserver (very old browser): show immediately. */
  if (!instance) {
    onEnter();
    return () => {};
  }

  callbacks.set(element, onEnter);
  instance.observe(element);
  return () => unobserve(element);
}

function unobserve(element: Element) {
  callbacks.delete(element);
  observer?.unobserve(element);
}
