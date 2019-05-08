export type InputConfigType = {
    elementType: 'input' | 'textarea' | 'select',
    elementConfig: {
        type: 'email' | 'password' | 'input' | 'number',
        placeholder: string,
        options?: { value: string, displayValue: string }[]
    },
    label: string,
    value: string,
    valid?: boolean,
    dirty?: boolean,
    rules: IRule,
};

export interface IRule {
    isEmail?: boolean;
    minLength?: number;
    required?: boolean;
    isConfirm?: boolean;
    length?: number;
}