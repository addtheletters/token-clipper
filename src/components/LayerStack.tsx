import * as React from 'react';
import LayerAdder from './LayerAdder';
import EffectLayer from './EffectLayer';
import {EffectType} from './EffectLayer';

export interface Layer {
    type : EffectType;
    key : number;
    onNewBasePixels: (pixels?: Uint8ClampedArray) => void; // empty until an EffectLayer constructor supplies it
}

interface Props {
    canvasSize : number;
}

interface State {
    layers : Array<Layer>;
}

class LayerStack extends React.Component<Props,State> {
    freeKey : number = 0;
    results : Array<Uint8ClampedArray> = [];

    constructor(props:any) {
        super(props);
        this.state = { layers : [] };
    }

    newLayer = (et : EffectType) => {
        const newLayers = this.state.layers.concat({ 
                type:et,
                key:this.freeKey,
                onNewBasePixels:()=>{},
            });
        this.freeKey++;
        this.results.push(new Uint8ClampedArray(this.props.canvasSize * this.props.canvasSize * 4));
        this.setState({ layers : newLayers });
    };

    handleNewOutput = (effectIndex : number, pixels : Uint8ClampedArray) => {
        this.results[effectIndex] = pixels;
        if (effectIndex < this.state.layers.length - 1) {
          this.state.layers[effectIndex+1].onNewBasePixels(pixels);
        }
        return;
    };

    handleAddEffect = (et : EffectType) => {
        this.newLayer(et);
    };

    handleRemoveEffect = (effectIndex : number) => {
        if (effectIndex < 0 || effectIndex >= this.state.layers.length) {
          console.error("can't remove effect at bad index " + effectIndex);
          return;
        }
        if (effectIndex < this.state.layers.length - 1) {
          if (effectIndex > 0) {
            this.state.layers[effectIndex+1].onNewBasePixels(this.results[effectIndex-1]);
          }
          else {
            this.state.layers[effectIndex+1].onNewBasePixels();
          }
        }
        this.results.splice(effectIndex, 1);
        const newLayers = this.state.layers.slice(0,effectIndex).concat(this.state.layers.slice(effectIndex+1));
        this.setState({ layers : newLayers });
        };

        handleMoveEffect = (effectIndex : number, move : number) => {
        let newIndex = effectIndex + move;
        if ( newIndex < 0 || newIndex >= this.state.layers.length) {
          console.error("can't move effect " + effectIndex + " to position " + newIndex);
        }
        const newLayers = this.state.layers.slice();
        let removed = newLayers.splice(effectIndex, 1)[0];
        newLayers.splice(newIndex, 0, removed);

        this.setState({ layers : newLayers });
        return newIndex;
    };

    componentDidMount() {
        this.newLayer(EffectType.Image);
    }

    componentDidUpdate() {
        if (this.state.layers.length > 0) {
            this.state.layers[0].onNewBasePixels();
        }
    }

    render() {
        const layerList = this.state.layers.map((layer, index) => 
            <EffectLayer key={layer.key} type={layer.type} size={this.props.canvasSize} ind={index}
                callbackContainer={layer}
                onNewOutput={this.handleNewOutput}
                onRemove={this.handleRemoveEffect}
                onMove={this.handleMoveEffect}
                isFirst={(index === 0)}
                isLast={(index === this.state.layers.length-1)}/>
          );
        return (
            <div key={this.props.canvasSize} className="layer-stack">
                <hr/>
                    <LayerAdder onAdd={this.handleAddEffect}/>
                <hr/>
                <div className="list-container">
                <div className="list-side-spacer"></div>
                <div className="effect-list">
                    {layerList}
                </div>
                <div className="list-side-spacer"></div>
                </div>
            </div>
        );
      }
}

export default LayerStack;
