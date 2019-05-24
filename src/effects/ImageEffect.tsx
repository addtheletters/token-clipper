import {Effect} from './Effect';
import {Sketcher} from '../components/EffectLayer';
import ImageControls from '../components/ImageControls';

const ALT_TEXT = "load failed\n"
                 + "   (CORS not allowed?)";

// server that can apply the Access-Control-Allow-Origin header
const CORS_PROXY_URL = "https://cors-anywhere.herokuapp.com/";

// Image Effect.
// Draws an image to the canvas.
var ImageEffect : Effect = {
    name : "Image",
    control : ImageControls.controlFuncs,

    preLoad : (s : Sketcher) => {
        s.internal.text = "no image";
    },

    preDraw : (s : Sketcher) => {
        // if image src has changed, reload
        if (s.state.src && s.state.src !== s.internal.src) {
            s.internal.src = s.state.src;
            s.internal.img = null;

            let tmpsrc = s.state.src.trim();
            // these functions don't support Promises yet :(
            s.loadImage(tmpsrc, (img : p5.Image) => {
                s.internal.img = img;
            },
            (err) => {
                s.internal.text = ALT_TEXT;

                if (CORS_PROXY_URL) {
                    // if we failed to load, try to fetch image through a CORS-friendly proxy
                    console.log("ImageEffect: load failed, attempting via proxy " + CORS_PROXY_URL);
                    s.loadImage(CORS_PROXY_URL + tmpsrc,
                        (img : p5.Image) => {
                            console.log("retreived image.");
                            s.internal.img = img;
                        },
                        (err) => {
                            console.warn("CORS proxy failed.");
                        }
                    );
                }
            });
        }

        // clear canvas
        s.clear();
    },

    draw : (s : Sketcher) => {
        if (!s.state.invert) {
            // draw base pixels to canvas
            s.image(s.baseImg, 0, 0);
        }

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
            s.text("「" + s.internal.text + "\n" +
                   "   (" + s.state.xoffset.toFixed(2) + ","
                          + s.state.yoffset.toFixed(2) + ")\n" +
                   "   x "  + s.state.scale.toFixed(2) + "\t」",
                s.props.size/2 + (s.state.xoffset * s.props.size), 
                s.props.size/2 + (s.state.yoffset * s.props.size), 
                200, 100);
        }

        if (s.state.invert) {
            // inverted. image drawn behind, now draw base in front
            s.image(s.baseImg, 0, 0);
        }
    },
}

export default ImageEffect;
