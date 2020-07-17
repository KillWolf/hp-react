import React, { useState } from 'react';
import classes from './AddBlogs.module.css';
import { extractData, checkValidity, linkBuilder } from '../../../utility/Helpers/Helpers';
import axios from '../../../axios-instances/axios-firebase'
import { getToken } from '../../../utility/Auth/Token';
import Input from '../../UI/Input/Input';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const AddBlogs = (props) => {

    let currentContent = null;

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

    //TODO
    //1. AUTHENTICATION
    //2. PREVIEW FOR MOM TO SEE IF IT LOOKS GOOD BEFORE POSTING (Only button after posting data is preview, then submit will be available)
    //3. MAKE IT POSSIBLE TO POPULATE IF EDITING
    //4. VERIFICATION THAT A THING HAS BEEN POSTED
    // 5. PUT FORM INPUTS INTO DIFFERENT COMPONENTS
    // 6. ADD REDUX?
    //7. FFIND SIMILARITIES
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
        config.publicLink = {value: linkBuilder(config.title.value)};
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
            <button
                className={classes.FormInputs, classes.Button}
                disabled={!config.formIsValid} type="submit" value="">
                INDSEND
            </button>
        </form>
    )
};

export default AddBlogs;