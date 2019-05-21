import React from 'react';
import './App.css';
import P5Canvas from './components/P5Canvas'
import EffectLayer from './components/EffectLayer'
import {EffectType} from './components/EffectLayer'

export interface BaseCallbackContainer {
  callback: (pixels : Uint8ClampedArray) => void;
}

let baseCallbacks : Array<BaseCallbackContainer> = [];
baseCallbacks.push({callback: () => {}});
baseCallbacks.push({callback: () => {}});

function handleNewOutput(effectIndex : number, pixels : Uint8ClampedArray) {
  //console.log("effect " + effectIndex + " changed to " + pixels);
  if (effectIndex < 1) {
    baseCallbacks[effectIndex+1].callback(pixels);
  }
  return;
}

const App: React.FC = () => {
  return (
    <div className="App">
        <input type="file" id="base-image-input"/>
        <P5Canvas name="bogus"></P5Canvas>
        <div className="effect-list">
          <EffectLayer type={EffectType.Image} size={256} ind={0} baseHandlerContainer={baseCallbacks[0]} onNewOutput={handleNewOutput}></EffectLayer>
          <EffectLayer type={EffectType.Image} size={256} ind={1} baseHandlerContainer={baseCallbacks[1]} onNewOutput={handleNewOutput}></EffectLayer>
        </div>
    </div>
  );
}

export default App;
