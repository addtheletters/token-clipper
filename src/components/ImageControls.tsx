import * as React from 'react';
import EffectLayer from './EffectLayer';
import {EffectType, ControlComponent} from '../effects/Effect';
import SourceSelector from './SourceSelector';
import ControlSlider from './ControlSlider';

const MAX_SCALE = 5;

// since react doesn't like nested state, this will be spread into
// the state of EffectLayer.
export interface ImageControlState {
    xoffset : number;
    yoffset : number;
    scale : number;

    src?: string;
    invert : boolean;
    blendMode : p5.BLEND_MODE;
}

export interface ImageControlHandlers {
    onSliderChange: (name:string, value:number) => void;
    onInvertChange: (value:boolean) => void;
    onSourceChange: (url:string) => void;
    onBlendModeChange: (mode:p5.BLEND_MODE) => void;
}

interface Props {
    control : ImageControlState,
    handlers : ImageControlHandlers,

    parentEffectType ?: EffectType;
}

enum BLEND_MODE {
    BLEND = "source-over",
    //DARKEST = "darkest", // not recognized
    LIGHTEST = "lighten",
    DIFFERENCE = "difference",
    MULTIPLY = "multiply",
    EXCLUSION = "exclusion",
    SCREEN = "screen",
    REPLACE = "copy",
    OVERLAY = "overlay",
    HARD_LIGHT = "hard-light",
    SOFT_LIGHT = "soft-light",
    DODGE = "color-dodge",
    BURN = "color-burn",
    ADD = "lighter",
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

            invert : false,
            blendMode : "source-over", // BLEND
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

            onInvertChange: (value: boolean) => {
                el.setState({ invert:value });
            },

            onSourceChange: (url: string) => {
                el.setState({ src:url });
            },

            onBlendModeChange: (mode: p5.BLEND_MODE) => {
                el.setState({ blendMode:mode });
            },
        }
        return handlers;
    };

    static getControlState (el : EffectLayer) {
        let ctrl : ImageControlState = {
            xoffset: el.state.xoffset,
            yoffset: el.state.yoffset,
            scale: el.state.scale,

            src: el.state.src,
            invert: el.state.invert,
            blendMode: el.state.blendMode,
        }
        return ctrl;
    };

    handleSliderChange = (name : string, value : number) => {
        this.props.handlers.onSliderChange(name, value);
    };

    handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.props.handlers.onInvertChange(event.target.checked);
    };

    handleSourceChange = this.props.handlers.onSourceChange;

    handleBlendModeChange = (event : React.ChangeEvent<HTMLSelectElement>) => {
        this.props.handlers.onBlendModeChange(event.target.value as p5.BLEND_MODE);
    }

    handleResetPress = () => {
        this.props.handlers.onSliderChange("xoffset", 0);
        this.props.handlers.onSliderChange("yoffset", 0);
        this.props.handlers.onSliderChange("scale", 1);
    };

    render() {
        let invert_text : string = "Invert";
        switch (this.props.parentEffectType) {
            case EffectType.Image:
                invert_text = "Draw Behind";
                break;
            case EffectType.Mask:
                invert_text = "Inverse Alpha";
                break;
            default:
                break;
        }

        let blend_options = Object.keys(BLEND_MODE).map(k => {
            let t = BLEND_MODE[k as any];
            return (<option value={t} key={k}>{k}</option>);
        });

        let blend_select = (null);
        if (this.props.parentEffectType === EffectType.Image) {
            blend_select = (<label className="controls-bar">
               <div className="controls-label">Blend Mode</div>
               <select className="controls-select" value={this.props.control.blendMode}
                   onChange={this.handleBlendModeChange}>
                   {blend_options}
               </select>
            </label>);
        }

        return (
            <div className="controls">
                <div className="controls-top">
                   <SourceSelector onSourceChange={this.handleSourceChange} parentEffectType={this.props.parentEffectType}/>
                   {blend_select}
                </div>
                <div className="controls-bottom">
                    <label className="controls-bar">
                        <div className="controls-label">{invert_text}</div>
                        <input type="checkbox" className="controls-toggle control"
                            checked={this.props.control.invert} onChange={this.handleCheckboxChange}/>
                    </label>
                    <ControlSlider label="Scale" name="scale" value={this.props.control.scale}
                        onChange={this.handleSliderChange} min={0.00001} max={MAX_SCALE} units="x"/>
                    <ControlSlider label="X offset" name="xoffset" value={this.props.control.xoffset}
                        onChange={this.handleSliderChange} min={-1} max={1} units="x"/>
                    <ControlSlider label="Y offset" name="yoffset" value={this.props.control.yoffset}
                        onChange={this.handleSliderChange} min={-1} max={1} units="x"/>
                    <button onClick={this.handleResetPress}>Reset</button>
                </div>
            </div>
        );
    }
}

export default ImageControls;
