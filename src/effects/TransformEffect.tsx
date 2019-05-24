import {Effect} from './Effect';
import {Sketcher} from '../components/EffectLayer';
import TransformControls from '../components/TransformControls';

// Transform Effect.
// Transforms according to controls, or applies a transformation matrix.
var TransformEffect : Effect = {
    name : "Transform",
    control : TransformControls.controlFuncs,

    preLoad : (s:Sketcher) => {
        
    },

    preDraw : (s:Sketcher) => {
        s.clear();
    },

    draw : (s:Sketcher) => {
        // draw base to canvas
        s.image(s.baseImg, 0, 0);
    },
};

export default TransformEffect;
