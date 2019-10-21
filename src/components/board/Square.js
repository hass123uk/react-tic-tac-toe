import React from 'react';

export function Square(props) {
    let buttonClasses = ["square"]
    if(props.highlight){
        buttonClasses = buttonClasses.concat(["highlight"])
    }
    return (
        <button
            className={buttonClasses.join(' ')}
            onClick={props.onClick}
        >
            {props.value}
        </button>
    );
}