import React from 'react';
import './App.css';
import LayerAdder from './components/LayerAdder'
import EffectLayer from './components/EffectLayer'
import {EffectType} from './components/EffectLayer'

const SIZE = 256;

export interface Layer {
  type : EffectType;
  key : number;
  onNewBasePixels: (pixels : Uint8ClampedArray) => void;
  getLastResultPixels: () => Uint8ClampedArray | null;
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
    if (this.state.layers.length >= 1) {
      console.log("base request for second layer");
      let end = this.state.layers.length - 1;
      baseRequest = () => {
        return this.results[end];
      };
    }

    const newLayers = this.state.layers.concat(
        { type:et,
          key:this.freeKey,
          onNewBasePixels:()=>{},
          getLastResultPixels: baseRequest,
        }
      );
    this.freeKey++;
    this.results.push(new Uint8ClampedArray(SIZE * SIZE * 4));
    this.setState({ layers : newLayers });
  }

  handleNewOutput = (effectIndex : number, pixels : Uint8ClampedArray) => {
    this.results[effectIndex] = pixels;
    if (effectIndex < this.state.layers.length - 1) {
      this.state.layers[effectIndex+1].onNewBasePixels(pixels);
    }
    return;
  }

  handleAddEffect = (et : EffectType) => {
    this.newLayer(et);
  }

  handleRemoveEffect = (ind : number) => {
    console.log("effect removal not yet implemented");
  }

  componentDidMount() {
    // initialize with one image layer
    this.newLayer(EffectType.Image);
  }

  render() {
    const layerList = this.state.layers.map((layer, index) => 
        <EffectLayer type={layer.type} size={SIZE} ind={index} callbackContainer={layer} onNewOutput={this.handleNewOutput} key={layer.key}></EffectLayer>
      );
    return (
      <div className="App">
          <h1>Token Clipper</h1>
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
