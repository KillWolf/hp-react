import axios from '../../../axios-instances/axios-firebase'

let blogsArray = [];

export const getBlogs = (setConfig, returnOneBlog) => {
    let blogsToBeReturned;

    if (blogsArray.length > 0) {
        blogsToBeReturned = returnOneBlog ? blogsArray[0] : blogsArray;
        setConfig({ loading: false, error: false, blogs: blogsToBeReturned });
    } else {
        axios.get('/blogs.json')
            .then(response => {
                const entries = Object.entries(response.data);
                blogsArray = entries.map(entry => {
                    return { id: entry[0], ...entry[1], date: new Date(entry[1].date) }
                })
                blogsArray.sort(function (a, b) {
                    return new Date(b.date) - new Date(a.date);
                });
                blogsToBeReturned = returnOneBlog ? blogsArray[0] : blogsArray;
                setConfig({ loading: false, error: false, blogs: blogsToBeReturned });
            })
            .catch(error => {
                setConfig({ loading: false, error: true, blogs: false });
            })
    }
}
