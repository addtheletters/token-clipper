import * as React from 'react';

const INCS = 200;  // number of increments for slider

interface SliderProps {
    label: string;
    name: string;
    value: number;
    onChange: (s: string, v: number) => void;

    max?: number; // assumed 1
    min?: number; // assumed -1
}

function handleIncrementChange( 
        onValueChange : (s: string, v: number) => void,
        valMin:number = -1, valMax:number = 1) {
    return function(event : React.ChangeEvent<HTMLInputElement>) {
        let scaledValue = valMin + (parseFloat(event.target.value) / INCS * (valMax - valMin));
        return onValueChange(event.target.name, scaledValue);
    };
}

const ControlSlider: React.FC<SliderProps> = (props:SliderProps) => {
    let scaled_value = INCS * (props.value + 1) / (2);
    if (props.max && props.min) {
        scaled_value = INCS * (props.value - props.min) / (props.max - props.min);
    }
    return (
        <div className="controls-bar">
            <div className="controls-label">{props.label}</div>
            <div className="controls-label">{props.value.toFixed(2)}</div>
            <input type="range" name={props.name} value={scaled_value} className="control"
                min={0} max={INCS} onChange={handleIncrementChange(props.onChange)}/>
        </div>
    );
}

export default ControlSlider;
