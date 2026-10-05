import { Mesh, MeshStandardMaterial, type Camera, type Object3D } from 'three';
import type { CanonicalNavigation } from './three-navigation.js';

export type ProjectedFocus = CanonicalNavigation & Readonly<{ label: string }>;

function baseZ(node: Object3D): number { const value=node.userData.baseZ; return typeof value==='number'?value:0; }
function applyMaterialFocus(node:Object3D,state:'focused'|'receded'|'neutral'):void {
  if(!(node instanceof Mesh)||!(node.material instanceof MeshStandardMaterial)) return;
  const material=node.material;
  const baseEmissive=typeof node.userData.baseEmissiveIntensity==='number'?node.userData.baseEmissiveIntensity:material.emissiveIntensity;
  const baseOpacity=typeof node.userData.baseOpacity==='number'?node.userData.baseOpacity:material.opacity;
  if(typeof node.userData.baseEmissiveIntensity!=='number') node.userData.baseEmissiveIntensity=baseEmissive;
  if(typeof node.userData.baseOpacity!=='number') node.userData.baseOpacity=baseOpacity;
  material.transparent=true;
  material.emissiveIntensity=state==='focused'?Math.max(baseEmissive,0.28):state==='receded'?Math.min(baseEmissive,0.02):baseEmissive;
  material.opacity=state==='receded'?Math.min(baseOpacity,0.42):baseOpacity;
  material.needsUpdate=true;
}

export function describeProjectedFocus(node:Object3D|null):ProjectedFocus|null {
  if(!node)return null; const {nodeId,label,canonicalUrl}=node.userData;
  if(typeof nodeId!=='string'||typeof label!=='string'||typeof canonicalUrl!=='string')return null;
  return Object.freeze({nodeId,label,canonicalUrl});
}

export function applyProjectedFocus(nodes:readonly Object3D[],focused:Object3D|null,camera:Camera,reducedMotion=false):void {
  for(const node of nodes){ const isFocused=node===focused; const hasFocus=focused!==null; const state=isFocused?'focused':hasFocus?'receded':'neutral'; node.scale.setScalar(isFocused?1.18:hasFocus?0.88:1); node.position.z=baseZ(node)+(isFocused?0.36:0); node.userData.focusState=state; applyMaterialFocus(node,state); }
  if(reducedMotion||!focused){ camera.position.x=0; camera.position.y=0; camera.lookAt(0,0,0); camera.updateMatrixWorld(true); return; }
  camera.position.x=focused.position.x*0.08; camera.position.y=focused.position.y*0.08; camera.lookAt(focused.position.x*0.18,focused.position.y*0.18,0); camera.updateMatrixWorld(true);
}
