import React from 'react';
import './App.css';
import LayerStack from './components/LayerStack';
import SizeSelector from './components/SizeSelector';

export const DEFAULT_CANVAS_SIZE = Math.pow(2, 8); // 256
export const MAX_CANVAS_SIZE = Math.pow(2, 10);    // 1024

interface State {
    canvasSize : number;
}

class App extends React.Component<any,State> {
    constructor(props:any) {
        super(props);
        this.state = { canvasSize : DEFAULT_CANVAS_SIZE };
    }

    handleSizeChange = (newSize : number) => {
        if (newSize > 0 && newSize <= MAX_CANVAS_SIZE) {
            this.setState({canvasSize : newSize});
        }
        else {
            console.error("Canvas size of " + newSize + " is not supported (max " + MAX_CANVAS_SIZE + ").");
        }
    };

    render() {
        return (
            <div className="App">
                <h1>Token Clipper</h1>
                <SizeSelector onSizeChange={this.handleSizeChange}/>
                <LayerStack canvasSize={this.state.canvasSize}/>
            </div>
        );
    }
}

export default App;
