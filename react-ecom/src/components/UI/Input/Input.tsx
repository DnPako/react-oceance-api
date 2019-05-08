import * as React from 'react';

import {InputConfigType} from "./inputTypes";

const classes = require('./Input.module.css');

interface IInputProps {
    inputOptions: InputConfigType;
    children: React.ReactNode;
    changed: (event: any) => void
}

const Input = (props: IInputProps) => {
    const {elementType, valid, dirty, value, elementConfig} = props.inputOptions;
    const inputClasses = [classes.InputElement];
    let validationError = null;

    if (!valid && dirty) {
        inputClasses.push(classes.Invalid);
        validationError = <p className={classes.ErrorField}>Please enter a valid value!</p>;
    }

    const inputs: { [key: string]: any } = {
        'input': (<input className={inputClasses.join(' ')} onChange={props.changed}
                         value={value} {...elementConfig} />),
        'textarea': (<textarea className={inputClasses.join(' ')} onChange={props.changed}
                               value={value} {...elementConfig} />),
    };

    if (elementType === "select") {
        const {options} = elementConfig;
        inputs[elementType] = (<select className={inputClasses.join(' ')}
                                       onChange={props.changed}
                                       value={value}>
                // @ts-ignore
                {options.map(opt => (
                    <option value={opt.value} key={opt.value}>
                        {opt.displayValue}
                    </option>
                ))}
            </select>
        );
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.children}</label>
            {inputs[elementType]}
            {validationError}
        </div>
    )
};

export default Input;