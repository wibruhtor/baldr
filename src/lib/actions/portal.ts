import { tick } from "svelte";

export const portal = (element: HTMLElement, target: string | HTMLElement = "body") => {
  let targetElement: HTMLElement | null = null;

  const update = async (newTarget: string | HTMLElement) => {
    target = newTarget
    if (typeof target === 'string') {
      targetElement = document.querySelector(target)
      if (targetElement === null) {
        await tick()
        targetElement = document.querySelector(target)
      }
      if (targetElement === null) {
        throw new Error(`No element found matching css selector: "${target}"`);
      }
    } else if (target instanceof HTMLElement) {
      targetElement = target;
    } else {
      throw new TypeError(`Unknown portal targat type: ${target === null ? "null" : typeof target}. Allowed types: string (CSS selector) or HTMLElement`)
    }
    targetElement.appendChild(element);
    element.hidden = false;
  }

  const destroy = () => {
    if (!element.parentNode) return
    element.parentNode.removeChild(element);
  }

  
  update(target);

  return {
    update,
    destroy,
  };
}
