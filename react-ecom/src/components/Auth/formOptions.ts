import {InputConfigType} from '../UI/Input/inputTypes';

const options: { [key: string]: InputConfigType } = {
    email: {
        elementType: 'input',
        elementConfig: {
            type: 'email',
            placeholder: 'Email address'
        },
        label: 'Email',
        value: '',
        valid: false,
        dirty: false,
        rules: {
            required: true,
            isEmail: true
        }
    },
    password: {
        elementType: 'input',
        elementConfig: {
            type: 'password',
            placeholder: 'Password'
        },
        label: 'Password',
        value: '',
        valid: false,
        dirty: false,
        rules: {
            required: true,
            minLength: 6
        }
    },
    confirmPassword: {
        elementType: 'input',
        elementConfig: {
            type: 'password',
            placeholder: 'Confirm password'
        },
        label: 'Confirm password',
        value: '',
        valid: false,
        dirty: false,
        rules: {
            isConfirm: true
        }
    }
};

export default options;