import {Effect, makeScrollSane, extractPointerMove} from './Effect';
import EffectLayer, {Sketcher} from '../components/EffectLayer';
import TransformControls from '../components/TransformControls';

const SCALE_SCROLL_SPEED = 0.05;
const SHEAR_SCROLL_SPEED = -0.05;
const ROTATE_SCROLL_SPEED = -0.025;

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

    mouseDragged : (s: Sketcher, mev: MouseEvent, layer:EffectLayer) => {
        let move = extractPointerMove(s, mev);
        if (move) {
            layer.setState({
                translateX: s.state.translateX + move[0] / s.props.size,
                translateY: s.state.translateY + move[1] / s.props.size,
            });
        }
        return;
    },

    mouseWheel : (s:Sketcher, wev:WheelEvent, layer:EffectLayer) => {
        let delt = (wev as any).delta;
        if (!delt) {
            delt = wev.deltaY;
        }
        if (wev.deltaX) {
            if (wev.altKey) {
                layer.setState({
                    shearY: s.state.shearY + makeScrollSane(wev.deltaX, SHEAR_SCROLL_SPEED),
                }); 
            }
            else {
                layer.setState({
                    shearX: s.state.shearX + makeScrollSane(wev.deltaX, SHEAR_SCROLL_SPEED),
                });
            }
        }
        else if (delt) {
            if (wev.altKey) {
                layer.setState({
                    rotate: s.state.rotate + makeScrollSane(delt, ROTATE_SCROLL_SPEED),
                });
            }
            else {
                layer.setState({
                    scaleX: s.state.scaleX - makeScrollSane(delt, SCALE_SCROLL_SPEED),
                    scaleY: s.state.scaleX - makeScrollSane(delt, SCALE_SCROLL_SPEED),
                });
            }
        }
    },
};

export default TransformEffect;
