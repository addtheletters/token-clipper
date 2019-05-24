import * as React from 'react';
import EffectLayer, {EffectType, ControlComponent} from './EffectLayer';
import SourceSelector from './SourceSelector';

const INCS = 100; // number of increments per (0,1) interval for slider
const MAX_SCALE = 5;

// since react doesn't like nested state, this will be spread into
// the state of EffectLayer.
export interface ImageControlState {
    xoffset : number;
    yoffset : number;
    scale : number;
    src?: string;
}

export interface ImageControlHandlers {
    onSliderChange: (name:string, value:number) => void;
    onSourceChange: (url:string) => void;
}

interface Props {
    control : ImageControlState,
    handlers : ImageControlHandlers,

    parentEffectType ?: EffectType;
}

class ImageControls extends React.Component<Props> {
    static get controlFuncs () : ControlComponent {
        return {
            getFreshState : ImageControls.getFreshState,
            getHandlers : ImageControls.getHandlers,
            getControlState : ImageControls.getControlState,
        };
    };

    static getFreshState () {
        let state : ImageControlState = {
            xoffset : 0,
            yoffset : 0,
            scale : 1,
        };
        return state;
    };

    static getHandlers (el : EffectLayer) {
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
    };

    static getControlState (el : EffectLayer) {
        let ctrl : ImageControlState = {
            xoffset: el.state.xoffset,
            yoffset: el.state.yoffset,
            scale: el.state.scale,
            src: el.state.src,
        }
        return ctrl;
    };

    handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.props.handlers.onSliderChange(event.target.name, parseFloat(event.target.value) / INCS);
    };

    handleSourceChange = this.props.handlers.onSourceChange;

    render() {
        const xoffset_scaled = this.props.control.xoffset * INCS;
        const yoffset_scaled = this.props.control.yoffset * INCS;
        const scale_scaled = this.props.control.scale * INCS;
        return (
            <div className="controls">
                <div className="controls-top">
                   <SourceSelector onSourceChange={this.handleSourceChange} parentEffectType={this.props.parentEffectType}/>
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

export default ImageControls;
