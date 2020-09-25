import React, { useState } from 'react';
import classes from './Contact.module.css';
import globalClasses from '../../utility/Global/Common.module.css';
import { onValueChangeHandler, showResponseMessage, extractData } from '../../utility/Helpers/Helpers';
import Input from '../UI/Input/Input';
import axios from '../../axios-instances/axios-firebase';
import Aux from '../../hoc/Aux';


const Contact = () => {
    const recommendationHandler = (event) => {
        event.preventDefault();
        if (!config.rejectSubmission) {
            axios.post('/contact.json', extractData(config.addMessage))
                .then(() => {
                    showResponseMessage(`Din besked er sendt.`, initialState, false, setConfig, 5000);
                })
                .catch(() => {
                    showResponseMessage(`Der opstod en fejl ved sendning. Prøv igen senere.`, {}, true, setConfig, 10000);
                });
        }
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
            subject: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    label: 'EMNE'
                },
                value: '',
                validation: {
                    required: true
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
        rejectSubmission: false
    }

    const [config, setConfig] = useState(initialState)

    const formsElementArray = [];
    for (let key in config.addMessage) {
        formsElementArray.push({
            id: key,
            ...config.addMessage[key]
        });
    }

    const getDemBots = () => {
        setConfig((prevState) => ({ ...prevState, rejectSubmission: !prevState.rejectSubmission }))
    }

    const formInput = formsElementArray.map(formElement => {
        return (
            <div key={formElement.id} className={classes.InputContainer}>
                <label className={classes.FormLabels} htmlFor={formElement.id}>{formElement.elementConfig.label}</label>
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
            <div id="panel" className={globalClasses.Panel}>
                <form className={classes.ContactForm} onSubmit={recommendationHandler}>
                    {config.responseMessage
                        ? <div id="responseMessage" className={config.error ? classes.ResponseError : classes.ResponseSuccess}>{config.responseMessage}</div>
                        : null}
                    <div className={classes.formInfo}>
                        {formInfo}
                    </div>
                    {formInput}
                    <button
                        className={[classes.FormInputs, classes.Button].join(' ')}
                        disabled={!config.formIsValid} type="submit" value="">
                        INDSEND
                    </button>
                    <div style={{ position: 'absolute', left: '-999999px' }}>
                        <input onClick={getDemBots} type="checkbox" id="ta" />
                        <label htmlFor="ta"> Do you consent to the T/A?</label><br></br>
                    </div>
                </form>
            </div>
        </Aux>
    )
};

export default Contact