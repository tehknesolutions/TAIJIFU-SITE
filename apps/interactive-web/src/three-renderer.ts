import * as THREE from 'three';
import type { ExperienceNode } from './experience-shell.js';
import type { RenderFrame } from './renderer-adapter.js';
import { dojoHotspotRole } from './dojo-hotspots.js';

export type ThreeSceneProjection = Readonly<{
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  nodes: readonly THREE.Object3D[];
}>;

function gridPosition(index: number, count: number): THREE.Vector3 {
  const columns = Math.ceil(Math.sqrt(count));
  const rows = Math.ceil(count / columns);
  return new THREE.Vector3(
    (index % columns - (columns - 1) / 2) * 2.05,
    ((rows - 1) / 2 - Math.floor(index / columns)) * 1.35,
    0,
  );
}

function radialPosition(index: number, count: number, radius = 3): THREE.Vector3 {
  const angle = (index / Math.max(count, 1)) * Math.PI * 2 - Math.PI / 2;
  return new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, 0);
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

function hierarchicalPosition(node: ExperienceNode, nodes: readonly ExperienceNode[], byId: ReadonlyMap<string, ExperienceNode>): THREE.Vector3 {
  if (node.id === 'home') return new THREE.Vector3(0, 1.55, -0.5);
  const triad: Record<string, THREE.Vector3> = {
    tai: new THREE.Vector3(-2.6, 1.55, -0.3),
    ji: new THREE.Vector3(0, 1.55, -0.1),
    fu: new THREE.Vector3(2.6, 1.55, -0.3),
  };
  if (triad[node.id]) return triad[node.id].clone();
  const depth = Math.max(1, hierarchyDepth(node, byId));
  const peers = nodes.filter((candidate) => Math.max(1, hierarchyDepth(candidate, byId)) === depth);
  const peerIndex = peers.findIndex((candidate) => candidate.id === node.id);
  return radialPosition(peerIndex, peers.length, 2.45 + (depth - 1) * 1.35).setY(1.35 - Math.min(depth - 1, 2) * 0.15);
}

function materialColor(node: ExperienceNode): number {
  if (node.id === 'tai') return 0xb43a32;
  if (node.id === 'ji') return 0x4b82d8;
  if (node.id === 'fu') return 0xd2ad55;
  return 0xe9e0cf;
}

function addDojoArchitecture(scene: THREE.Scene): void {
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(18, 18),
    new THREE.MeshStandardMaterial({ color: 0x0b0b09, roughness: 0.88, metalness: 0.08 }),
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = 0;
  floor.userData.decorative = true;
  scene.add(floor);

  const wallMaterial = new THREE.MeshStandardMaterial({ color: 0x131310, roughness: 0.9, metalness: 0.04 });
  const backWall = new THREE.Mesh(new THREE.PlaneGeometry(18, 7), wallMaterial);
  backWall.position.set(0, 3.5, -3.2);
  scene.add(backWall);

  const sideWall = new THREE.Mesh(new THREE.PlaneGeometry(18, 7), wallMaterial);
  sideWall.rotation.y = Math.PI / 2;
  sideWall.position.set(-8, 3.5, 2);
  scene.add(sideWall);

  const threshold = new THREE.Mesh(
    new THREE.BoxGeometry(8.5, 0.08, 0.7),
    new THREE.MeshStandardMaterial({ color: 0x7d632b, emissive: 0x241b08, emissiveIntensity: 1.2 }),
  );
  threshold.position.set(0, 0.05, -2.65);
  scene.add(threshold);

  const centralLight = new THREE.PointLight(0xc89b3c, 9, 12, 2);
  centralLight.position.set(0, 4.4, -1.5);
  scene.add(centralLight);
}

function addCanonicalConnections(scene: THREE.Scene, nodes: readonly THREE.Object3D[]): void {
  const byId = new Map(nodes.map((node) => [node.userData.nodeId as string, node]));
  const material = new THREE.LineBasicMaterial({ color: 0x6f6b62, transparent: true, opacity: 0.38 });
  let connectionCount = 0;
  for (const node of nodes) {
    const parentId = node.userData.parentId as string | undefined;
    if (!parentId) continue;
    const parent = byId.get(parentId);
    if (!parent) continue;
    const geometry = new THREE.BufferGeometry().setFromPoints([parent.position, node.position]);
    const connection = new THREE.Line(geometry, material);
    connection.userData = { parentId, childId: node.userData.nodeId, decorative: true };
    scene.add(connection);
    connectionCount += 1;
  }
  scene.userData.connectionCount = connectionCount;
}

export function createThreeScene(frame: RenderFrame): ThreeSceneProjection {
  const scene = new THREE.Scene();
  const hasCanonicalRoot = frame.nodes.some((node) => node.id === 'home');
  scene.userData.productKind = frame.productKind;
  scene.userData.layoutKind = hasCanonicalRoot ? 'dojo-canonical-hierarchy' : 'fallback-grid';
  scene.background = new THREE.Color(0x060605);

  const camera = new THREE.PerspectiveCamera(68, 1, 0.1, 100);
  camera.position.set(0, 1.65, 5);
  camera.lookAt(0, 1.5, -1);

  scene.add(new THREE.HemisphereLight(0xddd4c4, 0x090908, 1.25));
  addDojoArchitecture(scene);

  const byId = new Map(frame.nodes.map((node) => [node.id, node]));
  const spatialById = new Map(frame.spatialNodes.map((node) => [node.nodeId, node]));
  const manifestationById = new Map(frame.manifestationNodes.map((node) => [node.nodeId, node]));
  const nodes = frame.nodes.map((node, index) => {
    const isRoot = node.id === 'home';
    const role = dojoHotspotRole(node.id);
    const geometry = isRoot
      ? new THREE.CylinderGeometry(0.72, 0.84, 0.22, 48)
      : new THREE.BoxGeometry(1.35, 1.35, 0.18, 4, 4, 1);
    const material = new THREE.MeshStandardMaterial({
      color: materialColor(node),
      emissive: materialColor(node),
      emissiveIntensity: isRoot ? 0.16 : 0.05,
      roughness: 0.58,
      metalness: 0.16,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.copy(hasCanonicalRoot ? hierarchicalPosition(node, frame.nodes, byId) : gridPosition(index, frame.nodes.length));
    mesh.rotation.x = isRoot ? 0 : -0.08;
    const spatial = spatialById.get(node.id);
    const manifestation = manifestationById.get(node.id);
    mesh.userData = {
      nodeId: node.id,
      label: node.label,
      canonicalUrl: node.canonicalUrl,
      parentId: node.parentId,
      visualRole: isRoot ? 'origin' : role,
      baseZ: mesh.position.z,
      structure: spatial?.structure ?? 'default',
      manifestationIntensity: manifestation?.intensity ?? 'signal',
    };
    scene.add(mesh);
    return mesh;
  });

  addCanonicalConnections(scene, nodes);
  return Object.freeze({ scene, camera, nodes: Object.freeze(nodes) });
}
