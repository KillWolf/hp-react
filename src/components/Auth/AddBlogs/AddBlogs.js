import React, { useState } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from '../../../axios-instances/axios-firebase'
import { extractData, checkValidity, linkBuilder } from '../../../utility/Helpers/Helpers';
import { getToken } from '../../../utility/Auth/Token';
import Input from '../../UI/Input/Input';
import classes from './AddBlogs.module.css';

const AddBlogs = () => {
    let currentContent = null;
    let editor = () => {
        return (
            <CKEditor
                editor={ClassicEditor}
                data="Skriv løs!"
                onInit={editor => {
                    // You can store the "editor" and use when it is needed.
                    console.log('Editor is ready to use!', editor);
                }}
                onChange={(event, editor) => {
                    currentContent = editor.getData();
                    //console.log( { event, editor, data } );
                }}
                onBlur={(event, editor) => {
                    console.log('Blur.', editor);
                }}
                onFocus={(event, editor) => {
                    console.log('Focus.', editor);
                }}
            />
        )
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
        formIsValid: false
    }

    const [config, setConfig] = useState(initialState);
    const [showMessage, setShowMessage] = useState({ success: true, show: false });

    const onValueChangeHandler = (event, key) => {
        const updatedConfig = { ...config };
        const updatedConfigElement = { ...config[key] }
        updatedConfigElement.value = event.target.value;
        updatedConfigElement.valid = checkValidity(updatedConfigElement.value, updatedConfigElement.validation);
        updatedConfigElement.touched = true;
        updatedConfig[key] = updatedConfigElement;

        let formIsValid = true;
        for (let key in updatedConfig) {
            if (key !== 'formIsValid') {
                console.log(updatedConfig[key].valid)
                updatedConfig.formIsValid = updatedConfig[key].valid && formIsValid;
            }
        }

        setConfig(updatedConfig)
    }

    const formsElementArray = [];
    for (let key in config) {
        if (key !== 'formIsValid' && key !== 'content') {
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
        config.content = { value: currentContent };
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
            {editor()}
            <button
                className={classes.FormInputs, classes.Button}
                disabled={!config.formIsValid} type="submit" value="">
                INDSEND
            </button>
        </form>
    )
};

export default AddBlogs;