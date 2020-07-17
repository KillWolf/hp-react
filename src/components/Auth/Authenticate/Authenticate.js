import React, { useState } from 'react';
import { onValueChangeHandler } from '../../../utility/Helpers/Helpers'
import { authenticateUser } from '../../../utility/Auth/Token'
import Input from '../../UI/Input/Input';
import classes from './Authenticate.module.css';

const Authenticate = (props) => {

    const initialState = {
        signInForm: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    label: 'Mail adresse'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    label: 'Adgangskode'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false

    }


    const [config, setConfig] = useState(initialState);

    const formsElementArray = [];
    for (let key in config.signInForm) {
        if (key !== 'formIsValid') {
            formsElementArray.push({
                id: key,
                ...config.signInForm[key]
            });
        }
    }

    const onSignInHandler = (event) => {
        event.preventDefault();
        props.onAuth();
        authenticateUser(config.signInForm.email.value, config.signInForm.password.value, props.onAuth);
    }



    const formInput = formsElementArray.map(formElement => {
        return (
            <div key={formElement.id} className={classes.InputContainer}>
                <label className={classes.FormLabels} for={formElement.id}>{formElement.elementConfig.label}</label>
                <Input
                    elementType={formElement.elementType}
                    elementConfig={formElement.elementConfig}
                    changed={(event) => onValueChangeHandler(event, config, 'signInForm', formElement.id, setConfig)}
                    value={formElement.value}
                    valid={formElement.valid}
                    shouldValidate={formElement.validation}
                    touched={formElement.touched}
                />
            </div>
        )
    })

    return (
        <form className={classes.Form} onSubmit={onSignInHandler}>
            {formInput}
            <button
                className={classes.FormInputs, classes.Button}
                disabled={!config.formIsValid} type="submit" value="">
                LOGIN
            </button>
        </form>
    )
};

export default Authenticate;