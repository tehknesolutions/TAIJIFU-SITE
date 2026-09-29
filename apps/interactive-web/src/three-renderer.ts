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

function radialPosition(index: number, count: number, radius = 3): THREE.Vector3 {
  const angle = (index / Math.max(count, 1)) * Math.PI * 2 - Math.PI / 2;
  return new THREE.Vector3(
    Math.cos(angle) * radius,
    Math.sin(angle) * radius,
    0,
  );
}

function hierarchyDepth(node: ExperienceNode, byId: ReadonlyMap<string, ExperienceNode>): number {
  let depth = 0;
  let current: ExperienceNode | undefined = node;
  const visited = new Set<string>();
  while (current?.parentId && !visited.has(current.id)) {
    visited.add(current.id);
    const parent = byId.get(current.parentId);
    if (!parent) break;
    depth += 1;
    current = parent;
  }
  return depth;
}

function hierarchicalPosition(
  node: ExperienceNode,
  nodes: readonly ExperienceNode[],
  byId: ReadonlyMap<string, ExperienceNode>,
): THREE.Vector3 {
  if (node.id === 'home') return new THREE.Vector3(0, 0, 0.1);
  const depth = Math.max(1, hierarchyDepth(node, byId));
  const peers = nodes.filter((candidate) => Math.max(1, hierarchyDepth(candidate, byId)) === depth);
  const peerIndex = peers.findIndex((candidate) => candidate.id === node.id);
  const radius = 2.45 + (depth - 1) * 1.35;
  return radialPosition(peerIndex, peers.length, radius);
}

function materialColor(node: ExperienceNode): number {
  if (node.id === 'tai') return 0xb43a32;
  return 0xf4efe4;
}

function addCanonicalConnections(
  scene: THREE.Scene,
  nodes: readonly THREE.Object3D[],
): void {
  const byId = new Map(nodes.map((node) => [node.userData.nodeId as string, node]));
  const material = new THREE.LineBasicMaterial({
    color: 0x6f6b62,
    transparent: true,
    opacity: 0.55,
  });
  let connectionCount = 0;

  for (const node of nodes) {
    const parentId = node.userData.parentId as string | undefined;
    if (!parentId) continue;
    const parent = byId.get(parentId);
    if (!parent) continue;
    const geometry = new THREE.BufferGeometry().setFromPoints([
      parent.position,
      node.position,
    ]);
    const connection = new THREE.Line(geometry, material);
    connection.userData = { parentId, childId: node.userData.nodeId };
    scene.add(connection);
    connectionCount += 1;
  }

  scene.userData.connectionCount = connectionCount;
}

export function createThreeScene(frame: RenderFrame): ThreeSceneProjection {
  const scene = new THREE.Scene();
  const hasCanonicalRoot = frame.nodes.some((node) => node.id === 'home');
  scene.userData.productKind = frame.productKind;
  scene.userData.layoutKind = hasCanonicalRoot ? 'canonical-hierarchy' : 'fallback-grid';
  scene.background = new THREE.Color(0x1c1c1a);

  const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 100);
  camera.position.set(0, 0, 8.5);
  camera.lookAt(0, 0, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 1));

  const byId = new Map(frame.nodes.map((node) => [node.id, node]));
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

    if (hasCanonicalRoot) {
      mesh.position.copy(hierarchicalPosition(node, frame.nodes, byId));
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
