import * as React from 'react';

interface MatrixTableProps {
    rows: number;
    cols: number;
    values: Array<string>;
    labels?: Array<string>;
    showInput?: Array<boolean>;
    onChange: (index:number, value:string) => void;
}

function handleCellChange(
    ind: number,
    onMatrixChange: (ind:number, val:string)=>void) {
    return function(event : React.ChangeEvent<HTMLInputElement>) {
        onMatrixChange(ind, event.target.value);
    };
}

const MatrixTable: React.FC<MatrixTableProps> = (props:MatrixTableProps) => {
    if (props.values && props.rows * props.cols !== props.values.length) {
        console.error("MatrixTable: table rows and columns don't match values");
        console.error(props.values);
        return (<div>bad table.</div>);
    }

    function MatrixCell(row: number, col: number) {
        let ind = row * props.cols + col;
        let label = (null);
        if (props.labels) {
            label = <div>{props.labels[ind]}</div>
        }
        if (props.showInput && props.showInput[ind]) {
            return (
                <div>
                {label}
                <input key={"cell-" + ind} type="number" value={props.values[ind]}
                    onChange={handleCellChange(ind, props.onChange)}/>
                </div>
            );
        }
        return (<div>{label}{props.values[ind]}</div>);
    }

    function MatrixRow(row : number) {
        let tds = Array.from(Array(props.cols).keys()).map(
                (col : number) => <td key={"col-" + col}>{MatrixCell(row, col)}</td>
            );
        return <tr key={"row-" + row}>{tds}</tr>;
    }

    let rowInds = Array.from(Array(props.rows).keys());
    let trs = rowInds.map(
            (row : number) => MatrixRow(row)
        );

    return <table><tbody>{trs}</tbody></table>;
}

export default MatrixTable;
