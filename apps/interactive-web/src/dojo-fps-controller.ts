export type DojoFpsState = {
  position: { x: number; y: number; z: number };
  yaw: number;
  pitch: number;
};

export type DojoFpsInput = {
  forward: number;
  strafe: number;
  lookX: number;
  lookY: number;
};

const MOVE_SPEED = 3.2;
const LOOK_SPEED = 0.0024;
const DOJO_LIMIT = 6;
const PITCH_LIMIT = Math.PI * 0.45;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export function createDojoFpsState(): DojoFpsState {
  return { position: { x: 0, y: 1.65, z: 5 }, yaw: 0, pitch: 0 };
}

export function stepDojoFpsState(state: DojoFpsState, input: DojoFpsInput, deltaSeconds: number): DojoFpsState {
  const dt = clamp(deltaSeconds, 0, 0.05);
  const yaw = state.yaw - input.lookX * LOOK_SPEED;
  const pitch = clamp(state.pitch - input.lookY * LOOK_SPEED, -PITCH_LIMIT, PITCH_LIMIT);
  const forward = clamp(input.forward, -1, 1);
  const strafe = clamp(input.strafe, -1, 1);
  const magnitude = Math.hypot(forward, strafe) || 1;
  const normalizedForward = forward / magnitude;
  const normalizedStrafe = strafe / magnitude;
  const sin = Math.sin(yaw);
  const cos = Math.cos(yaw);
  const dx = (normalizedStrafe * cos - normalizedForward * sin) * MOVE_SPEED * dt;
  const dz = (normalizedStrafe * sin - normalizedForward * cos) * MOVE_SPEED * dt;

  return {
    position: {
      x: clamp(state.position.x + dx, -DOJO_LIMIT, DOJO_LIMIT),
      y: state.position.y,
      z: clamp(state.position.z + dz, -DOJO_LIMIT, DOJO_LIMIT),
    },
    yaw,
    pitch,
  };
}
