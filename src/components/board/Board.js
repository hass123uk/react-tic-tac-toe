import React from 'react';
import {Square} from './Square'


export class Board extends React.Component {
    renderSquare(i) {
        let highlight = false;
        if(this.props.winningLine){
            highlight = this.props.winningLine.some((v) => v === i);
        }
        return (
            <Square
                key={i}
                highlight={highlight}
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        var squareIndex = 0;
        const rows = Array(3).fill().map((val, index) => {
            const columns = Array(3).fill().map(() => {
                return this.renderSquare(squareIndex++)
            });
            return (
                <div key={index} className="board-row">
                    {columns}
                </div>
            );
        })
        return (
            <div>
                {rows}
            </div>
        );
    }
}