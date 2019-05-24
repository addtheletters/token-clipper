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
        s.resetMatrix();

        // transform so center of image is origin?
        // maybe also have a toggle for this
        //s.translate(-s.props.size, -s.props.size);
    },

    draw : (s:Sketcher) => {
        if (s.state.useMatrix) {
            //console.log("matrix use not implemented yet\n");
        }
        else {
            s.scale(s.state.scaleX, s.state.scaleY);
            s.rotate(s.state.rotate);

            s.translate(s.state.translateX, s.state.translateY);
        }

        // draw base to canvas
        s.image(s.baseImg, 0, 0);
    },
};

export default TransformEffect;
