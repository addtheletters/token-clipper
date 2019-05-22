import {Effect, Sketcher} from './EffectLayer'
import ImageControls from './ImageControls'

var ImageEffect : Effect = {
    name : "Image",
    control : ImageControls.controlFuncs,

    preLoad : () => {
        // nothing to load
    },

    preDraw : (s : Sketcher) => {
        // if image src has changed, reload
        if (s.state.src && s.state.src !== s.internal.src) {
            s.internal.ready = false;
            s.internal.src = s.state.src;
            s.internal.img = null;
            s.loadImage(s.state.src, (img : p5.Image) => {
                s.internal.img = img;
            });
        }

        // clear canvas
        s.clear();
    },

    draw : (s : Sketcher) => {
        // draw base pixels to canvas
        s.image(s.baseImg, 0, 0);

        if (s.internal.img) {
            // draw image
            let imgw = s.internal.img.width, imgh = s.internal.img.height;
            s.image(s.internal.img, 
                (s.props.size - s.state.scale*imgw)/2 + s.state.xoffset * s.props.size,
                (s.props.size - s.state.scale*imgh)/2 + s.state.yoffset * s.props.size,
                s.state.scale * imgw,
                s.state.scale * imgh);
        }
        else {
            // placeholder text since no image is loaded
            s.textSize(s.state.scale * 10);
            s.text("「 no image\n" +
                   "   (" + s.state.xoffset + "," + s.state.yoffset + ")\n" +
                   "   x " + s.state.scale + "\t」",
                s.props.size/2 + (s.state.xoffset * s.props.size), 
                s.props.size/2 + (s.state.yoffset * s.props.size), 
                200, 100);
        }
    },
}

export default ImageEffect;
