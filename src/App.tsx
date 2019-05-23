import React from 'react';
import './App.css';
import LayerAdder from './components/LayerAdder'
import EffectLayer from './components/EffectLayer'
import {EffectType} from './components/EffectLayer'

export const TOKEN_SIZE = 256;

export interface Layer {
    effectType : EffectType;
    key : number;
    onNewBasePixels: (pixels : Uint8ClampedArray) => void; // empty until an EffectLayer constructor supplies it
    getLastResultPixels: () => Uint8ClampedArray | null;   // hacky implementation, only call once during layer creation
}

interface State {
    layers : Array<Layer>;
}

class App extends React.Component<any,State> {
  freeKey : number = 0;
  results : Array<Uint8ClampedArray> = [];

  constructor(props:any) {
    super(props);
    this.state = { layers : [] };
  }

  newLayer = (et : EffectType) => {
    let baseRequest : () => Uint8ClampedArray | null = () => null;

    // when adding a new layer, this is a hacky way of getting
    // the most recent result from the previously final layer.
    // trying to call this function again after some layer removals
    // have been performed will fail. this should probably be replaced.
    if (this.state.layers.length >= 1) {
      let end = this.state.layers.length - 1;
      baseRequest = () => {
        return this.results[end];
      };
    }

    const newLayers = this.state.layers.concat({
          key:this.freeKey,
          effectType:et,
          onNewBasePixels:()=>{},
          getLastResultPixels: baseRequest,
       });
    this.freeKey++;
    this.results.push(new Uint8ClampedArray(TOKEN_SIZE * TOKEN_SIZE * 4));
    this.setState({ layers : newLayers });
  }

  handleNewOutput = (effectIndex : number, pixels : Uint8ClampedArray) => {
    this.results[effectIndex] = pixels;
    if (effectIndex < this.state.layers.length - 1) {
      this.state.layers[effectIndex+1].onNewBasePixels(this.results[effectIndex]);
    }
    return;
  }

  handleAddEffect = (et : EffectType) => {
    this.newLayer(et);
  }

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
        this.state.layers[effectIndex+1].onNewBasePixels(new Uint8ClampedArray(TOKEN_SIZE * TOKEN_SIZE * 4));
      }
    }
    const newLayers = this.state.layers.slice(0,effectIndex).concat(this.state.layers.slice(effectIndex+1));
    this.results = this.results.splice(effectIndex, 1);
    this.setState({ layers : newLayers });
  }

  componentDidMount() {
    this.newLayer(EffectType.Image);
  }

  render() {
    const layerList = this.state.layers.map((layer, index) => 
        <EffectLayer key={layer.key} effectType={layer.effectType} tokenSize={TOKEN_SIZE} ind={index}
            callbackContainer={layer}
            onNewOutput={this.handleNewOutput}
            onRemove={this.handleRemoveEffect}/>
      );
    return (
      <div className="App">
          <h1>Token Clipper (test 1)</h1>
          <hr/>
          <LayerAdder onAdd={this.handleAddEffect}/>
          <hr/>
          <div className="effect-list">
            {layerList}
          </div>
      </div>
    );
  }
}

export default App;
