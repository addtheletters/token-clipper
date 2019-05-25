import * as React from 'react';
import EffectLayer from './EffectLayer';
import {ControlComponent} from '../effects/Effect';

// since react doesn't like nested state, this will be spread into
// the state of EffectLayer.
export interface PlaceholderControlState {
    
}

export interface PlaceholderControlHandlers {
    
}

interface Props {
    control : PlaceholderControlState,
    handlers : PlaceholderControlHandlers,
}

class PlaceholderControls extends React.Component<Props> {
    static get controlFuncs () : ControlComponent {
        return {
            getHandlers     : PlaceholderControls.getHandlers,
            getFreshState   : PlaceholderControls.getFreshState,
            getControlState : PlaceholderControls.getControlState,
        };
    };

    static getFreshState () {
        let state : PlaceholderControlState = {
            
        };
        return state;
    };

    static getHandlers (el : EffectLayer) {
        let handlers : PlaceholderControlHandlers = {
            
        }
        return handlers;
    };

    static getControlState (el : EffectLayer) {
        let ctrl : PlaceholderControlState = {

        }
        return ctrl;
    };

    // internal handlers here; event => extracted data to pass through to higher-level handler
    // handleSomething = (event) => {this.props.handlers.onSomething( event.target.value );};

    render() {
        return (
            <div className="controls">
            </div>
        );
    }
}

export default PlaceholderControls;
