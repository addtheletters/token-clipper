import {Effect, Sketcher} from './EffectLayer'
import ImageControls from './ImageControls'
import ImageEffect from './ImageEffect'

var MaskEffect : Effect = {
    name : "Mask",
    control : ImageControls.controlFuncs,

    preLoad : (s:Sketcher) => {
        s.internal.mask = s.createImage(s.props.tokenSize, s.props.tokenSize);
        s.internal.text = "no mask";
    },

    preDraw : (s:Sketcher) => {
        s.clear();

        // load mask like any other image
        ImageEffect.preDraw(s);

        // when loaded, try to draw on blank and re-save as mask matching image size
        if (s.internal.img) {
            let imgw = s.internal.img.width, imgh = s.internal.img.height;
            // draw
            s.image(s.internal.img, 
                (s.props.tokenSize - s.state.scale*imgw)/2 + s.state.xoffset * s.props.tokenSize,
                (s.props.tokenSize - s.state.scale*imgh)/2 + s.state.yoffset * s.props.tokenSize,
                s.state.scale * imgw,
                s.state.scale * imgh);

            // copy into mask buffer
            let psize = s.props.tokenSize * s.props.tokenSize * 4;
            s.loadPixels();
            s.internal.mask.loadPixels();
            for (let i = 0; i < psize; i++) {
                s.internal.mask.pixels[i] = s.pixels[i];
            }
            s.internal.mask.updatePixels();
        }
        s.clear();
    },

    draw : (s:Sketcher) => {
        if (s.internal.img) {
            // apply mask to base pixels
            //s.baseImg.mask(s.internal.mask);

            // draw to canvas
            // s.image(s.baseImg, 0, 0);
            if (s.props.basePixels) {
                s.loadPixels();
                s.internal.mask.loadPixels();
                for (let i = 0; i < (s.props.tokenSize * s.props.tokenSize * 4); i+=4) {
                    s.pixels[i]   = s.props.basePixels[i];
                    s.pixels[i+1] = s.props.basePixels[i+1];
                    s.pixels[i+2] = s.props.basePixels[i+2];
                    s.pixels[i+3] = Math.min(s.props.basePixels[i+3], s.internal.mask.pixels[i+3]); // alpha from mask
                }
                s.updatePixels();
            }
        }
        else {
            //s.image(s.baseImg, 0, 0);
            if (s.props.basePixels) {
                s.loadPixels();
                for (let i = 0; i < (s.props.tokenSize * s.props.tokenSize * 4); i++) {
                    s.pixels[i] = s.props.basePixels[i];
                }
                s.updatePixels();
            }

            // placeholder text since no image is loaded
            s.textSize(s.state.scale * 10);
            s.text("「" + s.internal.text + "\n" +
                   "   (" + s.state.xoffset + "," + s.state.yoffset + ")\n" +
                   "   x " + s.state.scale + "\t」",
                s.props.tokenSize/2 + (s.state.xoffset * s.props.tokenSize), 
                s.props.tokenSize/2 + (s.state.yoffset * s.props.tokenSize), 
                200, 100);
        }
    },
}

export default MaskEffect;
