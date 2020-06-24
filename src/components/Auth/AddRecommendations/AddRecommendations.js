import React, { useState } from 'react';
import classes from './AddRecommendations.module.css';
import axios from '../../../axios-instances/axios-firebase'

const AddRecommendation = (props) => {

    const resetForm = () => { return { title: null, content: null, author: null } }

    //TODO
    //1. AUTHENTICATION
    //2. PREVIEW FOR MOM TO SEE IF IT LOOKS GOOD BEFORE POSTING (Only button after posting data is preview, then submit will be available)
    //3. MAKE IT POSSIBLE TO POPULATE IF EDITING
    //4. VERIFICATION THAT A THING HAS BEEN POSTED
    // 5. PUT FORM INPUTS INTO DIFFERENT COMPONENTS
    const [form, setForm] = useState(resetForm());

    const recommedendationHandler = (event) => {
        event.preventDefault();
        axios.post('/recommendations.json', form)
            .then(response => {
                console.log(response);
                setForm(resetForm())
            })
            .catch(error => {
                console.log(error);
            });
    }

    const onChangeHandler = (event) => {
        const newForm = {
            ...form,
            [event.target.name]: event.target.value
        }
        setForm(newForm);
    }

    return (
        <div className={classes.AddRecommendation} >
            <form className={classes.Form} onSubmit={recommedendationHandler}>
                <div className={classes.InputContainer}>
                    <label className={classes.FormLabels} for="title">TITEL</label>
                    <input className={classes.FormInputs} type="text" name="title" onChange={(event) => onChangeHandler(event)} />
                </div>
                <div className={classes.InputContainer}>
                    <label className={classes.FormLabels} for="author">SKREVET AF</label>
                    <input className={classes.FormInputs} type="text" name="author" onChange={(event) => onChangeHandler(event)} />
                </div>
                <div className={classes.InputContainer}>
                    <label className={classes.FormLabels} for="content">CITAT</label>
                    <textarea className={classes.FormInputs, classes.TextArea}
                        cols="50"
                        rows="15"
                        placeholder="Skriv citat"
                        type="text"
                        name="content"
                        onChange={(event) => onChangeHandler(event)} />
                </div>
                <input className={classes.FormInputs, classes.Button} type="submit" value="INDSEND" />
            </form>
        </div>
    )
};

export default AddRecommendation;

