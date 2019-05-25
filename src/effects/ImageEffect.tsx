import {Effect, makeScrollSane, extractPointerMove} from './Effect';
import EffectLayer, {Sketcher} from '../components/EffectLayer';
import ImageControls from '../components/ImageControls';

const ALT_TEXT = "load failed\n"
                 + "   (CORS not allowed?)";

// server that can apply the Access-Control-Allow-Origin header
const CORS_PROXY_URL = "https://cors-anywhere.herokuapp.com/";

const ZOOM_SCROLL_SPEED = 0.05;

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

        // set blend mode to default
        s.blendMode(s.BLEND);

        // clear canvas
        s.clear();
    },

    draw : (s : Sketcher) => {
        if (s.internal.img) {
            let firstImg = s.baseImg;
            let secondImg = s.internal.img;

            if (s.state.invert) {
                firstImg = s.internal.img;
                secondImg = s.baseImg;
            }

            let drawImg = (img: p5.Image) => {
                // if the chosen image, apply scale.
                if (img === s.internal.img) {
                    let imgw = img.width, imgh = img.height;
                    s.image(img,
                        (s.props.size - s.state.scale*imgw)/2 + s.state.xoffset * s.props.size,
                        (s.props.size - s.state.scale*imgh)/2 + s.state.yoffset * s.props.size,
                        s.state.scale * imgw,
                        s.state.scale * imgh);
                }
                else {
                    // it's the base image.
                    s.image(img, 0, 0);
                }
            };

            drawImg(firstImg);

            // set blend mode
            if (s.state.blendMode && s.state.blendMode !== s.internal.badMode) {
                try {
                    s.blendMode(s.state.blendMode);
                }
                catch (err) {
                    s.internal.badMode = s.state.blendMode
                    console.error("Could not switch to blend mode " + s.state.blendMode);
                    console.error(err);
                }
            }

            drawImg(secondImg);
        }
        else {
            // draw base pixels
            s.image(s.baseImg, 0, 0);

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
    },

    mouseDragged : (s: Sketcher, mev: MouseEvent, layer:EffectLayer) => {
        let move = extractPointerMove(s, mev);
        if (move) {
            layer.setState({
                xoffset: s.state.xoffset + move[0] / s.props.size,
                yoffset: s.state.yoffset + move[1] / s.props.size,
            });
        }
        return;
    },

    mouseWheel : (s:Sketcher, wev:WheelEvent, layer:EffectLayer) => {
        let delt = (wev as any).delta;
        if (!delt) {
            delt = wev.deltaY;
        }
        if (delt) {
            layer.setState({
                scale: s.state.scale + makeScrollSane(delt, ZOOM_SCROLL_SPEED),
            });
        }
    },
}

export default ImageEffect;
