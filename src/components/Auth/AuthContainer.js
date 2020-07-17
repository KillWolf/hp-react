import React, { useState, useEffect } from 'react';
import classes from './AuthContainer.module.css';
import AddRecommendation from './AddRecommendations/AddRecommendations';
import { checkAuthentication } from '../../utility/Auth/Token'
import AddBlog from './AddBlogs/AddBlogs';
import Authenticate from './Authenticate/Authenticate';
import Spinner from '../UI/Spinner/Spinner';
import Aux from '../../hoc/Aux';

const AuthContainer = () => {

    const [selected, setSelected] = useState('recommendation');
    const [state, setState] = useState({ loading: false, authenticated: checkAuthentication() });

    const updateStateWithNewInformation = () => {
        setState(prevState => ({ loading: !prevState.loading, authenticated: checkAuthentication() }));
    }


    //TODO
    //1. SETUP WATCHER TO WARN ABOUT IMPENDING LOG OUT
    //2. PASS LOGIN STUFF FROM HERE TO AUTH TO MAKE SURE IT CAN UPDATE THE COMPONENT
    //3. MAYBE SEPERATE INTO SEPERATE MODULES? TOO MUCH IS HAPPENING HERE
    //3B. Make one authentication module that enables admin link, and redirect to it aswell (just like in burgerbuilder)

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

    let template = <Spinner />;

    if (state.authenticated && !state.loading) {
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
    } else if (!state.authenticated && !state.loading) {
        template = (
            <Aux>
                <h2>Log in</h2>
                <Authenticate onAuth={updateStateWithNewInformation} />
            </Aux>
        )
    }

    return (
        <div className={classes.AuthContainer}>
            {template}
        </div>
    )
};

export default AuthContainer;