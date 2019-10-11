import React from 'react';

import { Board } from "./board";
import { History } from "./history";
import { calculateWinner } from "./calculateWinner";

export class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                squareChangedIndex: null,
                stepNumber: 0,
            }],
            activeStepNumber: 0,
            xIsNext: true,
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.activeStepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
                squareChangedIndex: i,
                stepNumber: history.length
            }]),
            activeStepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    handleStepClick(step) {
        this.setState({
            activeStepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    render() {
        const current = this.state.history[this.state.activeStepNumber];
        const result = calculateWinner(current.squares);

        let status;
        let winningLine;
        if (result) {
            status = `Winner: ${result.winner}`;
            winningLine = result.winningLine;
        } else {
            status = `Next Player: ${this.state.xIsNext ? 'X' : 'O'}`;
            winningLine = null;
        }
        
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        winningLine={winningLine}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <History
                        history={this.state.history}
                        activeStepNumber={this.state.activeStepNumber}
                        onStepClick={(stepNumber) => this.handleStepClick(stepNumber)}
                    />
                </div>
            </div>
        );
    }
}
