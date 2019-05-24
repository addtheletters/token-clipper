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
    },

    draw : (s:Sketcher) => {
        if (s.state.useMatrix) {
            //console.log("matrix use not implemented yet\n");
        }
        else {
            // transform so center of image is origin
            s.translate(s.props.size/2, s.props.size/2);

            // apply transform settings
            s.rotate(s.state.rotate);
            s.shearX(s.state.shearX);
            s.shearY(s.state.shearY);
            s.translate(s.state.translateX * s.props.size, 
                s.state.translateY * s.props.size);
            s.scale(s.state.scaleX, s.state.scaleY);

            // draw pixels around center
            s.image(s.baseImg, -s.props.size/2, -s.props.size/2);
        }
        // draw base to canvas
    },
};

export default TransformEffect;
