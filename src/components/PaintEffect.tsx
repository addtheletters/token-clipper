import {Effect, Sketcher} from './EffectLayer';
import CodeControls from './CodeControls';

// Paint Effect.
// Allows user to input p5 commands to draw, or choose from some presets.
// Dangerous evals? probably.

// time out code execution
const TIME_LIMIT : number = 500;

var PaintEffect : Effect = {
    name : "Paint",
    control : CodeControls.controlFuncs,

    preLoad : (s:Sketcher) => {
        
    },

    preDraw : (s:Sketcher) => {
        s.clear();
    },

    draw : (s:Sketcher) => {
        // draw base pixels
        s.image(s.baseImg, 0, 0);

        // paint some stuff
        let halfsize = s.props.size/2;
        s.circle(halfsize, halfsize, halfsize * 3/2);

        if (s.state.codeText && s.state.codeText.length > 0) {
            // current logic: // if code, paint line by line.
            // if we have exceeded some timeout, give up.
            // It will be changed.
            // Basically if someone really wants to run multi-line code,
            // they can do it but it's annoying. This doesn't help.

            // Instead, we could wrap the p5 instance in a custom class
            // that checks for timeout before every p5 function call, and
            // throws an error if so.
            // We'll want to catch errors from the eval anyway.

            let timeExpired : boolean = false;
            let timerHandle = window.setTimeout(() => {
                console.log("Painting code execution time expired.");
                timeExpired = true;
            }, TIME_LIMIT);

            const lines : Array<string> = s.state.codeText.split("\n");
            for (let i = 0; i < lines.length; i++) {
                console.log("simulated run of " + lines[i]);
                if (timeExpired) {
                    break;
                }
            }
            window.clearTimeout(timerHandle);
            console.log("Cleared code execution timer.");
        }
    },
}

export default PaintEffect;
