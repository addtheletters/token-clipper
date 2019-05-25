import EffectLayer, {Sketcher} from "../components/EffectLayer";
import ImageEffect from './ImageEffect';
import MaskEffect from './MaskEffect';
import CodeEffect from './CodeEffect';
import TransformEffect from './TransformEffect';

const SCROLL_SANITY_BOUND = 100;

export enum EffectType {
    Image = "image",
    Mask = "mask",
    Code = "code",
    Transform = "transform",
}

export interface ControlComponent {
    getFreshState: ()=>any;
    getHandlers: (el:EffectLayer)=>any;
    getControlState: (el:EffectLayer)=>any;
}

export interface Effect {
    name: string;
    control: ControlComponent; // ControlComponent, but static interfaces don't exist
    preLoad: (s:Sketcher, layer:EffectLayer) => void; // one-time initialization
    preDraw: (s:Sketcher) => void; // prepare to draw; usually clear canvas
    draw: (s:Sketcher) => void;    // draw the effect to the canvas
    mouseDragged?: (s:Sketcher, mev:MouseEvent, layer:EffectLayer) => void; // handle mouse drag
    mouseWheel?: (s:Sketcher, wev:WheelEvent, layer:EffectLayer) => void; // handle mousewheel
}

export function getEffect(et : EffectType) {
    switch (et) {
        case EffectType.Image:
            return ImageEffect;
        case EffectType.Mask:
            return MaskEffect;
        case EffectType.Code:
            return CodeEffect;
        case EffectType.Transform:
            return TransformEffect;
        default:
            console.warn("tried to get unknown effect " + et + ": defaulting to ImageEffect");
            return ImageEffect;
    }
}

export function makeScrollSane(delta: number, scrollScale: number) {
    if (delta >= SCROLL_SANITY_BOUND) {
        return Math.log10(delta) * scrollScale;
    }
    if (delta <= -SCROLL_SANITY_BOUND) {
        return -1 * Math.log10(-delta) * scrollScale;
    }
    return delta * scrollScale;
}

export function extractPointerMove(s:Sketcher, mev: MouseEvent) {
    let move = null;
    if (mev.movementX || mev.movementY ||
            (mev.movementX === 0 && mev.movementY === 0)) {
        move = [mev.movementX, mev.movementY];
    }
    else if (s.mouseX || s.mouseY || s.pmouseX || s.pmouseY ||
            (s.mouseX === 0 && s.mouseY === 0 && s.pmouseX === 0 && s.pmouseY === 0)) {
        move = [s.mouseX - s.pmouseX, s.mouseY - s.pmouseY];
    }
    return move;
}
