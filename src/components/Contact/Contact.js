import React, { useState } from 'react';
import classes from './Contact.module.css';
import globalClasses from '../../utility/Global/Common.module.css';
import { onValueChangeHandler, showResponseMessage, extractData } from '../../utility/Helpers/Helpers';
import Input from '../UI/Input/Input';
import axios from '../../axios-instances/axios-firebase';
import Aux from '../../hoc/Aux';


const Contact = () => {
    const rootClasses = [globalClasses.Panel, classes.Contact].join(' ');

    const recommendationHandler = (event) => {
        event.preventDefault();
        axios.post('/contact.json', extractData(config.addMessage))
            .then(() => {
                showResponseMessage(`Din besked er sendt.`, initialState, false, setConfig, 5000);
            })
            .catch(() => {
                showResponseMessage(`Der opstod en fejl ved sendning. Prøv igen senere.`, {}, true, setConfig, 10000);
            });
    }

    const initialState = {
        addMessage: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    label: 'NAVN'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    label: 'MAIL ADDRESSE'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            message: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'text',
                    label: 'BESKED'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
        },
        responseMessage: '',
        error: false,
        loading: false,
        formIsValid: false,

    }

    const [config, setConfig] = useState(initialState)

    const formsElementArray = [];
    for (let key in config.addMessage) {
        formsElementArray.push({
            id: key,
            ...config.addMessage[key]
        });
    }

    const formInput = formsElementArray.map(formElement => {
        return (
            <div key={formElement.id} className={classes.InputContainer}>
                <label className={classes.FormLabels} for={formElement.id}>{formElement.elementConfig.label}</label>
                <Input
                    elementType={formElement.elementType}
                    elementConfig={formElement.elementConfig}
                    changed={(event) => onValueChangeHandler(event, config, 'addMessage', formElement.id, setConfig)}
                    value={formElement.value}
                    valid={formElement.valid}
                    shouldValidate={formElement.validation}
                    touched={formElement.touched}
                />
            </div>
        )
    })

    const formInfo = formInput.splice(0, 2);

    return (
        <Aux>
            <h1 className={globalClasses.Header}>CONTACT</h1>
            <div className={globalClasses.Panel}>
                <form className={classes.Form} onSubmit={recommendationHandler}>
                    {config.responseMessage
                        ? <div className={config.error ? classes.ResponseError : classes.ResponseSuccess}>{config.responseMessage}</div>
                        : null}
                    {config.responseMessage
                        ? <div className={config.error ? classes.ResponseError : classes.ResponseSuccess}>{config.responseMessage}</div>
                        : null}
                    <div className={classes.formInfo}>
                        {formInfo}
                    </div>
                    {formInput}
                    <button
                        className={classes.FormInputs, classes.Button}
                        disabled={!config.formIsValid} type="submit" value="">
                        INDSEND
                </button>
                </form>
            </div>
        </Aux>
    )
};

export default Contact