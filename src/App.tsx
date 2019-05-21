import React from 'react';
import './App.css';
import LayerAdder from './components/LayerAdder'
import EffectLayer from './components/EffectLayer'
import {EffectType} from './components/EffectLayer'

const SIZE = 256;

export interface Layer {
  type : EffectType;
  callback: (pixels : Uint8ClampedArray) => void;
  key : number;
}

// <EffectLayer type={EffectType.Image} size={SIZE} ind={0} callbackContainer={layers[0]} onNewOutput={handleNewOutput}></EffectLayer>
// <EffectLayer type={EffectType.Image} size={SIZE} ind={1} callbackContainer={layers[1]} onNewOutput={handleNewOutput}></EffectLayer>

interface State {
  layers : Array<Layer>;
}

class App extends React.Component<any,State> {
  freeKey : number = 0;

  constructor(props:any) {
    super(props);
    this.state = { layers : [] };
  }

  newLayer = (et : EffectType) => {
    const newLayers = this.state.layers.concat({type:et, callback:()=>{}, key:this.freeKey});
    this.freeKey++;
    this.setState({ layers : newLayers });
  }

  handleNewOutput = (effectIndex : number, pixels : Uint8ClampedArray) => {
    //console.log("effect " + effectIndex + " changed to " + pixels);
    if (effectIndex < this.state.layers.length - 1) {
      this.state.layers[effectIndex+1].callback(pixels);
    }
    return;
  }

  handleAddEffect = (et : EffectType) => {
    console.log(et);
    this.newLayer(et);
  }

  handleRemoveEffect = (ind : number) => {
    console.log("effect removal not yet implemented");
  }

  componentDidMount() {
    // initialize with two image layers, for testing
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
