import * as React from 'react';
import {Layer} from './LayerStack';
import ImageEffect from './ImageEffect';
import MaskEffect from './MaskEffect';
import CodeEffect from './CodeEffect';
import ImageControls from './ImageControls';
import CodeControls from './CodeControls';

const EFFECT_RENDERER = "p2d"; // "webgl" | "p2d" // webgl doesn't work very well yet

interface Props {
    size : number;
    ind : number;
    type: EffectType;

    callbackContainer: Layer;

    onNewOutput: (eindex: number, pixels: Uint8ClampedArray) => void;
    onRemove: (eindex: number) => void;
    onMove: (eindex: number, diff: number) => number;

    isFirst?: boolean;
    isLast?: boolean;
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
    basepixels?: Uint8ClampedArray; // (size * size * 4) length
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
    baseImg: p5.Image;
}

function getSketcher(parent : EffectLayer, effect : Effect) {
    let sketcher = function (s : Sketcher) {
        s.props = parent.props;
        s.state = parent.state;
        s.internal = {}; // for use by effect

        s.preload = function() {
            s.baseImg = s.createImage(s.props.size, s.props.size);

            // one-time effect initialization
            effect.preLoad(s, parent);
        }

        s.setup = function() {
            s.pixelDensity(1);
            s.createCanvas(s.props.size, s.props.size, EFFECT_RENDERER);
        }

        function preDraw() {
            // re-fetch state.
            s.state = parent.state;

            // apply base pixels from previous layer to buffer image
            let psize = s.props.size * s.props.size * 4;
            s.baseImg.loadPixels();
            if (s.state.basepixels) {
                for (let i = 0; i < psize; i++) {
                    s.baseImg.pixels[i] = s.state.basepixels[i];
                }
            }
            else {
                // zero out base image;
                for (let i = 0; i < psize; i++) {
                    s.baseImg.pixels[i] = 0;
                }
            }
            s.baseImg.updatePixels();

            // prepare to draw this frame
            effect.preDraw(s);
        }

        s.draw = function() {
            preDraw();

            // draw this frame
            effect.draw(s);

            // inform that new pixels are created
            s.loadPixels();
            parent.onOutput(Uint8ClampedArray.from(s.pixels));
        }
    };
    return sketcher;
}

function getDefaultFilename(el : EffectLayer) {
    return "token-" + el.props.size + "px.png";
}

class EffectLayer extends React.PureComponent<Props, State> {
    EMPTY_BASE: Uint8ClampedArray;
    canvas?: p5;
    effect: Effect;

    constructor(props : Props) {
        super(props);
        this.EMPTY_BASE = new Uint8ClampedArray(this.props.size * this.props.size * 4);
        this.props.callbackContainer.onNewBasePixels = this.handleBasePixelsChanged;
        this.effect = getEffect(this.props.type);
        this.state = {
            ...this.effect.control.getFreshState(),
        };
        this.canvas = undefined;
    }

    handleBasePixelsChanged = (pixels?: Uint8ClampedArray | null) => {
        if (pixels) {
            this.setState({ basepixels: pixels });
        }
        else {
            //console.log("EffectLayer: no base pixels");
            this.setState({ basepixels: this.EMPTY_BASE });
        }
    }

    handleRemoveButtonPressed = (event : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (this.props.onRemove) {
            this.props.onRemove(this.props.ind);
        }
    }

    handleSaveButtonPressed = (event : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (this.canvas) {
            this.canvas.saveCanvas(getDefaultFilename(this));
        }
    }

    handleMoveUpPressed = (event : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (this.props.onMove) {
            this.props.onMove(this.props.ind, 1);
        }
    }

    handleMoveDownPressed = (event : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (this.props.onMove) {
            this.props.onMove(this.props.ind, -1);
        }
    }

    onOutput = (pixels : Uint8ClampedArray) => {
        // always emit, since it's difficult to tell when the next
        // will need an update, even when we've not had a difference.
        this.props.onNewOutput(this.props.ind, pixels);
        return;
    }

    getCanvasID = () => {
        return "image-canvas-" + this.props.callbackContainer.key;
    }

    componentDidMount() {
        this.canvas = new window.p5(getSketcher(this, this.effect), document.getElementById(this.getCanvasID()) as HTMLElement);
    }

    componentWillUnmount() {
        //console.log("EffectLayer: unmounting");
        if (this.canvas) {
            this.canvas.remove();
        }
    }

    render() {
        let controls = <div className="controls"></div>;
        switch (this.props.type) {
            case EffectType.Image:
            case EffectType.Mask:
                controls = (
                    <ImageControls control={this.effect.control.getControlState(this)} handlers={this.effect.control.getHandlers(this)} parentEffectType={this.props.type}/>
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
            <div className="effect-container" id={"effect-container"+this.props.callbackContainer.key}>
                <div className="effect-title">
                    <button className="effect-move-up"
                        onClick={this.handleMoveUpPressed}
                        disabled={this.props.isLast}>▲</button>
                    <hr/>
                    <div>[{this.props.ind + 1}] {this.effect.name}</div>
                    <button className="effect-save-button"
                        onClick={this.handleSaveButtonPressed}>save</button>
                    <button className="effect-remove-button"
                        onClick={this.handleRemoveButtonPressed}>remove</button>
                    <hr/>
                    <button className="effect-move-down"
                        onClick={this.handleMoveDownPressed}
                        disabled={this.props.isFirst}>▼</button>
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
