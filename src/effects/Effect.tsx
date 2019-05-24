import EffectLayer, {Sketcher} from "../components/EffectLayer";
import ImageEffect from './ImageEffect';
import MaskEffect from './MaskEffect';
import CodeEffect from './CodeEffect';
import TransformEffect from './TransformEffect';

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
    name : string;
    control : ControlComponent; // ControlComponent, but static interfaces don't exist
    preLoad : (s:Sketcher, layer:EffectLayer) => void; // one-time initialization
    preDraw : (s:Sketcher) => void; // prepare to draw; usually clear canvas
    draw : (s:Sketcher) => void;    // draw the effect to the canvas
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
