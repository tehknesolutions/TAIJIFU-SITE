import { describe, expect, it, vi } from 'vitest';
import { createInteractiveWebExperience } from './experience.js';
import { mountThreeWebSurface } from './three-web-surface.js';

describe('Three web surface', () => {
  it('updates manifestation intensity from runtime focus', () => {
    const experience=createInteractiveWebExperience({nodes:[{id:'tai',label:'TAI',canonicalUrl:'/principios/tai/'}]}); const canvas={getBoundingClientRect:()=>({left:0,top:0,width:200,height:100}),addEventListener:vi.fn(),removeEventListener:vi.fn()}; const surface=mountThreeWebSurface({canvas,frame:experience.frame,navigate:vi.fn(),renderer:{render:vi.fn(),dispose:vi.fn()}}); const tai=surface.projection.nodes[0];
    expect(tai.userData.manifestationIntensity).toBe('signal'); surface.focusNode('tai'); expect(tai.userData.manifestationIntensity).toBe('artifact'); surface.focusNode(null); expect(tai.userData.manifestationIntensity).toBe('signal');
  });

  it('keeps current route ritual while temporary focus becomes artifact', () => {
    const experience=createInteractiveWebExperience({nodes:[{id:'tai',label:'TAI',canonicalUrl:'/principios/tai/'},{id:'fu',label:'FU',canonicalUrl:'/principios/fu/'}]}); const canvas={getBoundingClientRect:()=>({left:0,top:0,width:200,height:100}),addEventListener:vi.fn(),removeEventListener:vi.fn()}; const surface=mountThreeWebSurface({canvas,frame:experience.frame,navigate:vi.fn(),renderer:{render:vi.fn(),dispose:vi.fn()},currentNodeId:'tai'}); const tai=surface.projection.nodes.find((node)=>node.userData.nodeId==='tai')!; const fu=surface.projection.nodes.find((node)=>node.userData.nodeId==='fu')!;
    expect(tai.userData.manifestationIntensity).toBe('ritual'); surface.focusNode('fu'); expect(tai.userData.manifestationIntensity).toBe('ritual'); expect(fu.userData.manifestationIntensity).toBe('artifact'); surface.focusNode(null); expect(tai.userData.manifestationIntensity).toBe('ritual'); expect(fu.userData.manifestationIntensity).toBe('signal');
  });
});
