import * as React from 'react';
import EffectLayer from './EffectLayer';
import {ControlComponent} from '../effects/Effect';
import ControlSlider from './ControlSlider';
import MatrixTable from './MatrixTable';

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

    // matrix remembers 6 elements
    // applied as [[0, 1, 2],
    //             [3, 4, 5],
    //             [(0), (0), (1)]]
    matrix : Array<number>;
    viewMatrix: Array<string>;
}

export interface TransformControlHandlers {
    onSliderChange: (name:string, value:number) => void;
    onUseMatrixChange: (useMatrix: boolean) => void;
    onInputMatrixChange: (matrix: Array<number>) => void;
    onViewMatrixChange: (viewMatrix: Array<string>) => void;
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
            matrix : [1, 0, 0, 0, 1, 0], // identity
            viewMatrix: ["1", "0", "0", "0", "1", "0"],
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
            },

            onViewMatrixChange: (viewMatrix: Array<string>) => {
                el.setState({ viewMatrix:viewMatrix });
            },
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
            viewMatrix : el.state.viewMatrix,
        }
        return ctrl;
    };

    handleSliderChange = (name : string, value : number) => {
        this.props.handlers.onSliderChange(name, value);
    };

    handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.props.handlers.onUseMatrixChange(event.target.checked);
    };

    handleMatrixChange = (ind : number, val : string) => {
        let newMatrix = Array.from(this.props.control.matrix);
        newMatrix[ind] = parseFloat(val);
        let newView = Array.from(this.props.control.viewMatrix);
        newView[ind] = val;
        this.props.handlers.onViewMatrixChange(newView);
        this.props.handlers.onInputMatrixChange(newMatrix);
    };

    handleResetPressed = () => {
        if (this.props.control.useMatrix) {
            this.props.handlers.onInputMatrixChange([1, 0, 0, 0, 1, 0]);
            this.props.handlers.onViewMatrixChange(["1", "0", "0", "0", "1", "0"]);
        }
        else {
            this.props.handlers.onSliderChange("translateX", 0);
            this.props.handlers.onSliderChange("translateY", 0);
            this.props.handlers.onSliderChange("scaleX", 1);
            this.props.handlers.onSliderChange("scaleY", 1);
            this.props.handlers.onSliderChange("rotate", 0);
            this.props.handlers.onSliderChange("shearX", 0);
            this.props.handlers.onSliderChange("shearY", 0);
        }
    }

    render() {
        let bottom_controls = {};
        let viewValues = [];
        if (this.props.control.viewMatrix) {
            viewValues = this.props.control.viewMatrix.concat(["0", "0", "1"]);
        }
        else {
            viewValues = this.props.control.matrix.map(
                (v: number)=>v.toString()).concat(["0", "0", "1"]);
        }
        if (this.props.control.useMatrix) {
            bottom_controls = (<div>
                <MatrixTable rows={3} cols={3} onChange={this.handleMatrixChange}
                        values={viewValues}
                        labels={["a", "c", "e", "b", "d", "f"]}
                        showInput={[true, true, true, true, true, true, false, false, false]}/>
            </div>);
        }
        else {
            bottom_controls = (<div>
                <ControlSlider label="translate X" name="translateX" value={this.props.control.translateX} onChange={this.handleSliderChange} min={-2} max={2} units="x"/>
                <ControlSlider label="translate Y" name="translateY" value={this.props.control.translateY} onChange={this.handleSliderChange} min={-2} max={2} units="x"/>
                <ControlSlider label="scale X" name="scaleX" value={this.props.control.scaleX} onChange={this.handleSliderChange} min={-5} max={5} units="x"/>
                <ControlSlider label="scale Y" name="scaleY" value={this.props.control.scaleY} onChange={this.handleSliderChange} min={-5} max={5} units="x"/>
                <ControlSlider label="shear X" name="shearX" value={this.props.control.shearX} onChange={this.handleSliderChange} min={-Math.PI/2} max={Math.PI/2} units="rad"/>
                <ControlSlider label="shear Y" name="shearY" value={this.props.control.shearY} onChange={this.handleSliderChange} min={-Math.PI/2} max={Math.PI/2} units="rad"/>
                <ControlSlider label="rotate" name="rotate" value={this.props.control.rotate} onChange={this.handleSliderChange} min={-Math.PI} max={Math.PI} units="rad"/>
            </div>);
        }

        return (
            <div className="controls">
                <div className="controls-top">
                    <label className="controls-bar">
                        <div className="controls-label">Custom Matrix</div>
                        <input type="checkbox" className="controls-toggle control"
                            checked={this.props.control.useMatrix} onChange={this.handleCheckboxChange}/>
                    </label>
                </div>
                <div className="controls-bottom">
                    {bottom_controls}
                    <button className="controls-bar" onClick={this.handleResetPressed}>Reset</button>
                </div>
            </div>
        );
    }
}

export default TransformControls;
