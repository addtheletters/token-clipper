import * as React from 'react';
import EffectLayer from './EffectLayer';
import {ControlComponent} from '../effects/Effect';
import {getUserInstanceName} from '../effects/CodeEffect';

// since react doesn't like nested state, this will be spread into
// the state of EffectLayer.
export interface CodeControlState {
    codeText : string;
    errorText : string;
    shouldEval : boolean;
}

export interface CodeControlHandlers {
    onCodeChange       : (code : string) => void;
    onShouldEvalChange : (should : boolean) => void;
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
            errorText : "[-------------]",
            shouldEval : false,
        };
        return state;
    };

    static getHandlers (el : EffectLayer) {
        let handlers : CodeControlHandlers = {
            onCodeChange: (code: string) => {
                el.setState({ codeText: code });
            },

            onShouldEvalChange: (should : boolean) => {
                el.setState({ shouldEval: should });
            },
        };
        return handlers;
    };

    static getControlState (el : EffectLayer) {
        let ctrl : CodeControlState = {
            codeText : el.state.codeText,
            errorText: el.state.errorText,
            shouldEval: el.state.shouldEval,
        };
        return ctrl;
    };

    handleTextFieldChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.props.handlers.onCodeChange(event.target.value);
    };

    handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.props.handlers.onShouldEvalChange(event.target.checked);
    };

    render() {
        return (
            <div className="controls">
                <div className="controls-top">
                    <label className="controls-bar">
                        <div className="controls-label">Run</div>
                        <input type="checkbox" className="controls-toggle control"
                            checked={this.props.control.shouldEval} onChange={this.handleCheckboxChange}/>
                    </label>
                    <div className="controls-bar controls-info"> instance name: `{getUserInstanceName()}`</div>
                    <div className="controls-bar controls-info"> {this.props.control.errorText} </div>
                </div>
                <div className="controls-bottom">
                    <div className="controls-area">
                        <textarea className="code-area"
                                value={this.props.control.codeText}
                                onChange={this.handleTextFieldChange}></textarea>
                    </div>
                </div>
            </div>
        );
    }
}

export default CodeControls;
