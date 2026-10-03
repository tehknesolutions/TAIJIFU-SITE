import { describe, expect, it } from 'vitest';
import { createDojoFpsBrowserInput } from './dojo-fps-browser-input.js';

describe('dojo FPS browser input', () => {
  it('maps WASD keys to forward and strafe intent', () => {
    const input = createDojoFpsBrowserInput();
    input.key('KeyW', true); input.key('KeyD', true);
    expect(input.snapshot()).toMatchObject({ forward: 1, strafe: 1 });
    input.key('KeyW', false); input.key('KeyD', false);
    expect(input.snapshot()).toMatchObject({ forward: 0, strafe: 0 });
  });

  it('accumulates mouse look and consumes it once per frame', () => {
    const input = createDojoFpsBrowserInput();
    input.look(8, -4);
    expect(input.snapshot()).toMatchObject({ lookX: 8, lookY: -4 });
    expect(input.snapshot()).toMatchObject({ lookX: 0, lookY: 0 });
  });

  it('cancels opposite movement keys', () => {
    const input = createDojoFpsBrowserInput();
    input.key('KeyW', true); input.key('KeyS', true); input.key('KeyA', true); input.key('KeyD', true);
    expect(input.snapshot()).toMatchObject({ forward: 0, strafe: 0 });
  });
});
