import React from 'react';

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

export class History extends React.Component {
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