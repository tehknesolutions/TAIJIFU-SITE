import * as THREE from 'three';
import type { RenderFrame } from './renderer-adapter.js';

export type ThreeSceneProjection = Readonly<{
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  nodes: readonly THREE.Object3D[];
}>;

function nodePosition(index: number, count: number): THREE.Vector3 {
  const columns = Math.ceil(Math.sqrt(count));
  const rows = Math.ceil(count / columns);
  const column = index % columns;
  const row = Math.floor(index / columns);
  const x = (column - (columns - 1) / 2) * 2.05;
  const y = ((rows - 1) / 2 - row) * 1.35;

  return new THREE.Vector3(x, y, 0);
}

export function createThreeScene(frame: RenderFrame): ThreeSceneProjection {
  const scene = new THREE.Scene();
  scene.userData.productKind = frame.productKind;
  scene.background = new THREE.Color(0x1c1c1a);

  const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 100);
  const columns = Math.max(1, Math.ceil(Math.sqrt(frame.nodes.length)));
  camera.position.set(0, 0, Math.max(5.5, columns * 2.2));
  camera.lookAt(0, 0, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 1));

  const semanticColors = [0xb43a32, 0x2d6487, 0xb68a2f, 0x467257];

  const nodes = frame.nodes.map((node, index) => {
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(1.65, 0.9),
      new THREE.MeshBasicMaterial({
        color: semanticColors[index % semanticColors.length],
        side: THREE.DoubleSide,
      }),
    );
    mesh.position.copy(nodePosition(index, frame.nodes.length));
    mesh.userData = {
      nodeId: node.id,
      label: node.label,
      canonicalUrl: node.canonicalUrl,
    };
    scene.add(mesh);
    return mesh;
  });

  return Object.freeze({ scene, camera, nodes: Object.freeze(nodes) });
}
