import React, { useState, useEffect} from 'react';
import classes from './AuthContainer.module.css';
import globalClasses from '../../utility/Global/Common.module.css';
import AddRecommendation from './AddRecommendations/AddRecommendations';
import { checkAuthentication, resetAuthentication } from '../../utility/Auth/Token'
import AddBlog from './AddBlogs/AddBlogs';
import Authenticate from './Authenticate/Authenticate';
import Spinner from '../UI/Spinner/Spinner';
import Aux from '../../hoc/Aux';

const AuthContainer = () => {

    const rootClasses = [globalClasses.Panel, classes.AuthContainer].join(' ');

    const [selected, setSelected] = useState('blog');
    const [state, setState] = useState({ loading: false, authenticated: checkAuthentication(), selected: 'blog' });

    useEffect(() => {
        //For unmounting purpose
        return () => {
            resetAuthentication();
            setState(prevState => ({...prevState, loading: false, authenticated: checkAuthentication()}));
        }

    }, [])

    const updateStateWithNewInformation = () => {
        setState(prevState => ({ ...prevState, loading: !prevState.loading, authenticated: checkAuthentication() }));
    }

    const componentsArray = [
        { component: <AddRecommendation />, header: 'TILFØJ ANBEFALING', id: 'recommendation' },
        { component: <AddBlog />, header: 'BLOG', id: 'blog' }
    ];

    const selectedComponent = componentsArray.find(component => component.id === selected);

    const selectComponent = id => {
        setSelected(id);
    }
    
    const removeError = () => {
        setState(prevState => ({...prevState, authenticated: {token: false, errorResponse: null}}))
    }

    const componentSelection = componentsArray.map(component => {
        if (component.id === selected) return <div key={component.id} className={[classes.Header, classes.Selected].join(' ')} >{component.header}</div>
        return <div
            className={[classes.Header, classes.Unselected].join(' ')}
            key={component.id}
            onClick={() => selectComponent(component.id)}> {component.header}</div >
    })

    let template = <Spinner />;

    if (state.authenticated.token && !state.loading) {
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
    } else if (!state.authenticated.token && !state.loading) {
        template = (
            <div className={classes.Authenticate}>
                <h2>Log in</h2>
                {state.authenticated.errorResponse
                    ? <div className={classes.ResponseError}>
                        <span>{state.authenticated.errorResponse}</span>
                        <span className={classes.closeButton} onClick={removeError}>X</span>
                    </div>
                    : null}
                <Authenticate onAuth={updateStateWithNewInformation} />
            </div>
        )
    }

    return (
        <div className={rootClasses}>
            <div className={classes.Authenticate}>
                {template}
            </div>
        </div>
    )
};

export default AuthContainer;



    //TODO
    //1. SETUP WATCHER TO WARN ABOUT IMPENDING LOG OUT
    //2. PASS LOGIN STUFF FROM HERE TO AUTH TO MAKE SURE IT CAN UPDATE THE COMPONENT
    //3. MAYBE SEPERATE INTO SEPERATE MODULES? TOO MUCH IS HAPPENING HERE
    //3B. Make one authentication module that enables admin link, and redirect to it aswell (just like in burgerbuilder)
