import * as React from 'react';
import {Layer} from '../App';
import ImageEffect from './ImageEffect';
import MaskEffect from './MaskEffect';
import CodeEffect from './CodeEffect';
import ImageControls from './ImageControls';
import CodeControls from './CodeControls';

interface Props {
    ind : number;
    tokenSize : number;
    effectType: EffectType;
    callbackContainer: Layer;
    onNewOutput?: (eindex: number, pixels: Uint8ClampedArray) => void;
    onRemove?: (eindex: number) => void;
    basePixels?: Uint8ClampedArray;  // (size * size * 4) length
}

export interface ControlComponent {
    getFreshState: ()=>any;
    getHandlers: (el:EffectLayer)=>any;
    getControlState: (el:EffectLayer)=>any;
}

export interface Effect {
    name : string;
    control : ControlComponent; // ControlComponent, but static interfaces don't exist
    preLoad : (s:Sketcher, layer:EffectLayer) => void; // one-time initialization
    preDraw : (s:Sketcher) => void; // prepare to draw; usually clear canvas
    draw : (s:Sketcher) => void;    // draw the effect to the canvas
}

interface State {
    [x:string]: any; // lifted state from inner components
}

export enum EffectType {
    Image = "image",
    Mask = "mask",
    Code = "code",
}

function getEffect(et : EffectType) {
    switch (et) {
        case EffectType.Image:
            return ImageEffect;
        case EffectType.Mask:
            return MaskEffect;
        case EffectType.Code:
            return CodeEffect;
        default:
            console.warn("tried to get unknown effect " + et + ": defaulting to ImageEffect");
            return ImageEffect;
    }
}

export interface Sketcher extends p5 {
    props : Props;
    state : State;
    internal : any;
}

function getSketcher(parent : EffectLayer, effect : Effect) {
    let sketcher = function (s : Sketcher) {
        s.props = parent.props;
        s.state = parent.state;
        s.internal = {}; // for use by effect

        s.preload = function() {
            s.createCanvas(s.props.tokenSize, s.props.tokenSize);

            // one-time effect initialization
            effect.preLoad(s, parent);
        }

        s.setup = function() {
            s.createCanvas(s.props.tokenSize, s.props.tokenSize);
        }

        function preDraw() {
            // re-fetch state.
            s.state = parent.state;

            // prepare to draw this frame
            effect.preDraw(s);
        }

        s.draw = function() {
            preDraw();

            // draw this frame
            effect.draw(s);

            // inform that new pixels are created
            if (parent.props.onNewOutput) {
                s.loadPixels();
                let psize = s.props.tokenSize * s.props.tokenSize * 4;
                let pcopy : Uint8ClampedArray = new Uint8ClampedArray(psize);
                for (let i = 0; i < psize; i++) {
                    pcopy[i] = s.pixels[i];
                }
                parent.onOutput(pcopy);
            }
        }
    };
    return sketcher;
}

class EffectLayer extends React.Component<Props, State> {
    canvas?: p5;
    last_output?: Uint8ClampedArray;
    effect: Effect;

    constructor(props : Props) {
        super(props);
        this.props.callbackContainer.onNewBasePixels = this.handleBasePixelsChanged;
        this.effect = getEffect(this.props.effectType);
        this.state = {
            ...this.effect.control.getFreshState(),
        };
        this.canvas = undefined;
    }

    handleBasePixelsChanged = (pixels : Uint8ClampedArray) => {
        //this.setState({ basepixels: pixels });
    }

    handleRemoveButtonPressed = (event : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (this.props.onRemove) {
            this.props.onRemove(this.props.ind);
        }
    }

    onOutput = (pixels : Uint8ClampedArray) => {
        // only callback (trigger other effect components' state change)
        // if comparing pixels has a result
        let psize = this.props.tokenSize * this.props.tokenSize * 4;

        let differs : boolean = false;
        if (!this.last_output || pixels.length !== this.last_output.length) {
            //console.log(this.props.ind + " DIFFERS (length)" + pixels.length);
            differs = true;
        }
        else {
            for (let i = 0; i < psize; i++) {
                if (this.last_output[i] !== pixels[i]) {
                    //console.log(this.props.ind + " DIFFERS (COMPARISON)");
                    differs = true;
                    break;
                }
            }
        }
        if (differs) {
            if (this.props.onNewOutput) {
                this.props.onNewOutput(this.props.ind, pixels);
            }
            this.last_output = pixels;
        }
        return;
    }

    getCanvasID = () => {
        return "image-canvas-" + this.props.ind;
    }

    componentDidMount() {
        this.canvas = new window.p5(getSketcher(this, this.effect), document.getElementById(this.getCanvasID()) as HTMLElement);
        let bp = this.props.callbackContainer.getLastResultPixels();
        if (bp) {
            //this.setState({ basepixels : bp });
        }
        else {
            console.log("EffectLayer: no initial base pixels");
        }
    }

    componentWillUnmount() {
        //console.log("EffectLayer: unmounting");
        if (this.canvas) {
            this.canvas.remove();
        }
    }

    render() {
        let controls = <div className="controls"></div>;
        switch (this.props.effectType) {
            case EffectType.Image:
            case EffectType.Mask:
                controls = (
                    <ImageControls control={this.effect.control.getControlState(this)} handlers={this.effect.control.getHandlers(this)}/>
                    );
                break;
            case EffectType.Code:
                controls = (
                    <CodeControls control={this.effect.control.getControlState(this)} handlers={this.effect.control.getHandlers(this)}/>
                    );
                break;
            default:
                console.error("EffectLayer: can't render controls for unknown effect type");
                break;
        }

        return (
            <div className="effect-container" id={"effect-container"+this.props.ind}>
                <div className="effect-title">
                    <div>[{this.props.ind + 1}]</div>
                    <div>{this.effect.name}</div>
                    <button className="effect-remove-button" onClick={this.handleRemoveButtonPressed}>remove</button>
                </div>
                <div className="effect-canvas">
                    <div className="canvas-container" id={this.getCanvasID()}></div>
                </div>
                {controls}
            </div>
        );
    }
    // xoffset={this.state.xoffset} yoffset={this.state.yoffset} scale={this.state.scale}
}

export default EffectLayer;
