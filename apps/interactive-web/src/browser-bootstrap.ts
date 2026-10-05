import { mountBrowserThreeSurface } from './browser-three-surface.js';
import { buildLocalizedExperienceNodes } from './content/canon-registry.js';
import type { SupportedLocale } from './content/locale.js';
import { createInteractiveWebExperience } from './experience.js';
import { getPresentationMediaIdForRoute } from './presentation-media-map.js';
import { createPresentationMediaOverlay } from './presentation-media-overlay.js';
import type { PresentationMediaOverlaySnapshot } from './presentation-media-overlay.js';
import type { RenderFrame } from './renderer-adapter.js';
import type { ProjectedFocus } from './three-focus.js';
import type { WebSurfaceCanvas } from './three-web-surface.js';
import { mountTrainingExperience } from './training/training-browser.js';

type MountedSurface=Readonly<{focusNode(nodeId:string|null):void;dispose():void}>; type MountedTraining=Readonly<{getState():unknown;dispose():void}>;
type MountSurface=(options:{canvas:WebSurfaceCanvas;frame:RenderFrame;navigate:(url:string)=>void;onFocus?:(focus:ProjectedFocus|null)=>void;currentNodeId?:string|null})=>MountedSurface; type MountTraining=(root:HTMLElement)=>MountedTraining;
const unavailableSurface:MountedSurface=Object.freeze({focusNode:()=>undefined,dispose:()=>undefined});
const neutralMediaSnapshot=(disposed:boolean):PresentationMediaOverlaySnapshot=>Object.freeze({status:disposed?'disposed':'idle',mediaId:undefined});

export function bootstrapInteractiveWeb(options:{locale?:SupportedLocale;canvas:WebSurfaceCanvas;navigate:(url:string)=>void;onFocus?:(focus:ProjectedFocus|null)=>void;onPresentationMediaChange?:(mediaId:string|undefined)=>void;onPresentationMediaStateChange?:(snapshot:PresentationMediaOverlaySnapshot)=>void;presentationMediaElement?:HTMLImageElement|null;initialFocusNode?:string|null;routeId?:string;presentationMediaId?:string;mountSurface?:MountSurface;trainingRoot?:HTMLElement|null;mountTraining?:MountTraining;}){
  const currentNodeId=options.routeId??'home'; const routeMediaId=getPresentationMediaIdForRoute(currentNodeId); const initialMediaId=options.presentationMediaId??routeMediaId;
  const experience=createInteractiveWebExperience({nodes:buildLocalizedExperienceNodes(options.locale??'pt-BR'),presentationMediaId:initialMediaId});
  let disposed=false;
  const mediaOverlay=options.presentationMediaElement?createPresentationMediaOverlay(options.presentationMediaElement,{onStateChange:options.onPresentationMediaStateChange}):null;
  mediaOverlay?.show(initialMediaId);
  const handleFocus=(focus:ProjectedFocus|null)=>{if(disposed)return;options.onFocus?.(focus);const mediaId=focus?getPresentationMediaIdForRoute(focus.nodeId):routeMediaId;mediaOverlay?.show(mediaId);options.onPresentationMediaChange?.(mediaId);};
  const mountSurface=options.mountSurface??mountBrowserThreeSurface; let surface:MountedSurface; let surfaceAvailable=true;
  try{surface=mountSurface({canvas:options.canvas,frame:experience.frame,navigate:options.navigate,onFocus:handleFocus,currentNodeId});}catch{surface=unavailableSurface;surfaceAvailable=false;}
  if(options.initialFocusNode&&options.initialFocusNode!==currentNodeId)surface.focusNode(options.initialFocusNode);
  const trainingRoot=options.trainingRoot??null;const mountTraining=options.mountTraining??mountTrainingExperience;let training:MountedTraining|null=null;if(trainingRoot){try{training=mountTraining(trainingRoot);}catch{training=null;}}
  return Object.freeze({experience,surfaceAvailable,trainingAvailable:training!==null,getPresentationMediaSnapshot:()=>mediaOverlay?.getSnapshot()??neutralMediaSnapshot(disposed),focusNode:(nodeId:string|null)=>{if(!disposed)surface.focusNode(nodeId);},dispose:()=>{if(disposed)return;disposed=true;mediaOverlay?.dispose();training?.dispose();surface.dispose();}});
}
