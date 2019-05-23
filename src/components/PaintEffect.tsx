import {Effect, Sketcher} from './EffectLayer';
import CodeControls from './CodeControls';

// Paint Effect.
// Allows user to input p5 commands to draw, or choose from some presets.
// Dangerous evals? probably.

// time-out for code execution
const TIME_LIMIT : number = 500;

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
    (
        function() {
            //eval("let " + USER_CODE_INSTANCE_NAME + " = __wrapper__.proxy;");
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            var pfive = __wrapper__.proxy;
            try {
                // eslint-disable-next-line no-eval
                eval(__code__);
            }
            catch (err) {
                window.clearTimeout(__wrapper__.timerHandle);
                console.log("throwing up error");
                // toss error up
                throw err;
            }
            return;
        }
    )();
    return __wrapper__;
}

var PaintEffect : Effect = {
    name : "Paint",
    control : CodeControls.controlFuncs,

    preLoad : (s:Sketcher) => {
        s.internal.oldCode = "";
        s.internal.noError = false;
    },

    preDraw : (s:Sketcher) => {
        s.clear();
    },

    draw : (s:Sketcher) => {
        // draw base pixels
        s.image(s.baseImg, 0, 0);

        // paint some stuff
        //let halfsize = s.props.size/2;
        //s.circle(halfsize, halfsize, halfsize * 3/2);
        //pfive.circle(100, 100, 100 * 3/2);

        // only try run if valid already valid or code has changed
        if (s.state.codeText !== s.internal.oldCode || s.internal.codeValid) {
            // only run if we have code
            if (s.state.codeText && s.state.codeText.length > 0) {
                try {
                    let wrapper = runInWrapper(s.state.codeText, s);
                    window.clearTimeout(wrapper.timerHandle);
                    s.internal.codeValid = true;
                }
                catch (err) {
                    s.internal.codeValid = false;
                    console.log("PaintEffect: code eval error:");
                    console.log(err);
                }
            }
            s.internal.oldCode = s.state.codeText;
        }
    },
}

export default PaintEffect;
