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
            let mat = s.state.matrix;
            // matrix holds [[a, c, e],
            //               [b, d, f],
            //               [0, 0, 1]]
            // applied as (a, b, c, d, e, f)
            //let arranged = [mat[0], mat[3], mat[1], mat[4], mat[2], mat[5]];
            s.applyMatrix(mat[0], mat[3], mat[1], mat[4], mat[2], mat[5]);
            s.image(s.baseImg, 0, 0);
        }
        else {
            // transform so center of image is origin
            s.translate(s.props.size/2, s.props.size/2);

            // apply transform settings
            s.scale(s.state.scaleX, s.state.scaleY);
            s.translate(s.state.translateX * s.props.size, 
                s.state.translateY * s.props.size);
            s.shearX(s.state.shearX);
            s.shearY(s.state.shearY);
            s.rotate(s.state.rotate);

            // draw pixels around center
            s.image(s.baseImg, -s.props.size/2, -s.props.size/2);
        }
    },
};

export default TransformEffect;
