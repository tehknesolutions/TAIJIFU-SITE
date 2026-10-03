import type { DojoFpsInput } from './dojo-fps-controller.js';

export function createDojoFpsBrowserInput() {
  const pressed = new Set<string>();
  let lookX = 0;
  let lookY = 0;

  return Object.freeze({
    key(code: string, down: boolean) {
      if (down) pressed.add(code); else pressed.delete(code);
    },
    look(movementX: number, movementY: number) {
      lookX += movementX;
      lookY += movementY;
    },
    snapshot(): DojoFpsInput {
      const forward = Number(pressed.has('KeyW') || pressed.has('ArrowUp')) - Number(pressed.has('KeyS') || pressed.has('ArrowDown'));
      const strafe = Number(pressed.has('KeyD') || pressed.has('ArrowRight')) - Number(pressed.has('KeyA') || pressed.has('ArrowLeft'));
      const frame = { forward, strafe, lookX, lookY };
      lookX = 0; lookY = 0;
      return frame;
    },
    reset() { pressed.clear(); lookX = 0; lookY = 0; },
  });
}
