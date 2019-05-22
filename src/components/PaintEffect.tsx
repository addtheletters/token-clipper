import EffectLayer, {Effect, Sketcher} from './EffectLayer'

// Paint Effect.
// Allows user to input p5 commands to draw.
// Dangerous evals? probably.

var PaintEffect : Effect = {
    name : "Paint",
    control : {
        getFreshState: ()=>{},
        getHandlers: (el:EffectLayer)=>{},
        getControlState: (el:EffectLayer)=>{},
    },

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
    },
}

export default PaintEffect;
