import axios from '../../../axios-instances/axios-firebase'

let blogsArray = [];

export const getBlogs = (callback) => {
    if (blogsArray.length > 0) {
        callback({ loading: false, blogs: blogsArray });
    } else {
        callback({ loading: true, blogs: [], error: false })
        axios.get('/blogs.json')
            .then(response => {
                const entries = Object.entries(response.data);
                blogsArray = entries.map(entry => {
                    return { id: entry[0], ...entry[1], date: new Date(entry[1].date) }
                })
                blogsArray.sort(function (a, b) {
                    return new Date(b.date) - new Date(a.date);
                });

                callback({ loading: false, blogs: blogsArray });
            })
            .catch(error => {
                callback({ loading: false, blogs: [], error: true });
            })
    }
}
