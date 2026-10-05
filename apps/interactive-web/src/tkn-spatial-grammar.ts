export type TknSpatialNode = 'home' | 'tai' | 'ji' | 'fu' | 'unknown';
export type SpatialLayoutToken = Readonly<{ x:number; y:number; z:number; rank:'peer'|'default' }>;
export type SpatialLayoutParameters = Readonly<{ canonicalRadius:number; depthRadiusStep:number; depthYStep:number; gridColumnGap:number; gridRowGap:number }>;

const TOKENS: Readonly<Record<TknSpatialNode, SpatialLayoutToken>> = Object.freeze({
  home:Object.freeze({x:0,y:1.55,z:-0.5,rank:'default'}),
  tai:Object.freeze({x:-2.6,y:1.55,z:-0.3,rank:'peer'}),
  ji:Object.freeze({x:0,y:1.55,z:-0.1,rank:'peer'}),
  fu:Object.freeze({x:2.6,y:1.55,z:-0.3,rank:'peer'}),
  unknown:Object.freeze({x:0,y:0,z:0,rank:'default'}),
});
const LAYOUT:Object = Object.freeze({canonicalRadius:2.45,depthRadiusStep:1.35,depthYStep:0.15,gridColumnGap:2.05,gridRowGap:1.35});
export function spatialLayoutToken(nodeId:'home'|'tai'|'ji'|'fu'|'unknown'|'layout'): SpatialLayoutToken|SpatialLayoutParameters {
  if(nodeId==='layout') return LAYOUT;
  return TOKENS[nodeId];
}
