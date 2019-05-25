import {Effect, makeScrollSane, extractPointerMove} from './Effect';
import EffectLayer, {Sketcher} from '../components/EffectLayer';
import FilterControls from '../components/FilterControls';

// Filter Effect.
// Applys a filter to the image contents.
var FilterEffect : Effect = {
    name : "Filter",
    control : FilterControls.controlFuncs,

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

export default FilterEffect;
