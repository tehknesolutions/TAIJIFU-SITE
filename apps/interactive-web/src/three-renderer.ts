import * as THREE from 'three';
import type { RenderFrame } from './renderer-adapter.js';

export type ThreeSceneProjection = Readonly<{
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  nodes: readonly THREE.Object3D[];
}>;

export function createThreeScene(frame: RenderFrame): ThreeSceneProjection {
  const scene = new THREE.Scene();
  scene.userData.productKind = frame.productKind;

  const camera = new THREE.PerspectiveCamera(70, 1, 0.1, 100);
  camera.position.set(0, 1.6, 4);
  camera.lookAt(0, 1, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 1));

  const nodes = frame.nodes.map((node, index) => {
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(1.6, 1),
      new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide }),
    );
    mesh.position.set(index * 2 - ((frame.nodes.length - 1) * 1), 1.4, 0);
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