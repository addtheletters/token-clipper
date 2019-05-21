import * as React from 'react';
import EffectLayer from './EffectLayer'
import {Effect} from './EffectLayer'

const INCS = 100; // number of increments per (0,1) interval for slider
const MAX_SCALE = 5;

export var ImageEffect : Effect = {
    initEffect : (s : any) => {
        s.internal.ready = false;
        s.internal.src = s.state.src;
        s.internal.img = null;
        s.loadImage(s.state.src, (img : p5.Image) => {
            s.internal.img = img;
        });
    },

    drawEffect : (s : any) => {
        s.textSize(s.state.scale * 10);
        s.text("^ image. x" + s.state.xoffset + " y" + s.state.yoffset + " s" + s.state.scale,
            s.props.size/2 + (s.state.xoffset * s.props.size), 
            s.props.size/2 + (s.state.yoffset * s.props.size), 
            200, 100);

        if (s.internal.img !== null) {
            let imgw = s.internal.img.width, imgh = s.internal.img.height;
            s.image(s.internal.img, 
                (s.props.size - s.state.scale*imgw)/2 + s.state.xoffset * s.props.size,
                (s.props.size - s.state.scale*imgh)/2 + s.state.yoffset * s.props.size,
                s.state.scale * imgw,
                s.state.scale * imgh);
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
    }
}

// since react doesn't like nested state, this will be spread into
// the state of EffectLayer.
interface ImageEffectState {
    xoffset : number;
    yoffset : number;
    scale : number;
    src?: string;
}

export interface ImageEffectHandlers {
    onSliderChange: (name:string, value:number) => void;
    onSourceChange: (url:string) => void;
}

interface Props extends ImageEffectState {
    handlers : ImageEffectHandlers,
}

export class ImageEffectControl extends React.Component<Props> {
    handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.props.handlers.onSliderChange(event.target.name, parseFloat(event.target.value) / INCS);
    }

    handleSourceChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files != null && event.target.files.length > 0) {
            this.props.handlers.onSourceChange(URL.createObjectURL(event.target.files[0]));
        }
        else {
            console.error("ImageEfectControl: file invalid");
        }
    }

    render() {
        const xoffset_scaled = this.props.xoffset * INCS;
        const yoffset_scaled = this.props.yoffset * INCS;
        const scale_scaled = this.props.scale * INCS;
        return (
            <div>
                <input type="file" accept="image/*" name="src"
                    onChange={this.handleSourceChange}/>
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
        );
    }
}

