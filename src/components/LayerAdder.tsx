import * as React from 'react';
import {EffectType} from '../effects/Effect';

export interface Props {
    onAdd : (et : EffectType) => void;
}

interface State {
    selected : EffectType;
}

class LayerAdder extends React.Component<Props, State> {
    effects : Array<EffectType>;

    constructor(props: Props) {
        super(props);
        this.effects = [];
        for (let e in EffectType) {
            this.effects.push(EffectType[e] as EffectType);
        }
        this.state = {selected:this.effects[0]};
    }

    handleSelection = (event : React.ChangeEvent<HTMLSelectElement>) => {
        let i : number;
        for (i = 0; i < this.effects.length; i++) {
            if (this.effects[i] === event.target.value) {
                this.setState({ selected : this.effects[i] });
            }
        }
    }

    handleAdd = () => {
        this.props.onAdd(this.state.selected);
    }

    render() {
        const effectList = this.effects.map((effect) => 
                <option value={effect} key={effect}>{effect}</option>
            );
        return (
            <div>
                <div>effects?</div>
                <select value={this.state.selected} onChange={this.handleSelection}>
                    {effectList}
                </select>
                <button onClick={this.handleAdd}>add</button>
            </div>
        );
    }
}

export default LayerAdder;
