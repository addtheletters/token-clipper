import {Effect, makeScrollSane, extractPointerMove} from './Effect';
import EffectLayer, {Sketcher} from '../components/EffectLayer';
import PlaceholderControls from '../components/ControlsTemplate';

// Placeholder Effect.
// Simply draws the base pixels again. A template for new effects.
var PlaceholderEffect : Effect = {
    name : "Placeholder",
    control : PlaceholderControls.controlFuncs,

    preLoad : (s:Sketcher) => {
        
    },

    preDraw : (s:Sketcher) => {
        s.clear();
    },

    draw : (s:Sketcher) => {
        s.image(s.baseImg, 0, 0);
    },

    mouseDragged : (s: Sketcher, mev: MouseEvent, layer:EffectLayer) => {
        return;
    },

    mouseWheel : (s:Sketcher, wev:WheelEvent, layer:EffectLayer) => {
        return;
    },
};

export default PlaceholderEffect;
