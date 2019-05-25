import * as React from 'react';
import EffectLayer from './EffectLayer';
import {ControlComponent} from '../effects/Effect';

// since react doesn't like nested state, this will be spread into
// the state of EffectLayer.
export interface FilterControlState {
    
}

export interface FilterControlHandlers {
    
}

interface Props {
    control : FilterControlState,
    handlers : FilterControlHandlers,
}

class FilterControls extends React.Component<Props> {
    static get controlFuncs () : ControlComponent {
        return {
            getHandlers     : FilterControls.getHandlers,
            getFreshState   : FilterControls.getFreshState,
            getControlState : FilterControls.getControlState,
        };
    };

    static getFreshState () {
        let state : FilterControlState = {
            
        };
        return state;
    };

    static getHandlers (el : EffectLayer) {
        let handlers : FilterControlHandlers = {
            
        }
        return handlers;
    };

    static getControlState (el : EffectLayer) {
        let ctrl : FilterControlState = {

        }
        return ctrl;
    };

    render() {
        return (
            <div className="controls">
            </div>
        );
    }
}

export default FilterControls;
