import React, { useState } from 'react';
import classes from './AddRecommendations.module.css';
import { extractData, onValueChangeHandler, showResponseMessage } from '../../../utility/Helpers/Helpers';
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
        responseMessage: '',
        error: false,
        loading: false,
        formIsValid: false,

    }

    const [config, setConfig] = useState(initialState)

    const formsElementArray = [];
    for (let key in config.addRecommendation) {
        formsElementArray.push({
            id: key,
            ...config.addRecommendation[key]
        });

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
            .then(() => {
                showResponseMessage(`${config.addRecommendation.title.value} var gemt.`, initialState, false, setConfig, 5000);
            })
            .catch(() => {
                showResponseMessage(`${config.addRecommendation.title.value} var ikke gemt. Prøv igen, eller kontakt sønnikke`, {}, true, setConfig, 10000);
            });
    }

    return (
        <form className={classes.Form} onSubmit={recommendationHandler}>
            {config.responseMessage
                ? <div className={config.error ? classes.ResponseError : classes.ResponseSuccess}>{config.responseMessage}</div>
                : null}
            {formInput}
            <button
                className={[classes.FormInputs, classes.Button].join(' ')}
                disabled={!config.formIsValid} type="submit" value="">
                INDSEND
            </button>
        </form>
    )
};

export default AddRecommendation;