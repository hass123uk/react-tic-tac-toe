import React from 'react';

function Square(props) {
    return (
        <button
            className="square"
            onClick={props.onClick}
        >
            {props.value}
        </button>
    );
}

export class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
                key={i}
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