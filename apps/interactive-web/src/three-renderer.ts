import * as THREE from 'three';
import type { ExperienceNode } from './experience-shell.js';
import type { RenderFrame } from './renderer-adapter.js';

export type ThreeSceneProjection = Readonly<{
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  nodes: readonly THREE.Object3D[];
}>;

function gridPosition(index: number, count: number): THREE.Vector3 {
  const columns = Math.ceil(Math.sqrt(count));
  const rows = Math.ceil(count / columns);
  const column = index % columns;
  const row = Math.floor(index / columns);

  return new THREE.Vector3(
    (column - (columns - 1) / 2) * 2.05,
    ((rows - 1) / 2 - row) * 1.35,
    0,
  );
}

function radialPosition(index: number, count: number): THREE.Vector3 {
  const angle = (index / count) * Math.PI * 2 - Math.PI / 2;
  const radius = count > 8 ? 3.45 : 3;

  return new THREE.Vector3(
    Math.cos(angle) * radius,
    Math.sin(angle) * radius,
    0,
  );
}

function materialColor(node: ExperienceNode): number {
  if (node.id === 'tai') return 0xb43a32;
  return 0xf4efe4;
}

function addCanonicalConnections(
  scene: THREE.Scene,
  nodes: readonly THREE.Object3D[],
): void {
  const origin = nodes.find((node) => node.userData.nodeId === 'home');
  if (!origin) return;

  const material = new THREE.LineBasicMaterial({
    color: 0x6f6b62,
    transparent: true,
    opacity: 0.55,
  });

  for (const node of nodes) {
    if (node === origin) continue;
    const geometry = new THREE.BufferGeometry().setFromPoints([
      origin.position,
      node.position,
    ]);
    scene.add(new THREE.Line(geometry, material));
  }

  scene.userData.connectionCount = nodes.length - 1;
}

export function createThreeScene(frame: RenderFrame): ThreeSceneProjection {
  const scene = new THREE.Scene();
  scene.userData.productKind = frame.productKind;
  scene.userData.layoutKind = frame.nodes.some((node) => node.id === 'home')
    ? 'canonical-radial'
    : 'fallback-grid';
  scene.background = new THREE.Color(0x1c1c1a);

  const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 100);
  camera.position.set(0, 0, 8.5);
  camera.lookAt(0, 0, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 1));

  const rootIndex = frame.nodes.findIndex((node) => node.id === 'home');
  const orbitNodes = frame.nodes.filter((node) => node.id !== 'home');

  const nodes = frame.nodes.map((node, index) => {
    const isRoot = node.id === 'home';
    const geometry = isRoot
      ? new THREE.CircleGeometry(0.72, 48)
      : new THREE.PlaneGeometry(1.45, 0.82);
    const mesh = new THREE.Mesh(
      geometry,
      new THREE.MeshBasicMaterial({
        color: materialColor(node),
        side: THREE.DoubleSide,
      }),
    );

    if (rootIndex >= 0) {
      if (isRoot) {
        mesh.position.set(0, 0, 0.1);
      } else {
        const orbitIndex = orbitNodes.findIndex(
          (candidate) => candidate.id === node.id,
        );
        mesh.position.copy(radialPosition(orbitIndex, orbitNodes.length));
      }
    } else {
      mesh.position.copy(gridPosition(index, frame.nodes.length));
    }

    mesh.userData = {
      nodeId: node.id,
      label: node.label,
      canonicalUrl: node.canonicalUrl,
      parentId: node.parentId,
      visualRole: isRoot ? 'origin' : node.id === 'tai' ? 'axis' : 'content',
      baseZ: mesh.position.z,
    };
    scene.add(mesh);
    return mesh;
  });

  addCanonicalConnections(scene, nodes);

  return Object.freeze({ scene, camera, nodes: Object.freeze(nodes) });
}
