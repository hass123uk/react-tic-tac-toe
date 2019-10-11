import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

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

class Board extends React.Component {
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

function HistoryStep(props) {
    return (
        <li>
            <button
                className={props.activeStep ? 'activeMove' : ''}
                onClick={props.onClick}
            >
                {props.description}
            </button>
        </li>
    );
}

class History extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            historyIsAscending: true,
        }
    }

    getStepDescription(index, stepNumber) {
        const totalColumns = 3;
        const column = (index % totalColumns) + 1;
        const row = Math.floor(index / totalColumns) + 1;

        return stepNumber ?
            `Go to Move #${stepNumber} (column:${column}, row:${row})` :
            'Go to game start';
    }

    render() {
        const moves = this.props.history.concat()
            .sort((a, b) => {
                return this.state.historyIsAscending ?
                    a.stepNumber - b.stepNumber :
                    b.stepNumber - a.stepNumber;
            }).map((step) => {
                return (
                    <HistoryStep
                        key={step.stepNumber}
                        activeStep={step.stepNumber === (this.props.activeStepNumber)}
                        onClick={() => this.props.onStepClick(step.stepNumber)}
                        description={this.getStepDescription(step.squareChangedIndex, step.stepNumber)}
                    />
                );
            });
        return (
            <div>
                <button onClick={() => this.setState({ historyIsAscending: !this.state.historyIsAscending })}>
                    Order moves by
                </button>
                <div>{moves}</div>
            </div>
        );
    }
}

class Game extends React.Component {
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
        const winner = calculateWinner(current.squares);

        let status;
        if (winner) {
            status = `Winner: ${winner}`;
        } else {
            status = `Next Player: ${this.state.xIsNext ? 'X' : 'O'}`;
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
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

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
