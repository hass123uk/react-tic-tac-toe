import React from 'react';
import {Step} from './Step';

export class StepList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAscending: true,
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
                return this.state.isAscending ?
                    a.stepNumber - b.stepNumber :
                    b.stepNumber - a.stepNumber;
            }).map((step) => {
                return (
                    <Step
                        key={step.stepNumber}
                        activeStep={step.stepNumber === (this.props.activeStepNumber)}
                        onClick={() => this.props.onStepClick(step.stepNumber)}
                        description={this.getStepDescription(step.squareChangedIndex, step.stepNumber)}
                    />
                );
            });
        return (
            <div>
                <button onClick={() => this.setState({ isAscending: !this.state.isAscending })}>
                    Order moves {this.state.isAscending ? '\u2B61' : '\u2B63'}
                </button>
                <div>{moves}</div>
            </div>
        );
    }
}