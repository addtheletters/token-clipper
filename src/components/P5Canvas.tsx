import * as React from 'react';

export interface Props {
    name:string;
}

interface State {
    fizz:string;
}

class P5Canvas extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { fizz: props.name + "!!!" };
    }

    doSomethingBob = () => {
        this.setState( { fizz : this.state.fizz + " yo" } );
    }

    render() {
        const { name } = this.props;

        return (
            <div>
                <div>This will be a canvas. {name} {this.state.fizz}</div>
                <button onClick={this.doSomethingBob}>yes</button>
            </div>
        );
    }
}

export default P5Canvas;
