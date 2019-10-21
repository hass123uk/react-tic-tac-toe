import React from 'react';

export function Step(props) {
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