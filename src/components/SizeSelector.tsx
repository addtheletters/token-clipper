import * as React from 'react';
import {DEFAULT_CANVAS_SIZE, MAX_CANVAS_SIZE} from '../App'

interface Props {
    onSizeChange : (newSize : number) => void;
}

interface State {
    inputCanvasSize : string;
}

//const BUILT_INS = [...Array.from(Array(10).keys()).filter((i) => i > 4), 100];

class SizeSelector extends React.Component<Props, State> {
    constructor(props : Props) {
        super(props);
        this.state = {
            inputCanvasSize: DEFAULT_CANVAS_SIZE.toString(),
        };
    }

    handleSubmit = (event : React.FormEvent<HTMLFormElement>) => {
        let sizeNum = parseInt(this.state.inputCanvasSize);
        if (sizeNum) {
            this.props.onSizeChange(sizeNum);
        }
        event.preventDefault();
    };

    handleInputChanged = (event : React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ inputCanvasSize: event.target.value });
    };

    render() {
        return (
            <div className="size-selector">
                <form onSubmit={this.handleSubmit}>
                <div>Size (pixels):</div>
                <input type="number" min={1} max={MAX_CANVAS_SIZE} value={this.state.inputCanvasSize}
                    onChange={this.handleInputChanged}/>
                <input type="submit" value="apply"/>
                </form>
            </div>
        );
    }
}

export default SizeSelector;
