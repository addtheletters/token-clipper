import * as React from 'react';

interface Props {
    onSourceChange : (url:string) => void;
}

interface State {
    selectedType : SourceType;
}

enum SourceType {
    BuiltIn = "built-in",
    LocalFile = "local-file",
    URL = "url",
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

class SourceSelector extends React.Component<Props, State> {
    constructor(props : Props) {
        super(props);
        this.state = {
            selectedType: SourceType.LocalFile
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

    handleSourceTypeChange = (event : React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({selectedType:event.target.value as SourceType});
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
