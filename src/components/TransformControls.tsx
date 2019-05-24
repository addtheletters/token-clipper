import * as React from 'react';
import EffectLayer from './EffectLayer';
import {ControlComponent} from '../effects/Effect';

const INCS = 100; // number of increments per (0,1) interval for slider
const MAX_SCALE = 5;

// since react doesn't like nested state, this will be spread into
// the state of EffectLayer.
export interface TransformControlState {
    useMatrix : boolean;

    translateX : number;
    translateY : number;
    scaleX : number;
    scaleY : number;
    rotate : number; // radians
    shearX : number;
    shearY : number;

    // Matrix has 6 elements, [a, b, c, d, e, f]
    // applied as [[a, c, e], 
    //             [b, d, f], 
    //             [0, 0, 1]]
    matrix : Array<number>;
}

export interface TransformControlHandlers {
    onSliderChange: (name:string, value:number) => void;
    onUseMatrixChange: (useMatrix: boolean) => void;
    onInputMatrixChange: (matrix: Array<number>) => void;
}

interface Props {
    control : TransformControlState,
    handlers : TransformControlHandlers,
}

class TransformControls extends React.Component<Props> {
    static get controlFuncs () : ControlComponent {
        return {
            getHandlers     : TransformControls.getHandlers,
            getFreshState   : TransformControls.getFreshState,
            getControlState : TransformControls.getControlState,
        };
    };

    static getFreshState () {
        let state : TransformControlState = {
            useMatrix : false,
            translateX : 0,
            translateY : 0,
            scaleX : 1,
            scaleY : 1,
            rotate : 0,
            shearX : 0,
            shearY : 0,
            matrix : [1, 0, 0, 1, 0, 0], // identity
        };
        return state;
    };

    static getHandlers (el : EffectLayer) {
        let handlers : TransformControlHandlers = {
            onSliderChange: (name : string, value : number) => {
                switch (name) {
                    case "translateX":
                        el.setState({translateX:value});
                        break;
                    case "translateY":
                        el.setState({translateY:value});
                        break;
                    case "scaleX":
                        el.setState({scaleX:value});
                        break;
                    case "scaleY":
                        el.setState({scaleY:value});
                        break;
                    case "rotate":
                        el.setState({rotate:value});
                        break;
                    case "shearX":
                        el.setState({shearX:value});
                        break;
                    case "shearY":
                        el.setState({shearY:value});
                        break;
                    default:
                        console.log("TransformEffect: unknown slider change " + name);
                        return;
                }
            },

            onUseMatrixChange: (useMatrix: boolean) => {
                el.setState({ useMatrix:useMatrix });
            },

            onInputMatrixChange: (matrix: Array<number>) => {
                el.setState({ matrix:matrix });
            }
        }
        return handlers;
    };

    static getControlState (el : EffectLayer) {
        let ctrl : TransformControlState = {
            useMatrix : el.state.useMatrix,
            translateX : el.state.translateX,
            translateY : el.state.translateY,
            scaleX : el.state.scaleX,
            scaleY : el.state.scaleY,
            rotate : el.state.rotate,
            shearX : el.state.shearX,
            shearY : el.state.shearY,
            matrix : el.state.matrix,
        }
        return ctrl;
    };

    handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.props.handlers.onSliderChange(event.target.name, parseFloat(event.target.value) / INCS);
    };

    handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.props.handlers.onUseMatrixChange(event.target.checked);
    };

    handleSourceChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        // TODO parse as json, call handler for matrix
        this.props.handlers.onInputMatrixChange([1, 0, 0, 1, 0, 0]);
    };

    render() {
        let translateX_scaled = this.props.control.translateX * INCS;
        let translateY_scaled = this.props.control.translateY * INCS;
        let scaleX_scaled = this.props.control.scaleX * INCS;
        let scaleY_scaled = this.props.control.scaleY * INCS;
        let rotate_scaled = this.props.control.rotate * INCS;
        let shearX_scaled = this.props.control.shearX * INCS;
        let shearY_scaled = this.props.control.shearY * INCS;

        let bottom_controls = {};
        if (this.props.control.useMatrix) {
            bottom_controls = (<div>
                
            </div>);
        }
        else {
            bottom_controls = (<div>
                <div className="controls-bar">
                    <div className="controls-label">translate X</div>
                    <input type="range" name="translateX" value={translateX_scaled} className="control"
                        min={-INCS} max={INCS} onChange={this.handleSliderChange}/>
                </div>
                <div className="controls-bar">
                    <div className="controls-label">translate Y</div>
                    <input type="range" name="translateY" value={translateY_scaled} className="control"
                        min={-INCS} max={INCS} onChange={this.handleSliderChange}/>
                </div>
                <div className="controls-bar">
                    <div className="controls-label">scale X</div>
                    <input type="range" name="scaleX" value={scaleX_scaled} className="control"
                        min={-INCS} max={INCS*MAX_SCALE} onChange={this.handleSliderChange}/>
                </div>
                <div className="controls-bar">
                    <div className="controls-label">scale Y</div>
                    <input type="range" name="scaleY" value={scaleY_scaled} className="control"
                        min={-INCS} max={INCS*MAX_SCALE} onChange={this.handleSliderChange}/>
                </div>
                <div className="controls-bar">
                    <div className="controls-label">rotate</div>
                    <input type="range" name="rotate" value={rotate_scaled} className="control"
                        min={-INCS} max={INCS} onChange={this.handleSliderChange}/>
                </div>
                <div className="controls-bar">
                    <div className="controls-label">shear X</div>
                    <input type="range" name="shearX" value={shearX_scaled} className="control"
                        min={-INCS} max={INCS} onChange={this.handleSliderChange}/>
                </div>
                <div className="controls-bar">
                    <div className="controls-label">shear Y</div>
                    <input type="range" name="shearY" value={shearY_scaled} className="control"
                        min={-INCS} max={INCS} onChange={this.handleSliderChange}/>
                </div>
            </div>);
        }

        return (
            <div className="controls">
                <div className="controls-top">
                    <div className="controls-bar">
                        <div className="controls-label">Custom matrix</div>
                        <input type="checkbox" className="controls-toggle control"
                            checked={this.props.control.useMatrix} onChange={this.handleCheckboxChange}/>
                    </div>
                </div>
                <div className="controls-bottom">
                    {bottom_controls}
                </div>
            </div>
        );
    }
}

export default TransformControls;
