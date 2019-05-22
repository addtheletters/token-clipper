import * as React from 'react';
import EffectLayer, {Effect, Sketcher} from './EffectLayer'
import SourceSelector from './SourceSelector'
import {ImageControlState, ImageControlHandlers} from './ImageControls'

var ImageEffect : Effect = {
    name : "Image",

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
    },

    draw : (s : Sketcher) => {
        // draw base pixels to canvas
        s.image(s.baseImg, 0, 0);

        if (s.internal.img) {
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

    getFreshState : () => {
        let state : ImageControlState = {
            xoffset : 0,
            yoffset : 0,
            scale : 1,
        };
        return state;
    },

    getHandlers : (el : EffectLayer) => {
        let handlers : ImageControlHandlers = {
            onSliderChange: (name : string, value : number) => {
                if (name === "xoffset") {
                    el.setState({ xoffset:value });
                }
                else if (name === "yoffset") {
                    el.setState({ yoffset:value });
                }
                else if (name === "scale") {
                    el.setState({ scale:value});
                }
                else {
                    console.log("ImageEffect: unknown slider change " + name);
                }
            },

            onSourceChange: (url: string) => {
                el.setState({ src:url });
            }
        }
        return handlers;
    },

    getControlState : (el : EffectLayer) => {
        let ctrl : ImageControlState = {
            xoffset: el.state.xoffset,
            yoffset: el.state.yoffset,
            scale: el.state.scale,
            src: el.state.src,
        }
        return ctrl;
    },
}

export default ImageEffect;
