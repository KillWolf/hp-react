import React, { useState, useEffect } from 'react';
import classes from './AuthContaimer.module.css';
import AddRecommendation from './AddRecommendations/AddRecommendations';
import { checkAuthentication, authenticateUser } from '../../utility/Auth/Token'
import AddBlog from './AddBlogs/AddBlogs';
import Authenticate from './Authenticate/Authenticate';
import Spinner from '../UI/Spinner/Spinner';
import Aux from '../../hoc/Aux';

const Additions = () => {

    const [selected, setSelected] = useState('recommendation');
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(checkAuthentication());

    //TODO
    //1. SETUP WATCHER TO WARN ABOUT IMPENDING LOT OUT
    //2. PASS LOGIN STUFF FROM HERE TO AUTH TO MAKE SURE IT CAN UPDATE THE COMPONENT
    //3. MAYBE SEPERATE INTO SEPERATE MODULES? TOO MUCH IS HAPPENING HERE

    const onSignInHandler = (event) => {
        event.preventDefault();
        setLoading(true);
        useEffect(() => {
            authenticateUser(config.signInForm.email.value, config.signInForm.password.value, setAuthenticated);
        }, []);
    }

    const componentsArray = [
        { component: <AddRecommendation />, header: 'TILFØJ ANBEFALING', id: 'recommendation' },
        { component: <AddBlog />, header: 'BLOG', id: 'blog' }
    ];

    const selectedComponent = componentsArray.find(component => component.id === selected);

    const selectComponent = id => {
        setSelected(id);
    }

    const componentSelection = componentsArray.map(component => {
        if (component.id === selected) return <div key={component.id} className={[classes.Header, classes.Selected].join(' ')} >{component.header}</div>
        return <div
            className={[classes.Header, classes.Unselected].join(' ')}
            key={component.id}
            onClick={() => selectComponent(component.id)}> {component.header}</div >
    })

    let template = <Spinner />

    if (authenticated) {
        template = (
            <Aux>
                <div className={classes.MenuList}>
                    {componentSelection}
                </div>
                <div className={classes.ComponentContainer}>
                    {selectedComponent.component}
                </div>
            </Aux>
        )
    } else {
        template = <Authenticate signIn={onSignInHandler} />
    }

    return (
        <div className={classes.Additions}>
            {template}
        </div>
    )
};

export default Additions;