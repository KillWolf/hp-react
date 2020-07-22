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

    const recommedendationHandler = (event) => {
        console.log(getToken());
        event.preventDefault();
        axios.post('/recommendations.json?auth=' + getToken(), extractData(config))
            .then(response => {
                setConfig(initialState)
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <form className={classes.Form} onSubmit={recommedendationHandler}>
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