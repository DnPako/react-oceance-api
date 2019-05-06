import * as React from 'react';

import {ReactNode} from "react";

const classes = require('./Button.module.css');

interface IButtonProps {
    clicked?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    buttonType: string;
    disabled?: boolean;
    children?: ReactNode;
}

const Button = (props: IButtonProps) => {
    return (
        <button className={[classes.Button, classes[props.buttonType]].join(' ')}
                onClick={props.clicked}
                disabled={props.disabled}>
            {props.children}
        </button>
    )
};

export default Button;