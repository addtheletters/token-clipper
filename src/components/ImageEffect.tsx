import {Effect, Sketcher} from './EffectLayer'
import ImageControls from './ImageControls'

const ALT_TEXT = "load failed\n"
                 + "   (CORS insecure?)";

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
            // these functions don't support Promises yet :(
            s.loadImage(s.state.src, (img : p5.Image) => {
                s.internal.img = img;
            },
            (err) => {
                if (err) {
                    console.log("error loading image " + s.internal.src);
                    s.internal.text = ALT_TEXT;
            //         // These lines allow us to try and reload as unsafe.
            //         // However, once we do this we can't read and modify the canvas
            //         // with loadPixels for security reasons.
            //         // const htmlImage : any = err.target;
            //         // if (!anyerr.crossOrigin) {
            //         //     console.log("could not reload.");
            //         //     return;
            //         // }
            //         // anyerr.crossOrigin = null;
            //         // anyerr.src = anyerr.src; // needed to trigger reload in some browsers
            //         // // see discussion:
            //         // // https://forum.processing.org/two/discussion/11608/i-can-t-display-images-dynamically-loaded-from-web-with-p5-js-always-a-cross-domain-issue

            //         // if failed, try createImg (DOM function, more lenient cross-origin)
            //         // then drawing to the canvas from that? this may still dirty the canvas
            //         // s.createImg(s.state.src, ALT_TEXT, (htmlImg : p5.Element) => {
            //         //     htmlImg.addClass("img-hidden");
            //             // clear canvas
            //             // copy image to canvas
            //             // save canvas as internal img
            //             // clear canvas
            //         //});
                }
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
            s.text("「" + s.internal.text + "\n" +
                   "   (" + s.state.xoffset + "," + s.state.yoffset + ")\n" +
                   "   x " + s.state.scale + "\t」",
                s.props.size/2 + (s.state.xoffset * s.props.size), 
                s.props.size/2 + (s.state.yoffset * s.props.size), 
                200, 100);
        }
    },
}

export default ImageEffect;
