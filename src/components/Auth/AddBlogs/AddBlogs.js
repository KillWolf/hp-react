import React, { useState, useRef } from 'react';
import JoditEditor from "jodit-react";
import axios from '../../../axios-instances/axios-firebase'
import { extractData, checkValidity, linkBuilder } from '../../../utility/Helpers/Helpers';
import { getToken } from '../../../utility/Auth/Token';
import Input from '../../UI/Input/Input';
import classes from './AddBlogs.module.css';
import { configure } from '@testing-library/react';

const AddBlogs = () => {
    let currentContent = null;
    const editor = useRef(null)
    const editorConfig = {
        readonly: false, // all options from https://xdsoft.net/jodit/doc/
        askBeforePasteHTML: false
    }
    
    const initialState = {
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
        excerpt: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                label: 'EXCERPT'
            },
            value: '',
            validation: {
                required: true,
            },
            valid: false,
            touched: false
        },
        content: null,
        formIsValid: false,
        error: false
    }

    const [config, setConfig] = useState(initialState);
    const editorVariable = (
        <JoditEditor
            ref={editor}
            value={config.content}
            config={editorConfig}
            tabIndex={1} // tabIndex of textarea
            onBlur={(newContent => setConfig(prevState => ({...prevState, content: newContent})))} // preferred to use only this option to update the content for performance reasons
            onChange={newContent => { }}
        />
    )

    const onValueChangeHandler = (event, key) => {
        const updatedConfig = { ...config };
        const updatedConfigElement = { ...config[key] }
        updatedConfigElement.value = event.target.value;
        updatedConfigElement.valid = checkValidity(updatedConfigElement.value, updatedConfigElement.validation);
        updatedConfigElement.touched = true;
        updatedConfig[key] = updatedConfigElement;

        let formIsValid = true;
        for (let key in updatedConfig) {
            if (key !== 'formIsValid' && key !== 'error' && key !== 'content') {
                console.log(updatedConfig[key].valid)
                updatedConfig.formIsValid = updatedConfig[key].valid && formIsValid;
            }
        }

        console.log(config, editor);

        setConfig(updatedConfig)
    }

    const formsElementArray = [];
    for (let key in config) {
        if (key !== 'formIsValid' && key !== 'content' && key !== 'error' && key !== 'content') {
            formsElementArray.push({
                id: key,
                ...config[key]
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
                    changed={(event) => onValueChangeHandler(event, formElement.id)}
                    value={formElement.value}
                    valid={formElement.valid}
                    shouldValidate={formElement.validation}
                    touched={formElement.touched}
                />
            </div>
        )
    })


    const blogHandler = (event) => {
        event.preventDefault();
        config.date = { value: new Date() };
        config.author = { value: 'Hanne Pilegaard' }
        config.content = { value: config.content };
        config.publicLink = { value: linkBuilder(config.title.value) };
        axios.post('/blogs.json?auth=' + getToken(), extractData(config))
            .then(() => {
                setConfig(initialState)
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <form className={classes.Form} onSubmit={blogHandler}>
            {formInput}
            {editorVariable}
            <button
                className={classes.FormInputs, classes.Button}
                disabled={!config.formIsValid} type="submit" value="">
                INDSEND
            </button>
        </form>
    )
};

export default AddBlogs;