import * as React from 'react';
import {Layer} from '../App';
import ImageEffect from './ImageEffect';
import MaskEffect from './MaskEffect';
import PaintEffect from './PaintEffect';
import ImageControls from './ImageControls';
import CodeControls from './CodeControls';

interface Props {
    size : number;
    ind : number;
    type: EffectType;
    callbackContainer: Layer;
    onNewOutput?: (eindex: number, pixels: Uint8ClampedArray) => void;
    onRemove?: (eindex: number) => void;
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
    Paint = "paint",
}

function getEffect(et : EffectType) {
    switch (et) {
        case EffectType.Image:
            return ImageEffect;
        case EffectType.Mask:
            return MaskEffect;
        case EffectType.Paint:
            return PaintEffect;
        default:
            console.log("unknown effect " + et + ": defaulting to ImageEffect");
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
            s.createCanvas(s.props.size, s.props.size);
        }

        function preDraw() {
            // re-fetch state.
            s.state = parent.state;

            // apply base pixels from previous layer to buffer image
            if (s.state.basepixels) {
                let psize = s.props.size * s.props.size * 4;
                s.baseImg.loadPixels();
                for (let i = 0; i < psize; i++) {
                    s.baseImg.pixels[i] = s.state.basepixels[i];
                }
                s.baseImg.updatePixels();
            }

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
                parent.onOutput(Uint8ClampedArray.from(s.pixels));
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
        this.effect = getEffect(this.props.type);
        this.state = {
            ...this.effect.control.getFreshState(),
        };
        this.canvas = undefined;
    }

    handleBasePixelsChanged = (pixels : Uint8ClampedArray) => {
        this.setState({ basepixels: pixels });
    }

    handleRemoveButtonPressed = (event : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (this.props.onRemove) {
            this.props.onRemove(this.props.ind);
        }
    }

    onOutput = (pixels : Uint8ClampedArray) => {
        if (!this.props.onNewOutput) {
            return;
        }
        // only callback (trigger other effect components' state change)
        // if comparing pixels has a result
        let differs : boolean = false;
        if (!this.last_output || pixels.length !== this.last_output.length) {
            differs = true;
        }
        else {
            for (let i = 0; i < pixels.length; i++) {
                if (this.last_output[i] !== pixels[i]) {
                    differs = true;
                    break;
                }
            }
        }
        if (differs) {
            this.props.onNewOutput(this.props.ind, pixels);
            this.last_output = pixels;
        }
        return;
    }

    getCanvasID = () => {
        return "image-canvas-" + this.props.ind;
    }

    componentDidMount() {
        this.canvas = new window.p5(getSketcher(this, this.effect), document.getElementById(this.getCanvasID()) as HTMLElement);
        console.log("EffectLayer: mounted, requesting base pixels");
        let bp = this.props.callbackContainer.getLastResultPixels();
        if (bp) {
            console.log("EffectLayer: base pixels got");
            this.setState({ basepixels : bp });
        }
        else {
            console.log("EffectLayer: no base pixels");
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
        switch (this.props.type) {
            case EffectType.Image:
            case EffectType.Mask:
                controls = (
                    <ImageControls control={this.effect.control.getControlState(this)} handlers={this.effect.control.getHandlers(this)}/>
                    );
                break;
            case EffectType.Paint:
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
                    {this.effect.name}
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
