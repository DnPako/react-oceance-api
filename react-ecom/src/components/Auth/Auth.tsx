import * as React from 'react';
import {connect} from 'react-redux';

import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import {copyObject, checkInputValidation, isAllInputsValidated} from "../../utils";
import {InputConfigType} from '../UI/Input/inputTypes';
import formOptions from "./formOptions";
import * as actions from '../../store/actions/auth';
import {IAuthenticationData, AuthActionType} from '../../store/types';
import {ThunkDispatch} from "redux-thunk";
import ErrorHandler from '../../HOC/ErrorHandler';

const classes = require('./Auth.module.css');

interface IAuthProps {
    onAuth: (data: IAuthenticationData, isSignUp: boolean) => void
}

interface IAuthState {
    isSignUp: boolean;
    formIsValid: boolean;
    formOptions: { [key: string]: InputConfigType };
}

class Auth extends React.PureComponent<IAuthProps, IAuthState> {
    state = {
        formIsValid: false,
        isSignUp: true,
        formOptions: copyObject(formOptions)
    };

    // Validate input on each change
    inputChangedHandler = (event: any, key: string) => {
        const formOptionsCpy: { [key: string]: InputConfigType } = {...this.state.formOptions};
        let additionalOptionsForValidation = null;
        formOptionsCpy[key].value = event.target.value;
        formOptionsCpy[key].dirty = true;

        if (formOptionsCpy.confirmPassword.dirty) {
            additionalOptionsForValidation = {'passwordOri': formOptionsCpy.password.value};
            if (key === "password") {
                formOptionsCpy.confirmPassword.valid = false;

                additionalOptionsForValidation.passwordOri = formOptionsCpy.confirmPassword.value;
                if (this.isIdenticalPasswords(formOptionsCpy))
                    formOptionsCpy.confirmPassword.valid = true;
            }
        }

        formOptionsCpy[key].valid = checkInputValidation(formOptionsCpy[key].value, formOptionsCpy[key].rules, additionalOptionsForValidation);

        const formIsValid = this.checkFormValidation(formOptionsCpy);
        this.setState({formOptions: formOptionsCpy, formIsValid});
    };

    checkFormValidation = (formOptions: { [key: string]: InputConfigType }) => {
        const formOptionsToCheck: { [key: string]: InputConfigType } = {...formOptions};

        if (!this.state.isSignUp) {
            delete formOptionsToCheck["confirmPassword"];
        }

        return isAllInputsValidated(formOptionsToCheck);
    };

    isIdenticalPasswords = (formOptions: { [key: string]: InputConfigType }) => {
        return formOptions.password.value === formOptions.confirmPassword.value;
    };

    switchAuthMode = () => {
        const formOptionsCpy: { [key: string]: InputConfigType } = copyObject(formOptions);
        const authMode = this.state.isSignUp;

        // Init State and switch mode
        this.setState({
            formOptions: formOptionsCpy,
            formIsValid: false,
            isSignUp: !authMode
        });
    };

    submitAccount = (e: any) => {
        e.preventDefault();
        const {email, password} = this.state.formOptions;

        this.props.onAuth({email: email.value, password: password.value}, this.state.isSignUp);
    };

    renderInputs = () => {
        let inputs = [];

        for (const option in this.state.formOptions) {
            if (!this.state.isSignUp && option === "confirmPassword")
                break;

            const inputOptions: InputConfigType = this.state.formOptions[option];
            inputs.push(
                <Input
                    key={option}
                    inputOptions={inputOptions}
                    changed={(e: any) => this.inputChangedHandler(e, option)}
                >{inputOptions.label}</Input>
            );
        }

        return inputs;
    };

    render() {
        return (
            <div className={classes.Auth}>
                <h5 onClick={this.switchAuthMode}>
                    Sign {this.state.isSignUp ? "in" : "up"}
                </h5>
                <form onSubmit={this.submitAccount}>
                    {this.renderInputs()}
                    <Button
                        buttonType="Success"
                        disabled={!this.state.formIsValid}
                    >
                        SIGN {this.state.isSignUp ? "UP" : "IN"}
                    </Button>
                </form>
            </div>
        );
    }
}

// @ts-ignore
const mapStateToProps = ({auth: {error}}) => {
    return {
        error
    };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<IAuthState, void, AuthActionType>) => {
    return {
        onAuth: (data: IAuthenticationData, isSignUp: boolean) => dispatch(actions.authenticate(data, isSignUp))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(Auth));