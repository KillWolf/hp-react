import React,  {useEffect, useState} from 'react';
import axios from '../../../axios-instances/axios-firebase'
import { Redirect } from 'react-router-dom';
import classes from './Blog.module.css';
import HeroImage from '../../../utility/HeroImage/HeroImage'

const Blog = (props) => {
    //TODO
    // 1. MAKE EMPTY BLOG
    // 2. ERROR HANDLING
    // 3. EDIT BUTTON

    //MAKE IT WORK WITH EITHER GETTING IT PASSED, OR MAKING A CALL

    

    const [config, setConfig] = useState({ loading: true, blog: {} });
    useEffect(() => {
        //if(props.location.state && props.location.state.blog)
        axios.get('/blogs.json')
            .then(response => {
                const entries = Object.entries(response.data);
                const blogsArray = entries.map(entry => {
                    return { id: entry[0], ...entry[1], date: new Date(entry[1].date) }
                })
                setConfig({ loading: false, blogs: blogsArray })
            })
            .catch(error => {

            })
    }, [])

    let content = null;

    if (props.location.state && props.location.state.blog) {
        const blog = props.location.state.blog;

        content = (
            <div key={blog.id}>
                <h2>{blog.title}</h2>
                <div className={classes.DescriptiveText}>
                    <div><strong>{blog.author}</strong></div>
                    <div><i>{blog.date.getDate() + "-" + (blog.date.getMonth() + 1) + "-" + blog.date.getFullYear()}</i></div>
                </div>
                <div className={classes.SeparatingLine}></div>
                <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>
            </div>
        )
    } else {
        content = <Redirect to='/Blogs' />
    }

    return (
        <div>
            <HeroImage headerString="BLOG" imageName="Mountain" />
            <div className={classes.Blog}>
                {content}
            </div>
        </div>
    )
};

export default Blog;
