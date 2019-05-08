import {InputConfigType, IRule} from "./components/UI/Input/inputTypes";

export const copyObject = (p_object: object): any => {
    return JSON.parse(JSON.stringify(p_object));
};

const validateEmail = (email: string) => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
};

export const isAllInputsValidated = (formOptions: { [key: string]: InputConfigType }) => {
    let isValid: boolean = true;

    for (const option in formOptions) {
        // @ts-ignore
        isValid = formOptions[option].valid && formOptions[option].dirty && isValid;
    }

    return isValid;
};

export const checkInputValidation = (value: string, rule: IRule, options: { [key: string]: any } | null) => {
    let isValid = true;
    if (rule.required) {
        isValid = value.trim() !== "" && isValid;

        if (parseInt(value) === -1) isValid = false;
    }

    if (rule.length) {
        isValid = value.length === rule.length && isValid;
    }

    if (rule.minLength) {
        isValid = value.length >= rule.minLength && isValid;
    }

    if (rule.isEmail) {
        isValid = validateEmail(value);
    }

    if (rule.isConfirm && options) {
        isValid = value === options.passwordOri && isValid;
    }

    return isValid;
};
