import * as React from 'react';

const INCS = 200;  // number of increments for slider

interface SliderProps {
    label: string;
    name: string;
    value: number;
    onChange: (s: string, v: number) => void;

    max: number;
    min: number;
    units?: string;
}

function handleIncrementChange( 
        onValueChange : (s: string, v: number) => void,
        valMin:number, valMax:number) {
    return function(event : React.ChangeEvent<HTMLInputElement>) {
        let scaledValue = valMin + (parseFloat(event.target.value) / INCS * (valMax - valMin));
        return onValueChange(event.target.name, scaledValue);
    };
}

function handleNumberChange(
        onValueChange : (s: string, v: number) => void,
    ) {
    return function(event: React.ChangeEvent<HTMLInputElement>) {
        let inputted = parseFloat(event.target.value);
        return onValueChange(event.target.name, inputted);
    }
}

const ControlSlider: React.FC<SliderProps> = (props:SliderProps) => {
    let scaled_value = INCS * (props.value - props.min) / (props.max - props.min);
    let units_div = (null);
    if (props.units) {
        units_div = <div className="controls-units">{props.units ? props.units : ""}</div>;
    }
    return (
        <label className="controls-bar">
            <div className="controls-label">{props.label}</div>
            <input type="number" name={props.name} className="controls-label" value={props.value}
                onChange={handleNumberChange(props.onChange)}/>
            {units_div}
            <input type="range" name={props.name} value={scaled_value} className="control"
                min={0} max={INCS} onChange={handleIncrementChange(props.onChange, props.min, props.max)}/>
        </label>
    );
}

export default ControlSlider;
