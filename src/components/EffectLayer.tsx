import * as React from 'react';
import {Layer} from '../App'
import {ImageEffectControl, ImageEffect} from './ImageEffect'

interface Props {
    size : number;
    ind : number;
    type: EffectType;
    callbackContainer: Layer;
    onNewOutput?: (eindex: number, pixels: Uint8ClampedArray) => void;
}

export interface Effect {
    name:string;
    preDraw : (s:Sketcher) => void;
    draw : (s:Sketcher) => void;
    getFreshState : ()=>{};
    getHandlers: (el:EffectLayer)=>any;
    getControlState: (el:EffectLayer)=>any;
}

interface State {
    [x:string]: any; // lifted state from inner components
    basepixels?: Uint8ClampedArray; // (size * size * 4) length
}

export enum EffectType {
    Image = "image",
    Mask = "mask",
}

function getEffect(et : EffectType) {
    switch (et) {
        case EffectType.Image:
            return ImageEffect;
        default:
            console.log("unknown effect " + et + ": defaulting to ImageEffect");
            return ImageEffect;
    }
}

export interface Sketcher extends p5 {
    props : any;
    state : any;
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
        }

        s.setup = function() {
            s.createCanvas(s.props.size, s.props.size);
        }

        function preDraw() {
            // re-fetch state.
            s.state = parent.state;

            // initialize effect
            effect.preDraw(s);

            // clear old canvas
            s.clear();

            // apply base pixels from previous layer to buffer image
            if (s.state.basepixels) {
                let psize = s.props.size * s.props.size * 4;
                s.baseImg.loadPixels();
                for (let i = 0; i < psize; i++) {
                    s.baseImg.pixels[i] = s.state.basepixels[i];
                }
                s.baseImg.updatePixels();
            }
        }

        s.draw = function() {
            preDraw();

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
            ...this.effect.getFreshState(),
        };
        this.canvas = undefined;
    }

    handleBasePixelsChanged = (pixels : Uint8ClampedArray) => {
        this.setState({ basepixels: pixels });
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
        if (this.canvas) {
            this.canvas.remove();
        }
    }

    render() {
        return (
            <div className="effect-container" id={"effect-container"+this.props.ind}>
                <div className="effect-title">{this.effect.name}</div>
                <div className="effect-canvas">
                    <div className="canvas-container" id={this.getCanvasID()}></div>
                </div>
                <ImageEffectControl control={this.effect.getControlState(this)} handlers={this.effect.getHandlers(this)}/>
            </div>
        );
    }
    // xoffset={this.state.xoffset} yoffset={this.state.yoffset} scale={this.state.scale}
}

export default EffectLayer;
