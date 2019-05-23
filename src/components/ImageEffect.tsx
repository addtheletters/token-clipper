import {Effect, Sketcher} from './EffectLayer'
import ImageControls from './ImageControls'

const ALT_TEXT = "load failed\n"
                 + "   (CORS not allowed?)";

// server that can apply the Access-Control-Allow-Origin header
const CORS_PROXY_URL = "https://cors-anywhere.herokuapp.com/";

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
        // draw base pixels to canvas
        //s.image(s.baseImg, 0, 0);
        if (s.props.basePixels) {
            s.loadPixels();
            for (let i = 0; i < s.props.tokenSize * s.props.tokenSize * 4; i++) {
                s.pixels[i] = s.props.basePixels[i];
            }
            s.updatePixels();
        }

        if (s.internal.img) {
            // draw image
            let imgw = s.internal.img.width, imgh = s.internal.img.height;
            s.image(s.internal.img, 
                (s.props.tokenSize - s.state.scale*imgw)/2 + s.state.xoffset * s.props.tokenSize,
                (s.props.tokenSize - s.state.scale*imgh)/2 + s.state.yoffset * s.props.tokenSize,
                s.state.scale * imgw,
                s.state.scale * imgh);
        }
        else {
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

export default ImageEffect;
