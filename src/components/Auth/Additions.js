import React, { useState } from 'react';
import classes from './Additions.module.css';
import AddRecommendation from './AddRecommendations/AddRecommendations';
import AddBlog from './AddBlogs/AddBlogs'

const Additions = (props) => {

    const [selected, setSelected] = useState('recommendation')

    const componentsArray = [
        { component: <AddRecommendation />, header: 'TILFØJ ANBEFALING', id: 'recommendation' },
        { component: <AddBlog />, header: 'BLOG', id: 'blog' }
    ];

    const selectedComponent = componentsArray.find(component => component.id === selected);


    const selectComponent = id => {
        setSelected(id);
    }

    const componentSelection = componentsArray.map(component => {
        if (component.id === selected) return <div className={[classes.Header, classes.Selected].join(' ')} >{component.header}</div>
        return <div
            className={[classes.Header, classes.Unselected].join(' ')}
            onClick={() => selectComponent(component.id)}> {component.header}</div >
    })

    return (
        <div className={classes.Additions}>
            <div className={classes.MenuList}>
                {componentSelection}
            </div>
            {selectedComponent.component}
        </div>
    )
};

export default Additions;