import EffectLayer, {Effect, Sketcher} from './EffectLayer';
import CodeControls from './CodeControls';

// Paint Effect.
// Allows user to input p5 commands to draw, or choose from some presets.
// Dangerous evals? probably.

// time-out for code execution
const TIME_LIMIT : number = 500;
const USER_CODE_INSTANCE_NAME : string = "pfive";

export function getUserInstanceName() {
    return USER_CODE_INSTANCE_NAME;
}

interface SketchWrapper {
    timeExpired: boolean;
    timerHandle: number;
    proxy : any;
}

function getP5InstanceWrapper(instance: p5) : SketchWrapper {
    let wrapper : SketchWrapper = {
        timeExpired: false,
        timerHandle: 0,
        proxy: undefined,
    };
    wrapper.timerHandle = window.setTimeout(
        function(w : SketchWrapper) {
            console.log("PaintEffect: Painting code execution time expired.");
            w.timeExpired = true;
        }, TIME_LIMIT, wrapper);
    wrapper.proxy = new Proxy(instance,
    {
        get: function(target : any, property, receiver) {
            if (wrapper.timeExpired) {
                throw EvalError("Code execution time for painting expired (" + TIME_LIMIT + " ms).");
            }
            return target[property];
        },
    });
    return wrapper;
}

// wrap the p5 instance.
// before every p5 function call, check for timeout.
// throws an error if so.
function runInWrapper(__code__: string, __instance__: p5) {
    let __wrapper__ = getP5InstanceWrapper(__instance__);
    try {
        // eval is dangerous.
        // Instead, we could try interpreting each line as an individual p5 function call?
        // It would make this much less powerful, but whatever;
        // this isn't intended for complex drawing anyway.

        // eslint-disable-next-line no-new-func
        Function(USER_CODE_INSTANCE_NAME,
            '"use strict";' +
            '{;' + __code__ + ';}')(__wrapper__.proxy);
    }
    catch (err) {
        window.clearTimeout(__wrapper__.timerHandle);
        //console.log("PaintEffect: eval failed, throwing up error");
        throw err; // toss error up to be caught in draw()
    }
    return __wrapper__;
}

var CodeEffect : Effect = {
    name : "Code",
    control : CodeControls.controlFuncs,

    preLoad : (s:Sketcher, layer:EffectLayer) => {
        s.internal.oldCode = "";
        s.internal.noError = false;

        s.internal.handleError = function(errorString : string) {
            layer.setState({ errorText : errorString });
        };
    },

    preDraw : (s:Sketcher) => {
        s.clear();
    },

    draw : (s:Sketcher) => {
        // draw base pixels
        //s.image(s.baseImg, 0, 0);
        if (s.props.basePixels) {
            s.loadPixels();
            for (let i = 0; i < s.props.tokenSize * s.props.tokenSize * 4; i++) {
                s.pixels[i] = s.props.basePixels[i];
            }
            s.updatePixels();
        }

        // try to run user painting code
        // only try run if valid already valid or code has changed
        if (s.state.codeText !== s.internal.oldCode || s.internal.codeValid) {
            // only run if we have code
            if (s.state.codeText && s.state.codeText.length > 0) {
                try {
                    let wrapper = runInWrapper(s.state.codeText, s);
                    window.clearTimeout(wrapper.timerHandle);
                    s.internal.codeValid = true;
                    s.internal.handleError("no errors! :)");
                }
                catch (err) {
                    s.internal.codeValid = false;
                    s.internal.handleError(err.message);
                }
            }
            else {
                s.internal.handleError("-");
            }
            s.internal.oldCode = s.state.codeText;
        }
    },
}

export default CodeEffect;
