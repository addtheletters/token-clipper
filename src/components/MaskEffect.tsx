import * as React from 'react';
import EffectLayer, {Effect, Sketcher} from './EffectLayer'

const INCS = 100; // number of increments per (0,1) interval for slider
const MAX_SCALE = 5;

// since react doesn't like nested state, this will be spread into
// the state of EffectLayer.
interface MaskEffectState {
    xoffset : number;
    yoffset : number;
    scale : number;
    src?: string;
}

interface MaskEffectHandlers {
    onSliderChange: (name:string, value:number) => void;
    onSourceChange: (url:string) => void;
}

interface Props {
    control : MaskEffectState,
    handlers : MaskEffectHandlers,
}

export var MaskEffect : Effect = {
    name : "Mask",

    preDraw : (s:Sketcher) => {
        
    },

    draw : (s:Sketcher) => {
        
    },

    getFreshState : () => {
        return {};
    },

    getHandlers: (el:EffectLayer)=>{

    },
    getControlState: (el:EffectLayer) => {

    },
}

export class MaskEffectControl extends React.Component<Props> {
    handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.props.handlers.onSliderChange(event.target.name, parseFloat(event.target.value) / INCS);
    }

    handleSourceChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files != null && event.target.files.length > 0) {
            this.props.handlers.onSourceChange(URL.createObjectURL(event.target.files[0]));
        }
        else {
            console.error("MaskEfectControl: file invalid");
        }
    }

    render() {
        const xoffset_scaled = this.props.control.xoffset * INCS;
        const yoffset_scaled = this.props.control.yoffset * INCS;
        const scale_scaled = this.props.control.scale * INCS;
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

