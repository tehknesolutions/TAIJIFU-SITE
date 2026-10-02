import { describe, expect, it } from 'vitest';
import { createDojoFpsState, stepDojoFpsState } from './dojo-fps-controller.js';

describe('dojo FPS controller', () => {
  it('moves relative to yaw using WASD intent', () => {
    const initial = createDojoFpsState();
    const next = stepDojoFpsState(initial, { forward: 1, strafe: 0, lookX: 0, lookY: 0 }, 1);
    expect(next.position.z).toBeLessThan(initial.position.z);
  });

  it('updates yaw and clamps pitch', () => {
    const initial = createDojoFpsState();
    const next = stepDojoFpsState(initial, { forward: 0, strafe: 0, lookX: 10, lookY: 100 }, 1);
    expect(next.yaw).not.toBe(initial.yaw);
    expect(Math.abs(next.pitch)).toBeLessThanOrEqual(Math.PI * 0.45);
  });

  it('keeps movement inside the dojo bounds', () => {
    let state = createDojoFpsState();
    for (let index = 0; index < 100; index += 1) state = stepDojoFpsState(state, { forward: 1, strafe: 1, lookX: 0, lookY: 0 }, 1);
    expect(Math.abs(state.position.x)).toBeLessThanOrEqual(6);
    expect(Math.abs(state.position.z)).toBeLessThanOrEqual(6);
  });
});
