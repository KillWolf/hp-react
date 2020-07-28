import React, { useState } from 'react';
import classes from './AddRecommendations.module.css';
import { extractData, onValueChangeHandler } from '../../../utility/Helpers/Helpers';
import { getToken } from '../../../utility/Auth/Token';
import axios from '../../../axios-instances/axios-firebase';
import Input from '../../UI/Input/Input';

const AddRecommendation = () => {

    const initialState = {
        addRecommendation: {
            title: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    label: 'TITEL'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            author: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    label: 'SKREVET AF'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            content: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'text',
                    label: 'CITAT'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
        },
        formIsValid: false
    }

    const [config, setConfig] = useState(initialState)
    const [responseMessage, setResponseMessage] = useState({ message: '', success: true, enable: false })

    const formsElementArray = [];
    for (let key in config.addRecommendation) {
        if (key !== 'formIsValid') {
            formsElementArray.push({
                id: key,
                ...config.addRecommendation[key]
            });
        }
    }

    const formInput = formsElementArray.map(formElement => {
        return (
            <div key={formElement.id} className={classes.InputContainer}>
                <label className={classes.FormLabels} for={formElement.id}>{formElement.elementConfig.label}</label>
                <Input
                    elementType={formElement.elementType}
                    elementConfig={formElement.elementConfig}
                    changed={(event) => onValueChangeHandler(event, config, 'addRecommendation', formElement.id, setConfig)}
                    value={formElement.value}
                    valid={formElement.valid}
                    shouldValidate={formElement.validation}
                    touched={formElement.touched}
                />
            </div>
        )
    })

    const recommendationHandler = (event) => {
        event.preventDefault();
        axios.post('/recommendations.json?auth=' + getToken(), extractData(config.addRecommendation))
            .then(response => {
                setResponseMessage({ message: `${config.addRecommendation.title.value} var gemt.`, success: true, enable: true })
                setTimeout(() => {
                    setResponseMessage({ message: '', success: true, enable: false })
                }, 5000)
                setConfig(initialState)
            })
            .catch(error => {
                setResponseMessage({
                    message: `${config.addRecommendation.title.value} var ikke gemt. Prøv igen, eller kontakt sønnikke`,
                    success: false,
                    enable: true
                });
                setTimeout(() => {
                    setResponseMessage({ message: '', success: true, enable: false })
                }, 10000);
            });
    }

    return (
        <form className={classes.Form} onSubmit={recommendationHandler}>
            {responseMessage.enable
                ? <div className={responseMessage.success ? classes.ResponseSuccess : classes.ResponseError}>{responseMessage.message}</div>
                : null}
            {formInput}
            <button
                className={classes.FormInputs, classes.Button}
                disabled={!config.formIsValid} type="submit" value="">
                INDSEND
            </button>
        </form>
    )
};

export default AddRecommendation;