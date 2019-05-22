import * as React from 'react';
import EffectLayer, {ControlComponent} from './EffectLayer'

// since react doesn't like nested state, this will be spread into
// the state of EffectLayer.
export interface CodeControlState {
    codeText : string;
}

export interface CodeControlHandlers {
    onCodeChanged : (code : string) => void;
}

interface Props {
    control : CodeControlState,
    handlers : CodeControlHandlers,
}

class CodeControls extends React.Component<Props> {
    static get controlFuncs () : ControlComponent {
        return {
            getFreshState : CodeControls.getFreshState,
            getHandlers : CodeControls.getHandlers,
            getControlState : CodeControls.getControlState,
        };
    };

    static getFreshState () {
        let state : CodeControlState = {
            codeText : "",
        };
        return state;
    };

    static getHandlers (el : EffectLayer) {
        let handlers : CodeControlHandlers = {
            onCodeChanged: (code: string) => {
                el.setState({ codeText: code });
            }
        };
        return handlers;
    };

    static getControlState (el : EffectLayer) {
        let ctrl : CodeControlState = {
            codeText : el.state.codeText,
        };
        return ctrl;
    };

    handleTextFieldChanged = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.props.handlers.onCodeChanged(event.target.value);
    };

    render() {
        return (
            <div className="controls">
                <div className="controls-top">
                    // (TBD is your p5 painter object. go wild!)
                </div>
                <div className="controls-bottom">
                    <textarea value={this.props.control.codeText} onChange={this.handleTextFieldChanged}></textarea>
                </div>
            </div>
        );
    }
}

export default CodeControls;
