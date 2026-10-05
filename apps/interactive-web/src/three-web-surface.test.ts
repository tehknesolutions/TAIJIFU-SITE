import { describe, expect, it, vi } from 'vitest';
import { Mesh, MeshStandardMaterial } from 'three';
import { createInteractiveWebExperience } from './experience.js';
import { mountThreeWebSurface } from './three-web-surface.js';

function emissive(node:unknown):number { const mesh=node as Mesh; return (mesh.material as MeshStandardMaterial).emissiveIntensity; }

describe('Three web surface', () => {
  it('updates manifestation intensity and material from runtime focus', () => {
    const experience=createInteractiveWebExperience({nodes:[{id:'tai',label:'TAI',canonicalUrl:'/principios/tai/'}]}); const canvas={getBoundingClientRect:()=>({left:0,top:0,width:200,height:100}),addEventListener:vi.fn(),removeEventListener:vi.fn()}; const surface=mountThreeWebSurface({canvas,frame:experience.frame,navigate:vi.fn(),renderer:{render:vi.fn(),dispose:vi.fn()}}); const tai=surface.projection.nodes[0];
    expect(tai.userData.manifestationIntensity).toBe('signal'); expect(emissive(tai)).toBeCloseTo(0.05); surface.focusNode('tai'); expect(tai.userData.manifestationIntensity).toBe('artifact'); expect(emissive(tai)).toBeGreaterThanOrEqual(0.18); surface.focusNode(null); expect(tai.userData.manifestationIntensity).toBe('signal'); expect(emissive(tai)).toBeCloseTo(0.05);
  });

  it('keeps current route ritual while temporary focus becomes artifact', () => {
    const experience=createInteractiveWebExperience({nodes:[{id:'tai',label:'TAI',canonicalUrl:'/principios/tai/'},{id:'fu',label:'FU',canonicalUrl:'/principios/fu/'}]}); const canvas={getBoundingClientRect:()=>({left:0,top:0,width:200,height:100}),addEventListener:vi.fn(),removeEventListener:vi.fn()}; const surface=mountThreeWebSurface({canvas,frame:experience.frame,navigate:vi.fn(),renderer:{render:vi.fn(),dispose:vi.fn()},currentNodeId:'tai'}); const tai=surface.projection.nodes.find((node)=>node.userData.nodeId==='tai')!; const fu=surface.projection.nodes.find((node)=>node.userData.nodeId==='fu')!;
    expect(tai.userData.manifestationIntensity).toBe('ritual'); expect(emissive(tai)).toBeGreaterThanOrEqual(0.32); surface.focusNode('fu'); expect(tai.userData.manifestationIntensity).toBe('ritual'); expect(emissive(tai)).toBeGreaterThanOrEqual(0.32); expect(fu.userData.manifestationIntensity).toBe('artifact'); expect(emissive(fu)).toBeGreaterThanOrEqual(0.18); surface.focusNode(null); expect(tai.userData.manifestationIntensity).toBe('ritual'); expect(fu.userData.manifestationIntensity).toBe('signal'); expect(emissive(fu)).toBeCloseTo(0.05);
  });
});
