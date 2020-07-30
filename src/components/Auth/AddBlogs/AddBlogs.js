import React, { useState } from 'react';
import axios from '../../../axios-instances/axios-firebase'
import { extractData, checkValidity, linkBuilder, showResponseMessage, onValueChangeHandler } from '../../../utility/Helpers/Helpers';
import { getToken } from '../../../utility/Auth/Token';
import Input from '../../UI/Input/Input';
import classes from './AddBlogs.module.css';
import { Editor } from '@tinymce/tinymce-react';

const AddBlogs = () => {


    const initialState = {
        addBlogs: {
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
            }
        },
        error: false,
        responseMessage: '',
        loading: false,
        formIsValid: false,
    }
    let rteContent = '';
    
    const [config, setConfig] = useState(initialState);

    const formsElementArray = [];
    for (let key in config.addBlogs) {
        if (key !== 'formIsValid') {
            formsElementArray.push({
                id: key,
                ...config.addBlogs[key]
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
                    changed={(event) => onValueChangeHandler(event, config, 'addBlogs', formElement.id, setConfig)}
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
        setConfig(prevState => ({...prevState, loading: true}))
        const dataObject = extractData(config.addBlogs);
        dataObject.date = new Date();
        dataObject.author = 'Hanne Pilegaard';
        dataObject.content = rteContent;
        dataObject.publicLink = linkBuilder(config.addBlogs.title.value);
        axios.post('/blogs.json?auth=' + getToken(), dataObject)
            .then(() => {
                showResponseMessage(`${config.addBlogs.title.value} var gemt.`, initialState, false, setConfig, 5000);
            })
            .catch(() => {
                showResponseMessage(`${config.addBlogs.title.value} var ikke gemt. Prøv igen, eller kontakt sønnikke`, {}, true, setConfig, 10000);
            });
    }

    //EDITOR 
    const handleEditorChange = (content, editor) => {
        rteContent = content;
    }

    let editor = (
        <Editor
            initialValue='Skriv løs!'
            init={{
                height: 250,
                menubar: false,
                plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount'
                ],
                toolbar:
                    'undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help'
            }}
            onEditorChange={handleEditorChange}
        />)

        console.log(config);
    return (
        <form className={classes.Form} onSubmit={blogHandler}>
            {config.responseMessage
                ? <div className={config.error ? classes.ResponseError : classes.ResponseSuccess}>{config.responseMessage}</div>
                : null}
            {formInput}
            {editor}
            <button
                className={classes.FormInputs, classes.Button}
                disabled={!config.formIsValid} type="submit" value="">
                INDSEND
            </button>
        </form>
    )
};

export default AddBlogs;