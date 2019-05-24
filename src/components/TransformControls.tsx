import * as React from 'react';
import EffectLayer from './EffectLayer';
import {ControlComponent} from '../effects/Effect';
import ControlSlider from './ControlSlider';

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
            scaleX : 0,
            scaleY : 0,
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

    handleSliderChange = (name : string, value : number) => {
        this.props.handlers.onSliderChange(name, value);
    };

    handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.props.handlers.onUseMatrixChange(event.target.checked);
    };

    handleSourceChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        // TODO parse as json, call handler for matrix
        this.props.handlers.onInputMatrixChange([1, 0, 0, 1, 0, 0]);
    };

    render() {
        let bottom_controls = {};
        if (this.props.control.useMatrix) {
            bottom_controls = (<div>

            </div>);
        }
        else {
            bottom_controls = (<div>
                <ControlSlider label="translate X" name="translateX" value={this.props.control.translateX} onChange={this.handleSliderChange} />
                <ControlSlider label="translate Y" name="translateY" value={this.props.control.translateY} onChange={this.handleSliderChange} />
                <ControlSlider label="scale X" name="scaleX" value={this.props.control.scaleX} onChange={this.handleSliderChange} />
                <ControlSlider label="scale Y" name="scaleY" value={this.props.control.scaleY} onChange={this.handleSliderChange} />
                <ControlSlider label="rotate" name="rotate" value={this.props.control.rotate} onChange={this.handleSliderChange} />
                <ControlSlider label="shear X" name="shearX" value={this.props.control.shearX} onChange={this.handleSliderChange} />
                <ControlSlider label="shear Y" name="shearY" value={this.props.control.shearY} onChange={this.handleSliderChange} />
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
