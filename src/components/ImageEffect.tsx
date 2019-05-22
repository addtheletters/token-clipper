import * as React from 'react';
import EffectLayer, {Effect, Sketcher} from './EffectLayer'
import SourceSelector from './SourceSelector'

const INCS = 100; // number of increments per (0,1) interval for slider
const MAX_SCALE = 5;

export var ImageEffect : Effect = {
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
        let state : ImageEffectState = {
            xoffset : 0,
            yoffset : 0,
            scale : 1,
        };
        return state;
    },

    getHandlers : (el : EffectLayer) => {
        let handlers : ImageEffectHandlers = {
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
        let ctrl : ImageEffectState = {
            xoffset: el.state.xoffset,
            yoffset: el.state.yoffset,
            scale: el.state.scale,
            src: el.state.src,
        }
        return ctrl;
    },
}

// since react doesn't like nested state, this will be spread into
// the state of EffectLayer.
interface ImageEffectState {
    xoffset : number;
    yoffset : number;
    scale : number;
    src?: string;
}

interface ImageEffectHandlers {
    onSliderChange: (name:string, value:number) => void;
    onSourceChange: (url:string) => void;
}

interface Props {
    control : ImageEffectState,
    handlers : ImageEffectHandlers,
}

export class ImageEffectControl extends React.Component<Props> {
    handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.props.handlers.onSliderChange(event.target.name, parseFloat(event.target.value) / INCS);
    }

    handleSourceChange = this.props.handlers.onSourceChange;

    render() {
        const xoffset_scaled = this.props.control.xoffset * INCS;
        const yoffset_scaled = this.props.control.yoffset * INCS;
        const scale_scaled = this.props.control.scale * INCS;
        return (
            <div className="controls">
                <div className="controls-top">
                   <SourceSelector onSourceChange={this.handleSourceChange}/>
                </div>
                <div className="controls-bottom">
                    <div>
                      <div>X Offset</div>
                      <input type="range" name="xoffset" value={xoffset_scaled}
                             min={-INCS} max={INCS} onChange={this.handleSliderChange}/>
                    </div>
                    <div>
                      <div>Y Offset</div>
                      <input type="range" name="yoffset" value={yoffset_scaled}
                             min={-INCS} max={INCS} onChange={this.handleSliderChange}/>
                    </div>
                    <div>
                      <div>Scale</div>
                      <input type="range" name="scale" value={scale_scaled}
                             min={1} max={INCS*MAX_SCALE} onChange={this.handleSliderChange}/>
                    </div>
                </div>
            </div>
        );
    }
}
