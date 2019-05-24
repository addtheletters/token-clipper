import * as React from 'react';
import {EffectType} from './EffectLayer'

enum SourceType {
    BuiltIn = "built-in",
    LocalFile = "local-file",
    URL = "url",
}

interface Props {
    onSourceChange : (url:string) => void;
    parentEffectType ?: EffectType;
}

interface State {
    selectedType : SourceType;
    selectedBuiltIn : string;
}

function prettySource(s : SourceType): string {
    switch (s) {
        case SourceType.BuiltIn:
            return "Built-in";
        case SourceType.LocalFile:
            return "Local file";
        case SourceType.URL:
            return "URL";
        default:
            return "unknown source type";
    }
}

interface BuiltIns {
    [x:string] : string;
}

const BUILT_INS : BuiltIns = {
    "Yuratzu of Pain (167 x 173px)" : "assets/yuratzu.png",
    "Mask Circle (radius 128px)"    : "assets/circle-alpha-512.png",
    "Mask Square (side 256px)"      : "assets/square-alpha-512.png",
};

class SourceSelector extends React.Component<Props, State> {
    constructor(props : Props) {
        super(props);
        let st  = SourceType.BuiltIn;
        let sbi = Object.keys(BUILT_INS)[0];

        switch (this.props.parentEffectType) {
            case EffectType.Mask:
                st  = SourceType.BuiltIn;
                sbi = Object.keys(BUILT_INS)[1]; // circle mask
                break;
            case EffectType.Image:
                st  = SourceType.LocalFile;
                break;
            default:
                break;
        }

        this.state = {
            selectedType: st,
            selectedBuiltIn : sbi,
        };
    }

    handleURLInputChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value && event.target.value.length > 0) {
            try {
                this.props.onSourceChange((new URL(event.target.value)).toString());
            }
            catch (err){
                console.log("SourceSelector: could not interpret URL");
            }
        }
    }

    handleFileInputChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files != null && event.target.files.length > 0) {
            this.props.onSourceChange(URL.createObjectURL(event.target.files[0]));
        }
        else {
            console.error("SourceSelector: file invalid");
        }
    }

    handleBuiltInChange = (event : React.ChangeEvent<HTMLSelectElement>) => {
        if (event.target.value in BUILT_INS) {
            this.setState({selectedBuiltIn : event.target.value});
            this.props.onSourceChange(BUILT_INS[event.target.value]);
        }
        else {
            console.error("SourceSelector: built-in doesn't exist: " + event.target.value);
        }
    };

    handleSourceTypeChange = (event : React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({selectedType:event.target.value as SourceType});
        if (event.target.value === SourceType.BuiltIn) {
            // load selected built-in immediately
            this.props.onSourceChange(BUILT_INS[this.state.selectedBuiltIn]);
        }
        else {
            // clear source selection
            this.props.onSourceChange("");
        }
    }

    componentDidMount() {
        switch (this.state.selectedType) {
            case SourceType.BuiltIn:
                // if default builtin, notify to load
                this.props.onSourceChange(BUILT_INS[this.state.selectedBuiltIn]);
                break;
            default:
                break;
        }
    }

    render() {
        const typeList = Object.keys(SourceType).map(k => {
                let t = SourceType[k as any];
                return (<option value={t} key={t}>{prettySource(t as SourceType)}</option>);
            });

        let subSelector;
        switch (this.state.selectedType) {
            case SourceType.LocalFile:
                subSelector = (
                    <input type="file" accept="image/*" name="src-file"
                        onChange={this.handleFileInputChange}/>
                    );
                break;
            case SourceType.URL:
                subSelector = (
                    <input type="url" name="src-url"
                        onChange={this.handleURLInputChange}/>
                    );
                break;
            case SourceType.BuiltIn:
                let subList = Object.keys(BUILT_INS).map(k => {
                    return (<option value={k} key={k}>{k}</option>);
                });
                subSelector = (
                    <select name="src-builtin" value={this.state.selectedBuiltIn}
                        onChange={this.handleBuiltInChange}>
                        {subList}
                    </select>
                    );
                break;
            default:
                subSelector = (<div>unknown source type {this.state.selectedType}</div>);
                break;
        }

        return (
            <div className="source-select">
                <div className="source-select-type">
                    <select value={this.state.selectedType} onChange={this.handleSourceTypeChange}>
                        {typeList}
                    </select>
                </div>
                <div className="source-select-sub">
                    {subSelector}
                </div>
            </div>
        );
    }
}

export default SourceSelector;
